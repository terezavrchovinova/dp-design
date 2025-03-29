import { RevealOnScroll } from '../RevealOnScroll'
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
    <RevealOnScroll>
      <section
        id="what-i-do"
        className="min-h-screen flex items-center justify-center py-20 px-4 bg-black"
      >
        <div className="max-w-6xl w-full space-y-6" data-reveal-child>
          <h2 className="h2-style" data-reveal-child>
            {t('whatIDo.title')}
          </h2>

          <div className="max-w-4xl w-full mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex items-center gap-6 p-6 bg-gradient-to-r from-gray-200 via-indigo-200 to-purple-200 to-pink-700 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="shrink-0 w-16">
                  <img
                    src={service.img}
                    alt={`${t(`whatIDo.services.${service.key}.title`)} icon`}
                    className="w-12 h-12 object-contain"
                  />
                </div>
                <div className="w-full max-w-[500px] self-center">
                  <h3 className="h3-style text-left">
                    {t(`whatIDo.services.${service.key}.title`)}
                  </h3>
                  <p className="text-sm text-gray-700">
                    {t(`whatIDo.services.${service.key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </RevealOnScroll>
  )
}
