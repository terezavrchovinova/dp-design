import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import { DEFAULT_TRANSITION } from '../../constants/motion'
import { AnimatedHeading } from '../AnimatedHeading'
import { Button } from '../Button'

const FALLBACK_EMAIL = 'dancaplaminkova@sezenam.cz'

export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <section
      id="contact"
      className="section bg-[var(--color-dark)] flex flex-col items-center justify-center"
      style={{ scrollMarginTop: 'calc(-50vh + 4rem)' }}
      aria-label="Contact section"
    >
      <div className="w-full max-w-[1600px] px-6 sm:px-10 mx-auto flex flex-col items-center justify-center text-center">
        <motion.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={DEFAULT_TRANSITION}
        >
          <AnimatedHeading />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.15 }}
        >
          <Button href={`mailto:${email}`} aria-label={`Send email to ${email}`}>
            {email}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
