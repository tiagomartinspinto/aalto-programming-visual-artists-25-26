# Maintaining This Course Repository

This repository is a static course archive. Keep each academic year self-contained, and prefer small, readable updates over broad redesigns during a live course.

## Regular Update Flow

1. Add or edit the course material.
2. Run `npm run build:index`.
3. Run `npm run check:site`.
4. Open the changed pages locally and scan the main course path.
5. When browser behavior changed, run `npm run smoke:browser` after installing Playwright, or manually test the same path on GitHub Pages.
6. Commit the content and generated index together.

## Adding a New Academic Year

1. Run `npm run new:year -- YYYY-YYYY`.
2. Add sessions, sketches, slides, and search metadata to `years/YYYY-YYYY/course-data.js`.
3. Add Lab files only after the year has browser sketches to edit; do not leave links to missing Lab pages.
4. Adjust `years/YYYY-YYYY/year.css` only for the new year's palette and local path label.
5. Keep original Processing/source material in `source/session-XX/`.
6. Keep slide decks in `slides/` using names like `session-01.pdf`.
7. Add `sessions/session-XX/` pages for weekly entry points.
8. Add browser sketches under `web/` only when they are useful companions to the Processing source.
9. Link the new year from the root `index.html` and `README.md`.
10. Run `npm run build:index` and `npm run check`.

The generator creates a blank year landing page with the same section order as existing years, `course-data.js`, `year.css`, and the expected content folders. It does not invent sessions, project text, Lab files, or root-page links; add those deliberately when the year is ready to publish.

## Adding a Session

Each session should include:

- a PDF slide deck in `slides/`
- source files or exercise folders in `source/session-XX/`
- a focused page in `sessions/session-XX/`
- optional web sketch companions under `web/`
- links from the year landing page and README

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

Keep media files when they are needed for public course pages or for self-contained source examples. Duplicate media can be acceptable when a single exercise folder should run without hunting for shared assets. See [MEDIA_INVENTORY.md](MEDIA_INVENTORY.md).

## What Not To Commit

Do not commit local scratch folders, operating-system metadata, generated temporary exports, private data, or unpublished third-party work. Keep large media only when it is needed for the public course site.

## Quality Checks

- `npm run build:index` regenerates `COURSE_INDEX.md`.
- `npm run check:site` checks local links, course data links, anchors, iframe titles, iframe sandboxing, PDF iframe permissions, image alt text, labeled controls, skip links, ARIA control targets, count labels, update markers, CSP tags, required privacy/security notes, external-link safety, private-file patterns, and typo-prone paths.
- `npm run check:assets` warns about unusually large PDFs, videos, images, SVGs, CSS, and JavaScript files.
- The Pages workflow runs both commands before deployment on pushes to `main`; the quality workflow runs them for pull requests and manual checks.
