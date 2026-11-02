import * as m from 'motion/react-m'
import { Button } from '@/components/ui/Button'
import { DEFAULT_TRANSITION, TRANSITIONS } from '@/constants/motion'
import { useTranslation } from '@/translations'

/** Staggered load-time entrance shared by the hero tag, subtitle and CTA row. */
const heroFadeUp = (delay: number) =>
  ({
    initial: { opacity: 0, y: 8 },
    animate: { opacity: 1, y: 0 },
    transition: { ...DEFAULT_TRANSITION, delay },
  }) as const

export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="home-section relative flex flex-col justify-center min-h-screen w-full"
      aria-label="Home section"
    >
      <div
        className="home-glow absolute top-[40%] left-1/2 md:left-[30%] -translate-x-1/2 -translate-y-1/2 w-150 h-150 pointer-events-none"
        aria-hidden="true"
      />

      <div className="section-container relative z-10">
        <m.div
          className="flex flex-col items-center text-center md:items-start md:text-left w-full max-w-4xl"
          initial={{ y: 12 }}
          animate={{ y: 0 }}
          transition={TRANSITIONS.slow}
        >
          <m.span {...heroFadeUp(0.1)} className="eyebrow text-accent flex items-center gap-3 mb-7">
            <span className="hidden md:inline-block h-px w-10 bg-accent" aria-hidden="true" />
            {t('home.heroTag')}
          </m.span>

          <m.h1
            initial={{ y: 8 }}
            animate={{ y: 0 }}
            transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
            className="home-title flex flex-col items-center text-center md:items-start md:text-left"
          >
            <span>
              {t('home.titleLine1a')}
              <span className="font-serif italic text-accent relative inline-block">
                {t('home.titleLine1b')} {t('home.titleLine1b2')}
                {/* Hand-drawn underline: draws itself once the headline has settled. */}
                <svg
                  className="absolute left-0 bottom-[-0.06em] w-full h-[0.12em] overflow-visible"
                  viewBox="0 0 200 10"
                  preserveAspectRatio="none"
                  aria-hidden="true"
                >
                  <m.path
                    d="M2 8 C 50 2, 150 11, 198 4"
                    fill="none"
                    className="stroke-accent"
                    strokeWidth={3}
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ ...TRANSITIONS.draw, delay: 0.6 }}
                  />
                </svg>
              </span>
            </span>
            <span>
              {t('home.titleLine1c')} {t('home.titleLine2')}
            </span>
          </m.h1>

          <m.p
            {...heroFadeUp(0.3)}
            className="text-gray max-w-105 text-sm md:text-base leading-relaxed mb-10"
          >
            {t('home.subtitle')}
          </m.p>

          <m.div
            className="flex justify-center md:justify-start items-center flex-wrap gap-4"
            {...heroFadeUp(0.4)}
          >
            <Button href="#projects">{t('home.viewProjects')}</Button>
            <Button href="#contact" variant="outline">
              {t('home.contactMe')}
            </Button>
          </m.div>
        </m.div>
      </div>
    </section>
  )
}
