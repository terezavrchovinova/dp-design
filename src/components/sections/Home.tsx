import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_TRANSITION } from '../../constants/motion'
import { Button } from '../Button'

export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center w-full px-5 sm:px-8"
      style={{ paddingTop: 'calc(7rem + env(safe-area-inset-top, 0px))', paddingBottom: '4rem' }}
      aria-label="Home section"
    >
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full max-w-[750px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...DEFAULT_TRANSITION, duration: 0.5 }}
      >
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.1 }}
          className="inline-block text-[0.72rem] font-bold tracking-[0.15em] uppercase rounded-[100px] border leading-none"
          style={{
            padding: '0.3rem 1rem',
            marginBottom: '1.8rem',
            background: 'var(--color-accent-dim)',
            color: 'var(--color-accent)',
            borderColor: 'rgba(255,107,43,0.3)',
          }}
        >
          {t('home.heroTag')}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.2 }}
          className="max-w-[750px] flex flex-col items-center text-center"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}
        >
          <span className="whitespace-normal md:whitespace-nowrap">
            {t('home.titleLine1a')}
            <span
              className="font-['DM_Serif_Display'] italic"
              style={{ color: 'var(--color-accent)' }}
            >
              {t('home.titleLine1b')} {t('home.titleLine1b2')}
            </span>
          </span>
          <span className="whitespace-normal md:whitespace-nowrap">
            {t('home.titleLine1c')} {t('home.titleLine2')}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.3 }}
          className="text-[var(--color-gray)] max-w-[420px] mx-auto text-center text-sm md:text-base"
          style={{ lineHeight: 1.65, marginBottom: '2.5rem' }}
        >
          {t('home.subtitle')}
        </motion.p>

        <motion.div
          className="flex justify-center items-center flex-wrap gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.4 }}
        >
          <Button href="#projects">{t('home.viewProjects')}</Button>
          <Button href="#contact" variant="outline">
            {t('home.contactMe')}
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
