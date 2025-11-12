export interface JobCardProps {
  /** Job/education title */
  title: string
  /** Date range or period */
  date: string
  /** Job/education description (will be split into bullet points) */
  description: string
}

/**
 * JobCard component
 *
 * Renders a card displaying job or education information with
 * responsive title formatting and bullet-point description.
 *
 * @param props - JobCard component props
 * @returns Job card element
 */
export const JobCard = ({ title, date, description }: JobCardProps) => {
  // Split description into bullet points by sentence
  const bulletPoints = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  // Split title on dash (supports both hyphen and en dash)
  // Format: "Title – Subtitle" or "Title - Subtitle"
  const titleParts = title.split(/\s[-–]\s/)
  const [part1, part2] = titleParts

  return (
    <div className="mb-10 p-6 max-w-4xl mx-auto backdrop-blur-md transition-smooth glass">
      {/* Header: Title and Date */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <p className="section-title text-center sm:text-left">
          {/* Responsive title formatting */}
          {part2 ? (
            <>
              {/* Mobile: split title on separate lines */}
              <span className="block sm:hidden">
                {part1}
                <br />
                {part2}
              </span>

              {/* Desktop: show title on one line with en dash */}
              <span className="hidden sm:inline">
                {part1} – {part2}
              </span>
            </>
          ) : (
            // Single-part title (no dash)
            title
          )}
        </p>

        {/* Date */}
        <span
          className="text-sm text-muted -mt-4"
          style={{ color: 'var(--color-gray)' }}
        >
          {date}
        </span>
      </div>

      {/* Description as bullet points */}
      <ul className="space-y-4 text-base leading-relaxed pr-8">
        {bulletPoints.map((point, index) => (
          <li
            key={index}
            className="section-description flex items-start gap-3"
          >
            {/* Bullet icon */}
            <span className="relative top-[6px] text-accent inline-flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="14"
                height="14"
                className="flex-shrink-0"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span className="flex-1 text-light-gray">{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
