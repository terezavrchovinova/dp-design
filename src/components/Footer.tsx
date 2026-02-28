import { useTranslation } from 'react-i18next'

/**
 * Footer component
 *
 * Renders the site footer with copyright, company information,
 * and legal details. Uses translations for internationalization.
 *
 * @returns Footer element
 */
export const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className="w-full mt-20 border-t backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(10,10,10,0.75)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 text-xs text-[var(--color-gray)]">
        <div className="flex flex-wrap justify-center space-x-8 space-y-2 md:space-y-0">
          {/* Copyright */}
          <p>
            © {currentYear} {t('footer.name')}
          </p>

          {/* ICO Number */}
          <p>{t('footer.ico')}</p>

          {/* Address */}
          <p>{t('footer.address')}</p>

          {/* Registration Info */}
          <p>{t('footer.registered')}</p>

          {/* Supervisory Authority */}
          <p>{t('footer.supervisoryAuthority')}</p>
        </div>
      </div>
    </footer>
  )
}
