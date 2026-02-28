export interface ToolIconProps {
  /** Tool name for accessibility and tooltip */
  name: string
  /** Icon image source URL */
  src: string
}

/**
 * ToolIcon component
 *
 * Renders a tool icon with hover animations and accessibility attributes.
 *
 * @param props - ToolIcon component props
 * @returns Tool icon element
 */
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
    aria-label={name}
  >
    <img
      src={src}
      alt={name}
      width={40}
      height={40}
      className="w-10 h-10 object-contain"
      draggable={false}
      loading="lazy"
      decoding="async"
    />
  </div>
)
