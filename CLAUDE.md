# Project conventions

A bilingual (cs/en) single-page portfolio. React 19 + TypeScript + Vite + Tailwind v4, animated with Motion, copy served by a small custom i18n layer (`src/translations.ts`, not i18next). No backend — all content is static. Hosted on Vercel, deployed from `main`.

## Commands

Node version: `.nvmrc` (`engines` in `package.json` must match). Install with `npm ci`.

| Task | Command |
| --- | --- |
| Dev server (port 5173) | `npm run dev` |
| Production build (runs `tsc -b` first) | `npm run build` |
| Lint + format check | `npm run lint` |
| Auto-fix lint + format | `npm run lint:fix` |
| Unit tests | `npm test` · watch: `npm run test:watch` · coverage: `npm run test:coverage` |
| E2E tests | `npm run test:e2e` (starts the dev server itself; CI runs `-- --project=chromium`) |
| Dead-code scan | `npm run deadcode` |

**Before considering work done:** `npm run lint`, `npm test`, `npm run build` and `npm run deadcode` must pass. Run `test:e2e` when touching `App.tsx`, `main.tsx`, navigation, language switching or section layout.

**Who enforces what:** CI (`.github/workflows/test.yml`) runs lint, `deadcode`, unit tests with coverage thresholds, chromium e2e and build. Vercel runs `npm run test:ci && npm run build` (`vercel.json`; keep `test:ci` defined). Plain `npm test` (and so Vercel's `test:ci`) does not check coverage thresholds; `npm run test:coverage` does. The Vercel project's Node version is set in its dashboard, not in the repo.

## Structure

```
src/
  components/
    layout/     Navbar, MobileMenu, Footer
    ui/         reusable pieces: Button, AnimatedHeading, LanguageSwitcher, LazyLottie, ToolIcon, ExperienceTimeline
    sections/   page sections: Home, Projects, WhatIDo, About, Contact, ScrollAnimation
  constants/    static config: motion timings, navigation, i18n languages
  data/         content arrays: projects, services, tools
  utils/        pure, unit-tested helpers (scrollAnimationPath, scatter)
  locales/      en/ + cs/ translation.json
  translations.ts  `useTranslation()`, `getFixedT()`, language store
  tests/        Vitest tests (components/ mirrors src/components, utils/ mirrors src/utils); utils.tsx = test helpers
e2e/            Playwright specs + utils/translations.ts
vite-plugin-*.ts  repo-root plugins that rewrite dist/index.html after build
```

## Conventions

- **Imports:** use the `@/` alias (→ `src/`) for cross-directory imports, e.g. `@/constants/motion`, `@/components/ui/Button`. Relative imports are fine only for same-directory or adjacent files (e.g. `data/` → `../assets/`).
- **Styling:** Tailwind utilities + CSS variables (defined in `src/index.css`). No static inline `style={{}}` (only genuinely dynamic values, e.g. a computed color). **No `!important`** — base element styles live in `@layer base` and shared classes in `@layer components` so utilities win naturally.
- **Colors:** never hardcode a hex/`rgba()` outside `src/index.css`. Colors are single-sourced as theme tokens; the brand accent and base dark are defined as RGB **channels** (`--accent-rgb`, `--dark-rgb`) so every variant derives from one place — e.g. `rgb(var(--accent-rgb) / 0.3)`, the Tailwind opacity modifier `border-accent/30`, or `fill-accent`. Motion animates to whole-value vars (`var(--btn-glow-primary)`), since it can't resolve a var nested inside a larger string.
- **Animation:** all timing/easing comes from `src/constants/motion.ts` (`TRANSITIONS`, `STAGGER`) for JS, and `--duration-*` tokens in `src/index.css` for CSS. Don't hardcode durations or cubic-bezier arrays in components.
- **Content & copy:** never hardcode user-facing strings — add them to `locales/{en,cs}/translation.json` (identical key trees) and read via `const { t } = useTranslation()` from `@/translations`. Lookup order: active language → `en` → the default-string argument → the key itself, so a missing key renders as the raw key. There is no interpolation or pluralization. Structured content lives in `data/` (keys and assets only, no text): project `key` → `projects.items.<key>`, service `key` → `whatIDo.services.<key>`.
- **Complex logic:** keep it pure and in `utils/` with unit tests (see `scrollAnimationPath.ts` / `computeScrollPhase`). Components should mostly wire data to markup.
- **Types:** no `any`/`unknown` in component or data code — prefer real types (e.g. `LottieAnimationData`). Strict TS is on, including `noUnusedLocals`/`noUnusedParameters`.
- **Tests:** under `src/tests/` mirroring the source tree; import `render` and `getTextInAnyLanguage` from `@/tests/utils` (the helper matches the cs or en text for a key), never `render` from Testing Library directly. Coverage thresholds: 95% lines/statements, 85% functions/branches (`vitest.config.ts`); `main.tsx`, `App.tsx` and `vite-plugin-*` are excluded and covered only by e2e.
- **Dead code:** `npm run deadcode` (knip) must stay clean. Don't add unused exports — keep helpers internal unless something imports them.
- **Formatting:** Biome owns formatting for `.ts/.tsx/.js/.jsx` only — never hand-format; run `npm run lint:fix`. It does not check JSON, CSS or Markdown.
- **Accessibility:** semantic elements + ARIA are expected. The two intentional a11y exceptions are scoped in `biome.json` overrides.
- **Build plugins:** `vite-plugin-critical-css.ts` and `vite-plugin-optimize-head.ts` regex-edit `dist/index.html` in `writeBundle`; they do nothing in dev. After changing `index.html` or the chunk config, `npm run build` and inspect `dist/index.html`.
- **Git:** Conventional Commits (`type(scope): lower-case subject`, e.g. `fix(navbar): …`, `chore(deps): …`); branches are `type/short-slug` (`chore/`, `refactor/`, `design/`, `seo/`).

## Agents (`.claude/agents/`)

- `content-publisher` — add/edit/remove a project, service or tool (data + assets + both locales).
- `i18n-guardian` — audit or fix cs/en key parity, missing or orphaned keys.
- `test-author` — write Vitest/Playwright tests after changing components.
- `perf-guardian` — review bundle, lazy loading and LCP when adding a section or dependency.
- `dependency-upgrader` — bump npm packages, Node, or GitHub Actions versions.

All of them follow the conventions above. There is no `AGENTS.md` or Cursor rules file: `CLAUDE.md` is the single source, and `.cursor/` only holds a plugin toggle.
