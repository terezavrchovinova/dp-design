type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => (
  <div
    className="mb-8 rounded-2xl p-6 shadow-xl transition hover:shadow-2xl max-w-4xl backdrop-blur-md border mx-auto"
    style={{
      backgroundColor: 'var(--color-surface)',
      borderColor: 'var(--color-border)',
      color: 'var(--color-white)',
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
    <p
      className="text-base leading-relaxed"
      style={{ color: 'var(--color-light-gray)' }}
    >
      {description}
    </p>
  </div>
)
