import { describe, expect, it, vi } from 'vitest'
import { Projects } from '@/components/sections/Projects'
import { render, screen } from '@/tests/utils'

// A project key with no translation falls back to the raw key, which has no
// "Category – Name" separator — the caption must then show the whole title
// and omit the category eyebrow.
vi.mock('@/data/projects', () => ({
  PROJECTS: [
    {
      key: 'untranslated_key',
      imageMobile: 'mobile.webp',
      imageDesktop: 'desktop.webp',
      link: 'https://www.behance.net/gallery/untranslated',
    },
  ],
}))

describe('Projects caption fallback', () => {
  it('renders a title without separator as the name, with no category eyebrow', () => {
    const { container } = render(<Projects />)

    expect(screen.getByText('untranslated_key')).toBeInTheDocument()
    expect(container.querySelector('.eyebrow')).not.toBeInTheDocument()
  })
})
