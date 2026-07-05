import { domAnimation, LazyMotion } from 'motion/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { act, getTextInAnyLanguage, getTranslation, render, screen } from '@/tests/utils'

/** Captures the IntersectionObserver callback so tests can simulate visibility changes. */
let observerCallback: IntersectionObserverCallback | undefined
const observeSpy = vi.fn()
const unobserveSpy = vi.fn()

/** Render inside LazyMotion so `m.span` gesture handlers (hover) are active. */
const renderHeading = () =>
  render(
    <LazyMotion features={domAnimation}>
      <AnimatedHeading />
    </LazyMotion>
  )

// The desktop heading is split into per-letter spans, so it can't be found by
// text (Testing Library only matches direct text nodes) — go through its role.
const getHeadings = () => screen.getAllByRole('heading', { level: 2 })

const getDesktopHeading = (): HTMLElement => {
  const desktopHeading = getHeadings().find((heading) => heading.className.includes('md:flex'))
  expect(desktopHeading).toBeDefined()
  return desktopHeading as HTMLElement
}

describe('AnimatedHeading', () => {
  beforeEach(() => {
    observerCallback = undefined
    globalThis.IntersectionObserver = class IntersectionObserver {
      observe = observeSpy
      unobserve = unobserveSpy
      disconnect = vi.fn()
      takeRecords = vi.fn(() => []) as () => IntersectionObserverEntry[]
      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback
      }
    } as unknown as typeof IntersectionObserver
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.clearAllMocks()
  })

  it('renders the collaborate heading as mobile and desktop h2 variants', () => {
    renderHeading()
    const headings = getHeadings()
    expect(headings).toHaveLength(2)
    const headingPattern = getTextInAnyLanguage('footer.cta_collaborate')
    for (const heading of headings) {
      // The desktop variant renders spaces as nbsp — normalize before matching.
      expect(heading.textContent?.replace(/\u00A0/g, ' ')).toMatch(headingPattern)
    }
  })

  it('splits the desktop heading into one span per character, spaces as nbsp', () => {
    renderHeading()
    const headingText = getTranslation('footer.cta_collaborate')
    const spans = Array.from(getDesktopHeading().querySelectorAll('span'))

    expect(spans).toHaveLength(headingText.length)
    const renderedText = spans.map((span) => span.textContent).join('')
    expect(renderedText).toBe(headingText.replace(/ /g, '\u00A0'))
  })

  // Note: the hover→scatter interaction itself is covered in e2e (Motion's
  // gesture handlers never fire in jsdom); the scatter maths is unit-tested
  // in tests/utils/scatter.test.ts.

  it('observes the desktop heading and unobserves it on unmount', () => {
    const { unmount } = renderHeading()
    expect(observeSpy).toHaveBeenCalledWith(getDesktopHeading())

    unmount()
    expect(unobserveSpy).toHaveBeenCalled()
  })

  it('schedules a scatter reset once the heading leaves the viewport', () => {
    vi.useFakeTimers()
    renderHeading()
    expect(observerCallback).toBeDefined()

    const leaveEntry = { isIntersecting: false } as unknown as IntersectionObserverEntry
    act(() => {
      observerCallback?.([leaveEntry], {} as IntersectionObserver)
    })
    expect(vi.getTimerCount()).toBe(1)

    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })

  it('does not schedule a reset while the heading stays visible', () => {
    vi.useFakeTimers()
    renderHeading()

    const visibleEntry = { isIntersecting: true } as unknown as IntersectionObserverEntry
    act(() => {
      observerCallback?.([visibleEntry], {} as IntersectionObserver)
    })
    expect(vi.getTimerCount()).toBe(0)
    vi.useRealTimers()
  })
})
