const baseUrl = process.env.PVA_SITE_URL || "http://127.0.0.1:8123";

async function loadPlaywright() {
  try {
    return await import("playwright");
  } catch {
    console.error("Playwright is required for this smoke test. Install it with `npm install --save-dev playwright`.");
    process.exit(1);
  }
}

function site(path) {
  return new URL(path, baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`).toString();
}

async function expectCount(page, selector, minimum, label) {
  const count = await page.locator(selector).count();
  if (count < minimum) throw new Error(`${label} expected at least ${minimum}, found ${count}`);
  return count;
}

async function expectNoHorizontalOverflow(page, label) {
  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));
  if (overflow.documentWidth > overflow.viewport + 1 || overflow.bodyWidth > overflow.viewport + 1) {
    throw new Error(`${label} has horizontal overflow: viewport ${overflow.viewport}, document ${overflow.documentWidth}, body ${overflow.bodyWidth}`);
  }
}

async function expectCanvasChanges(locator, label) {
  const handle = await locator.elementHandle({ timeout: 10000 });
  const changed = await handle.evaluate(async (canvas) => {
    const context = canvas.getContext("2d");
    if (!context) return false;
    const sample = () => canvas.toDataURL("image/png");
    const before = sample();
    await new Promise((resolve) => setTimeout(resolve, 700));
    return before !== sample();
  });
  if (!changed) throw new Error(`${label} did not visibly animate`);
}

async function yearStructure(page, path) {
  await page.goto(site(path), { waitUntil: "domcontentloaded" });
  return page.evaluate(() => {
    const className = (element) => [...element.classList].sort().join(".");
    const childSignature = (selector) => {
      const element = document.querySelector(selector);
      return element ? [...element.children].map((child) => `${child.tagName.toLowerCase()}#${child.id || ""}.${className(child)}`) : [];
    };
    return {
      sections: [...document.querySelectorAll("main > section")].map((section) => section.id),
      navHrefs: [...document.querySelectorAll(".topbar nav a")].map((link) => link.getAttribute("href")),
      searchFilters: [...document.querySelectorAll("[data-search-type]")].map((button) => button.dataset.searchType),
      currentSessionChildren: childSignature(".current-session-card"),
      courseSearchChildren: childSignature(".course-search"),
      slideReaderChildren: childSignature(".slides-reader"),
      slideControlsChildren: childSignature(".slide-controls"),
      slideViewerChildren: childSignature(".slide-viewer"),
      slideViewerBarChildren: childSignature(".slide-viewer-bar"),
      slideActionsChildren: childSignature(".slide-actions"),
      pdfPanelChildren: childSignature(".pdf-panel"),
      assignmentGridTag: document.querySelector("#assignments .feature-grid")?.tagName.toLowerCase() || "",
      sessionsGridTag: document.querySelector("#sessions .sessions")?.tagName.toLowerCase() || "",
      footerChildren: childSignature("footer.footer"),
      fallbackLinks: [...document.querySelectorAll(".slide-fallback-list a")].map((link) => ({
        href: link.getAttribute("href"),
        target: link.getAttribute("target"),
        rel: link.getAttribute("rel"),
      })),
      enhancedOptions: [...document.querySelectorAll("#slide-select option")].map((option) => option.value),
      shortcutButtons: [...document.querySelectorAll(".slide-buttons, .slide-picker")].map((element) => ({
        tag: element.tagName.toLowerCase(),
        visible: Boolean(element.offsetParent),
      })),
    };
  });
}

function withoutCounts(structure) {
  return {
    ...structure,
    fallbackLinks: structure.fallbackLinks.map((link) => ({
      href: link.href.replace(/session-\d+\.pdf$/, "session-NN.pdf"),
      target: link.target,
      rel: link.rel,
    })).slice(0, 1),
    enhancedOptions: structure.enhancedOptions.length ? ["0..n"] : [],
  };
}

function expectSameStructure(left, right, label) {
  const normalizedLeft = JSON.stringify(withoutCounts(left));
  const normalizedRight = JSON.stringify(withoutCounts(right));
  if (normalizedLeft !== normalizedRight) {
    throw new Error(`${label} structures drifted:\n${normalizedLeft}\n${normalizedRight}`);
  }
}

