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
      className="min-h-screen flex items-center justify-center py-24 px-6 bg-black"
    >
      <div className="w-full max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
          {t('whatIDo.title')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {services.map((service) => (
            <div
              key={service.key}
              className="flex items-center bg-dark rounded-xl shadow-lg px-8 py-6 gap-8 transition hover:shadow-xl"
            >
              <div className="w-20 h-20 flex items-center justify-center shrink-0">
                <img
                  src={service.img}
                  alt={t(`whatIDo.services.${service.key}.title`)}
                  className="w-14 h-14 object-contain"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-col justify-center">
                <h3 className="text-white text-2xl font-semibold mb-2">
                  {t(`whatIDo.services.${service.key}.title`)}
                </h3>
                <p className="text-gray text-lg leading-relaxed">
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
