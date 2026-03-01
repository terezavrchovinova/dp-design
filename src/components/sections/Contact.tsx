import { useTranslation } from 'react-i18next'

// Constants
/** Fallback email if translation is missing */
const FALLBACK_EMAIL = 'email@example.com'

/**
 * Contact component
 *
 * Renders the contact section with a heading and email contact link.
 *
 * @returns Contact section element
 */
export const Contact = () => {
  const { t } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <section
      id="contact"
      className="min-h-screen flex items-center justify-center bg-[var(--color-dark)] px-6 py-20"
      aria-label="Contact section"
    >
      <div className="w-full flex flex-col items-center text-center">
        <h3 className="mb-8">{t('footer.cta_collaborate')}</h3>

        <a
          href={`mailto:${email}`}
          className="px-5 py-2.5 rounded-lg font-medium text-[var(--color-white)] border border-[var(--color-border)] hover:border-[var(--color-light-gray)] transition-colors duration-150"
          aria-label={`Send email to ${email}`}
        >
          {email}
        </a>
      </div>
    </section>
  )
}