async function expectSlideReader(page, year, expectedDecks) {
  await expectCount(page, "#slide-select option", expectedDecks, `${year} slide deck options`);
  await expectCount(page, "#slide-direct-link", 1, `${year} direct PDF link`);
  await expectCount(page, "#slide-panel-message", 1, `${year} PDF fallback message`);
  await expectCount(page, ".pdf-panel", 1, `${year} PDF panel`);
  if (!(await page.locator("#slide-select").isVisible())) {
    throw new Error(`${year} enhanced slide select is not visible`);
  }
  if ((await page.locator("#slide-frame").count()) !== 0) {
    throw new Error(`${year} still uses a year-level PDF iframe`);
  }
  if ((await page.locator(".slide-buttons, .slide-picker").count()) !== 0) {
    throw new Error(`${year} still renders shortcut slide buttons after JavaScript enhancement`);
  }

  const direct = page.locator("#slide-direct-link");
  if ((await direct.getAttribute("target")) !== "_blank") {
    throw new Error(`${year} direct PDF link does not open in a new tab`);
  }
  const rel = await direct.getAttribute("rel");
  if (!rel?.includes("noopener") || !rel.includes("noreferrer")) {
    throw new Error(`${year} direct PDF link is missing rel safety attributes`);
  }
  const fallback = await page.locator("#slide-panel-message").textContent();
  if (!fallback?.includes("browsers block embedded PDF readers")) {
    throw new Error(`${year} fallback message does not explain blocked embedded PDF readers`);
  }

  await page.locator("#slide-select").selectOption(String(expectedDecks - 1));
  const finalHref = await direct.getAttribute("href");
  const finalPath = new URL(finalHref, page.url()).pathname;
  const expectedPdf = `session-${String(expectedDecks).padStart(2, "0")}.pdf`;
  if (!finalPath.endsWith(`/slides/${expectedPdf}`)) {
    throw new Error(`${year} direct PDF link did not update to ${expectedPdf}`);
  }

  await page.locator("#slide-select").selectOption("0");
  await page.locator("#next-slide-deck").click();
  const nextPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
  if (!nextPath.endsWith("/slides/session-02.pdf")) {
    throw new Error(`${year} next deck button did not advance to session-02.pdf`);
  }
  await page.locator("#prev-slide-deck").click();
  const previousPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
  if (!previousPath.endsWith("/slides/session-01.pdf")) {
    throw new Error(`${year} previous deck button did not return to session-01.pdf`);
  }
  await page.locator("#prev-slide-deck").click();
  const wrappedPath = new URL(await direct.getAttribute("href"), page.url()).pathname;
  if (!wrappedPath.endsWith(`/slides/${expectedPdf}`)) {
    throw new Error(`${year} previous deck button did not wrap to ${expectedPdf}`);
  }
}

async function expectFallbackSlideList(browser, path, year, expectedDecks, viewport = { width: 1280, height: 800 }) {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport });
  const fallbackPage = await context.newPage();
  try {
    await fallbackPage.goto(site(path), { waitUntil: "domcontentloaded" });
    await expectCount(fallbackPage, ".slide-controls a[href$='.pdf']", expectedDecks, `${year} fallback slide links`);
    if (!(await fallbackPage.locator(".slide-controls").isVisible())) {
      throw new Error(`${year} fallback slide controls are not visible without JavaScript`);
    }
    if (!(await fallbackPage.locator(".slide-controls a[href$='.pdf']").first().isVisible())) {
      throw new Error(`${year} first fallback slide link is not visible without JavaScript`);
    }
    if ((await fallbackPage.locator("#slide-select").count()) !== 0) {
      throw new Error(`${year} enhanced slide select should not exist before JavaScript runs`);
    }
    for (let index = 1; index <= expectedDecks; index += 1) {
      const href = `slides/session-${String(index).padStart(2, "0")}.pdf`;
      const link = fallbackPage.locator(`.slide-controls a[href="${href}"]`);
      if ((await link.count()) !== 1) {
        throw new Error(`${year} fallback slide list is missing ${href}`);
      }
      if ((await link.getAttribute("target")) !== "_blank") {
        throw new Error(`${year} fallback ${href} does not open in a new tab`);
      }
      const rel = await link.getAttribute("rel");
      if (!rel?.includes("noopener") || !rel.includes("noreferrer")) {
        throw new Error(`${year} fallback ${href} is missing rel safety attributes`);
      }
    }
    await expectNoHorizontalOverflow(fallbackPage, `${year} no-JS ${viewport.width}px`);
  } finally {
    await context.close();
  }
}

async function expectResponsiveSlideControls(page, path, year, viewport) {
  await page.setViewportSize(viewport);
  await page.goto(site(path), { waitUntil: "domcontentloaded" });
  if (!(await page.locator("#slide-select").isVisible())) {
    throw new Error(`${year} ${viewport.width}px slide select is not visible`);
  }
  const fits = await page.locator(".slides-reader").evaluate((reader) => {
    const controls = reader.querySelector(".slide-controls");
    return reader.scrollWidth <= reader.clientWidth + 1 && (!controls || controls.scrollWidth <= controls.clientWidth + 1);
  });
  if (!fits) {
    throw new Error(`${year} ${viewport.width}px slide controls overflow their panel`);
  }
  await expectNoHorizontalOverflow(page, `${year} JS ${viewport.width}px`);
}

