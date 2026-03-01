import { motion, useInView } from 'motion/react'
import { useRef } from 'react'

export interface ToolIconProps {
  /** Tool name for accessibility and tooltip */
  name: string
  /** Icon image source URL */
  src: string
  /** Optional delay for staggered animation (seconds) */
  staggerDelay?: number
}

/**
 * ToolIcon component
 *
 * Renders a tool icon with entrance and hover animations.
 *
 * @param props - ToolIcon component props
 * @returns Tool icon element
 */
export const ToolIcon = ({ name, src, staggerDelay = 0 }: ToolIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 0.7, scale: 1 } : { opacity: 0, scale: 0.6 }}
      transition={{
        duration: 0.4,
        delay: staggerDelay,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="w-10 h-10 flex items-center justify-center rounded opacity-70 hover:opacity-100 hover:scale-110 transition-all duration-300 ease-out cursor-default"
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
    </motion.div>
  )
}
