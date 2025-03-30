import { RevealOnScroll } from '../RevealOnScroll'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-6 md:px-12"
    >
      <RevealOnScroll>
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-extrabold leading-tight text-gradient opacity-0"
            data-reveal-child
          >
            {t('home.greeting')} <br />
            Daniela Plamínková
          </h1>

          <p
            className="text-white mt-8 mb-12 text-2xl opacity-0"
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

      {/* Blobs */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] bg-pink-400 opacity-20 blur-3xl rounded-full animate-blob z-0" />
      <div className="absolute bottom-0 right-0 w-[200px] h-[200px] bg-blue-500 opacity-20 blur-3xl rounded-full animate-blob animation-delay-2000 z-0" />
    </section>
  )
}
