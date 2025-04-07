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
    <div
      className="mb-10 p-6 border shadow-xl transition hover:shadow-2xl max-w-4xl mx-auto backdrop-blur-md"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: 'var(--shadow-soft)',
        color: 'var(--color-white)',
        transition: 'var(--transition-smooth)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <h4
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'var(--color-white)' }}
        >
          {title}
        </h4>
        <span className="text-sm" style={{ color: 'var(--color-gray)' }}>
          {date}
        </span>
      </div>

      <ul className="space-y-4 text-base leading-relaxed">
        {points.map((point, i) => (
          <li key={i} className="flex items-baseline gap-3">
            <span
              className="relative top-[1px]"
              style={{
                color: 'var(--color-accent)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="14"
                height="14"
                style={{ flexShrink: 0 }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span
              className="text-base leading-relaxed text-light-gray flex-1"
              style={{ color: 'var(--color-light-gray)' }}
            >
              {point}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
