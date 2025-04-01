import { motion } from 'framer-motion'
import { useState } from 'react'

// Text to display and animate
const heading = 'Daniela Plamínková'

// Creates a random animation style for scattering a letter
const getCurlingSlide = () => {
  const xDirection = Math.random() > 0.5 ? 1 : -1
  const yDirection = Math.random() > 0.5 ? 1 : -1
  return {
    x: xDirection * (150 + Math.random() * 100), // Random X movement
    y: yDirection * (150 + Math.random() * 100), // Random Y movement
    rotate: xDirection * (40 + Math.random() * 30), // Random rotation
    opacity: 0.9,
    scale: 1,
  }
}

export default function AnimatedHeading() {
  // Tracks which letters are animated
  const [scattered, setScattered] = useState<
    Record<
      number,
      { x: number; y: number; rotate: number; opacity: number; scale: number }
    >
  >({})

  // Triggers animation for a specific letter on hover
  const handleHover = (index: number) => {
    setScattered((prev) => ({
      ...prev,
      [index]: getCurlingSlide(),
    }))
  }

  return (
    <h1 className="text-8xl font-bold text-center w-screen">
      {/* Split the heading into individual characters */}
      {heading.split('').map((char, index) => {
        const isScattered = scattered[index]

        return (
          <motion.span
            key={index}
            className="inline-block"
            initial={{ x: 0, y: 0, rotate: 0, opacity: 1, scale: 1 }} // Start position
            animate={isScattered ? scattered[index] : {}} // Apply animation if available
            onHoverStart={() => handleHover(index)} // Animate on hover
            transition={{
              duration: 1.8,
              ease: [0.25, 1, 0.5, 1], // Smooth and playful easing
            }}
          >
            {char === ' ' ? '\u00A0' : char} {/* Keep spaces visible */}
          </motion.span>
        )
      })}
    </h1>
  )
}
