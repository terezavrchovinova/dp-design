import { useTranslation } from 'react-i18next'
import AnimatedHeading from '../AnimatedHeading'
import greenDot from '../../assets/icons/green_dot.json'
import Lottie from 'lottie-react'

export const Contact = () => {
  const { t } = useTranslation()

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-6 py-24"
    >
      <div className="w-full max-w-xl text-center">
        <AnimatedHeading />

        <div className="mt-10 inline-flex items-center justify-center gap-3">
          <a
            href={`mailto:${t('contact.email')}`}
            className="inline-block px-8 py-4 rounded-2xl font-medium text-lg text-[var(--color-dark)] bg-[var(--color-accent)] hover:bg-[var(--color-orange-light)] transition-colors duration-300 shadow-md"
          >
            {t('contact.email')}
          </a>

          <Lottie
            animationData={greenDot}
            loop={true}
            style={{ width: 30, height: 30 }}
          />
        </div>
      </div>
    </section>
  )
}
