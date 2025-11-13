import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '../utils'
import userEvent from '@testing-library/user-event'
import { Button } from '../../components/Button'

describe('Button', () => {
  it('renders as a link by default', () => {
    render(<Button href="#test">Click me</Button>)
    const link = screen.getByRole('link', { name: /click me/i })
    expect(link).toBeInTheDocument()
    expect(link).toHaveAttribute('href', '#test')
  })

  it('renders as a button when as="button"', () => {
    render(
      <Button as="button" onClick={vi.fn()}>
        Click me
      </Button>,
    )
    const button = screen.getByRole('button', { name: /click me/i })
    expect(button).toBeInTheDocument()
    expect(button).toHaveAttribute('type', 'button')
  })

  it('calls onClick when button is clicked', async () => {
    const handleClick = vi.fn()
    const user = userEvent.setup()
    render(
      <Button as="button" onClick={handleClick}>
        Click me
      </Button>,
    )
    const button = screen.getByRole('button', { name: /click me/i })
    await user.click(button)
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders with primary variant by default', () => {
    render(<Button>Primary Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('text-white')
  })

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('border')
  })

  it('accepts custom className', () => {
    render(<Button className="custom-class">Button</Button>)
    const button = screen.getByRole('link')
    expect(button).toHaveClass('custom-class')
  })

  it('renders submit button type', () => {
    render(
      <Button as="button" type="submit">
        Submit
      </Button>,
    )
    const button = screen.getByRole('button')
    expect(button).toHaveAttribute('type', 'submit')
  })
})

