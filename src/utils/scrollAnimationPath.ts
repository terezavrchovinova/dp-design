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
