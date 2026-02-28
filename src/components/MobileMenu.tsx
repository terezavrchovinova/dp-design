import { useEffect, useRef } from 'react'
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
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Prevent body scrolling when menu is open and manage focus
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
      // Move focus to close button when menu opens
      setTimeout(() => {
        closeButtonRef.current?.focus()
      }, 100)
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
      id="mobile-menu"
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-dark)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
        menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!menuOpen}
    >
      {/* Close Button */}
      <button
        ref={closeButtonRef}
        onClick={handleClose}
        className="absolute top-6 right-6 text-[var(--color-white)] text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 cursor-pointer"
        aria-label="Close menu"
        type="button"
        tabIndex={menuOpen ? 0 : -1}
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col items-center space-y-6 mt-8" aria-label="Mobile menu">
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
            tabIndex={menuOpen ? 0 : -1}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* Divider */}
      <div className="w-16 h-px bg-[var(--color-border)] my-8" aria-hidden="true" />

      {/* Language Switcher */}
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
                isActive
                  ? 'text-[var(--color-orange)] underline'
                  : 'text-[var(--color-gray)] hover:opacity-80'
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
