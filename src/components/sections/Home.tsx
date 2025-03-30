import { RevealOnScroll } from '../RevealOnScroll'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import AnimatedWaves from '../AnimatedWaves'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12 bg-black"
      >
        <RevealOnScroll>
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto relative z-10">
            <h1
              className="text-5xl sm:text-7xl md:text-6xl font-extrabold leading-tight text-white opacity-0"
              data-reveal-child
            >
              DANIELA PLAMÍNKOVÁ
            </h1>

            <p
              className="text-white w-140 mt-8 mb-12 text-xl opacity-0"
              data-reveal-child
            >
              {t('home.subtitle')}
            </p>

            <div
              className="flex justify-center gap-4 opacity-0"
              data-reveal-child
            >
              <Button href="#projects">{t('home.viewProjects')}</Button>
              <Button href="#contact" variant="outline">
                {t('home.contactMe')}
              </Button>
            </div>
          </div>
        </RevealOnScroll>
      </section>

      {/* 🔥 This will render BELOW the hero section */}
      <AnimatedWaves />
    </>
  )
}
