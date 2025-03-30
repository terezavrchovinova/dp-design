type School = {
  name: string
  years: string
  focus: string
}

export const SchoolCard = ({ name, years, focus }: School) => (
  <div className="backdrop-blur-md rounded-xl p-4 max-w-xl mx-auto shadow-sm text-left">
    <h4 className="h4-style">{name}</h4>
    <p className="text-sm text-white">{years}</p>
    <p className="text-white mt-1">{focus}</p>
  </div>
)
