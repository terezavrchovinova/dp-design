import { motion, type TargetAndTransition } from 'motion/react'
import { type Dispatch, type SetStateAction, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE_OUT_QUART } from '../constants/motion'

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

const ANIMATION_RESET_DELAY = 300
const INTERSECTION_THRESHOLD = 0.1

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

export const handleHover = (
  index: number,
  setScattered: Dispatch<SetStateAction<ScatteredState>>
) => {
  setScattered((prev) => ({
    ...prev,
    [index]: getCurlingSlide(),
  }))
}

export default function AnimatedHeading() {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const [scattered, setScattered] = useState<ScatteredState>({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTimeout(() => {
            setScattered({})
          }, ANIMATION_RESET_DELAY)
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
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
    <div className="w-full pt-4 pb-2 flex justify-center items-center px-4">
      <div className="w-full max-w-5xl text-center">
        <h2
          className="block md:hidden text-2xl md:text-3xl lg:text-4xl font-black !mb-0"
          style={{ letterSpacing: '-0.02em' }}
        >
          {heading}
        </h2>

        <h2
          ref={headingRef}
          className="hidden md:flex flex-wrap justify-center text-2xl md:text-3xl lg:text-4xl font-black text-center !mb-0"
          style={{ letterSpacing: '-0.02em' }}
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
                key={`${index}-${char}`}
                className="inline-block"
                animate={animationState}
                onHoverStart={() => handleHover(index, setScattered)}
                transition={{ duration: 1, ease: EASE_OUT_QUART }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
        </h2>
      </div>
    </div>
  )
}
