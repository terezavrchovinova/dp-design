import * as m from 'motion/react-m'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import { FALLBACK_EMAIL } from '@/constants/contact'
import { DEFAULT_TRANSITION } from '@/constants/motion'
import { useTranslation } from '@/translations'

export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <section
      id="contact"
      className="section bg-dark flex flex-col items-center justify-center scroll-mt-[calc(-50vh+4rem)]"
      aria-label="Contact section"
    >
      <div className="section-container flex flex-col items-center justify-center text-center">
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
