export interface JobCardProps {
  /** Job/education title */
  title: string
  /** Date range or period */
  date: string
  /** Job/education description (will be split into bullet points) */
  description: string
}

export const JobCard = ({ title, date, description }: JobCardProps) => {
  const bulletPoints = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  const titleParts = title.split(/\s[-–]\s/)
  const [part1, part2] = titleParts

  return (
    <div className="mb-8 p-5 max-w-4xl mx-auto card-minimal transition-all duration-500 ease-out hover:border-[var(--color-gray)] hover:shadow-lg">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <p className="section-title text-center sm:text-left">
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

        <span className="text-sm text-muted -mt-4" style={{ color: 'var(--color-gray)' }}>
          {date}
        </span>
      </div>

      <ul className="space-y-3 text-base leading-relaxed">
        {bulletPoints.map((point) => (
          <li
            key={point}
            className="section-description flex items-start gap-2 text-[var(--color-gray)]"
          >
            <span className="flex-shrink-0 w-[1em] h-[1.625em] flex items-center justify-center text-lg">
              ·
            </span>
            <span>{point}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