async function expectSessionPdfPanel(page, path, label) {
  await page.goto(site(path), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".slides-panel", 1, `${label} PDF panel`);
  if ((await page.locator("iframe[src$='.pdf']").count()) !== 0) {
    throw new Error(`${label} still embeds a PDF iframe`);
  }
  const link = page.locator(".slides-panel a");
  if ((await link.getAttribute("target")) !== "_blank") {
    throw new Error(`${label} PDF link does not open in a new tab`);
  }
  const rel = await link.getAttribute("rel");
  if (!rel?.includes("noopener") || !rel.includes("noreferrer")) {
    throw new Error(`${label} PDF link is missing rel safety attributes`);
  }
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(site("/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, "h1", 1, "homepage h1");

  for (const viewport of [{ width: 1280, height: 800 }, { width: 820, height: 900 }, { width: 390, height: 844 }]) {
    await expectFallbackSlideList(browser, "/years/2024-2025/", "2024-2025", 8, viewport);
    await expectFallbackSlideList(browser, "/years/2025-2026/", "2025-2026", 6, viewport);
  }

  const noJs2024 = await (async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const fallbackPage = await context.newPage();
    const structure = await yearStructure(fallbackPage, "/years/2024-2025/");
    await context.close();
    return structure;
  })();
  const noJs2025 = await (async () => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 800 } });
    const fallbackPage = await context.newPage();
    const structure = await yearStructure(fallbackPage, "/years/2025-2026/");
    await context.close();
    return structure;
  })();
  expectSameStructure(noJs2024, noJs2025, "No-JavaScript year page");

  const enhanced2024 = await yearStructure(page, "/years/2024-2025/");
  const enhanced2025 = await yearStructure(page, "/years/2025-2026/");
  expectSameStructure(enhanced2024, enhanced2025, "Enhanced year page");
  if (enhanced2024.shortcutButtons.length || enhanced2025.shortcutButtons.length) {
    throw new Error("Enhanced Slides Reader must not render per-session shortcut buttons in either year");
  }

  await page.goto(site("/years/2024-2025/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 9, "2024 sketch cards");
  await expectCount(page, ".session-card", 8, "2024 session cards");
  await page.locator("#course-search-input").fill("video");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "2024 sketch search result");
  await expectSlideReader(page, "2024-2025", 8);

  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 10, "2025 sketch cards");
  await expectCount(page, ".session-card", 6, "2025 session cards");

  await page.locator("#course-search-input").fill("particles");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "sketch search result");

  await expectSlideReader(page, "2025-2026", 6);
  await expectSessionPdfPanel(page, "/years/2024-2025/sessions/session-08/", "2024 session slides");
  await expectSessionPdfPanel(page, "/years/2025-2026/sessions/session-06/", "2025 session slides");
  for (const viewport of [{ width: 1280, height: 800 }, { width: 820, height: 900 }, { width: 390, height: 844 }]) {
    await expectResponsiveSlideControls(page, "/years/2024-2025/", "2024-2025", viewport);
    await expectResponsiveSlideControls(page, "/years/2025-2026/", "2025-2026", viewport);
  }

  await page.setViewportSize({ width: 1280, height: 720 });
  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  await page.locator('nav a[href="#web-sketches"]').click();
  await page.locator('[data-sketch-id="bouncing-ball"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1200);
  const bouncingPreview = page.locator('[data-sketch-id="bouncing-ball"] iframe');
  if ((await bouncingPreview.getAttribute("sandbox")) !== "allow-scripts") {
    throw new Error("Sketch preview iframe sandbox changed");
  }
  await expectCanvasChanges(page.frameLocator('[data-sketch-id="bouncing-ball"] iframe').locator("canvas"), "Bouncing ball preview");

  await page.goto(site("/years/2025-2026/web/lab.html?sketch=bouncing-ball"), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("canvas", { timeout: 10000 });
  const code = page.locator("#code");
  await code.fill(`${await code.inputValue()}\nfunction mousePressed() { background(255, 0, 0); }`);
  await page.locator("#run-button").click();
  await page.waitForSelector("canvas", { timeout: 10000 });
  if (!(await page.locator("#status").textContent()).includes("Your sketch is running")) {
    throw new Error("Lab did not report the edited sketch as running");
  }

  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  if (!(await page.locator('nav a[href="#lab"]').isVisible())) {
    throw new Error("Mobile year navigation is not visible");
  }

  console.log("Browser smoke test passed.");
} finally {
  await browser.close();
}
