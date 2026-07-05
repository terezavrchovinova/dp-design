import * as m from 'motion/react-m'
import { AnimatedHeading } from '@/components/ui/AnimatedHeading'
import { EmailButton } from '@/components/ui/EmailButton'
import { FADE_UP_IN_VIEW, fadeUpDelayed } from '@/constants/motion'

export const Contact = () => (
  <section
    id="contact"
    className="section bg-dark flex flex-col items-center justify-center scroll-mt-[calc(-50vh+4rem)]"
    aria-label="Contact section"
  >
    <div className="section-container flex flex-col items-center justify-center text-center">
      <m.div className="mb-5" {...FADE_UP_IN_VIEW}>
        <AnimatedHeading />
      </m.div>

      <m.div {...fadeUpDelayed(16, 0.15)}>
        <EmailButton />
      </m.div>
    </div>
  </section>
)
