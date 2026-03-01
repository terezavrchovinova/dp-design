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
      className="w-full mt-12 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(10,10,10,0.75)',
      }}
    >
      <div
        className="max-w-6xl mx-auto py-4 text-[var(--color-gray)]"
        style={{
          paddingLeft: 'calc(1.5rem + env(safe-area-inset-left, 0px))',
          paddingRight: 'calc(1.5rem + env(safe-area-inset-right, 0px))',
          paddingBottom: 'calc(1rem + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 gap-y-1 text-[10px] sm:text-xs text-center">
          <span>
            © {currentYear} {t('footer.name')}
          </span>
          <span className="opacity-50">·</span>
          <span>{t('footer.ico')}</span>
          <span className="opacity-50">·</span>
          <span>{t('footer.address')}</span>
          <span className="opacity-50">·</span>
          <span>{t('footer.registered')}</span>
          <span className="opacity-50">·</span>
          <span>{t('footer.supervisoryAuthority')}</span>
        </div>
      </div>
    </footer>
  )
}
