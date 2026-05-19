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
}

async function expectFallbackSlideList(browser, path, year, expectedDecks) {
  const context = await browser.newContext({ javaScriptEnabled: false });
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
  } finally {
    await context.close();
  }
}

async function expectMobileSlideControls(page, path, year) {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(site(path), { waitUntil: "domcontentloaded" });
  if (!(await page.locator("#slide-select").isVisible())) {
    throw new Error(`${year} mobile slide select is not visible`);
  }
  const fits = await page.locator(".slides-reader").evaluate((reader) => {
    const controls = reader.querySelector(".slide-controls");
    return reader.scrollWidth <= reader.clientWidth + 1 && (!controls || controls.scrollWidth <= controls.clientWidth + 1);
  });
  if (!fits) {
    throw new Error(`${year} mobile slide controls overflow their panel`);
  }
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

  await expectFallbackSlideList(browser, "/years/2024-2025/", "2024-2025", 8);
  await expectFallbackSlideList(browser, "/years/2025-2026/", "2025-2026", 6);

  await page.goto(site("/years/2024-2025/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 9, "2024 sketch cards");
  await expectCount(page, ".session-card", 8, "2024 session cards");
  await page.locator("#course-search-input").fill("video");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "2024 sketch search result");
  await expectSlideReader(page, "2024-2025", 8);
  if (!(await page.locator(".slide-controls").evaluate((element) => element.classList.contains("is-compact")))) {
    throw new Error("2024 slide controls should use compact layout");
  }

  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 10, "2025 sketch cards");
  await expectCount(page, ".session-card", 6, "2025 session cards");

  await page.locator("#course-search-input").fill("particles");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "sketch search result");

  await expectSlideReader(page, "2025-2026", 6);
  await expectSessionPdfPanel(page, "/years/2024-2025/sessions/session-08/", "2024 session slides");
  await expectSessionPdfPanel(page, "/years/2025-2026/sessions/session-06/", "2025 session slides");
  await expectMobileSlideControls(page, "/years/2024-2025/", "2024-2025");
  await expectMobileSlideControls(page, "/years/2025-2026/", "2025-2026");

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
