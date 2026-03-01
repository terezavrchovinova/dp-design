import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { DEFAULT_TRANSITION } from '../constants/motion'

export interface ToolIconProps {
  /** Tool name for accessibility and tooltip */
  name: string
  /** Icon image source URL */
  src: string
  /** Optional delay for staggered animation (seconds) */
  staggerDelay?: number
}

export const ToolIcon = ({ name, src, staggerDelay = 0 }: ToolIconProps) => {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-20px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={isInView ? { opacity: 0.45, scale: 1 } : { opacity: 0, scale: 0.6 }}
      whileHover={{
        opacity: 1,
        scale: 1.06,
        filter: 'brightness(1.25)',
        transition: { duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] },
      }}
      transition={{ ...DEFAULT_TRANSITION, delay: staggerDelay }}
      className="w-10 h-10 flex items-center justify-center rounded cursor-default"
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
