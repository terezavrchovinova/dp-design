import * as m from 'motion/react-m'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { LazyLottie, type LottieAnimationData } from '@/components/ui/LazyLottie'
import { STAGGER, TRANSITIONS } from '@/constants/motion'
import { SERVICES } from '@/data/services'
import { useInViewOnce } from '@/hooks/useInViewOnce'

interface LottieAnimationProps {
  asset: LottieAnimationData
}

const LottieAnimation = ({ asset }: LottieAnimationProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isVisible = useInViewOnce(containerRef, { amount: 0.1 })

  return (
    <div ref={containerRef} className="w-16 h-16">
      {isVisible && (
        <m.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={TRANSITIONS.default}
          className="w-16 h-16"
        >
          <LazyLottie animationData={asset} className="w-16 h-16" loop autoplay />
        </m.div>
      )}
    </div>
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
      <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-black tracking-[-0.02em] mb-12">
        {t('whatIDo.title')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {SERVICES.map(({ key, asset }, index) => (
          <m.div
            key={key}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-20px' }}
            transition={{ ...TRANSITIONS.slow, delay: index * STAGGER.services }}
            className="hover-card bg-card rounded-2xl p-6 text-center sm:text-left hover:-translate-y-1 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div className="w-16 shrink-0 self-center sm:self-stretch flex items-center justify-center">
              <LottieAnimation asset={asset} />
            </div>
            <div className="min-w-0 flex flex-col items-center sm:items-start text-center sm:text-left">
              <h3 className="font-bold text-[20px] mb-2">{t(`whatIDo.services.${key}.title`)}</h3>
              <p className="text-gray text-[16px] leading-[1.6]">
                {t(`whatIDo.services.${key}.description`)}
              </p>
            </div>
          </m.div>
        ))}
      </div>
    </section>
  )
}
