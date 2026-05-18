# Project Status

## Copyright And Security Cleanup

This repository has been cleaned for public portfolio use. The visible site, generated indexes, navigation, local Git history, and `main` branch on GitHub no longer reference the removed coursework pages or copied source paths. Student works have been removed from this public portfolio. Copyright remains with the students.

## Current Tree Cleanup Completed

- Removed public gallery routes, year-page sections, route-list links, search entries, and counts that pointed to third-party coursework.
- Removed gallery/count handling from `tools/build-course-index.mjs`, `tools/check-site.mjs`, and `tools/new-year.mjs`.
- Rebuilt `COURSE_INDEX.md` after removing the public coursework routes.
- Updated `README.md`, `COURSE_INDEX.md`, `MEDIA_INVENTORY.md`, `PREVIEW_MANIFEST.md`, `PROJECT_STATUS.md`, `MAINTAINING.md`, `CHANGELOG.md`, `SECURITY.md`, `ARCHITECTURE.md`, and year-level pages/docs.
- Deleted all tracked files under:
  - `years/2024-2025/case-studies/`
  - `years/2025-2026/case-studies/`
- Deleted the copied assignment source files:
  - `years/2024-2025/source/assignments/study1_interaction_example.pde`
  - `years/2024-2025/source/assignments/study2_generative_grid_example.pde`

## Homepage UX Cleanup

- Removed the duplicate bottom homepage links labeled `Open 2025-2026` and `Open 2024-2025`.
- Kept the top navigation and Course Directory links as the two remaining year-entry points.
- Made the Course Directory year links the primary homepage action with descriptive `aria-label` values and visible `[OPEN]` affordances.
- Added matching hover and focus-visible states for the directory links while keeping the monochrome terminal visual identity.
- Verified the homepage locally in a browser at `http://127.0.0.1:8765/index.html`.
- Checks run after the change:
  - `node tools/check-site.mjs` - passed.
  - `node tools/check-assets.mjs` - passed.
  - `git diff --check` - no whitespace errors; Git reported expected CRLF normalization warnings.

## History Rewrite Completed

- Tool used: `git-filter-repo` 2.47.0.
- Rewrote local history with path purges for:
  - `case-studies/`
  - `years/2024-2025/case-studies/`
  - `years/2025-2026/case-studies/`
  - `Assigments/study1_example/`
  - `Assigments/study1_interaction_example.pde`
  - `Assigments/study2_example/`
  - `Assigments/study2_generative_grid_example.pde`
  - `years/2024-2025/Assignments/study1_interaction_example.pde`
  - `years/2024-2025/Assignments/study2_generative_grid_example.pde`
  - `years/2024-2025/source/assignments/study1_interaction_example.pde`
  - `years/2024-2025/source/assignments/study2_generative_grid_example.pde`
- Rewrote remaining historical blobs to scrub old route names, `source.txt` links, OpenProcessing references, gallery wording, mirror wording, and known personal-name slugs connected to removed coursework.
- Force-pushed rewritten `main` from old remote SHA `0efe7b6ed197b95fade88fd934a8c7c5a76a816e` to cleaned SHA `fc0d9a46f052c8220f136919e0c25cbb0c22faef`.

## Checks Run

- `node tools/build-course-index.mjs`
- `node tools/check-site.mjs` - passed.
- `node tools/check-assets.mjs` - passed.
- `git diff --check` - no whitespace errors; Git reported expected CRLF normalization warnings.
- Current-tree content scan for `student`, `students`, `study`, `studies`, `case-study`, `case-studies`, `OpenProcessing`, `source.txt`, `mirror`, and `gallery`.
- Tracked-path scan with `git ls-files` for the same terms.
- Rewritten-history filename scan with `git log --all --name-only`.
- Rewritten-history content scan with `git grep` across every commit, excluding bundled p5 vendor files.
- GitHub current-tree scan through `gh api repos/tiagomartinspinto/aalto-programming-visual-artists/git/trees/main?recursive=1`.
- GitHub content API checks returned 404 for:
  - `case-studies/`
  - `years/2024-2025/case-studies/`
  - `years/2025-2026/case-studies/`

## Remaining Risks

- GitHub still returned the old pre-rewrite commit SHA directly immediately after the force-push. That commit is no longer reachable from `main`, but GitHub can retain unreachable objects and cached views until server-side cleanup completes.
- Forks, local clones, downloaded archives, browser caches, search-engine caches, and other copies outside this repository cannot be rewritten from this checkout.
- For a strict legal/security purge, request GitHub Support to remove cached views and garbage-collect unreachable objects for the old SHAs.
