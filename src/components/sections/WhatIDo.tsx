import Lottie from 'lottie-react'
import { useTranslation } from 'react-i18next'

import visualBrandDesign from '../../assets/icons/visual-brand-design.json'
import videoIcon from '../../assets/icons/video.png'
import digitalIcon from '../../assets/icons/social-media.png'
import photoIcon from '../../assets/icons/camera.png'

const services = [
  { key: 'design', asset: visualBrandDesign, type: 'lottie' },
  { key: 'video', asset: videoIcon, type: 'image' },
  { key: 'digital', asset: digitalIcon, type: 'image' },
  { key: 'photo', asset: photoIcon, type: 'image' },
]

export const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section id="what-i-do" className="section bg-[var(--color-dark)]">
      <div className="container-content">
        <h2>{t('whatIDo.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {services.map(({ key, asset, type }) => (
            <div
              key={key}
              className="glass transition-smooth flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8 p-6 sm:p-8 hover:shadow-2xl text-center sm:text-left"
            >
              <div className="w-24 h-24 flex items-center justify-center flex-shrink-0 mx-auto sm:mx-0">
                {type === 'lottie' ? (
                  <Lottie
                    animationData={asset}
                    className="w-24 h-24"
                    loop
                    autoplay
                  />
                ) : (
                  <img
                    src={type === 'image' ? (asset as string) : undefined}
                    alt={t(`whatIDo.services.${key}.title`)}
                    className="w-20 h-20 object-contain"
                    loading="lazy"
                  />
                )}
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
