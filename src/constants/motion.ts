export const EASE_OUT_QUART = [0.25, 1, 0.5, 1] as const

export const DEFAULT_TRANSITION = { duration: 0.4, ease: EASE_OUT_QUART }

export const FADE_IN_UP = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.4, ease: EASE_OUT_QUART },
} as const
