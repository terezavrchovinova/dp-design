import { describe, it, expect } from 'vitest'
import { render, screen, getTextInAnyLanguage } from '../utils'
import { Footer } from '../../components/Footer'

describe('Footer', () => {
  it('renders the footer', () => {
    render(<Footer />)
    const footer = screen.getByRole('contentinfo')
    expect(footer).toBeInTheDocument()
  })

  it('displays copyright with current year', () => {
    render(<Footer />)
    const currentYear = new Date().getFullYear()
    const copyrightText = screen.getByText(new RegExp(`${currentYear}`, 'i'))
    expect(copyrightText).toBeInTheDocument()
  })

  it('displays company name', () => {
    render(<Footer />)
    const namePattern = getTextInAnyLanguage('footer.name')
    expect(screen.getByText(namePattern)).toBeInTheDocument()
  })

  it('displays ICO number', () => {
    render(<Footer />)
    const icoPattern = getTextInAnyLanguage('footer.ico')
    expect(screen.getByText(icoPattern)).toBeInTheDocument()
  })

  it('displays address', () => {
    render(<Footer />)
    const addressPattern = getTextInAnyLanguage('footer.address')
    expect(screen.getByText(addressPattern)).toBeInTheDocument()
  })

  it('displays registration information', () => {
    render(<Footer />)
    const registeredPattern = getTextInAnyLanguage('footer.registered')
    expect(screen.getByText(registeredPattern)).toBeInTheDocument()
  })

  it('displays supervisory authority', () => {
    render(<Footer />)
    const authorityPattern = getTextInAnyLanguage('footer.supervisoryAuthority')
    expect(screen.getByText(authorityPattern)).toBeInTheDocument()
  })
})
