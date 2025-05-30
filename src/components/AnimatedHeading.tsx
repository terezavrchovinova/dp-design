import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const getCurlingSlide = () => {
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

export default function AnimatedHeading() {
  const { t } = useTranslation()
  const headingRef = useRef<HTMLHeadingElement>(null)

  const [scattered, setScattered] = useState<
    Record<
      number,
      { x: number; y: number; rotate: number; scale: number; opacity: number }
    >
  >({})

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setTimeout(() => setScattered({}), 300)
        }
      },
      { threshold: 0.1 },
    )

    const current = headingRef.current
    if (current) observer.observe(current)

    return () => {
      if (current) observer.unobserve(current)
    }
  }, [])

  const handleHover = (index: number) => {
    setScattered((prev) => ({
      ...prev,
      [index]: getCurlingSlide(),
    }))
  }

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
          {heading.split('').map((char, index) => (
            <motion.span
              key={index}
              className="inline-block"
              animate={
                scattered[index] ?? {
                  opacity: 1,
                  y: 0,
                  rotate: 0,
                  scale: 1,
                }
              }
              onHoverStart={() => handleHover(index)}
              transition={{ duration: 1, ease: [0.25, 1, 0.5, 1] }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h3>
      </div>
    </div>
  )
}
