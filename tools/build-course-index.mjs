import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

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

function countCaseStudies(yearPath) {
  const studiesPath = path.join(yearPath, "case-studies");
  return listDirectories(studiesPath).filter((name) => name !== "vendor" && existsDirectory(path.join(studiesPath, name))).length;
}

function webSketches(yearPath) {
  const webPath = path.join(yearPath, "web");
  return listDirectories(webPath).filter((name) => name !== "vendor" && existsDirectory(path.join(webPath, name)));
}

const years = listDirectories(yearsRoot);
const lines = [
  "# Course Index",
  "",
  "Generated from the repository structure. Run `npm run build:index` after adding or renaming course material.",
  "",
  "## Years",
  "",
  "| Year | Sessions | Web sketches | Slide decks | Student studies |",
  "| --- | ---: | ---: | ---: | ---: |",
];

for (const year of years) {
  const yearPath = path.join(yearsRoot, year);
  const sessions = listDirectories(path.join(yearPath, "sessions")).filter((name) => name.startsWith("session-"));
  const slideDecks = listDirectories(yearPath)
    .filter((name) => /^Session-\d+$/i.test(name))
    .flatMap((session) => listFiles(path.join(yearPath, session), ".pdf"));
  lines.push(`| [${year}](years/${year}/) | ${sessions.length} | ${webSketches(yearPath).length} | ${slideDecks.length} | ${countCaseStudies(yearPath)} |`);
}

for (const year of years) {
  const yearPath = path.join(yearsRoot, year);
  lines.push("", `## ${year}`, "", `- [Year landing page](years/${year}/)`);
  if (existsDirectory(path.join(yearPath, "case-studies"))) {
    lines.push(`- [Student studies gallery](years/${year}/case-studies/)`);
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

  const slideSessions = listDirectories(yearPath).filter((name) => /^Session-\d+$/i.test(name));
  if (slideSessions.length) {
    lines.push("", "### Slide Decks", "");
    for (const session of slideSessions) {
      for (const pdf of listFiles(path.join(yearPath, session), ".pdf")) {
        lines.push(`- [${session} slides](years/${year}/${session}/${pdf})`);
      }
    }
  }
}

writeFileSync(path.join(root, "COURSE_INDEX.md"), `${lines.join("\n")}\n`);
