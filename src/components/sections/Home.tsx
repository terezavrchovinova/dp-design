import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import AnimatedHeading from '../AnimatedHeading'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 md:px-12"
      >
        <div className="flex flex-col items-center text-center mx-auto relative z-10">
          <AnimatedHeading />
          <p className="text-white w-140 mt-8 mb-12 text-xl">
            {t('home.subtitle')}
          </p>

          <div className="flex justify-center gap-4">
            <Button href="#projects">{t('home.viewProjects')}</Button>
            <Button href="#contact" variant="outline">
              {t('home.contactMe')}
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
