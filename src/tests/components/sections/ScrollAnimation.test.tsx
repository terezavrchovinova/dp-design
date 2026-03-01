import { describe, expect, it, vi } from 'vitest'
import { ScrollAnimation } from '../../../components/sections/ScrollAnimation'
import { getTextInAnyLanguage, render, screen } from '../../utils'

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
})
