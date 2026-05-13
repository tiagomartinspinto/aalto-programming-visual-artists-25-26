import { readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = process.cwd();
const warnings = [];
const limits = new Map([
  [".pdf", 30 * 1024 * 1024],
  [".mp4", 20 * 1024 * 1024],
  [".jpg", 3 * 1024 * 1024],
  [".jpeg", 3 * 1024 * 1024],
  [".png", 3 * 1024 * 1024],
  [".gif", 5 * 1024 * 1024],
  [".svg", 300 * 1024],
  [".js", 1 * 1024 * 1024],
  [".css", 600 * 1024],
]);

function walk(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    if (entry.name === ".git" || entry.name === "node_modules") return [];
    if (entry.isDirectory()) return walk(fullPath);
    return [fullPath];
  });
}

function rel(filePath) {
  return path.relative(root, filePath).replaceAll(path.sep, "/");
}

for (const file of walk(root)) {
  const extension = path.extname(file).toLowerCase();
  const limit = limits.get(extension);
  if (!limit) continue;
  const size = statSync(file).size;
  if (size > limit) {
    warnings.push(`${rel(file)} is ${(size / 1024 / 1024).toFixed(1)} MB; consider compression or a smaller teaching asset.`);
  }
}

if (warnings.length) {
  console.warn(warnings.map((warning) => `- ${warning}`).join("\n"));
}

console.log("Asset size check completed.");
