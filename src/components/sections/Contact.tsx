import * as m from 'motion/react-m'
import { useTranslation } from 'react-i18next'
import { FALLBACK_EMAIL } from '../../constants/contact'
import { DEFAULT_TRANSITION } from '../../constants/motion'
import { AnimatedHeading } from '../AnimatedHeading'
import { Button } from '../Button'

export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <section
      id="contact"
      className="section bg-dark flex flex-col items-center justify-center scroll-mt-[calc(-50vh+4rem)]"
      aria-label="Contact section"
    >
      <div className="w-full max-w-[1600px] px-6 sm:px-10 mx-auto flex flex-col items-center justify-center text-center">
        <m.div
          className="mb-5"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={DEFAULT_TRANSITION}
        >
          <AnimatedHeading />
        </m.div>

        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-30px' }}
          transition={{ ...DEFAULT_TRANSITION, delay: 0.15 }}
        >
          <Button href={`mailto:${email}`} aria-label={`Send email to ${email}`}>
            {email}
          </Button>
        </m.div>
      </div>
    </section>
  )
}
