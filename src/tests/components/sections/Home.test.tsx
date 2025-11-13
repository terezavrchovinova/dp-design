import { describe, it, expect } from 'vitest'
import { render, screen, getTextInAnyLanguage } from '../../utils'
import { Home } from '../../../components/sections/Home'

describe('Home', () => {
  it('renders the home section', () => {
    render(<Home />)
    const section = screen.getByRole('region', { name: /home section/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'home')
  })

  it('displays the main title', () => {
    render(<Home />)
    // Use translation keys - works with any language
    const titlePattern = getTextInAnyLanguage('home.titleLine1')
    const titleLine2Pattern = getTextInAnyLanguage('home.titleLine2')
    
    // Should display title regardless of current language
    expect(screen.getByText(titlePattern)).toBeInTheDocument()
    expect(screen.getByText(titleLine2Pattern)).toBeInTheDocument()
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
