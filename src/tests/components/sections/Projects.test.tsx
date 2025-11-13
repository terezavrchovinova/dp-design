import { describe, it, expect } from 'vitest'
import { render, screen, getTextInAnyLanguage } from '../../utils'
import { Projects } from '../../../components/sections/Projects'

describe('Projects', () => {
  it('renders the projects section', () => {
    render(<Projects />)
    const section = screen.getByRole('region', { name: /projects section/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'projects')
  })

  it('displays the projects title', () => {
    render(<Projects />)
    // Use translation key - works with any language
    const projectsTitlePattern = getTextInAnyLanguage('projects.title')
    expect(screen.getByText(projectsTitlePattern)).toBeInTheDocument()
  })

  it('renders project links', () => {
    render(<Projects />)
    // Check if project links are rendered (they should have href attributes)
    const projectLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.includes('behance'))
    expect(projectLinks.length).toBeGreaterThan(0)
  })

  it('project links open in new tab', () => {
    render(<Projects />)
    const projectLinks = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.includes('behance'))
    if (projectLinks.length > 0) {
      expect(projectLinks[0]).toHaveAttribute('target', '_blank')
      expect(projectLinks[0]).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('renders project images', () => {
    render(<Projects />)
    const images = screen.getAllByRole('img')
    // Should have at least some project images
    expect(images.length).toBeGreaterThan(0)
  })
})

