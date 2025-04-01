import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import AnimatedHeading from '../AnimatedHeading'
import AnimatedWaves from '../AnimatedWaves'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <>
      <section
        id="home"
        className="min-h-[75vh] flex items-center justify-center"
      >
        <div className="flex flex-col items-center text-center mx-auto relative z-10 mt-50">
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
      <AnimatedWaves />
    </>
  )
}
