# Project Status

## Copyright And Security Cleanup

This repository is being cleaned for public portfolio use. The current tree removes unpublished third-party coursework from public pages, generated indexes, data files, and navigation. Copyright remains with the original creators.

## Current-Tree Cleanup Steps

- Deleted the year-level coursework coursework listing directories:
  - `years/2024-2025/case-coursework/`
  - `years/2025-2026/case-coursework/`
- Deleted related copied source files:
  - `years/2024-2025/source/assignments/coursework1_interaction_example.pde`
  - `years/2024-2025/source/assignments/coursework2_generative_grid_example.pde`
- Removed public navigation, route-list links, search filters, counts, and year-page sections that pointed to those materials.
- Removed coursework listing/count handling from `tools/build-course-index.mjs`, `tools/check-site.mjs`, and `tools/new-year.mjs`.
- Rebuilt `COURSE_INDEX.md` after the deletion.
- Updated repository docs and public-content warnings.

## Checks To Run

- `npm run build:index`
- `npm run check`
- `npm run smoke:browser` when Playwright browser binaries are available
- tracked-file scans for the requested copyright/privacy terms
- `git log --all --name-only` after history rewrite

## History Rewrite Plan

The history rewrite must purge removed coursework paths from all commits before force-pushing `main`. Planned purge paths include:

- `years/2024-2025/case-coursework/`
- `years/2025-2026/case-coursework/`
- `years/2024-2025/source/assignments/coursework1_interaction_example.pde`
- `years/2024-2025/source/assignments/coursework2_generative_grid_example.pde`

Generated files and docs that previously mentioned the removed material are being rewritten in the current tree and scanned after the purge.

## Remaining Risks

- GitHub Pages and browser caches may keep stale files briefly after force-push and redeploy.
- Forks, local clones, search-engine caches, and downloaded copies outside this repository cannot be rewritten from here.
- GitHub may retain unreachable objects for a short period after a force-push until server-side cleanup completes.
