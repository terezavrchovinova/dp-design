import { useTranslation } from 'react-i18next'
import AnimatedHeading from '../AnimatedHeading'

export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || 'email@example.com'

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-6 py-24"
    >
      <div className="w-full flex flex-col items-center text-center">
        <AnimatedHeading />

        <div className="mt-10 flex items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="px-6 py-3 rounded-xl font-medium text-[var(--color-dark)] bg-[var(--color-accent)] hover:bg-[var(--color-orange-light)]"
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  )
}
