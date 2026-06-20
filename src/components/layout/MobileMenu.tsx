import { useEffect, useRef } from 'react'
import { SUPPORTED_LANGUAGES } from '@/constants/languages'
import { NAV_ITEMS } from '@/constants/navigation'
import { useTranslation } from '@/translations'

export interface MobileMenuProps {
  /** Whether the menu is open */
  menuOpen: boolean
  /** Function to toggle menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const { t, locale } = useTranslation()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const changeLanguage = (lng: 'en' | 'cs') => {
    locale.changeLanguage(lng)
  }

  const handleClose = () => {
    setMenuOpen(false)
  }

  const handleMenuItemClick = () => {
    setMenuOpen(false)
  }

  return (
    <div
      id="mobile-menu"
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-dark backdrop-blur-xl transition-all duration-(--duration-slow) ease-in-out ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!menuOpen}
    >
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none hover:scale-110 hover:opacity-80 transition-all duration-(--duration-fast) cursor-pointer"
        aria-label="Close menu"
        type="button"
        tabIndex={menuOpen ? 0 : -1}
      >
        &times;
      </button>

      <nav className="flex flex-col items-center space-y-6 mt-8" aria-label="Mobile menu">
        {NAV_ITEMS.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            onClick={handleMenuItemClick}
            className={`text-3xl font-semibold text-white tracking-tight transition-all duration-(--duration-slow) cursor-pointer hover:text-accent hover:scale-105 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${menuOpen ? index * 90 : 0}ms`,
            }}
            tabIndex={menuOpen ? 0 : -1}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      <div className="w-16 h-px bg-border my-8" aria-hidden="true" />

      <fieldset className="flex space-x-6 border-0 p-0 m-0">
        <legend className="sr-only">Language selection</legend>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = locale.language === lang

          return (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`text-sm font-medium transition-opacity duration-(--duration-fast) cursor-pointer ${
                isActive ? 'text-white' : 'text-gray hover:opacity-80'
              }`}
              aria-label={`Switch to ${lang.toUpperCase()}`}
              aria-pressed={isActive}
              tabIndex={menuOpen ? 0 : -1}
            >
              {lang.toUpperCase()}
            </button>
          )
        })}
      </fieldset>
    </div>
  )
}
