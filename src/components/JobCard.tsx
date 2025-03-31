type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => (
  <div className="mb-10 text-left bg-dark p-4 min-h-20 text-white">
    <div className="flex justify-between items-center flex-wrap gap-2">
      <h4 className="h4-style">{title}</h4>
      <span className="text-sm text-white">{date}</span>
    </div>
    <p className="text-gray-400 mt-1 max-w-4xl mx-auto">{description}</p>
  </div>
)
