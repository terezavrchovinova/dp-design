import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

const heading = 'Daniela Plamínková'

const getCurlingSlide = () => {
  const xDirection = Math.random() > 0.5 ? 1 : -1
  const yDirection = Math.random() > 0.5 ? 1 : -1
  return {
    x: xDirection * (150 + Math.random() * 100),
    y: yDirection * (150 + Math.random() * 100),
    rotate: xDirection * (40 + Math.random() * 30),
    opacity: 0.9,
    scale: 1,
  }
}

export default function AnimatedHeading() {
  const [scattered, setScattered] = useState<
    Record<
      number,
      { x: number; y: number; rotate: number; opacity: number; scale: number }
    >
  >({})
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Reset when out of view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setScattered({})
        }
      },
      {
        threshold: 0.1, // Trigger when at least 10% visible
      },
    )

    if (headingRef.current) {
      observer.observe(headingRef.current)
    }

    return () => {
      if (headingRef.current) {
        observer.unobserve(headingRef.current)
      }
    }
  }, [])

  const handleHover = (index: number) => {
    setScattered((prev) => ({
      ...prev,
      [index]: getCurlingSlide(),
    }))
  }

  return (
    <h1 ref={headingRef} className="text-8xl font-bold text-center w-screen">
      {heading.split('').map((char, index) => {
        const isScattered = scattered[index]

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }}
            animate={isScattered ? scattered[index] : {}}
            onHoverStart={() => handleHover(index)}
            transition={{
              duration: 1.8,
              ease: [0.25, 1, 0.5, 1],
            }}
          >
            {char === ' ' ? '\u00A0' : char}
          </motion.span>
        )
      })}
    </h1>
  )
}
