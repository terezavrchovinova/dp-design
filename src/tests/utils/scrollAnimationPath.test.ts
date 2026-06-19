import { describe, expect, it } from 'vitest'
import { buildChaosPath, clamp, ease, lerp } from '../../utils/scrollAnimationPath'

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
