import { useRef, useEffect, useState } from 'react'
import Lottie from 'lottie-react'
import { useTranslation } from 'react-i18next'

import visualBrandDesign from '../../assets/icons/visual-brand-design.json'
import videoIcon from '../../assets/icons/video.json'
import digitalIcon from '../../assets/icons/social.json'
import photoIcon from '../../assets/icons/photography.json'

const services = [
  { key: 'design', asset: visualBrandDesign, type: 'lottie' },
  { key: 'video', asset: videoIcon, type: 'lottie' },
  { key: 'digital', asset: digitalIcon, type: 'lottie' },
  { key: 'photo', asset: photoIcon, type: 'lottie' },
]

const LottieAnimation = ({ asset }: { asset: unknown }) => {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    observer.observe(container)

    return () => {
      observer.unobserve(container)
    }
  }, [])

  return (
    <div ref={containerRef} className="w-24 h-24">
      {isVisible && (
        <Lottie animationData={asset} className="w-24 h-24" loop autoplay />
      )}
    </div>
  )
}

const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section id="what-i-do" className="section bg-[var(--color-dark)]">
      <div className="container-content">
        <h2>{t('whatIDo.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {services.map(({ key, asset }) => (
            <div
              key={key}
              className="glass transition-smooth flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 hover:shadow-2xl text-center sm:text-left"
            >
              <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                <LottieAnimation asset={asset} />
              </div>

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

export default WhatIDo
export { WhatIDo }
