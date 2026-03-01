import { motion } from 'motion/react'
import { useTranslation } from 'react-i18next'
import AnimatedHeading from '../AnimatedHeading'
import { Button } from '../Button'

// Constants
/** Fallback email if translation is missing */
const FALLBACK_EMAIL = 'email@example.com'

/**
 * Contact component
 *
 * Renders the contact section with an animated heading and email contact link.
 *
 * @returns Contact section element
 */
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
          transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
        >
          <AnimatedHeading />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ duration: 0.4, delay: 0.15, ease: [0.25, 1, 0.5, 1] }}
        >
          <Button href={`mailto:${email}`} aria-label={`Send email to ${email}`}>
            {email}
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
