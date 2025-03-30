type Job = {
  title: string
  date: string
  description: string
}

export const JobCard = ({ title, date, description }: Job) => (
  <div className="backdrop-blur-md border rounded-xl p-4 shadow-sm text-left">
    <div className="flex justify-between items-center flex-wrap gap-2">
      <h4 className="h4-style">{title}</h4>
      <span className="text-sm text-white">{date}</span>
    </div>
    <p className="text-white mt-1">{description}</p>
  </div>
)
