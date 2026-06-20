import { afterEach, describe, expect, it, vi } from 'vitest'
import { getCurlingSlide, handleHover, type ScatteredState } from '@/utils/scatter'

describe('getCurlingSlide', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('returns a fully-populated scatter transform', () => {
    const result = getCurlingSlide()
    expect(result).toMatchObject({
      x: expect.any(Number),
      y: expect.any(Number),
      rotate: expect.any(Number),
      scale: 1,
      opacity: 0.9,
    })
  })

  it('draws five random values (x/y direction, x/y offset, rotation)', () => {
    const random = vi.spyOn(Math, 'random').mockReturnValue(0.5)
    getCurlingSlide()
    expect(random).toHaveBeenCalledTimes(5)
  })

  it('slides in the positive diagonal when directions roll high', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.7) // > 0.5 → positive directions
    const result = getCurlingSlide()
    expect(result.x).toBeGreaterThan(0)
    expect(result.y).toBeGreaterThan(0)
    expect(result.rotate).toBeGreaterThan(0)
  })

  it('slides in the negative diagonal when directions roll low', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.3) // < 0.5 → negative directions
    const result = getCurlingSlide()
    expect(result.x).toBeLessThan(0)
    expect(result.y).toBeLessThan(0)
    expect(result.rotate).toBeLessThan(0)
  })
})

describe('handleHover', () => {
  it('stores a fresh scatter offset for the hovered index, preserving others', () => {
    vi.spyOn(Math, 'random').mockReturnValue(0.5)
    let state: ScatteredState = { 0: { x: 1 } }
    const setScattered = (updater: ScatteredState | ((p: ScatteredState) => ScatteredState)) => {
      state = typeof updater === 'function' ? updater(state) : updater
    }

    handleHover(2, setScattered)

    expect(state[0]).toEqual({ x: 1 }) // untouched
    expect(state[2]).toMatchObject({ scale: 1, opacity: 0.9 }) // newly scattered
    vi.restoreAllMocks()
  })
})
