# Programming for Visual Artists

[![Check course site](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/quality.yml/badge.svg)](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/quality.yml)
[![Deploy course site to GitHub Pages](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/pages.yml/badge.svg)](https://github.com/tiagomartinspinto/aalto-programming-visual-artists/actions/workflows/pages.yml)

Aalto University course materials maintained by Tiago Martins Pinto.

This repository is organized by school year so course readers can find sessions, sketches, slides, and examples in one course home.

**Authorship and responsibility:** This site and its course materials are authored and maintained by Tiago Martins Pinto. The materials may be used in teaching at Aalto University, but this is a personal teaching portfolio and course archive, not an official Aalto University publication. Responsibility for the content rests with the author.

**Public repository warning:** This repository is public. Do not commit grades, unpublished third-party work, personal data, or internal university material. GitHub Pages exposes all committed site content publicly.

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

When adding a new school year, use the generator to create the folder scaffold, then add only the real course content and link it from the root `index.html`.

## Maintenance

- Read [MAINTAINING.md](MAINTAINING.md) before adding a new year, session, or sketch.
- Start a new course folder with `npm run new:year -- YYYY-YYYY`; it creates the standard archive page, stylesheet, data file, and content folders without copying old session metadata or live links.
- Run `npm run build:index` after changing course material.
- Run `npm run check` before pushing. It checks generated indexes, local links, course data links, anchors, accessibility labels, visible counts, update markers, typo-prone paths, private-file patterns, and asset-size warnings.
- Run `npm run smoke:browser` for a browser smoke test after installing Playwright locally. Set `PVA_SITE_URL` to test GitHub Pages instead of a local server.
- Keep local scratch files, private exports, and operating-system metadata out of the repository.

## Attribution And Licensing

Reused examples and teaching libraries should stay attributed in the relevant page, source folder, or maintenance notes. Prefer local copies of teaching libraries when they are needed for a stable classroom experience.

## Publishing

GitHub Pages publishes the static site from `main`. The quality workflow checks the repository before deployment work continues.
