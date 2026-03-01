import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { Button } from '../Button'

/**
 * Home component
 *
 * Renders the hero section with tag, title, subtitle, and action buttons.
 * Uses translations for internationalization.
 *
 * @returns Home section element
 */
export const Home = () => {
  const { t } = useTranslation()

  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center min-h-screen text-center px-8"
      style={{ paddingTop: '7rem', paddingBottom: '4rem' }}
      aria-label="Home section"
    >
      {/* Subtle radial glow behind hero */}
      <div
        className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,43,0.08) 0%, transparent 70%)',
        }}
        aria-hidden
      />

      <motion.div
        className="relative z-10 flex flex-col items-center max-w-[750px]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      >
        {/* Hero Tag */}
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: [0.25, 1, 0.5, 1] }}
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

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: [0.25, 1, 0.5, 1] }}
          className="max-w-[750px] flex flex-col items-center"
          style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', marginBottom: '1.5rem', lineHeight: 0.92 }}
        >
          <span className="whitespace-nowrap">
            {t('home.titleLine1a')}
            <span className="font-['DM_Serif_Display'] italic" style={{ color: 'var(--color-accent)' }}>
              {t('home.titleLine1b')} {t('home.titleLine1b2')}
            </span>
          </span>
          <span className="whitespace-nowrap">
            {t('home.titleLine1c')}{' '}{t('home.titleLine2')}
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: [0.25, 1, 0.5, 1] }}
          className="text-[var(--color-gray)] max-w-[420px]"
          style={{ fontSize: '1rem', lineHeight: 1.65, marginBottom: '2.5rem' }}
        >
          {t('home.subtitle')}
        </motion.p>

        {/* Call-to-Action Buttons */}
        <motion.div
          className="flex justify-center items-center flex-wrap gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: [0.25, 1, 0.5, 1] }}
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
