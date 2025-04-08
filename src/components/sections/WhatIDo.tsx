import { useTranslation } from 'react-i18next'

import visualBrandDesign from '../../assets/icons/visual-brand-design.png'
import videoIcon from '../../assets/icons/video.png'
import digitalIcon from '../../assets/icons/social-media.png'
import photoIcon from '../../assets/icons/camera.png'

const services = [
  { key: 'design', img: visualBrandDesign },
  { key: 'video', img: videoIcon },
  { key: 'digital', img: digitalIcon },
  { key: 'photo', img: photoIcon },
]

export const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section
      id="what-i-do"
      className="min-h-screen px-6 py-24 bg-dark flex items-center"
    >
      <div className="w-full max-w-6xl mx-auto">
        <h2>{t('whatIDo.title')}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
          {services.map(({ key, img }) => (
            <div
              key={key}
              className="flex flex-col sm:flex-row gap-6 sm:gap-8 p-6 sm:p-8 rounded-2xl shadow-xl hover:shadow-2xl transition bg-surface"
            >
              <div className="w-20 h-20 flex items-center justify-center">
                <img
                  src={img}
                  alt={t(`whatIDo.services.${key}.title`)}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col">
                <p className="text-2xl font-semibold text-white mb-2">
                  {t(`whatIDo.services.${key}.title`)}
                </p>
                <p className="text-lg leading-relaxed text-gray">
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
