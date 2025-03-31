import { useTranslation } from 'react-i18next'

const services = [
  {
    key: 'design',
    img: '/src/assets/icons/visual-brand-design.png',
  },
  {
    key: 'video',
    img: '/src/assets/icons/video.png',
  },
  {
    key: 'digital',
    img: '/src/assets/icons/social-media.png',
  },
  {
    key: 'photo',
    img: '/src/assets/icons/camera.png',
  },
]

export const WhatIDo = () => {
  const { t } = useTranslation()

  return (
    <section
      id="what-i-do"
      className="min-h-screen flex items-center justify-center py-20"
    >
      <div className="w-full max-w-6xl space-y-12">
        <h2 className="h2-style text-center">{t('whatIDo.title')}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service) => (
            <div
              key={service.key}
              className="service-card flex items-center gap-6"
            >
              <div className="w-16 shrink-0">
                <img
                  src={service.img}
                  alt={t(`whatIDo.services.${service.key}.title`)}
                  className="w-12 h-12 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="w-full max-w-md">
                <h3 className="h3-style text-left text-white">
                  {t(`whatIDo.services.${service.key}.title`)}
                </h3>
                <p className="text-lg text-gray-400">
                  {t(`whatIDo.services.${service.key}.description`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
