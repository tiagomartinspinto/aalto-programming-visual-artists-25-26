import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const errors = [];
const typoPattern = /isntru|animted|nexted|function_parame_ex|particlesperlinoise|seperate/i;
const privateFilePattern = /(^|\/)(\.env|\.env\..+|.*\.bak|.*\.backup|.*\.tmp|.*~|private-notes?|grades?|course participant-grades?|\.DS_Store)$/i;
const privateContentPattern = /(OPENAI_API_KEY|ANTHROPIC_API_KEY|GITHUB_TOKEN|ghp_[A-Za-z0-9_]{20,}|sk-[A-Za-z0-9_-]{20,}|\/Users\/ptiagomp\/Desktop|\/var\/folders\/)/;

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
  for (const match of html.matchAll(/\b(?:href|src|data-src|data-pdf)=["']([^"']+)["']/gi)) {
    checkLocalTarget(filePath, match[1]);
  }

  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref=["']#([^"']+)["']/gi)) {
    if (match[1] && !ids.has(match[1])) errors.push(`${relative(filePath)} links to missing in-page section: #${match[1]}`);
  }

  const requiresSkipLink = rel === "index.html" ||
    rel === "404.html" ||
    /^years\/\d{4}-\d{4}\/(?:index\.html|case-coursework\/index\.html|web\/lab\.html)$/.test(rel);
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
    if (!/\btitle=["'][^"']+["']/i.test(match[1]) && !match[1].includes("escapeHTML")) {
      errors.push(`${relative(filePath)} has an iframe without a title`);
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
}

function loadCourseData(filePath) {
  const source = readFileSync(filePath, "utf8");
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
    const sketches = countDirectories(path.join(yearPath, "web"), (name) => name !== "vendor");
    const coursework = countDirectories(path.join(yearPath, "case-coursework"), (name) => name !== "vendor");
    const pdfs = countFiles(path.join(yearPath, "slides"), ".pdf");
    for (const expected of [`${sessions} sessions`, `${coursework} coursework`]) {
      if (!rootIndex.includes(expected)) errors.push(`index.html is missing or has stale count label "${expected}" for ${year}`);
    }
    const yearIndex = readFileSync(path.join(yearPath, "index.html"), "utf8");
    if (!yearIndex.includes("Last updated:")) errors.push(`years/${year}/index.html is missing a last-updated marker`);
    if (pdfs > 0 && !yearIndex.includes("PDF")) errors.push(`years/${year}/index.html does not mention PDF slide material`);
  }
  if (!readFileSync(path.join(root, "index.html"), "utf8").includes("Last updated:")) {
    errors.push("index.html is missing a last-updated marker");
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
  }
  if (filePath.endsWith(".html")) checkHtml(filePath);
  if (rel.endsWith("course-data.js")) checkCourseData(filePath);
}
checkCounts();

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Site checks passed.");
