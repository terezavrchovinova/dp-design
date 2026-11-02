import { describe, expect, it, vi } from 'vitest'
import { TimelineEntry } from '@/components/ui/ExperienceTimeline'
import { render, screen } from '@/tests/utils'

// Force the in-view state so the "ignited" side of the entry (accent dot,
// drawn line segment) renders; the not-in-view side is covered by About tests.
vi.mock('@/hooks/useInViewOnce', () => ({
  useInViewOnce: () => [{ current: null }, true],
}))

describe('TimelineEntry', () => {
  it('renders a split title with date and bullet points when in view', () => {
    const { container } = render(
      <TimelineEntry
        title="Graphic Designer – Studio X"
        date="2020 – 2021"
        description="Did branding. Did print."
      />
    )

    expect(screen.getByText('2020 – 2021')).toBeInTheDocument()
    expect(screen.getByText('Graphic Designer – Studio X')).toBeInTheDocument()
    expect(screen.getByText('Did branding')).toBeInTheDocument()
    expect(screen.getByText('Did print')).toBeInTheDocument()

    // In-view entries draw the accent line segment over the grey spine.
    expect(container.querySelector('.bg-accent.origin-top')).toBeInTheDocument()
    expect(container.querySelector('.border-accent')).toBeInTheDocument()
  })

  it('renders an unsplit title as-is and omits the line segment on the last entry', () => {
    const { container } = render(
      <TimelineEntry title="Solo title" date="2019" description="One thing." isLast />
    )

    expect(screen.getByText('Solo title')).toBeInTheDocument()
    expect(container.querySelector('.bg-accent.origin-top')).not.toBeInTheDocument()
  })
})
