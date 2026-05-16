import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";
import vm from "node:vm";

const root = process.cwd();
const yearsRoot = path.join(root, "years");

function existsDirectory(filePath) {
  try {
    return statSync(filePath).isDirectory();
  } catch {
    return false;
  }
}

function listDirectories(filePath) {
  if (!existsDirectory(filePath)) return [];
  return readdirSync(filePath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function listFiles(filePath, extension) {
  if (!existsDirectory(filePath)) return [];
  return readdirSync(filePath, { withFileTypes: true })
    .filter((entry) => entry.isFile() && entry.name.endsWith(extension))
    .map((entry) => entry.name)
    .sort((a, b) => a.localeCompare(b));
}

function readTitle(filePath, fallback) {
  try {
    const html = readFileSync(filePath, "utf8");
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
    const title = h1 || html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1];
    return title ? title.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim() : fallback;
  } catch {
    return fallback;
  }
}

function readCourse participantCoursework(yearPath) {
  const dataPath = path.join(yearPath, "case-coursework", "coursework.js");
  try {
    const context = { window: {} };
    vm.createContext(context);
    vm.runInContext(readFileSync(dataPath, "utf8"), context, { filename: dataPath });
    return context.window.REMOVED_COURSEWORK || context.window.REMOVED_COURSEWORK_2024 || [];
  } catch {
    return [];
  }
}

function countCaseCoursework(yearPath) {
  const courseworkPath = path.join(yearPath, "case-coursework");
  const listedCoursework = readCourse participantCoursework(yearPath);
  if (listedCoursework.length) return listedCoursework.length;
  return listDirectories(courseworkPath)
    .filter((name) => /^(coursework|assignment)-/i.test(name) && existsDirectory(path.join(courseworkPath, name)))
    .length;
}

function webSketches(yearPath) {
  const webPath = path.join(yearPath, "web");
  return listDirectories(webPath).filter((name) => name !== "vendor" && existsDirectory(path.join(webPath, name)));
}

const years = listDirectories(yearsRoot);
const lines = [
  "# Course Index",
  "",
  "Generated from the repository structure and year data files. Run `npm run build:index` after adding or renaming course material.",
  "",
  "## Years",
  "",
  "| Year | Sessions | Web sketches | Slide decks | Removed coursework |",
  "| --- | ---: | ---: | ---: | ---: |",
];

for (const year of years) {
  const yearPath = path.join(yearsRoot, year);
  const sessions = listDirectories(path.join(yearPath, "sessions")).filter((name) => name.startsWith("session-"));
  const slideDecks = listFiles(path.join(yearPath, "slides"), ".pdf");
  lines.push(`| [${year}](years/${year}/) | ${sessions.length} | ${webSketches(yearPath).length} | ${slideDecks.length} | ${countCaseCoursework(yearPath)} |`);
}

for (const year of years) {
  const yearPath = path.join(yearsRoot, year);
  lines.push("", `## ${year}`, "", `- [Year landing page](years/${year}/)`);
  if (existsDirectory(path.join(yearPath, "case-coursework"))) {
    lines.push(`- [Removed coursework coursework listing](years/${year}/case-coursework/)`);
  }
  if (existsDirectory(path.join(yearPath, "web"))) {
    lines.push(`- [Sketch Lab](years/${year}/web/lab.html)`);
  }

  const sessions = listDirectories(path.join(yearPath, "sessions")).filter((name) => name.startsWith("session-"));
  if (sessions.length) {
    lines.push("", "### Session Pages", "");
    for (const session of sessions) {
      const title = readTitle(path.join(yearPath, "sessions", session, "index.html"), session);
      lines.push(`- [${title}](years/${year}/sessions/${session}/)`);
    }
  }

  const sketches = webSketches(yearPath);
  if (sketches.length) {
    lines.push("", "### Web Sketches", "");
    for (const sketch of sketches) {
      const title = readTitle(path.join(yearPath, "web", sketch, "index.html"), sketch);
      lines.push(`- [${title}](years/${year}/web/${sketch}/)`);
    }
  }

  const slideDecks = listFiles(path.join(yearPath, "slides"), ".pdf");
  if (slideDecks.length) {
    lines.push("", "### Slide Decks", "");
    for (const pdf of slideDecks) {
      const session = pdf.replace(/\.pdf$/i, "");
      lines.push(`- [${session} slides](years/${year}/slides/${pdf})`);
    }
  }
}

writeFileSync(path.join(root, "COURSE_INDEX.md"), `${lines.join("\n")}\n`);
