import { useTranslation } from 'react-i18next'
import { Button } from '../Button'
import AnimatedHeading from '../AnimatedHeading'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="section flex items-center justify-center min-h-screen"
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-[90%] w-full">
        <AnimatedHeading />

        <p className="mt-8 mb-12 text-xl text-center max-w-[560px] text-muted">
          {t('home.subtitle')}
        </p>

        <div className="flex justify-center items-center gap-4 flex-wrap text-center">
          <Button href="#projects">{t('home.viewProjects')}</Button>
          <Button href="#contact" variant="outline">
            {t('home.contactMe')}
          </Button>
        </div>
      </div>
    </section>
  )
}
