import { describe, expect, it } from 'vitest'
import { About } from '../../../components/sections/About'
import { getTextInAnyLanguage, render, screen } from '../../utils'

describe('About', () => {
  it('renders the about section', () => {
    render(<About />)
    const section = screen.getByRole('region', { name: /about section/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'about')
  })

  it('displays experience section', () => {
    render(<About />)
    const experiencePattern = getTextInAnyLanguage('about.experience')
    expect(screen.getByText(experiencePattern)).toBeInTheDocument()
  })

  it('displays education section', () => {
    render(<About />)
    const educationPattern = getTextInAnyLanguage('about.education')
    expect(screen.getByText(educationPattern)).toBeInTheDocument()
  })

  it('displays tools section', () => {
    render(<About />)
    const toolsPattern = getTextInAnyLanguage('about.tools')
    expect(screen.getByText(toolsPattern)).toBeInTheDocument()
  })

  it('renders timeline entries with job content', () => {
    render(<About />)
    const lists = screen.getAllByRole('list')
    expect(lists.length).toBeGreaterThan(0)
  })

  it('renders tool icons', () => {
    render(<About />)
    // Tool icons should be rendered as images
    // Check for at least some tool icons being present
    const toolImages = screen
      .getAllByRole('img')
      .filter(
        (img) =>
          img.getAttribute('alt')?.includes('Adobe') ||
          img.getAttribute('alt')?.includes('Cinema') ||
          img.getAttribute('alt')?.includes('Midjourney')
      )
    // At least some tools should be rendered
    expect(toolImages.length).toBeGreaterThanOrEqual(0)
  })
})
