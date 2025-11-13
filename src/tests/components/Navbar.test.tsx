import { describe, it, expect, vi } from 'vitest'
import { render, screen, getTextInAnyLanguage } from '../utils'
import userEvent from '@testing-library/user-event'
import { Navbar } from '../../components/Navbar'

describe('Navbar', () => {
  const defaultProps = {
    menuOpen: false,
    setMenuOpen: vi.fn(),
  }

  it('renders the navbar', () => {
    render(<Navbar {...defaultProps} />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()
  })

  it('renders the logo', () => {
    render(<Navbar {...defaultProps} />)
    // Use translation key - works with any language
    const homePattern = getTextInAnyLanguage('nav.home')
    const logos = screen.getAllByRole('link', { name: homePattern })
    const logo = logos.find((link) => link.getAttribute('href') === '#home')
    expect(logo).toBeInTheDocument()
    expect(logo).toHaveAttribute('href', '#home')
  })

  it('renders navigation links', () => {
    render(<Navbar {...defaultProps} />)
    // Use translation keys - works with any language
    const homePattern = getTextInAnyLanguage('nav.home')
    const projectsPattern = getTextInAnyLanguage('nav.projects')
    const whatIDoPattern = getTextInAnyLanguage('nav.whatIDo')
    const aboutPattern = getTextInAnyLanguage('nav.about')
    const contactPattern = getTextInAnyLanguage('nav.contact')

    // Check that navigation links exist regardless of current language
    const homeLinks = screen.getAllByRole('link', { name: homePattern })
    expect(homeLinks.length).toBeGreaterThan(0)

    expect(
      screen.getByRole('link', { name: projectsPattern }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: whatIDoPattern }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: aboutPattern })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: contactPattern }),
    ).toBeInTheDocument()
  })

  it('renders mobile menu toggle button', () => {
    render(<Navbar {...defaultProps} />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    expect(menuButton).toBeInTheDocument()
    expect(menuButton).toHaveAttribute('aria-expanded', 'false')
  })

  it('toggles menu when button is clicked', async () => {
    const setMenuOpen = vi.fn()
    const user = userEvent.setup()
    render(<Navbar menuOpen={false} setMenuOpen={setMenuOpen} />)
    const menuButton = screen.getByRole('button', { name: /toggle menu/i })
    await user.click(menuButton)
    expect(setMenuOpen).toHaveBeenCalled()
  })

  it('displays language switcher', () => {
    render(<Navbar {...defaultProps} />)
    const languageButton = screen.getByRole('button', {
      name: /change language/i,
    })
    expect(languageButton).toBeInTheDocument()
  })

  it('opens language dropdown when clicked', async () => {
    const user = userEvent.setup()
    render(<Navbar {...defaultProps} />)
    const languageButton = screen.getByRole('button', {
      name: /change language/i,
    })
    await user.click(languageButton)
    // Dropdown should appear with language options
    const languageMenu = screen.getByRole('menu', {
      name: /language options/i,
    })
    expect(languageMenu).toBeInTheDocument()
  })

  it('changes language when language option is selected', async () => {
    const user = userEvent.setup()
    render(<Navbar {...defaultProps} />)
    const languageButton = screen.getByRole('button', {
      name: /change language/i,
    })
    await user.click(languageButton)
    // Wait for dropdown to appear
    const englishOption = screen.getByRole('menuitem', {
      name: /switch to english/i,
    })
    await user.click(englishOption)
    // Language should change (tested via i18n integration)
    expect(englishOption).not.toBeVisible()
  })

  it('renders email button', () => {
    render(<Navbar {...defaultProps} />)
    // Use translation key - email is the same in both languages, but use key for consistency
    const emailPattern = getTextInAnyLanguage('contact.email')
    const emailButton = screen.getByRole('button', { name: emailPattern })
    expect(emailButton).toBeInTheDocument()
  })

  it('opens mailto link when email button is clicked', async () => {
    // Mock window.location
    const originalLocation = window.location
    delete (window as unknown as { location?: Location }).location
    window.location = { href: '' } as unknown as Location

    const user = userEvent.setup()
    render(<Navbar {...defaultProps} />)
    const emailPattern = getTextInAnyLanguage('contact.email')
    const emailButton = screen.getByRole('button', { name: emailPattern })

    await user.click(emailButton)

    // Check that mailto link was set
    expect(window.location.href).toContain('mailto:')

    // Restore window.location
    window.location = originalLocation
  })

  it('changes nav link color on hover', async () => {
    const user = userEvent.setup()
    render(<Navbar {...defaultProps} />)
    const projectsPattern = getTextInAnyLanguage('nav.projects')
    const projectsLink = screen.getByRole('link', { name: projectsPattern })

    // Hover over the link
    await user.hover(projectsLink)
    // Check that the link has hover styling
    expect(projectsLink).toHaveStyle({ color: 'var(--color-white)' })

    // Move mouse away
    await user.unhover(projectsLink)
    // Check that the link returns to normal styling
    expect(projectsLink).toHaveStyle({ color: 'var(--color-gray)' })
  })
})
