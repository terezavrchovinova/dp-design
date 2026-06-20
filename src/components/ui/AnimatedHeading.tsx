import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { TRANSITIONS } from '@/constants/motion'
import { handleHover, type ScatteredState } from '@/utils/scatter'

const ANIMATION_RESET_DELAY = 300
const INTERSECTION_THRESHOLD = 0.1

export const AnimatedHeading = () => {
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
        <h2 className="block md:hidden mb-0">{heading}</h2>

        <h2 ref={headingRef} className="hidden md:flex flex-wrap justify-center mb-0">
          {heading.split('').map((char, index) => {
            const animationState = scattered[index] ?? {
              opacity: 1,
              y: 0,
              rotate: 0,
              scale: 1,
              x: 0,
            }

            return (
              <m.span
                key={`${index}-${char}`}
                className="inline-block"
                animate={animationState}
                onHoverStart={() => handleHover(index, setScattered)}
                transition={TRANSITIONS.scatter}
              >
                {char === ' ' ? '\u00A0' : char}
              </m.span>
            )
          })}
        </h2>
      </div>
    </div>
  )
}
