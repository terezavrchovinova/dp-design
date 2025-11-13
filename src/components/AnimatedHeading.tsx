import { motion, type TargetAndTransition } from 'motion/react'
import { useState, useEffect, useRef, type Dispatch, type SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'

// Types
interface ScatterState extends TargetAndTransition {
  x?: number
  y?: number
  rotate?: number
  scale?: number
  opacity?: number
}

interface ScatteredState {
  [index: number]: ScatterState
}

// Constants
/** Animation reset delay in milliseconds */
const ANIMATION_RESET_DELAY = 300

/** Intersection observer threshold */
const INTERSECTION_THRESHOLD = 0.1

/**
 * Generates random scatter animation values for a letter
 *
 * @returns Scatter animation state object
 */
// Export for testing
export const getCurlingSlide = (): ScatterState => {
  const xDirection = Math.random() > 0.5 ? 1 : -1
  const yDirection = Math.random() > 0.5 ? 1 : -1

  return {
    x: xDirection * (100 + Math.random() * 80),
    y: yDirection * (100 + Math.random() * 80),
    rotate: xDirection * (30 + Math.random() * 30),
    scale: 1,
    opacity: 0.9,
  }
}

/**
 * Handles letter hover
 * Scatters the letter on hover with random animation values
 *
 * @param index - Index of the letter in the heading
 * @param setScattered - State setter for scattered animation state
 */
// Export for testing
export const handleHover = (
  index: number,
  setScattered: Dispatch<SetStateAction<ScatteredState>>,
) => {
  setScattered((prev) => ({
    ...prev,
    [index]: getCurlingSlide(),
  }))
}

/**
 * AnimatedHeading component
 *
 * Displays a heading with animated letters that scatter on hover (desktop only).
 * Uses IntersectionObserver to reset animations when out of view.
 *
 * @returns Animated heading element
 */
export default function AnimatedHeading() {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [scattered, setScattered] = useState<ScatteredState>({})

  // Reset animations when heading leaves viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          // Reset scattered state after a short delay
          setTimeout(() => {
            setScattered({})
          }, ANIMATION_RESET_DELAY)
        }
      },
      { threshold: INTERSECTION_THRESHOLD },
    )

    const current = headingRef.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [])

  const heading = t('footer.cta_collaborate')

  return (
    <div className="w-full py-8 flex justify-center items-center px-4">
      <div className="w-full max-w-5xl text-center">
        {/* Mobile View - Static Heading */}
        <h3 className="block md:hidden text-2xl font-semibold">{heading}</h3>

        {/* Desktop View - Animated Letters */}
        <h3
          ref={headingRef}
          className="hidden md:flex flex-wrap justify-center text-4xl leading-snug text-center"
        >
          {heading.split('').map((char, index) => {
            const animationState = scattered[index] ?? {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              x: 0,
            }

            return (
              <motion.span
                key={index}
                className="inline-block"
                animate={animationState}
                onHoverStart={() => handleHover(index, setScattered)}
                transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Preserve spaces using non-breaking space */}
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
        </h3>
      </div>
    </div>
  )
}
