import { useTranslation } from 'react-i18next'
import AnimatedHeading from '../AnimatedHeading'

// Constants
/** Fallback email if translation is missing */
const FALLBACK_EMAIL = 'email@example.com'

/**
 * Contact component
 *
 * Renders the contact section with an animated heading
 * and email contact link.
 *
 * @returns Contact section element
 */
export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-6 py-24"
      aria-label="Contact section"
    >
      <div className="w-full flex flex-col items-center text-center">
        {/* Animated Heading */}
        <AnimatedHeading />

        {/* Email Contact Link */}
        <div className="mt-10 flex items-center gap-2">
          <a
            href={`mailto:${email}`}
            className="px-6 py-3 rounded-xl font-medium text-[var(--color-dark)] bg-[var(--color-accent)] hover:bg-[var(--color-orange-light)] transition-colors duration-200"
            aria-label={`Send email to ${email}`}
          >
            {email}
          </a>
        </div>
      </div>
    </section>
  )
}
