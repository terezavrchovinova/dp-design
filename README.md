# Portfolio

Bilingual (Czech / English) single-page portfolio for a graphic designer and video editor. It is a static site with no backend: all content lives in the repository.

## Stack

- [React 19](https://react.dev) + TypeScript
- [Vite](https://vite.dev) for dev server and build
- [Tailwind CSS v4](https://tailwindcss.com) with design tokens in `src/index.css`
- [Motion](https://motion.dev) for UI animation, `lottie-web` (light build, lazy-loaded) for the service icons
- A small built-in i18n layer (`src/translations.ts`) over `locales/{cs,en}/translation.json`
- [Biome](https://biomejs.dev) for lint and format, [Knip](https://knip.dev) for dead code
- [Vitest](https://vitest.dev) + Testing Library for unit tests, [Playwright](https://playwright.dev) for e2e
- Hosted on [Vercel](https://vercel.com) (Analytics and Speed Insights are loaded lazily in production only)

## Getting started

Requires Node.js 24 or newer (see `.nvmrc`).

```bash
npm ci
npm run dev
```

The dev server runs at <http://localhost:5173>.

## Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check (`tsc -b`) and build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Biome lint and format check |
| `npm run lint:fix` | Apply Biome fixes and formatting |
| `npm test` | Run unit tests once (`test:watch`, `test:ui`, `test:coverage` also available) |
| `npm run test:ci` | Unit tests for CI; the Vercel build runs this before `build` |
| `npm run test:e2e` | Run Playwright specs on all configured browsers (starts the dev server itself) |
| `npm run deadcode` | Find unused files, exports and dependencies |

Before opening a PR, `lint`, `test`, `build` and `deadcode` should all pass. Run `test:e2e` if you touched a section, navigation or animation code. Biome owns formatting, so run `lint:fix` instead of formatting by hand.

## Project structure

```
src/
  components/
    layout/      Navbar, MobileMenu, Footer
    ui/          Button, AnimatedHeading, LanguageSwitcher, LazyLottie, ToolIcon, ExperienceTimeline
    sections/    Home, ScrollAnimation, Projects, WhatIDo, About, Contact
  constants/     motion timings, navigation, supported languages
  data/          content arrays: projects, services, tools
  locales/       cs/ and en/ translation.json
  utils/         pure, unit-tested helpers (scroll animation maths, letter scatter)
  tests/         Vitest tests, mirroring the source tree
  translations.ts  translation lookup and language store
e2e/             Playwright specs
```

Two Vite plugins in the repo root (`vite-plugin-critical-css.ts`, `vite-plugin-optimize-head.ts`) post-process `dist/index.html`.

## Editing content

- **Copy:** edit `src/locales/cs/translation.json` and `src/locales/en/translation.json`. Keep both files in step; a missing key falls back to English and then to the key itself.
- **Projects:** add an entry to `src/data/projects.ts` (thumbnails in `src/assets/project_thumbnails/{desktop,mobile}/`) and a matching title under `projects.items.<key>` in both locale files.
- **Services and tools:** `src/data/services.ts` (Lottie icon plus `whatIDo.services.<key>` copy) and `src/data/tools.ts`.
- **Adding a language:** add a `translation.json`, register it in `src/translations.ts`, and add it to `LANGUAGES` in `src/constants/languages.ts`.

## Conventions

- Use the `@/` alias for imports across directories.
- Style with Tailwind utilities and the tokens in `src/index.css`; no hardcoded colors outside that file, no `!important`.
- Take animation timing and easing from `src/constants/motion.ts`.
- Do not hardcode user-facing strings; add them to both locale files.
- Keep non-trivial logic in `utils/` as pure functions with tests.
- Coverage thresholds: 95% lines and statements, 85% functions and branches.

More detail is in [`CLAUDE.md`](CLAUDE.md).

## Performance

- Below-the-fold sections (`Projects`, `WhatIDo`, `About`, `Contact`) are lazy-loaded.
- Vendor code is split into separate chunks for React, Motion and Lottie; Analytics and Speed Insights stay in their own lazy chunks.
- Critical CSS is inlined and the rest loaded asynchronously.
- Project images are WebP, with separate mobile and desktop sources.
- `console.*` calls are stripped from production builds.

## Deployment and CI

- **Vercel** builds with `npm run test:ci && npm run build`, so failing unit tests block a deploy.
- **GitHub Actions** (`.github/workflows/test.yml`) runs lint, unit tests, Chromium e2e and the build on pushes and PRs to `main`.
- Dependabot opens dependency update PRs.

## License

Private and proprietary. All rights reserved.
