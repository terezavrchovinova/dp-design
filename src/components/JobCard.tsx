type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => {
  const points = description
    .split('. ')
    .map((sentence) => sentence.trim().replace(/\.$/, ''))
    .filter(Boolean)

  return (
    <div className="mb-10 p-6 max-w-4xl mx-auto backdrop-blur-md transition-smooth glass">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <p className="text-2xl font-bold tracking-tight text-center">{title}</p>
        <span
          className="text-sm text-muted"
          style={{ color: 'var(--color-gray)' }}
        >
          {date}
        </span>
      </div>

      <ul className="space-y-4 text-base leading-relaxed">
        {points.map((point, i) => (
          <li key={i} className="flex items-start gap-3">
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
