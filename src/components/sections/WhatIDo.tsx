import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import photoIcon from '../../assets/icons/photography.json'
import digitalIcon from '../../assets/icons/social.json'
import videoIcon from '../../assets/icons/video.json'
// Lottie animation assets
import visualBrandDesign from '../../assets/icons/visual-brand-design.json'
import { LazyLottie } from '../LazyLottie'

// Types
interface Service {
  key: string
  asset: unknown
}

interface LottieAnimationProps {
  asset: unknown
}

// Constants
/** Intersection observer threshold for lazy loading */
const INTERSECTION_THRESHOLD = 0.1

/** Services configuration */
const SERVICES: Service[] = [
  { key: 'design', asset: visualBrandDesign },
  { key: 'video', asset: videoIcon },
  { key: 'digital', asset: digitalIcon },
  { key: 'photo', asset: photoIcon },
]

/**
 * LottieAnimation component
 *
 * Lazy-loads Lottie animations when they enter the viewport.
 * Improves initial page load performance.
 *
 * @param props - LottieAnimation component props
 * @returns Lottie animation container
 */
const LottieAnimation = ({ asset }: LottieAnimationProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: INTERSECTION_THRESHOLD }
    )

    const current = containerRef.current
    if (current) {
      observer.observe(current)
    }

    return () => {
      if (current) {
        observer.unobserve(current)
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-16 h-16">
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="w-16 h-16"
        >
          <LazyLottie animationData={asset} className="w-16 h-16" loop autoplay />
        </motion.div>
      )}
    </div>
  )
}

/**
 * WhatIDo component
 *
 * Renders a grid of services with animated Lottie icons.
 * Icons are lazy-loaded when they enter the viewport.
 *
 * @returns WhatIDo section element
 */
export const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section
      id="what-i-do"
      className="py-24 px-8 max-w-[960px] mx-auto text-center bg-[var(--color-dark)]"
      aria-label="Services section"
    >
      <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-12">
        {t('whatIDo.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map(({ key, asset }, index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
            className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 text-center sm:text-left transition-all duration-300 ease-out hover:border-[var(--color-accent)] hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(255,107,43,0.12)] flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div className="w-16 flex-shrink-0 self-center sm:self-stretch flex items-center justify-center">
              <LottieAnimation asset={asset} />
            </div>
            <div className="min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="font-bold !text-[20px] !mb-2">{t(`whatIDo.services.${key}.title`)}</h3>
              <p
                className="text-[var(--color-gray)] !text-[16px] leading-relaxed"
                style={{ lineHeight: 1.6 }}
              >
                {t(`whatIDo.services.${key}.description`)}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
