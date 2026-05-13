# Programming for Visual Artists

[![Check course site](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/quality.yml/badge.svg)](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/quality.yml)
[![Deploy course site to GitHub Pages](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/pages.yml/badge.svg)](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/pages.yml)

Aalto University course materials maintained by Tiago Martins Pinto.

This repository is organized by school year so course participants can find sessions, sketches, slides, examples, and course participant work in one course home.

**Public repository warning:** This repository is public. Do not commit grades, unpublished course participant work, personal data, or internal university material. GitHub Pages exposes all committed site content publicly.

Live site: [tiagomartinspinto.github.io/aalto-programming-visual-artists](https://tiagomartinspinto.github.io/aalto-programming-visual-artists/)

## School Years

- [2025-2026](years/2025-2026/)
- [2024-2025](years/2024-2025/)
- [Generated course index](COURSE_INDEX.md)
- [Architecture overview](ARCHITECTURE.md)
- [Security and public-content guidance](SECURITY.md)
- [Preview manifest](PREVIEW_MANIFEST.md)
- [Changelog](CHANGELOG.md)
- [Media inventory](MEDIA_INVENTORY.md)

## Structure

Each school year should stay self-contained:

```text
years/
  2025-2026/
  2024-2025/
```

When adding a new school year, create a new folder inside `years/`, add a year landing page, and link it from the root `index.html`.

## Maintenance

- Read [MAINTAINING.md](MAINTAINING.md) before adding a new year, session, sketch, or removed coursework.
- Start a new course folder with `npm run new:year -- YYYY-YYYY`.
- Run `npm run build:index` after changing course material.
- Run `npm run check` before pushing. It checks generated indexes, local links, course data links, anchors, accessibility labels, visible counts, update markers, typo-prone paths, private-file patterns, and asset-size warnings.
- Run `npm run smoke:browser` for a browser smoke test after installing Playwright locally. Set `PVA_SITE_URL` to test GitHub Pages instead of a local server.
- Keep local scratch files, private exports, and operating-system metadata out of the repository.

## Attribution And Licensing

Removed coursework removed copyed from removed-source-host remain course participant work and should keep local source files plus original removed-source-host links for attribution. Reused examples and teaching libraries should stay attributed in the relevant page, source folder, or maintenance notes. Prefer local copies of teaching libraries when they are needed for a stable classroom experience.

## Publishing

GitHub Pages publishes the static site from `main`. The quality workflow checks the repository before deployment work continues.
