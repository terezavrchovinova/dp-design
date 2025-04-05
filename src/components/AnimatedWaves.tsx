import { motion, useAnimation } from 'framer-motion'
import { useEffect } from 'react'

export default function AnimatedWaves() {
  const controls = useAnimation()

  useEffect(() => {
    controls.start({
      d: [
        'M0,100 C360,240 1080,-40 1440,100 L1440,200 L0,200 Z',
        'M0,100 C360,260 1080,-60 1440,100 L1440,200 L0,200 Z',
        'M0,100 C360,220 1080,-20 1440,100 L1440,200 L0,200 Z',
        'M0,100 C360,240 1080,-40 1440,100 L1440,200 L0,200 Z',
      ],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'loop',
        ease: 'easeInOut',
      },
    })
  }, [controls])

  return (
    <div className="w-full overflow-hidden z-50">
      <motion.svg viewBox="0 0 1440 200" className="">
        <motion.path fill="url(#fireGradient)" animate={controls} />
        <defs>
          <linearGradient id="fireGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{ stopColor: 'var(--color-orange)' }} />
            <stop offset="50%" style={{ stopColor: 'var(--color-red)' }} />
            <stop
              offset="100%"
              style={{ stopColor: 'var(--color-dark-red)' }}
            />
          </linearGradient>
        </defs>
      </motion.svg>
    </div>
  )
}
