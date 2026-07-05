import { Fragment } from 'react'
import { useTranslation } from '@/translations'

/** Legal details shown after the copyright notice, in display order. */
const LEGAL_KEYS = ['ico', 'address', 'registered', 'supervisoryAuthority'] as const

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
          {LEGAL_KEYS.map((key) => (
            <Fragment key={key}>
              <span className="opacity-50">·</span>
              <span>{t(`footer.${key}`)}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  )
}
