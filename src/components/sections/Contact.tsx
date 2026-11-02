import * as m from 'motion/react-m'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { Button } from '@/components/ui/Button'
import {
  DEFAULT_TRANSITION,
  ENTRANCE_DELAY,
  fadeUp,
  HEADING_REVEAL,
  VIEWPORT_CLOSE,
} from '@/constants/motion'
import { useTranslation } from '@/translations'

export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email')

  return (
    <section
      id="contact"
      className="section bg-dark flex flex-col items-center justify-center scroll-mt-[calc(-50vh+4rem)]"
      aria-label="Contact section"
    >
      <div className="section-container flex flex-col items-center justify-center text-center">
        <m.div className="mb-5" {...HEADING_REVEAL}>
          <AnimatedHeading />
        </m.div>

        <m.div
          {...fadeUp(16)}
          viewport={VIEWPORT_CLOSE}
          transition={{ ...DEFAULT_TRANSITION, delay: ENTRANCE_DELAY.cta }}
        >
          <Button href={`mailto:${email}`} aria-label={`Send email to ${email}`}>
            {email}
          </Button>
        </m.div>
      </div>
    </section>
  )
}
