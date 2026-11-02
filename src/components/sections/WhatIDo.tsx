import * as m from 'motion/react-m'
import { useState } from 'react'
import { LazyLottie, type LottieAnimationData } from '@/components/ui/LazyLottie'
import { STAGGER, TRANSITIONS } from '@/constants/motion'
import { SERVICES } from '@/data/services'
import { useInViewOnce } from '@/hooks/useInViewOnce'
import { useTranslation } from '@/translations'

interface ServiceRowProps {
  serviceKey: string
  asset: LottieAnimationData
  index: number
}

/** One entry of the services index: icon | title | one-liner, hairline-ruled. */
const ServiceRow = ({ serviceKey, asset, index }: ServiceRowProps) => {
  const { t } = useTranslation()
  const [hovered, setHovered] = useState(false)
  const [containerRef, isVisible] = useInViewOnce<HTMLDivElement>({ amount: 0.1 })

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ ...TRANSITIONS.slow, delay: index * STAGGER.services }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group border-b border-border py-8 flex flex-col sm:flex-row items-center gap-5 sm:gap-8"
    >
      <div ref={containerRef} className="w-16 h-16 shrink-0 flex items-center justify-center">
        {isVisible && (
          <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={TRANSITIONS.default}
            className="w-16 h-16"
          >
            <LazyLottie animationData={asset} className="w-16 h-16" loop playing={hovered} />
          </m.div>
        )}
      </div>

      <div className="min-w-0 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-8 flex-1 sm:group-hover:translate-x-2 transition-transform duration-(--duration-base)">
        <h3 className="section-title mb-0 sm:w-72 shrink-0">
          {t(`whatIDo.services.${serviceKey}.title`)}
        </h3>
        <p className="text-gray text-base leading-relaxed text-center sm:text-left">
          {t(`whatIDo.services.${serviceKey}.description`)}
        </p>
      </div>
    </m.div>
  )
}

export const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section
      id="what-i-do"
      className="py-24 px-8 max-w-240 mx-auto text-center bg-dark"
      aria-label="Services section"
    >
      <h2 className="mb-12">{t('whatIDo.title')}</h2>
      <div className="border-t border-border">
        {SERVICES.map(({ key, asset }, index) => (
          <ServiceRow key={key} serviceKey={key} asset={asset} index={index} />
        ))}
      </div>
    </section>
  )
}
