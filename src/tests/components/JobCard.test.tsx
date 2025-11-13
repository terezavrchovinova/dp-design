import { describe, it, expect } from 'vitest'
import { render, screen } from '../utils'
import { JobCard } from '../../components/JobCard'

describe('JobCard', () => {
  const defaultProps = {
    title: 'Graphic Designer – Company Name',
    date: 'Jan 2020 – Present',
    description: 'First sentence. Second sentence. Third sentence.',
  }

  it('renders job card', () => {
    render(<JobCard {...defaultProps} />)
    // Use getAllByText since title might appear multiple times (mobile/desktop)
    const titleElements = screen.getAllByText(/graphic designer/i)
    expect(titleElements.length).toBeGreaterThan(0)
  })

  it('displays title', () => {
    render(<JobCard {...defaultProps} />)
    // Title appears in both mobile and desktop views, so use getAllByText
    const titleElements = screen.getAllByText(/graphic designer/i)
    expect(titleElements.length).toBeGreaterThan(0)
    const companyElements = screen.getAllByText(/company name/i)
    expect(companyElements.length).toBeGreaterThan(0)
  })

  it('displays date', () => {
    render(<JobCard {...defaultProps} />)
    expect(screen.getByText(/jan 2020 – present/i)).toBeInTheDocument()
  })

  it('displays description as bullet points', () => {
    render(<JobCard {...defaultProps} />)
    expect(screen.getByText(/first sentence/i)).toBeInTheDocument()
    expect(screen.getByText(/second sentence/i)).toBeInTheDocument()
    expect(screen.getByText(/third sentence/i)).toBeInTheDocument()
  })

  it('handles single-part title', () => {
    render(
      <JobCard
        title="Graphic Designer"
        date="Jan 2020 – Present"
        description="Description text."
      />,
    )
    expect(screen.getByText(/graphic designer/i)).toBeInTheDocument()
  })

  it('renders bullet points correctly', () => {
    render(<JobCard {...defaultProps} />)
    const list = screen.getByRole('list')
    expect(list).toBeInTheDocument()
    const listItems = screen.getAllByRole('listitem')
    expect(listItems.length).toBeGreaterThan(0)
  })
})

