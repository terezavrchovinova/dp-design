# Project conventions

A bilingual (cs/en) single-page portfolio. React 19 + TypeScript + Vite + Tailwind v4, animated with Motion, content driven by i18next. No backend — all content is static.

## Commands

| Task | Command |
| --- | --- |
| Dev server | `npm run dev` |
| Production build (runs `tsc -b` first) | `npm run build` |
| Lint + format check | `npm run lint` |
| Auto-fix lint + format | `npm run lint:fix` |
| Unit tests | `npm test` · watch: `npm run test:watch` · coverage: `npm run test:coverage` |
| E2E tests | `npm run test:e2e` |
| Dead-code scan | `npm run deadcode` |

**Before considering work done:** `npm run lint`, `npm test`, and `npm run build` must all pass. Biome owns formatting — never hand-format; run `npm run lint:fix`.

## Structure

```
src/
  components/
    layout/     Navbar, MobileMenu, Footer
    ui/         reusable pieces: Button, AnimatedHeading, LanguageSwitcher, LazyLottie, ToolIcon, ExperienceTimeline
    sections/   page sections: Home, Projects, WhatIDo, About, Contact, ScrollAnimation
  constants/    static config: motion timings, navigation, contact, i18n languages
  data/         content arrays: projects, services, tools
  hooks/        custom hooks (useInViewOnce)
  utils/        pure, unit-tested helpers (scrollAnimationPath, scatter)
  locales/      en/ + cs/ translation.json
  tests/        Vitest unit tests, mirroring the components/ tree
e2e/            Playwright specs
```

## Conventions

- **Imports:** use the `@/` alias (→ `src/`) for cross-directory imports, e.g. `@/constants/motion`, `@/components/ui/Button`. Relative imports are fine only for same-directory or adjacent files (e.g. `data/` → `../assets/`).
- **Styling:** Tailwind utilities + CSS variables (defined in `src/index.css`). No static inline `style={{}}` (only genuinely dynamic values, e.g. a computed color). **No `!important`** — base element styles live in `@layer base` and shared classes in `@layer components` so utilities win naturally.
- **Colors:** never hardcode a hex/`rgba()` outside `src/index.css`. Colors are single-sourced as theme tokens; the brand accent and base dark are defined as RGB **channels** (`--accent-rgb`, `--dark-rgb`) so every variant derives from one place — e.g. `rgb(var(--accent-rgb) / 0.3)`, the Tailwind opacity modifier `border-accent/30`, or `fill-accent`. Motion animates to whole-value vars (`var(--btn-glow-primary)`), since it can't resolve a var nested inside a larger string.
- **Animation:** all timing/easing comes from `src/constants/motion.ts` (`TRANSITIONS`, `STAGGER`). Don't hardcode durations or cubic-bezier arrays in components.
- **Content & copy:** never hardcode user-facing strings — add them to `locales/{en,cs}/translation.json` and read via `useTranslation`. Structured content lives in `data/`.
- **Complex logic:** keep it pure and in `utils/` with unit tests (see `scrollAnimationPath.ts` / `computeScrollPhase`). Components should mostly wire data to markup.
- **Types:** no `any`/`unknown` in component or data code — prefer real types (e.g. `LottieAnimationData`). Strict TS is on, including `noUnusedLocals`/`noUnusedParameters`.
- **Tests:** co-located under `src/tests/` mirroring the source tree; use the `@/tests/utils` render helper and `getTextInAnyLanguage` for language-agnostic assertions. Coverage thresholds: 95% lines/statements, 85% functions/branches.
- **Dead code:** `npm run deadcode` (knip) must stay clean. Don't add unused exports — keep helpers internal unless something imports them.
- **Accessibility:** semantic elements + ARIA are expected. The two intentional a11y exceptions are scoped in `biome.json` overrides.
