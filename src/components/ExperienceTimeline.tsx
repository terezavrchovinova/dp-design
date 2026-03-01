export interface TimelineEntryProps {
  /** Job/education title */
  title: string
  /** Date range or period */
  date: string
  /** Description (will be split into bullet points) */
  description: string
  /** Whether this is the last entry (no line below) */
  isLast?: boolean
}

/**
 * TimelineEntry component
 *
 * Renders a single entry in the experience timeline with
 * date, title, and bullet-point description.
 */
export const TimelineEntry = ({
  title,
  date,
  description,
  isLast = false,
}: TimelineEntryProps) => {
  const bulletPoints = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  const titleParts = title.split(/\s[-–]\s/)
  const [part1, part2] = titleParts

  return (
    <div className="relative flex gap-6 md:gap-10 group">
      {/* Timeline line */}
      {!isLast && (
        <div
          className="absolute left-[11px] md:left-[15px] top-8 bottom-0 w-px bg-[var(--color-border)] group-hover:bg-[var(--color-gray)] transition-colors duration-500"
          aria-hidden="true"
        />
      )}

      {/* Date marker & dot */}
      <div className="flex-shrink-0 flex flex-col items-center pt-0.5">
        <div
          className="w-6 h-6 md:w-[30px] md:h-[30px] rounded-full border-2 border-[var(--color-border)] bg-[var(--color-dark)] flex items-center justify-center flex-shrink-0 group-hover:border-[var(--color-gray)] transition-colors duration-500"
          aria-hidden="true"
        >
          <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-gray)] group-hover:bg-[var(--color-light-gray)] transition-colors duration-500" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 pb-12 md:pb-14">
        <div className="card-minimal p-5 transition-all duration-500 ease-out hover:border-[var(--color-gray)] hover:shadow-lg">
          {/* Date */}
          <p
            className="text-xs md:text-sm mb-2 font-medium tracking-wide"
            style={{ color: 'var(--color-gray)' }}
          >
            {date}
          </p>

          {/* Title - smaller on mobile for hierarchy */}
          <p className="section-title !text-left text-[10px] sm:text-xs md:text-base mb-2">
            {part2 ? (
              <>
                <span className="block sm:hidden">
                  {part1}
                  <br />
                  {part2}
                </span>
                <span className="hidden sm:inline">
                  {part1} – {part2}
                </span>
              </>
            ) : (
              title
            )}
          </p>

          {/* Bullet points - smaller on mobile for hierarchy */}
          <ul className="space-y-1.5 text-[9px] sm:text-xs md:text-sm leading-relaxed">
            {bulletPoints.map((point) => (
              <li
                key={point}
                className="section-description flex items-start gap-2 text-[var(--color-gray)]"
              >
                <span className="hidden sm:flex flex-shrink-0 w-[1em] h-[1.625em] items-center justify-center text-lg">
                  ·
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}
