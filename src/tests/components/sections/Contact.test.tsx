import * as reactI18next from 'react-i18next'
import { describe, expect, it, vi } from 'vitest'
import { Contact } from '../../../components/sections/Contact'
import { render, screen } from '../../utils'

// Mock react-i18next
vi.mock('react-i18next', async () => {
  const actual = await vi.importActual<typeof reactI18next>('react-i18next')
  return {
    ...actual,
  }
})

describe('Contact', () => {
  it('renders the contact section', () => {
    render(<Contact />)
    const section = screen.getByRole('region', { name: /contact section/i })
    expect(section).toBeInTheDocument()
    expect(section).toHaveAttribute('id', 'contact')
  })

  it('displays email link', () => {
    render(<Contact />)
    // Email link should be present
    const emailLink = screen.getByRole('link')
    expect(emailLink).toBeInTheDocument()
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })

  it('email link has mailto href', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute('href', expect.stringContaining('mailto:'))
  })

  it('email link has correct aria-label', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute('aria-label', expect.stringContaining('email'))
  })

  it('uses fallback email if translation is missing', () => {
    // Mock useTranslation to return empty string for contact.email
    const mockUseTranslation = vi.fn(() => ({
      t: (key: string) => {
        if (key === 'contact.email') {
          return '' // Return empty string to trigger fallback
        }
        // For other keys, return the key itself or actual translation
        return key === 'footer.cta_collaborate' ? 'Send me a message' : key
      },
      i18n: {},
      ready: true,
    }))

    vi.spyOn(reactI18next, 'useTranslation').mockImplementation(
      mockUseTranslation as unknown as typeof reactI18next.useTranslation
    )

    render(<Contact />)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toBeInTheDocument()
    // Should use fallback email
    expect(emailLink).toHaveAttribute('href', 'mailto:email@example.com')
    expect(emailLink).toHaveTextContent('email@example.com')

    // Restore
    vi.restoreAllMocks()
  })
})
