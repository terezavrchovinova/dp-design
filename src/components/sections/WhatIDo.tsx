import { useRef, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLottie } from '../LazyLottie'

// Lottie animation assets
import visualBrandDesign from '../../assets/icons/visual-brand-design.json'
import videoIcon from '../../assets/icons/video.json'
import digitalIcon from '../../assets/icons/social.json'
import photoIcon from '../../assets/icons/photography.json'

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
      { threshold: INTERSECTION_THRESHOLD },
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
    <div ref={containerRef} className="w-24 h-24">
      {isVisible && (
        <LazyLottie animationData={asset} className="w-24 h-24" loop autoplay />
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
      className="section bg-[var(--color-dark)]"
      aria-label="Services section"
    >
      <div className="container-content">
        {/* Section Title */}
        <h2>{t('whatIDo.title')}</h2>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {SERVICES.map(({ key, asset }) => (
            <div
              key={key}
              className="glass transition-smooth flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 hover:shadow-2xl text-center sm:text-left"
            >
              {/* Service Icon */}
              <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <LottieAnimation asset={asset} />
              </div>

              {/* Service Content */}
              <div className="flex flex-col justify-center h-full">
                <p className="section-title">
                  {t(`whatIDo.services.${key}.title`)}
                </p>
                <p className="section-description">
                  {t(`whatIDo.services.${key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
