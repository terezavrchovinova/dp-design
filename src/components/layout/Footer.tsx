import { Fragment } from 'react'
import { useTranslation } from '@/translations'

export const Footer = () => {
  const { t } = useTranslation()
  const items = [
    `© ${new Date().getFullYear()} ${t('footer.name')}`,
    t('footer.ico'),
    t('footer.address'),
    t('footer.registered'),
    t('footer.supervisoryAuthority'),
  ]

  return (
    <footer className="w-full mt-12 bg-dark">
      <div className="footer-safe-area max-w-6xl mx-auto text-gray">
        <div className="flex flex-wrap justify-center items-center gap-x-2 sm:gap-x-4 gap-y-1 text-[10px] sm:text-xs text-center">
          {items.map((item, index) => (
            <Fragment key={item}>
              {index > 0 && <span className="opacity-50">·</span>}
              <span>{item}</span>
            </Fragment>
          ))}
        </div>
      </div>
    </footer>
  )
}
