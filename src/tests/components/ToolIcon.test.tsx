import { describe, expect, it } from 'vitest'
import { ToolIcon } from '../../components/ToolIcon'
import { render, screen } from '../utils'

describe('ToolIcon', () => {
  const defaultProps = {
    name: 'Adobe Photoshop',
    src: '/test-icon.svg',
  }

  it('renders tool icon', () => {
    render(<ToolIcon {...defaultProps} />)
    const icon = screen.getByRole('img', { name: /adobe photoshop/i })
    expect(icon).toBeInTheDocument()
  })

  it('displays tool name as alt text', () => {
    render(<ToolIcon {...defaultProps} />)
    const icon = screen.getByAltText(/adobe photoshop/i)
    expect(icon).toBeInTheDocument()
    expect(icon).toHaveAttribute('alt', 'Adobe Photoshop')
  })

  it('has title attribute for tooltip', () => {
    render(<ToolIcon {...defaultProps} />)
    const container = screen.getByTitle(/adobe photoshop/i)
    expect(container).toBeInTheDocument()
  })

  it('renders image with correct src', () => {
    render(<ToolIcon {...defaultProps} />)
    const icon = screen.getByAltText(/adobe photoshop/i)
    expect(icon).toHaveAttribute('src', '/test-icon.svg')
  })
})
