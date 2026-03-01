import { describe, expect, it } from 'vitest'
import { Home } from '../../../components/sections/Home'
import { getTextInAnyLanguage, render, screen } from '../../utils'

describe('Home', () => {
  it('renders the home section', () => {
    render(<Home />)
    const section = screen.getByRole('region', { name: /home section/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'home')
  })

  it('displays the main title', () => {
    render(<Home />)
    // Title is split across multiple spans (e.g. "Turning ", "messy", "challenges", "into", "clear solutions.")
    // Check the h1 contains the full title text
    const titleLine2Pattern = getTextInAnyLanguage('home.titleLine2')
    const h1 = screen.getByRole('heading', { level: 1 })

    expect(h1).toBeInTheDocument()
    expect(h1.textContent).toMatch(/Turning/i)
    expect(h1.textContent).toMatch(/messy/i)
    expect(h1.textContent).toMatch(titleLine2Pattern)
  })

  it('displays the hero tag', () => {
    render(<Home />)
    const heroTagPattern = getTextInAnyLanguage('home.heroTag')
    expect(screen.getByText(heroTagPattern)).toBeInTheDocument()
  })

  it('displays the subtitle', () => {
    render(<Home />)
    // Use translation key - subtitle is the same in both languages, but use key for consistency
    const subtitlePattern = getTextInAnyLanguage('home.subtitle')
    expect(screen.getByText(subtitlePattern)).toBeInTheDocument()
  })

  it('renders call-to-action buttons', () => {
    render(<Home />)
    // Use translation keys - works with any language
    const viewProjectsPattern = getTextInAnyLanguage('home.viewProjects')
    const contactMePattern = getTextInAnyLanguage('home.contactMe')

    // Check for buttons regardless of current language
    const viewProjectsButton = screen.getByRole('link', {
      name: viewProjectsPattern,
    })
    const contactButton = screen.getByRole('link', {
      name: contactMePattern,
    })

    expect(viewProjectsButton).toBeInTheDocument()
    expect(viewProjectsButton).toHaveAttribute('href', '#projects')

    expect(contactButton).toBeInTheDocument()
    expect(contactButton).toHaveAttribute('href', '#contact')
  })
})
