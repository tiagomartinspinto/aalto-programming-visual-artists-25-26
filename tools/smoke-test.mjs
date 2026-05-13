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

const { chromium } = await loadPlaywright();
const browser = await chromium.launch();
const page = await browser.newPage();

try {
  await page.goto(site("/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, "h1", 1, "homepage h1");

  await page.goto(site("/years/2025-2026/"), { waitUntil: "domcontentloaded" });
  await expectCount(page, ".web-card", 10, "2025 sketch cards");
  await expectCount(page, ".session-card", 6, "2025 session cards");

  await page.locator("#course-search-input").fill("particles");
  await page.locator('[data-search-type="sketch"]').click();
  await expectCount(page, ".search-result-link", 1, "sketch search result");

  await expectCount(page, "#slide-frame", 1, "PDF slide iframe");

  await page.goto(site("/years/2025-2026/web/lab.html?sketch=bouncing-ball"), { waitUntil: "domcontentloaded" });
  await page.waitForSelector("canvas", { timeout: 10000 });

  console.log("Browser smoke test passed.");
} finally {
  await browser.close();
}
