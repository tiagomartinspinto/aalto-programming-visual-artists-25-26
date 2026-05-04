import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const errors = [];
const typoPattern = /isntru|animted|nexted|function_parame_ex|particlesperlinoise/i;

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
  for (const match of html.matchAll(/\b(?:href|src|data-src|data-pdf)=["']([^"']+)["']/gi)) {
    checkLocalTarget(filePath, match[1]);
  }

  const ids = new Set([...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]));
  for (const match of html.matchAll(/\bhref=["']#([^"']+)["']/gi)) {
    if (match[1] && !ids.has(match[1])) errors.push(`${relative(filePath)} links to missing in-page section: #${match[1]}`);
  }

  for (const match of html.matchAll(/<iframe\b([^>]*)>/gi)) {
    if (!/\btitle=["'][^"']+["']/i.test(match[1]) && !match[1].includes("escapeHTML")) {
      errors.push(`${relative(filePath)} has an iframe without a title`);
    }
  }

  for (const match of html.matchAll(/<img\b([^>]*)>/gi)) {
    if (!/\balt=["'][^"']*["']/i.test(match[1])) errors.push(`${relative(filePath)} has an image without alt text`);
  }
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
    const studies = countDirectories(path.join(yearPath, "case-studies"), (name) => name !== "vendor");
    const pdfs = countFiles(path.join(yearPath, "slides"), ".pdf");
    for (const expected of [`${sessions} sessions`, `${sketches} web sketches`, `${studies} studies`, "PDF slides"]) {
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
  if (typoPattern.test(rel) && rel !== "years/2025-2026/FILENAME_NOTES.md") {
    errors.push(`${rel} still uses a typo-prone filename`);
  }
  if (filePath.endsWith(".html")) checkHtml(filePath);
}
checkCounts();

if (errors.length) {
  console.error(errors.map((error) => `- ${error}`).join("\n"));
  process.exit(1);
}

console.log("Site checks passed.");
