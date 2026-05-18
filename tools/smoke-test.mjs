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

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(site("/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, "h1", 1, "homepage h1");

  await page.goto(site("/years/2024-2025/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 9, "2024 sketch cards");
  await expectCount(page, ".session-card", 8, "2024 session cards");
  await page.locator("#course-search-input").fill("video");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "2024 sketch search result");
  if ((await page.locator("#slide-frame").getAttribute("sandbox")) !== "allow-same-origin allow-downloads") {
    throw new Error("2024 PDF iframe sandbox changed");
  }

  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 10, "2025 sketch cards");
  await expectCount(page, ".session-card", 6, "2025 session cards");

  await page.locator("#course-search-input").fill("particles");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "sketch search result");

  await expectCount(page, "#slide-frame", 1, "PDF slide iframe");
  if ((await page.locator("#slide-frame").getAttribute("sandbox")) !== "allow-same-origin allow-downloads") {
    throw new Error("2025 PDF iframe sandbox changed");
  }

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
