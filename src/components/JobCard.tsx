type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => {
  // Split description into bullet points
  const points = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  // Split the title on dash (both hyphen and en dash supported)
  const [part1, part2] = title.split(/\s[-–]\s/)

  return (
    <div className="mb-10 p-6 max-w-4xl mx-auto backdrop-blur-md transition-smooth glass">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <p className="section-title text-center sm:text-left">
          {/* Mobile: display each part on a separate line, hide the dash */}
          {part2 ? (
            <>
              <span className="block sm:hidden">
                {part1}
                <br />
                {part2}
              </span>

              {/* Desktop: show in one line with dash */}
              <span className="hidden sm:inline">
                {part1} – {part2}
              </span>
            </>
          ) : (
            // If there's no dash, show full title as-is
            title
          )}
        </p>

        <span
          className="text-sm text-muted -mt-4"
          style={{ color: 'var(--color-gray)' }}
        >
          {date}
        </span>
      </div>

      <ul className="space-y-4 text-base leading-relaxed pr-8">
        {points.map((point, i) => (
          <li key={i} className="section-description flex items-start gap-3">
            <span className="relative top-[6px] text-accent inline-flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="14"
                height="14"
                className="flex-shrink-0"
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
