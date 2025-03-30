type School = {
  name: string
  years: string
  focus: string
}

export const SchoolCard = ({ name, years, focus }: School) => (
  <div className="mb-10 text-left">
    <h4 className="h4-style">{name}</h4>
    <p className="text-sm text-white">{years}</p>
    <p className="text-gray-400 mt-1 max-w-4xl mx-auto">{focus}</p>
  </div>
)
