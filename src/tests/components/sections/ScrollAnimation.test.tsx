import { afterEach, describe, expect, it, vi } from 'vitest'
import { ScrollAnimation } from '@/components/sections/ScrollAnimation'
import { act, getTextInAnyLanguage, render, screen } from '@/tests/utils'

describe('ScrollAnimation', () => {
  it('renders the scroll animation section', () => {
    render(<ScrollAnimation />)
    const section = document.getElementById('scroll-animation')
    expect(section).toBeInTheDocument()
    expect(section).toHaveClass('scroll-anim-section')
  })

  it('has aria-hidden for decorative content', () => {
    render(<ScrollAnimation />)
    const section = document.getElementById('scroll-animation')
    expect(section).toHaveAttribute('aria-hidden', 'true')
  })

  it('displays initial phase label', () => {
    render(<ScrollAnimation />)
    const phaseLabelPattern = getTextInAnyLanguage('animation.phase1')
    expect(screen.getByText(phaseLabelPattern)).toBeInTheDocument()
  })

  it('displays initial sub label', () => {
    render(<ScrollAnimation />)
    const subLabelPattern = getTextInAnyLanguage('animation.sub1')
    expect(screen.getByText(subLabelPattern)).toBeInTheDocument()
  })

  it('renders the SVG with paths and circles', () => {
    const { container } = render(<ScrollAnimation />)
    const svg = container.querySelector('svg.scroll-anim-svg')
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveAttribute('viewBox', '0 0 860 180')

    const paths = container.querySelectorAll('svg path')
    expect(paths.length).toBe(2)

    const circles = container.querySelectorAll('svg circle')
    expect(circles.length).toBe(2)
  })

  it('adds scroll event listener on mount', () => {
    const addEventListenerSpy = vi.spyOn(window, 'addEventListener')
    const { unmount } = render(<ScrollAnimation />)

    expect(addEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function), {
      passive: true,
    })

    unmount()
    addEventListenerSpy.mockRestore()
  })

  it('removes scroll event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener')
    const { unmount } = render(<ScrollAnimation />)

    unmount()

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function))

    removeEventListenerSpy.mockRestore()
  })

  describe('scroll-driven phases', () => {
    // jsdom has no layout engine, so we fake the geometry the scroll handler
    // reads and run requestAnimationFrame synchronously to drive the animation.
    afterEach(() => {
      vi.restoreAllMocks()
    })

    const driveScrollTo = (sectionTop: number, sectionHeight: number) => {
      vi.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
        cb(0)
        return 0
      })
      // SVGPathElement.getTotalLength is not implemented in jsdom.
      vi.spyOn(
        SVGElement.prototype as unknown as SVGGeometryElement,
        'getTotalLength'
      ).mockReturnValue(100)
      vi.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue({
        top: sectionTop,
      } as DOMRect)
      vi.spyOn(HTMLElement.prototype, 'offsetHeight', 'get').mockReturnValue(sectionHeight)

      render(<ScrollAnimation />)
      act(() => {
        window.dispatchEvent(new Event('scroll'))
      })
    }

    it('shows the mid phase label when partially scrolled', () => {
      // innerHeight defaults to 768; scrollable = 2000 - 768 = 1232.
      // top = -308 → progress ≈ 0.25 (between 0.15 and 0.35 → phase 2).
      driveScrollTo(-308, 2000)
      expect(screen.getByText(getTextInAnyLanguage('animation.phase2'))).toBeInTheDocument()
    })

    it('shows the final phase label when fully scrolled', () => {
      // top far past the top → progress clamps to 1 → phase 3.
      driveScrollTo(-10000, 2000)
      expect(screen.getByText(getTextInAnyLanguage('animation.phase3'))).toBeInTheDocument()
    })
  })
})
