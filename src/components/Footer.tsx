import { useTranslation } from 'react-i18next'

export const Footer = () => {
  const { t } = useTranslation()

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
          <p>
            © {new Date().getFullYear()} {t('footer.name')}
          </p>{' '}
          <p>{t('footer.ico')}</p>
          <p>{t('footer.address')}</p>
          <p>{t('footer.registered')}</p>
          <p>{t('footer.supervisoryAuthority')}</p>
        </div>
      </div>
    </footer>
  )
}
