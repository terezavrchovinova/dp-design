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
    className="w-10 h-10 flex items-center justify-center rounded opacity-70 hover:opacity-100 transition-opacity duration-150"
    title={name}
  >
    <img
      src={src}
      alt={name}
      width={32}
      height={32}
      className="w-8 h-8 object-contain"
      draggable={false}
      loading="lazy"
    />
  </div>
)
