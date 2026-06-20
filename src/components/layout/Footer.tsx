import { useTranslation } from '@/translations'

export const Footer = () => {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full mt-12 bg-dark">
      <div className="footer-safe-area max-w-6xl mx-auto text-gray">
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
