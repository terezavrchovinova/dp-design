import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

// Constants
/** Supported languages for mobile menu */
const SUPPORTED_LANGUAGES = ['cs', 'en'] as const

/** Menu items configuration */
const MENU_ITEMS = [
  { key: 'home', href: '#home' },
  { key: 'whatIDo', href: '#what-i-do' },
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
] as const

// Types
export interface MobileMenuProps {
  /** Whether the menu is open */
  menuOpen: boolean
  /** Function to toggle menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/**
 * MobileMenu component
 *
 * Full-screen mobile navigation menu with animated transitions.
 * Prevents body scrolling when open and includes language switcher.
 *
 * @param props - MobileMenu component props
 * @returns Mobile menu element
 */
export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const { t, i18n } = useTranslation()

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    // Cleanup: restore scrolling when component unmounts
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  /**
   * Changes the application language
   *
   * @param lng - Language code ('en' | 'cs')
   */
  const changeLanguage = (lng: 'en' | 'cs') => {
    i18n.changeLanguage(lng)
  }

  /**
   * Closes the menu
   */
  const handleClose = () => {
    setMenuOpen(false)
  }

  /**
   * Handles menu item click
   * Closes the menu when a navigation link is clicked
   */
  const handleMenuItemClick = () => {
    setMenuOpen(false)
  }

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-dark)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!menuOpen}
    >
      {/* Close Button */}
      <button
        onClick={handleClose}
        className="absolute top-6 right-6 text-[var(--color-white)] text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 cursor-pointer"
        aria-label="Close menu"
        type="button"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav
        className="flex flex-col items-center space-y-6 mt-8"
        role="navigation"
        aria-label="Mobile menu"
      >
        {MENU_ITEMS.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            onClick={handleMenuItemClick}
            className={`text-3xl font-semibold text-[var(--color-white)] tracking-tight transition-all duration-500 ease-out cursor-pointer ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: `${menuOpen ? index * 90 : 0}ms`,
            }}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* Divider */}
      <div
        className="w-16 h-px bg-[var(--color-border)] my-8"
        aria-hidden="true"
      />

      {/* Language Switcher */}
      <div
        className="flex space-x-6"
        role="group"
        aria-label="Language selection"
      >
        {SUPPORTED_LANGUAGES.map((lang) => {
          const isActive = i18n.language === lang

          return (
            <button
              key={lang}
              type="button"
              onClick={() => changeLanguage(lang)}
              className={`text-sm font-medium transition-opacity duration-200 cursor-pointer ${
                isActive
                  ? 'text-[var(--color-orange)] underline'
                  : 'text-[var(--color-gray)] hover:opacity-80'
              }`}
              aria-label={`Switch to ${lang.toUpperCase()}`}
              aria-pressed={isActive}
            >
              {lang.toUpperCase()}
            </button>
          )
        })}
      </div>
    </div>
  )
}
