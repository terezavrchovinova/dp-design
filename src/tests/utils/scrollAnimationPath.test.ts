import { describe, expect, it } from 'vitest'
import { buildChaosPath, clamp, computeScrollPhase, ease, lerp } from '@/utils/scrollAnimationPath'

describe('clamp', () => {
  it('returns the value when within range', () => {
    expect(clamp(5, 0, 10)).toBe(5)
  })
  it('clamps to the minimum', () => {
    expect(clamp(-3, 0, 10)).toBe(0)
  })
  it('clamps to the maximum', () => {
    expect(clamp(42, 0, 10)).toBe(10)
  })
})

describe('lerp', () => {
  it('returns the start at t=0', () => {
    expect(lerp(0, 100, 0)).toBe(0)
  })
  it('returns the end at t=1', () => {
    expect(lerp(0, 100, 1)).toBe(100)
  })
  it('interpolates at the midpoint', () => {
    expect(lerp(0, 100, 0.5)).toBe(50)
  })
})

describe('ease', () => {
  it('is 0 at t=0', () => {
    expect(ease(0)).toBe(0)
  })
  it('is 1 at t=1', () => {
    expect(ease(1)).toBe(1)
  })
  it('uses the accelerating branch below 0.5', () => {
    expect(ease(0.25)).toBeCloseTo(0.125)
  })
  it('uses the decelerating branch at/above 0.5', () => {
    expect(ease(0.75)).toBeCloseTo(0.875)
  })
})

describe('buildChaosPath', () => {
  it('starts at the left anchor point', () => {
    expect(buildChaosPath(0).startsWith('M 40 90')).toBe(true)
  })
  it('uses cubic bezier segments', () => {
    expect(buildChaosPath(0)).toContain('C')
  })
  it('changes shape as amplitude collapses (t=0 vs t=1)', () => {
    expect(buildChaosPath(0)).not.toBe(buildChaosPath(1))
  })
  it('flattens to the midline (y=90) at t=1', () => {
    // The first curve's anchor is [140, 90 - 38 * amp]: displaced at t=0, on the
    // midline at t=1 when amplitude is zero.
    expect(buildChaosPath(0)).toContain('140 52')
    expect(buildChaosPath(1)).toContain('140 90')
  })
})

describe('computeScrollPhase', () => {
  it('shows phase 1 at the very start (progress 0)', () => {
    const phase = computeScrollPhase(0)
    expect(phase.labelKey).toBe('phase1')
    expect(phase.subKey).toBe('sub1')
    expect(phase.chaosOpacity).toBe(1)
    expect(phase.cleanDrawProgress).toBe(0)
    expect(phase.cleanOpacity).toBe(0)
    expect(phase.dotRadius).toBe(0)
    expect(phase.glowRadius).toBe(0)
    expect(phase.glowOverlayOpacity).toBe(0)
  })

  it('switches to phase 2 between 0.15 and the phase-2 threshold', () => {
    const phase = computeScrollPhase(0.25)
    expect(phase.labelKey).toBe('phase2')
    expect(phase.subKey).toBe('sub2')
    // The clean line has not begun drawing yet in phase 2.
    expect(phase.cleanDrawProgress).toBe(0)
  })

  it('reaches phase 3 fully resolved at progress 1', () => {
    const phase = computeScrollPhase(1)
    expect(phase.labelKey).toBe('phase3')
    expect(phase.subKey).toBe('sub3')
    expect(phase.cleanDrawProgress).toBe(1)
    expect(phase.cleanOpacity).toBe(1)
    expect(phase.dotRadius).toBe(5)
    expect(phase.glowRadius).toBe(18)
    expect(phase.subOpacity).toBe(1)
    // Chaos line fades to a faint residue rather than disappearing.
    expect(phase.chaosOpacity).toBeCloseTo(0.08)
  })

  it('clamps out-of-range progress', () => {
    expect(computeScrollPhase(-1).labelKey).toBe('phase1')
    expect(computeScrollPhase(2).labelKey).toBe('phase3')
  })

  it('keeps the end dot hidden until the line is almost fully drawn', () => {
    // Just past the phase-2 start the line is still drawing; the dot stays at 0.
    expect(computeScrollPhase(0.5).dotRadius).toBe(0)
  })
})
