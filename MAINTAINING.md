# Maintaining This Course Repository

This repository is a static course archive. Keep each academic year self-contained, and prefer small, readable updates over broad redesigns during a live course.

## Regular Update Flow

1. Add or edit the course material.
2. Run `npm run build:index`.
3. Run `npm run check:site`.
4. Open the changed pages locally and scan the main course participant path.
5. Commit the content and generated index together.

## Adding a New Academic Year

1. Run `npm run new:year -- YYYY-YYYY`.
2. Add sessions, sketches, slides, and search metadata to `years/YYYY-YYYY/course-data.js`.
3. Keep original Processing/source material in `source/session-XX/`.
4. Keep slide decks in `slides/` using names like `session-01.pdf`.
5. Add `sessions/session-XX/` pages for course participant-facing weekly entry points.
6. Add browser sketches under `web/` only when they are useful companions to the Processing source.
7. Link the new year from the root `index.html` and `README.md`.
8. Run the checks.

## Adding a Session

Each session should include:

- a PDF slide deck in `slides/`
- source files or exercise folders in `source/session-XX/`
- a focused page in `sessions/session-XX/`
- optional web sketch companions under `web/`
- links from the year landing page and README

## Adding Removed coursework

Put local removed copyed coursework in `case-coursework/` with a source file and attribution link when available. Keep one coursework per folder, and update the coursework listing data or markup at the same time.

Course participant work stays public when committed here. Do not removed copy unpublished work, grades, feedback notes, course participant email addresses, or private university material. If a coursework comes from removed-source-host, keep the original removed-source-host link visible for attribution and backup.

## File Naming

Use readable lowercase paths with hyphens or underscores, and avoid typo-prone abbreviations in new material. If a path must change, update every link in the same commit and run `npm run check:site`.

Keep the main year page split into:

- `index.html` for page structure
- `year.css` for year-specific visual skin
- `course-data.js` for sessions, sketches, slides, tags, difficulty, duration, and related-material metadata
- `../../assets/year.js` for reusable rendering and interactions

## Local Sync

If your local checkout is stale or dirty, do not force-reset it until you have saved any local work you care about.

1. Run `git status`.
2. Commit, stash, or copy aside any local changes you want to keep.
3. Run `git fetch origin main`.
4. Use `git pull --ff-only` only when the checkout is clean and can fast-forward.
5. If the local folder is too tangled, re-clone the repository into a fresh folder instead of copying old assets back into `main`.

## Media Policy

Keep media files when they are needed for public course pages or for self-contained source examples. Duplicate media can be acceptable when course participants need to download a single exercise folder and run it without hunting for shared assets. See [MEDIA_INVENTORY.md](MEDIA_INVENTORY.md).

## What Not To Commit

Do not commit local scratch folders, operating-system metadata, generated temporary exports, or private course participant data. Keep large media only when it is needed for the public course site.

## Quality Checks

- `npm run build:index` regenerates `COURSE_INDEX.md`.
- `npm run check:site` checks local links, course data links, anchors, iframe titles, image alt text, labeled controls, skip links, ARIA control targets, count labels, update markers, external-link safety, private-file patterns, and typo-prone paths.
- `npm run check:assets` warns about unusually large PDFs, videos, images, SVGs, CSS, and JavaScript files.
- The Pages workflow runs both commands before deployment on pushes to `main`; the quality workflow runs them for pull requests and manual checks.
