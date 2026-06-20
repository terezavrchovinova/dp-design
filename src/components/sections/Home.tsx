import * as m from 'motion/react-m'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/ui/Button'
import { DEFAULT_TRANSITION, TRANSITIONS } from '@/constants/motion'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="home-section relative flex flex-col items-center justify-center min-h-screen text-center w-full px-5 sm:px-8"
      aria-label="Home section"
    >
      <div
        className="home-glow absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none"
        aria-hidden="true"
      />

      <m.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-187.5"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={TRANSITIONS.slow}
      >
        <m.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.1 }}
          className="inline-block text-[0.72rem] font-bold tracking-[0.15em] uppercase rounded-full border leading-none py-[0.3rem] px-4 mb-[1.8rem] bg-accent-dim text-accent border-accent/30"
        >
          {t('home.heroTag')}
        </m.span>

        <m.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
          className="home-title max-w-187.5 flex flex-col items-center text-center"
        >
          <span className="whitespace-normal md:whitespace-nowrap">
            {t('home.titleLine1a')}
            <span className="font-['DM_Serif_Display'] italic text-accent">
              {t('home.titleLine1b')} {t('home.titleLine1b2')}
            </span>
          </span>
          <span className="whitespace-normal md:whitespace-nowrap">
            {t('home.titleLine1c')} {t('home.titleLine2')}
          </span>
        </m.h1>

        <m.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.3 }}
          className="text-gray max-w-105 mx-auto text-center text-sm md:text-base leading-[1.65] mb-10"
        >
          {t('home.subtitle')}
        </m.p>

        <m.div
          className="flex justify-center items-center flex-wrap gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.4 }}
        >
          <Button href="#projects">{t('home.viewProjects')}</Button>
          <Button href="#contact" variant="outline">
            {t('home.contactMe')}
          </Button>
        </m.div>
      </m.div>
    </section>
  )
}
