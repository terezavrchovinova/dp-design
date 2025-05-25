type ToolIconProps = {
  name: string
  src: string
}

export const ToolIcon = ({ name, src }: ToolIconProps) => (
  <div
    className="
      w-12 h-12 md:w-14 md:h-14
      flex items-center justify-center
      rounded-lg
      transition
      duration-300
      ease-in-out
      hover:shadow-lg
      hover:scale-110
      hover:rotate-3
      cursor-pointer
    "
    title={name}
  >
    <img
      src={src}
      alt={name}
      className="w-10 h-10 object-contain"
      draggable={false}
    />
  </div>
)
