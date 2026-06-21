import { describe, expect, it, vi } from 'vitest'
import { Contact } from '@/components/sections/Contact'
import { render, screen } from '@/tests/utils'
import * as translationsModule from '@/translations'

// Mock the translations module, keeping the real implementation by default so
// tests can selectively override useTranslation.
vi.mock('@/translations', async () => {
  const actual = await vi.importActual<typeof translationsModule>('@/translations')
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
      locale: { language: 'cs' as const, changeLanguage: vi.fn() },
    }))

    vi.spyOn(translationsModule, 'useTranslation').mockImplementation(
      mockUseTranslation as unknown as typeof translationsModule.useTranslation
    )

    render(<Contact />)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toBeInTheDocument()
    // Should use fallback email
    expect(emailLink).toHaveAttribute('href', 'mailto:daniela@plaminkova.com')
    expect(emailLink).toHaveTextContent('daniela@plaminkova.com')

    // Restore
    vi.restoreAllMocks()
  })
})
