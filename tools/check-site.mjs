import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const errors = [];
const typoPattern = /isntru|animted|nexted|function_parame_ex|particlesperlinoise|seperate/i;
const privateFilePattern = /(^|\/)(\.env|\.env\..+|.*\.bak|.*\.backup|.*\.tmp|.*~|private-notes?|grades?|\.DS_Store)$/i;
const privateContentPattern = /(\b[A-Z0-9_]*(?:API_KEY|AUTH_TOKEN|ACCESS_TOKEN|SECRET)\b|ghp_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|\/Users\/ptiagomp\/Desktop|\/var\/folders\/)/;
const removedWorkTracePattern = new RegExp(`\\b(${
  [
    "stu" + "dent",
    "stu" + "dents",
    "stu" + "dy",
    "stu" + "dies",
    "case-" + "stu" + "dy",
    "case-" + "stu" + "dies",
    "Open" + "Processing",
    "source\\." + "txt",
    "mir" + "ror",
    "gal" + "lery",
  ].join("|")
})\\b`, "i");
const emailPattern = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
const cspPattern = /<meta\b[^>]*http-equiv=["']Content-Security-Policy["'][^>]*>/i;
const privacyNote = "Code edits run locally in your browser and are not uploaded.";
const publicRepoWarning = "This repository is public.";
const ownershipNote = "authored and maintained by Tiago Martins Pinto";
const yearSectionOrder = ["current-session", "web-sketches", "lab", "comparison", "slides", "assignments", "sessions"];
const yearSharedStylesheet = '<link rel="stylesheet" href="../../assets/year-common.css">';
const yearLocalStylesheet = '<link rel="stylesheet" href="year.css">';
const yearInterfaceSelectors = [
  "header.topbar",
  ".topbar .brand",
  ".topbar nav",
  ".course-header .eyebrow",
  ".course-header h1#course-title",
  ".course-header .lede",
  ".course-header .byline",
  "#current-session.course-tools",
  ".current-session-card .course-tool-label",
  ".course-search .search-controls",
  ".search-filters [data-search-type=\"all\"]",
  ".search-filters [data-search-type=\"session\"]",
  ".search-filters [data-search-type=\"sketch\"]",
  ".search-filters [data-search-type=\"slide\"]",
  "#web-sketches .section-heading + .notice + .web-grid",
  "#lab .section-heading + .feature-grid",
  "#comparison .section-heading + .feature-grid",
  "#slides .section-heading + .slides-reader",
  ".slides-reader .slide-controls + .slide-viewer",
  ".slide-controls .slide-list-label + .slide-fallback-list",
  ".slide-viewer .slide-viewer-bar + .pdf-panel",
  ".slide-actions #prev-slide-deck + #next-slide-deck",
  ".slide-actions #slide-direct-link",
  ".pdf-panel#slide-panel #slide-panel-message",
  "#assignments .section-heading + .feature-grid",
  "#sessions .section-heading + .sessions",
  "footer.footer [data-last-updated]",
];
const forbiddenLocalYearCssSelectors = [
  ".topbar",
  "nav",
  ".course-header",
  ".course-tools",
  ".current-session-card",
  ".course-search",
  ".section-heading",
  ".feature-grid",
  ".sessions",
  ".notice",
  ".web-grid",
  ".web-card",
  ".slides-reader",
  ".slide-controls",
  ".slide-viewer",
  ".pdf-panel",
  ".footer",
];

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function relative(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

function isDirectory(filePath) {
  try {
    return statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function isExternal(value) {
  return /^(https?:|mailto:|tel:|data:|javascript:|about:|\/\/)/i.test(value);
}

function cleanLocalTarget(value) {
  return value.split("#")[0].split("?")[0];
}

function checkLocalTarget(sourceFile, value) {
  if (!value || value.startsWith("#") || isExternal(value) || value.includes("${") || value.includes("escapeHTML")) return;
  const cleanValue = cleanLocalTarget(value);
  if (!cleanValue) return;
  let target = path.resolve(path.dirname(sourceFile), cleanValue);
  if (isDirectory(target)) target = path.join(target, "index.html");
  if (!existsSync(target)) errors.push(`${relative(sourceFile)} references missing target: ${value}`);
}

function checkHtml(filePath) {
  const html = readFileSync(filePath, "utf8");
  const rel = relative(filePath);
  if (!cspPattern.test(html)) errors.push(`${rel} is missing a Content-Security-Policy meta tag`);

  for (const match of html.matchAll(/<(script|iframe)\b([^>]*)>/gi)) {
    const tag = match[1].toLowerCase();
    const src = match[2].match(/\bsrc=["']([^"']+)["']/i)?.[1];
    if (src && /^https?:\/\//i.test(src)) errors.push(`${rel} loads an external ${tag}: ${src}`);
  }

  for (const match of html.matchAll(/<link\b([^>]*)>/gi)) {
    const attributes = match[1];
    const href = attributes.match(/\bhref=["']([^"']+)["']/i)?.[1];
    if (href && /^https?:\/\//i.test(href) && /\brel=["'][^"']*\bstylesheet\b/i.test(attributes)) {
      errors.push(`${rel} loads an external stylesheet: ${href}`);
    }
  }

  for (const match of html.matchAll(/\b(?:href|src|data-src|data-pdf)=["']([^"']+)["']/gi)) {
    checkLocalTarget(filePath, match[1]);
  }

  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref=["']#([^"']+)["']/gi)) {
    if (match[1] && !ids.has(match[1])) errors.push(`${relative(filePath)} links to missing in-page section: #${match[1]}`);
  }

  const requiresSkipLink = rel === "index.html" ||
    rel === "404.html" ||
    /^years\/\d{4}-\d{4}\/(?:index\.html|web\/lab\.html|sessions\/session-\d+\/index\.html)$/.test(rel);
  if (requiresSkipLink) {
    const skipLink = [...html.matchAll(/<a\b([^>]*)>/gi)].find((match) => {
      const attributes = match[1];
      return /\bclass=["'][^"']*\bskip-link\b[^"']*["']/i.test(attributes) && /\bhref=["']#[^"']+["']/i.test(attributes);
    });
    if (!skipLink) {
      errors.push(`${rel} is missing a keyboard skip link`);
    } else {
      const target = skipLink[1].match(/\bhref=["']#([^"']+)["']/i)?.[1];
      if (target && !ids.has(target)) errors.push(`${rel} has a skip link to missing section: #${target}`);
    }
  }

  for (const match of html.matchAll(/\baria-controls=["']([^"']+)["']/gi)) {
    for (const target of match[1].split(/\s+/).filter(Boolean)) {
      if (!target.includes("${") && !ids.has(target)) errors.push(`${rel} has aria-controls pointing to missing id: ${target}`);
    }
  }

  for (const match of html.matchAll(/<(input|select|textarea)\b([^>]*)>/gi)) {
    const attributes = match[2];
    const id = attributes.match(/\bid=["']([^"']+)["']/i)?.[1];
    const hasAccessibleName = /\baria-label=["'][^"']+["']/i.test(attributes) ||
      /\baria-labelledby=["'][^"']+["']/i.test(attributes) ||
      (id && new RegExp(`<label\\b[^>]*\\bfor=["']${id}["']`, "i").test(html));
    if (!hasAccessibleName) errors.push(`${rel} has a ${match[1]} control without an accessible name`);
  }

  for (const match of html.matchAll(/<iframe\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (!/\btitle=["'][^"']+["']/i.test(attributes) && !attributes.includes("escapeHTML")) {
      errors.push(`${relative(filePath)} has an iframe without a title`);
    }
    if (!/\bloading=["']lazy["']/i.test(attributes) && !attributes.includes("escapeHTML")) {
      errors.push(`${relative(filePath)} has an iframe without loading="lazy"`);
    }
    if (!/\bsandbox=["'][^"']+["']/i.test(attributes) && !attributes.includes("escapeHTML")) {
      errors.push(`${relative(filePath)} has an iframe without a sandbox attribute`);
    }
    if ((/\bsrc=["'][^"']+\.pdf/i.test(attributes) || /\bclass=["'][^"']*\b(?:slides|pdf-frame)\b/i.test(attributes)) &&
      !/\bsandbox=["'][^"']*allow-same-origin[^"']*allow-downloads[^"']*["']/i.test(attributes)) {
      errors.push(`${relative(filePath)} has a PDF iframe without the expected PDF sandbox permissions`);
    }
  }

  for (const match of html.matchAll(/<a\b([^>]*)>/gi)) {
    const attributes = match[1];
    if (/\btarget=["']_blank["']/i.test(attributes) && !/\brel=["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["']/i.test(attributes)) {
      errors.push(`${rel} opens a new tab without rel="noopener noreferrer"`);
    }
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) errors.push(`${relative(filePath)} has an image without alt text`);
  }

  if (/^years\/\d{4}-\d{4}\/index\.html$/.test(rel)) {
    const sharedIndex = html.indexOf(yearSharedStylesheet);
    const localIndex = html.indexOf(yearLocalStylesheet);
    if (sharedIndex < 0) errors.push(`${rel} is missing the shared year interface stylesheet`);
    if (localIndex < 0) errors.push(`${rel} is missing its local year palette stylesheet`);
    if (sharedIndex >= 0 && localIndex >= 0 && sharedIndex > localIndex) {
      errors.push(`${rel} loads local year.css before the shared year interface stylesheet`);
    }
    for (const selector of yearInterfaceSelectors) {
      if (!matchesStaticSelector(html, selector)) errors.push(`${rel} is missing standard year interface structure: ${selector}`);
    }
    let previous = -1;
    for (const id of yearSectionOrder) {
      const index = html.indexOf(`id="${id}"`);
      if (index < 0) {
        errors.push(`${rel} is missing the standard year section: #${id}`);
      } else if (index < previous) {
        errors.push(`${rel} has #${id} out of the standard year section order`);
      }
      previous = index;
    }
    for (const type of ["all", "session", "sketch", "slide"]) {
      if (!html.includes(`data-search-type="${type}"`)) errors.push(`${rel} is missing the ${type} course search filter`);
    }
    if (html.includes('id="slide-frame"')) {
      errors.push(`${rel} uses an embedded year-level PDF iframe instead of the browser-compatible PDF panel`);
    }
    if (!html.includes('id="slide-panel-message"')) {
      errors.push(`${rel} is missing the PDF fallback message`);
    }
    if (!/<a\b(?=[^>]*\bid=["']slide-direct-link["'])(?=[^>]*\btarget=["']_blank["'])(?=[^>]*\brel=["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["'])[^>]*>/i.test(html)) {
      errors.push(`${rel} is missing a safe direct PDF link for the Slides Reader`);
    }
    const slideControls = html.match(/<div\b[^>]*\bclass=["']slide-controls["'][^>]*>([\s\S]*?)<\/div>\s*<div\b[^>]*\bclass=["']slide-viewer["']/i)?.[1] || "";
    if (!slideControls.trim()) {
      errors.push(`${rel} has empty source HTML inside .slide-controls`);
    }
    const expectedSlideCount = countFiles(path.join(path.dirname(filePath), "slides"), ".pdf");
    const fallbackSlideLinks = [...slideControls.matchAll(/<a\b([^>]*)>/gi)].filter((match) => {
      const attributes = match[1];
      return /\bhref=["']slides\/[^"']+\.pdf["']/i.test(attributes);
    });
    if (expectedSlideCount > 0 && fallbackSlideLinks.length !== expectedSlideCount) {
      errors.push(`${rel} has ${fallbackSlideLinks.length} fallback slide links; expected ${expectedSlideCount}`);
    }
    for (let index = 1; index <= expectedSlideCount; index += 1) {
      const expectedHref = `slides/session-${String(index).padStart(2, "0")}.pdf`;
      const link = fallbackSlideLinks.find((match) => match[1].includes(`href="${expectedHref}"`) || match[1].includes(`href='${expectedHref}'`));
      if (!link) {
        errors.push(`${rel} is missing fallback link for ${expectedHref}`);
        continue;
      }
      if (!/\btarget=["']_blank["']/i.test(link[1]) || !/\brel=["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["']/i.test(link[1])) {
        errors.push(`${rel} fallback link for ${expectedHref} is missing safe new-tab attributes`);
      }
    }
  }

  if (/^years\/\d{4}-\d{4}\/sessions\/session-\d+\/index\.html$/.test(rel)) {
    if (/<iframe\b[^>]*\.pdf/i.test(html)) {
      errors.push(`${rel} embeds a PDF iframe instead of the browser-compatible PDF panel`);
    }
    if (!html.includes('class="slides-panel"')) {
      errors.push(`${rel} is missing the session PDF panel`);
    }
    if (!/<a\b(?=[^>]*\bhref=["'][^"']+\.pdf["'])(?=[^>]*\btarget=["']_blank["'])(?=[^>]*\brel=["'][^"']*\bnoopener\b[^"']*\bnoreferrer\b[^"']*["'])[^>]*>/i.test(html)) {
      errors.push(`${rel} is missing a safe direct PDF link for session slides`);
    }
  }
}

function matchesStaticSelector(html, selector) {
  const parts = selector.split(/\s*\+\s*|\s+/).filter(Boolean);
  return parts.every((part) => {
    const tag = part.match(/^[a-z0-9-]+/i)?.[0] || "[a-z0-9-]+";
    const id = part.match(/#([A-Za-z0-9_-]+)/)?.[1];
    const classes = [...part.matchAll(/\.([A-Za-z0-9_-]+)/g)].map((match) => match[1]);
    const attrs = [...part.matchAll(/\[([^=\]]+)(?:=["']?([^"'\]]+)["']?)?\]/g)].map((match) => ({
      name: match[1],
      value: match[2] || null,
    }));
    const tagPattern = tag === "[a-z0-9-]+" ? "[a-z0-9-]+" : tag;
    const pattern = new RegExp(`<${tagPattern}\\b([^>]*)>`, "gi");
    for (const match of html.matchAll(pattern)) {
      const attributes = match[1];
      if (id && !new RegExp(`\\bid=["']${id}["']`, "i").test(attributes)) continue;
      const classValue = attributes.match(/\bclass=["']([^"']+)["']/i)?.[1] || "";
      const classSet = new Set(classValue.split(/\s+/).filter(Boolean));
      if (classes.some((className) => !classSet.has(className))) continue;
      const hasAttrs = attrs.every(({ name, value }) => {
        if (value === null) return new RegExp(`\\b${name}(?:\\s|$|=)`, "i").test(attributes);
        const attrMatch = attributes.match(new RegExp(`\\b${name}=["']?([^"'\\s>]+)["']?`, "i"));
        return attrMatch && attrMatch[1] === value;
      });
      if (hasAttrs) return true;
    }
    return false;
  });
}

function loadCourseData(filePath) {
  const source = readFileSync(filePath, "utf8");
  if (!source.includes("Source of truth")) {
    errors.push(`${relative(filePath)} is missing the source-of-truth maintenance comment`);
  }
  const context = { window: {} };
  vm.createContext(context);
  vm.runInContext(source, context, { filename: filePath });
  return context.window.COURSE_DATA;
}

function checkCourseData(filePath) {
  const data = loadCourseData(filePath);
  const yearPath = path.dirname(filePath);
  if (!data) {
    errors.push(`${relative(filePath)} does not define window.COURSE_DATA`);
    return;
  }

  for (const session of data.sessions || []) {
    checkLocalTarget(filePath, session.href);
    for (const link of session.links || []) checkLocalTarget(filePath, link.pdf || link.href);
  }

  for (const sketch of data.sketches || []) {
    checkLocalTarget(filePath, sketch.page);
    checkLocalTarget(filePath, sketch.source);
    const sketchPath = path.join(yearPath, "web", sketch.id, "sketch.js");
    if (!existsSync(sketchPath)) errors.push(`${relative(filePath)} lists missing sketch source: web/${sketch.id}/sketch.js`);
  }

  for (const slide of data.slides || []) checkLocalTarget(filePath, slide.pdf);
  for (const item of data.searchExtras || []) checkLocalTarget(filePath, item.href);
}

function countDirectories(directory, predicate = () => true) {
  if (!existsSync(directory)) return 0;
  return readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isDirectory() && predicate(entry.name)).length;
}

function countFiles(directory, extension) {
  if (!existsSync(directory)) return 0;
  return readdirSync(directory, { withFileTypes: true }).filter((entry) => entry.isFile() && entry.name.endsWith(extension)).length;
}

function checkCounts() {
  const rootIndex = readFileSync(path.join(root, "index.html"), "utf8");
  for (const year of countDirectories(path.join(root, "years")) ? readdirSync(path.join(root, "years")) : []) {
    const yearPath = path.join(root, "years", year);
    if (!isDirectory(yearPath)) continue;
    const sessions = countDirectories(path.join(yearPath, "sessions"), (name) => name.startsWith("session-"));
    const pdfs = countFiles(path.join(yearPath, "slides"), ".pdf");
    for (const expected of [`${sessions} sessions`]) {
      if (!rootIndex.includes(expected)) errors.push(`index.html is missing or has stale count label "${expected}" for ${year}`);
    }
    const yearIndex = readFileSync(path.join(yearPath, "index.html"), "utf8");
    if (!yearIndex.includes("Last updated:")) errors.push(`years/${year}/index.html is missing a last-updated marker`);
    if (pdfs > 0 && !yearIndex.includes("PDF")) errors.push(`years/${year}/index.html does not mention PDF slide material`);
    if (!cspPattern.test(yearIndex)) errors.push(`years/${year}/index.html is missing a Content-Security-Policy meta tag`);

    const labPath = path.join(yearPath, "web", "lab.html");
    if (existsSync(labPath)) {
      if (!yearIndex.includes(privacyNote)) errors.push(`years/${year}/index.html is missing the Lab privacy note`);
      const labHtml = readFileSync(labPath, "utf8");
      if (!cspPattern.test(labHtml)) errors.push(`years/${year}/web/lab.html is missing a Content-Security-Policy meta tag`);
      if (!labHtml.includes(privacyNote)) errors.push(`years/${year}/web/lab.html is missing the browser-local privacy note`);
      const courseDataScript = labHtml.indexOf('src="../course-data.js"');
      const sharedLabScript = labHtml.indexOf('src="../../../assets/lab.js"');
      if (courseDataScript < 0 || sharedLabScript < 0) {
        errors.push(`years/${year}/web/lab.html must load course-data.js and the shared Lab runtime`);
      } else if (sharedLabScript < courseDataScript) {
        errors.push(`years/${year}/web/lab.html must load course-data.js before assets/lab.js`);
      }
    }
  }
  const homeHtml = readFileSync(path.join(root, "index.html"), "utf8");
  if (!homeHtml.includes("Last updated:")) {
    errors.push("index.html is missing a last-updated marker");
  }
  if (!cspPattern.test(homeHtml)) errors.push("index.html is missing a Content-Security-Policy meta tag");
  if (!readFileSync(path.join(root, "README.md"), "utf8").includes(publicRepoWarning)) {
    errors.push("README.md is missing the public repository warning");
  }
  if (!homeHtml.includes(ownershipNote)) {
    errors.push("index.html is missing the authorship and responsibility note");
  }
  if (!readFileSync(path.join(root, "README.md"), "utf8").includes(ownershipNote)) {
    errors.push("README.md is missing the authorship and responsibility note");
  }
  if (!existsSync(path.join(root, "SECURITY.md"))) errors.push("SECURITY.md is missing");
  const yearJs = readFileSync(path.join(root, "assets", "year.js"), "utf8");
  if (!yearJs.includes('sandbox="allow-scripts"')) {
    errors.push("assets/year.js is missing sandboxed sketch preview iframes");
  }
  if (/slide-buttons|slide-picker|is-compact/.test(yearJs)) {
    errors.push("assets/year.js must not render count-based slide shortcut controls");
  }
}

for (const filePath of walk(root)) {
  const rel = relative(filePath);
  if (privateFilePattern.test(rel)) {
    errors.push(`${rel} looks like a private, temporary, or local-only file`);
  }
  if (typoPattern.test(rel) && rel !== "years/2025-2026/FILENAME_NOTES.md") {
    errors.push(`${rel} still uses a typo-prone filename`);
  }
  if (/\.(?:html|js|css|md|txt|pde|rb|json|yml|yaml)$/i.test(filePath)) {
    const content = readFileSync(filePath, "utf8");
    if (privateContentPattern.test(content)) errors.push(`${rel} contains a private token pattern or local machine path`);
    const traceScanExempt = rel === "PROJECT_STATUS.md" || /(?:^|\/)vendor\/p5\.min\.js$/.test(rel);
    if (!traceScanExempt && removedWorkTracePattern.test(content)) {
      errors.push(`${rel} contains a removed coursework trace term`);
    }
  }
  if (filePath.endsWith(".html")) checkHtml(filePath);
  if (/years[\\/]\d{4}-\d{4}[\\/]year\.css$/.test(filePath)) {
    const content = readFileSync(filePath, "utf8");
    for (const selector of forbiddenLocalYearCssSelectors) {
      if (content.includes(selector)) {
        errors.push(`${relative(filePath)} contains shared layout selector ${selector}; use assets/year-common.css instead`);
      }
    }
    if (!content.includes("--year-route")) {
      errors.push(`${relative(filePath)} is missing the local --year-route palette token`);
    }
  }
  if (rel.endsWith("course-data.js")) checkCourseData(filePath);
}
checkCounts();

if (!existsSync(path.join(root, "assets", "year-common.css"))) {
  errors.push("assets/year-common.css is missing");
}
if (!readFileSync(path.join(root, "tools", "new-year.mjs"), "utf8").includes("../../assets/year-common.css")) {
  errors.push("tools/new-year.mjs does not scaffold the shared year stylesheet");
}

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Site checks passed.");
