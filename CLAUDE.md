# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Single-page portfolio website for graphic designer/video editor Daniela Plamínková. React 19 + TypeScript + Vite, deployed on Vercel. Bilingual (Czech default, English fallback) and heavily performance-optimized.

## Commands

```bash
npm run dev              # Dev server at http://localhost:5173
npm run build            # Type-check (tsc -b) then production build
npm run lint             # Biome check (lint + format, no writes) — run before committing
npm run lint:fix         # Biome check with --write (autofix + organize imports)

npm run test             # Vitest unit/integration (run once)
npm run test:watch       # Vitest watch mode
npm run test:coverage    # With coverage (enforced thresholds, see below)
npm run test:e2e         # Playwright e2e (all browsers; auto-starts dev server)
npm run test:all         # Unit + e2e
```

Run a single unit test: `npx vitest run src/tests/components/Navbar.test.tsx`
Run a single e2e test: `npx playwright test e2e/home.spec.ts --project=chromium`

## Architecture

**Single-page app, no router.** `src/App.tsx` renders all sections in order (Home → ScrollAnimation → Projects → WhatIDo → About → Contact). Navigation is in-page scroll/anchors, not route changes.

**Aggressive lazy loading drives the structure.** Above-the-fold (`Home`, `Navbar`, `MobileMenu`, `Footer`) is eager; everything below the fold is `React.lazy` + `Suspense` in `App.tsx`. Lottie animations go through `src/components/LazyLottie.tsx`, which dynamically imports `lottie-react` and handles a CJS interop quirk (component may be nested at `default.default` on Vite 8+). When adding a heavy section or animation, follow this lazy pattern rather than importing it statically.

**Manual vendor chunking** is configured in `vite.config.ts` (`manualChunks`): lottie, motion, react, i18n, and analytics are each isolated into their own chunk for caching/lazy-loading. Adding a large dependency may warrant a new chunk rule here.

**Content is data-driven, copy is translation-driven.** Structural data lives in `src/data/` (`projects.ts`, `services.ts`, `tools.ts`) — these hold IDs, image imports, and `key` fields but NOT display text. The `key` maps into translation JSON. All user-facing strings live in `src/locales/{cs,en}/translation.json` and are read via `react-i18next`'s `useTranslation`. To add/change a project: add an entry in `src/data/projects.ts` (with WebP thumbnails under `src/assets/project_thumbnails/{desktop,mobile}/`) AND add its text under the matching key in both locale files.

**i18n** (`src/i18n.ts`): default `cs`, fallback `en`, Suspense disabled. Imported once for side effects at the top of `App.tsx`.

## Custom build plugins

Two local Vite plugins run at build time (`vite.config.ts`):

- `vite-plugin-critical-css.ts` — inlines critical CSS, loads the rest async (improves LCP).
- `vite-plugin-optimize-head.ts` — injects preconnect/preload into `dist/index.html`.

`vite-plugin-remove-console` strips all console calls from production builds. Production minify is esbuild, sourcemaps are off.

## Conventions

- **Styling**: Tailwind CSS v4 (via `@tailwindcss/vite`), utility classes in JSX. The `xl` breakpoint is 1280px; the desktop-only `ScrollAnimation` is gated behind `hidden xl:block`.
- **Animations**: `motion` (Framer Motion) for transitions; Lottie for vector animations (icon `.json` files in `src/assets/icons/`).
- **Biome** formats with single quotes, no semicolons, 2-space indent, 100-char lines, ES5 trailing commas, and organizes imports. Match this — don't add semicolons.
- **Tests** mirror source under `src/tests/components/`. Use `src/tests/utils.tsx` for the custom render (wraps providers). e2e specs live in `e2e/`.

## Coverage & CI

Coverage thresholds are enforced (`vitest.config.ts`): 95% lines/statements, 85% functions/branches. `App.tsx`, `main.tsx`, and `i18n.ts` are excluded (covered via e2e). New components generally need tests to keep coverage green.

CI (`.github/workflows/test.yml`, on push/PR to `main`): lint → unit tests → e2e (chromium only, 4 workers) → build. Vercel's build command (`vercel.json`) runs `test:ci` (unit tests) before `build`, so a failing unit test blocks deployment.
