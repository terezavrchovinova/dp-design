import { domAnimation, LazyMotion } from 'motion/react'
import { beforeAll, describe, expect, it, vi } from 'vitest'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { LazyLottie } from '@/components/ui/LazyLottie'
import { render, screen, waitFor } from '@/tests/utils'

// Motion caches the `prefers-reduced-motion` media query on first use, so these
// tests live in their own file where every render sees the preference enabled.

const { loadAnimationMock } = vi.hoisted(() => ({
  loadAnimationMock: vi.fn(() => ({ destroy: vi.fn() })),
}))

vi.mock('lottie-web/build/player/lottie_light', () => ({
  default: { loadAnimation: loadAnimationMock },
}))

beforeAll(() => {
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  })
})

describe('with prefers-reduced-motion enabled', () => {
  // The hover gate itself (no scatter under reduced motion) is asserted in
  // e2e/reduced-motion.spec.ts — Motion gestures don't fire in jsdom. This
  // render exercises the reduced-motion code path and pins the fallback DOM.
  it('AnimatedHeading still renders every letter', () => {
    render(
      <LazyMotion features={domAnimation}>
        <AnimatedHeading />
      </LazyMotion>
    )

    const headings = screen.getAllByRole('heading', { level: 2 })
    const desktopHeading = headings.find((heading) => heading.className.includes('md:flex'))
    expect(desktopHeading).toBeDefined()
    expect(desktopHeading?.querySelectorAll('span').length).toBeGreaterThan(0)
  })

  it('LazyLottie renders the first frame without autoplaying', async () => {
    render(<LazyLottie animationData={{}} />)

    await waitFor(() => {
      expect(loadAnimationMock).toHaveBeenCalled()
    })
    expect(loadAnimationMock).toHaveBeenCalledWith(
      expect.objectContaining({ autoplay: false, loop: true })
    )
  })
})
