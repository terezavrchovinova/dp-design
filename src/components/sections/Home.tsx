import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

/**
 * Home component
 *
 * Renders the hero section with title, subtitle, and action buttons.
 * Uses translations for internationalization.
 *
 * @returns Home section element
 */
export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="section flex items-center justify-center min-h-screen"
      aria-label="Home section"
    >
      <div className="flex flex-col items-center justify-center text-center relative z-10 max-w-[90%] w-full">
        {/* Main Title */}
        <h1>
          {t('home.titleLine1')}
          <br />
          {t('home.titleLine2')}
        </h1>

        {/* Subtitle */}
        <p className="mt-8 mb-12 text-xl md:text-2xl text-zinc-400">{t('home.subtitle')}</p>

        {/* Call-to-Action Buttons */}
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
