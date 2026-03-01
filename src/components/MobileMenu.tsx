import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

const SUPPORTED_LANGUAGES = ['cs', 'en'] as const

const MENU_ITEMS = [
  { key: 'home', href: '#home' },
  { key: 'whatIDo', href: '#what-i-do' },
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const

export interface MobileMenuProps {
  /** Whether the menu is open */
  menuOpen: boolean
  /** Function to toggle menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const { t, i18n } = useTranslation()
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
    i18n.changeLanguage(lng)
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
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-dark)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
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
        className="absolute top-6 right-6 text-[var(--color-white)] text-3xl focus:outline-none hover:scale-110 hover:opacity-80 transition-all duration-200 ease-out cursor-pointer"
        aria-label="Close menu"
        type="button"
        tabIndex={menuOpen ? 0 : -1}
      >
        &times;
      </button>

      <nav className="flex flex-col items-center space-y-6 mt-8" aria-label="Mobile menu">
        {MENU_ITEMS.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            onClick={handleMenuItemClick}
            className={`text-3xl font-semibold text-[var(--color-white)] tracking-tight transition-all duration-500 ease-out cursor-pointer hover:text-[var(--color-accent)] hover:scale-105 ${
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

      <div className="w-16 h-px bg-[var(--color-border)] my-8" aria-hidden="true" />

      <fieldset className="flex space-x-6 border-0 p-0 m-0">
        <legend className="sr-only">Language selection</legend>
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = i18n.language === lang

          return (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`text-sm font-medium transition-opacity duration-200 cursor-pointer ${
                isActive ? 'text-[var(--color-white)]' : 'text-[var(--color-gray)] hover:opacity-80'
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
