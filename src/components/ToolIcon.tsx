type ToolIconProps = {
  name: string
  src: string
}

export const ToolIcon = ({ name, src }: ToolIconProps) => (
  <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
    <img
      src={src}
      alt={name}
      title={name}
      className="w-10 h-10 object-contain hover:scale-110 transition-transform duration-200"
    />
  </div>
)
