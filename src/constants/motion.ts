const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

// JS animation timing lives here; CSS hover/transition durations live as
// `--duration-*` tokens in src/index.css. Keep the two scales conceptually aligned.

/** Shared motion transitions — the single source of truth for entrance/interaction timing. */
export const TRANSITIONS = {
  /** Standard entrance (0.4s). */
  default: { duration: 0.4, ease: EASE_OUT_QUART },
  /** Quick interaction feedback, e.g. button/icon hover (0.15s). */
  fast: { duration: 0.15, ease: 'easeOut' },
  /** Slower, more deliberate entrance (0.5s). */
  slow: { duration: 0.5, ease: EASE_OUT_QUART },
  /** Long, playful "scatter" settle for the interactive heading (1s). */
  scatter: { duration: 1, ease: EASE_OUT_QUART },
} as const

/** Per-item delay (seconds) for staggered list/grid entrance animations. */
export const STAGGER = {
  projects: 0.06,
  services: 0.08,
  tools: 0.05,
  timeline: 0.08,
} as const

/** Convenience alias for the standard transition (widely used across components). */
export const DEFAULT_TRANSITION = TRANSITIONS.default

/** Shared `viewport` configs for `whileInView` entrances (trigger once). */
export const VIEWPORT = { once: true, margin: '-50px' } as const
export const VIEWPORT_CLOSE = { once: true, margin: '-30px' } as const

/** "Fade up into view" entrance props — spread onto a motion element. y defaults to 20. */
export const fadeUp = (y = 20) =>
  ({
    initial: { opacity: 0, y },
    whileInView: { opacity: 1, y: 0 },
  }) as const
