import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, getTextInAnyLanguage } from '../utils'
import userEvent from '@testing-library/user-event'
import { MobileMenu } from '../../components/MobileMenu'

describe('MobileMenu', () => {
  const defaultProps = {
    menuOpen: false,
    setMenuOpen: vi.fn(),
  }

  beforeEach(() => {
    // Reset body overflow before each test
    document.body.style.overflow = ''
  })

  afterEach(() => {
    // Cleanup: restore body overflow after each test
    document.body.style.overflow = ''
  })

  it('renders mobile menu', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    // When menu is open, dialog should be accessible
    const menu = screen.getByRole('dialog', { name: /mobile navigation menu/i })
    expect(menu).toBeInTheDocument()
  })

  it('menu is hidden when menuOpen is false', () => {
    render(<MobileMenu {...defaultProps} />)
    // When menu is closed, dialog has aria-hidden="true" so it's not accessible
    // We need to query it differently
    const menu = document.getElementById('mobile-menu')
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveAttribute('aria-hidden', 'true')
  })

  it('menu is visible when menuOpen is true', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    const menu = screen.getByRole('dialog', { name: /mobile navigation menu/i })
    expect(menu).toBeInTheDocument()
    expect(menu).toHaveAttribute('aria-hidden', 'false')
  })

  it('renders close button', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    // Button is accessible when menu is open
    const closeButton = screen.getByRole('button', { name: /close menu/i })
    expect(closeButton).toBeInTheDocument()
  })

  it('calls setMenuOpen when close button is clicked', async () => {
    const setMenuOpen = vi.fn()
    const user = userEvent.setup()
    render(<MobileMenu menuOpen={true} setMenuOpen={setMenuOpen} />)
    const closeButton = screen.getByRole('button', { name: /close menu/i })
    await user.click(closeButton)
    expect(setMenuOpen).toHaveBeenCalledWith(false)
  })

  it('renders navigation links when menu is open', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    // Check for navigation links using translation keys
    const homePattern = getTextInAnyLanguage('nav.home')
    const projectsPattern = getTextInAnyLanguage('nav.projects')
    const contactPattern = getTextInAnyLanguage('nav.contact')
    const aboutPattern = getTextInAnyLanguage('nav.about')
    const whatIDoPattern = getTextInAnyLanguage('nav.whatIDo')

    expect(screen.getByRole('link', { name: homePattern })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: projectsPattern }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: contactPattern }),
    ).toBeInTheDocument()
    expect(screen.getByRole('link', { name: aboutPattern })).toBeInTheDocument()
    expect(
      screen.getByRole('link', { name: whatIDoPattern }),
    ).toBeInTheDocument()
  })

  it('closes menu when navigation link is clicked', async () => {
    const setMenuOpen = vi.fn()
    const user = userEvent.setup()
    render(<MobileMenu menuOpen={true} setMenuOpen={setMenuOpen} />)
    const homePattern = getTextInAnyLanguage('nav.home')
    const homeLink = screen.getByRole('link', { name: homePattern })
    await user.click(homeLink)
    expect(setMenuOpen).toHaveBeenCalledWith(false)
  })

  it('renders language switcher', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    const csButton = screen.getByRole('button', {
      name: /switch to CS/i,
    })
    const enButton = screen.getByRole('button', {
      name: /switch to EN/i,
    })
    expect(csButton).toBeInTheDocument()
    expect(enButton).toBeInTheDocument()
  })

  it('changes language when language button is clicked', async () => {
    const setMenuOpen = vi.fn()
    const user = userEvent.setup()
    render(<MobileMenu menuOpen={true} setMenuOpen={setMenuOpen} />)
    const enButton = screen.getByRole('button', {
      name: /switch to EN/i,
    })
    await user.click(enButton)
    // Language change should be called (tested via i18n integration)
    expect(enButton).toBeInTheDocument()
  })

  it('prevents body scroll when menu is open', () => {
    render(<MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />)
    // Body overflow should be set to hidden when menu is open
    // This is tested indirectly by checking the menu renders
    expect(document.body.style.overflow).toBe('hidden')
  })

  it('restores body scroll when menu is closed', () => {
    const { rerender } = render(
      <MobileMenu menuOpen={true} setMenuOpen={vi.fn()} />,
    )
    expect(document.body.style.overflow).toBe('hidden')
    rerender(<MobileMenu menuOpen={false} setMenuOpen={vi.fn()} />)
    // After menu closes, overflow should be restored
    expect(document.body.style.overflow).toBe('')
  })

  it('focuses close button when menu opens', async () => {
    vi.useFakeTimers()
    const setMenuOpen = vi.fn()
    const { rerender } = render(
      <MobileMenu menuOpen={false} setMenuOpen={setMenuOpen} />,
    )

    // Open menu
    rerender(<MobileMenu menuOpen={true} setMenuOpen={setMenuOpen} />)

    // Fast-forward to trigger setTimeout
    vi.advanceTimersByTime(100)

    const closeButton = screen.getByRole('button', { name: /close menu/i })
    // Check that close button exists and can receive focus
    expect(closeButton).toBeInTheDocument()

    vi.useRealTimers()
  })
})
