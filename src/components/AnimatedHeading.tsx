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

  const heading = t('home.heading')

  return (
    <h1 ref={headingRef}>
      {heading.split('').map((char, index) => (
        <motion.span
          key={index}
          className="inline-block"
          animate={
            scattered[index]
              ? scattered[index]
              : { opacity: 1, y: 0, rotate: 0, scale: 1 }
          }
          onHoverStart={() => handleHover(index)}
          transition={{
            duration: 1,
            ease: [0.25, 1, 0.5, 1],
          }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </h1>
  )
}
