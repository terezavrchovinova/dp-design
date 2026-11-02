import { describe, expect, it } from 'vitest'
import { Contact } from '@/components/sections/Contact'
import { render, screen } from '@/tests/utils'

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

  it('email link has correct aria-label', () => {
    render(<Contact />)
    const emailLink = screen.getByRole('link')
    expect(emailLink).toHaveAttribute('aria-label', expect.stringContaining('email'))
  })
})
