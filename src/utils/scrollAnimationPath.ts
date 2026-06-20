/** Math + SVG path helpers for the desktop "chaos → solution" scroll animation. */

export function clamp(v: number, a: number, b: number) {
  return Math.min(Math.max(v, a), b)
}

/** Linear interpolation between `a` and `b` by factor `t` (0–1). */
export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t
}

/** Ease-in-out curve used to smooth scroll progress. */
export function ease(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t
}

/**
 * Builds the SVG path for the "chaos" line. As `t` goes 0 → 1 the wave
 * amplitude collapses toward a straight horizontal line.
 */
export function buildChaosPath(t: number): string {
  const MID = 90
  const amp = 1 - t

  const pts: [number, number][] = [
    [40, MID],
    [140, MID - 38 * amp],
    [230, MID + 28 * amp],
    [340, MID - 42 * amp],
    [450, MID + 22 * amp],
    [560, MID - 30 * amp],
    [680, MID + 18 * amp],
    [770, MID - 12 * amp],
    [820, MID],
  ]

  let d = `M ${pts[0][0]} ${pts[0][1]}`
  for (let i = 1; i < pts.length; i++) {
    const prev = pts[Math.max(0, i - 2)]
    const curr = pts[i - 1]
    const next = pts[i]
    const next2 = pts[Math.min(pts.length - 1, i + 1)]

    const dx1 = (next[0] - prev[0]) * 0.25
    const dy1 = (next[1] - prev[1]) * 0.25
    const dx2 = (next2[0] - curr[0]) * 0.25
    const dy2 = (next2[1] - curr[1]) * 0.25

    const cp1x = curr[0] + dx1
    const cp1y = curr[1] + dy1
    const cp2x = next[0] - dx2
    const cp2y = next[1] - dy2

    d += ` C ${cp1x} ${cp1y} ${cp2x} ${cp2y} ${next[0]} ${next[1]}`
  }
  return d
}

/* ── SVG geometry (shared between the component's markup and phase maths) ── */
export const SVG_VIEWBOX = '0 0 860 180'
/** The straight "solution" line drawn left-to-right as the chaos collapses. */
export const CLEAN_PATH_D = 'M 40 90 C 280 90 580 90 820 90'
/** End point of the line, where the dot + glow appear. */
export const END_POINT = { x: 820, y: 90 } as const

/* ── Scroll-progress thresholds (0–1) and animation tuning constants ── */
const PHASE2_START = 0.35 // chaos fully collapsed; the clean line starts drawing
const PHASE1_TO_2_AT = 0.15 // label switches from phase 1 → phase 2
const CHAOS_FADE_SPAN = 0.15 // how quickly the chaos line fades out after PHASE2_START
const CHAOS_MIN_OPACITY = 0.08 // faint residual chaos behind the solution
const CLEAN_FADE_SPAN = 0.08 // how quickly the clean line fades in after PHASE2_START
const CLEAN_DRAW_START = 0.4 // progress at which the clean line begins drawing
const CLEAN_DRAW_SPAN = 0.35 // progress span over which the clean line fully draws
const DOT_REVEAL_AT = 0.88 // draw fraction at which the end dot starts to appear
const DOT_REVEAL_SPAN = 0.12 // remaining draw fraction over which the dot grows
const DOT_MAX_RADIUS = 5
const GLOW_MAX_RADIUS = 18
const GLOW_OVERLAY_START = 0.55 // progress at which the ambient glow fades in
const GLOW_OVERLAY_SPAN = 0.15
/** Neutral gray for the unresolved "chaos" line. */
export const CHAOS_STROKE = 'var(--color-chaos-stroke)'

/** Phase labels are returned as i18n keys so this stays free of translation concerns. */
export type PhaseLabelKey = 'phase1' | 'phase2' | 'phase3'
export type SubLabelKey = 'sub1' | 'sub2' | 'sub3'

const COLORS = {
  phase1: 'var(--color-white)',
  phase2: 'var(--color-gray-light)',
  phase3: 'var(--color-accent)',
  sub1: 'var(--color-gray)',
  sub2: 'var(--color-gray-mid)',
  sub3: 'var(--color-accent)',
} as const

/** A fully-resolved snapshot of every animated value for a given scroll progress. */
export interface ScrollPhase {
  /** SVG `d` for the chaotic line. */
  chaosPath: string
  chaosOpacity: number
  chaosStroke: string
  /** Fraction of the clean line drawn, 0 (hidden) → 1 (complete). */
  cleanDrawProgress: number
  cleanOpacity: number
  dotRadius: number
  glowRadius: number
  glowOverlayOpacity: number
  labelKey: PhaseLabelKey
  subKey: SubLabelKey
  phaseColor: string
  subColor: string
  subOpacity: number
}

/**
 * Pure mapping from scroll progress (0–1) to every animated value of the
 * "chaos → solution" sequence. Kept side-effect free so it can be unit-tested
 * and so the component is reduced to applying these values to the DOM.
 */
export function computeScrollPhase(progress: number): ScrollPhase {
  const p = clamp(progress, 0, 1)

  // Phase 1: the chaotic line is still settling; nothing else is visible yet.
  if (p < PHASE2_START) {
    const isEarly = p < PHASE1_TO_2_AT
    return {
      chaosPath: buildChaosPath(ease(p / PHASE2_START)),
      chaosOpacity: 1,
      chaosStroke: CHAOS_STROKE,
      cleanDrawProgress: 0,
      cleanOpacity: 0,
      dotRadius: 0,
      glowRadius: 0,
      glowOverlayOpacity: 0,
      labelKey: isEarly ? 'phase1' : 'phase2',
      subKey: isEarly ? 'sub1' : 'sub2',
      phaseColor: isEarly ? COLORS.phase1 : COLORS.phase2,
      subColor: isEarly ? COLORS.sub1 : COLORS.sub2,
      subOpacity: 1,
    }
  }

  // Phase 2/3: chaos fades to a faint residue while the clean line draws in.
  const fadeChaos = ease(clamp((p - PHASE2_START) / CHAOS_FADE_SPAN, 0, 1))
  const drawT = ease(clamp((p - CLEAN_DRAW_START) / CLEAN_DRAW_SPAN, 0, 1))
  const cleanOpacity = lerp(0, 1, ease(clamp((p - PHASE2_START) / CLEAN_FADE_SPAN, 0, 1)))

  const dotRevealed = drawT > DOT_REVEAL_AT
  const dotT = dotRevealed ? (drawT - DOT_REVEAL_AT) / DOT_REVEAL_SPAN : 0

  return {
    chaosPath: buildChaosPath(1),
    chaosOpacity: lerp(1, CHAOS_MIN_OPACITY, fadeChaos),
    chaosStroke: CHAOS_STROKE,
    cleanDrawProgress: drawT,
    cleanOpacity,
    dotRadius: dotRevealed ? lerp(0, DOT_MAX_RADIUS, dotT) : 0,
    glowRadius: dotRevealed ? lerp(0, GLOW_MAX_RADIUS, dotT) : 0,
    glowOverlayOpacity: lerp(0, 1, ease(clamp((p - GLOW_OVERLAY_START) / GLOW_OVERLAY_SPAN, 0, 1))),
    labelKey: 'phase3',
    subKey: 'sub3',
    phaseColor: COLORS.phase3,
    subColor: COLORS.sub3,
    subOpacity: drawT,
  }
}
