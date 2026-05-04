# Maintaining This Course Repository

This repository is a static course archive. Keep each academic year self-contained, and prefer small, readable updates over broad redesigns during a live course.

## Regular Update Flow

1. Add or edit the course material.
2. Run `npm run build:index`.
3. Run `npm run check:site`.
4. Open the changed pages locally and scan the main student path.
5. Commit the content and generated index together.

## Adding a New Academic Year

1. Create `years/YYYY-YYYY/`.
2. Add a year `index.html`, `README.md`, `favicon.svg`, and `site-preview.svg`.
3. Keep session source material inside that year folder.
4. Add `sessions/session-XX/` pages for student-facing weekly entry points.
5. Add browser sketches under `web/` only when they are useful companions to the Processing source.
6. Link the new year from the root `index.html` and `README.md`.
7. Run the checks.

## Adding a Session

Each session should include:

- a PDF slide deck in `Session-XX/`
- source files or exercise folders in `Session-XX/`
- a focused page in `sessions/session-XX/`
- optional web sketch companions under `web/`
- links from the year landing page and README

## Adding Student Studies

Put local mirrored studies in `case-studies/` with a source file and attribution link when available. Keep one study per folder, and update the gallery data or markup at the same time.

## File Naming

Use readable lowercase paths with hyphens or underscores, and avoid typo-prone abbreviations in new material. If a path must change, update every link in the same commit and run `npm run check:site`.

## What Not To Commit

Do not commit local scratch folders, operating-system metadata, generated temporary exports, or private student data. Keep large media only when it is needed for the public course site.

## Quality Checks

- `npm run build:index` regenerates `COURSE_INDEX.md`.
- `npm run check:site` checks local links, anchors, iframe titles, image alt text, count labels, update markers, and typo-prone paths.
- The GitHub workflow runs both commands on pushes and pull requests.
