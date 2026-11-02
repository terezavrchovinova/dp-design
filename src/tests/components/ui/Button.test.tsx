import { describe, expect, it } from 'vitest'
import { Button } from '@/components/ui/Button'
import { render, screen } from '@/tests/utils'

describe('Button', () => {
  it('renders as a link by default', () => {
    render(<Button href="#test">Click me</Button>)
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#test')
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('bg-accent-button')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('border-border')
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('custom-class')
  })
})
