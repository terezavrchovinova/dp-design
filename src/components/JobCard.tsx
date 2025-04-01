type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => (
  <div className="mb-10 text-left bg-dark p-6 rounded-lg shadow-md text-white max-w-6xl">
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
      <h4 className="text-xl font-semibold">{title}</h4>
      <span className="text-sm text-gray">{date}</span>
    </div>
    <p className="text-base text-gray leading-relaxed max-w-prose">
      {description}
    </p>
  </div>
)
