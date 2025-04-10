import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface MobileMenuProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const menuItems = [
  { key: 'home', href: '#home' },
  { key: 'whatIDo', href: '#what-i-do' },
  { key: 'about', href: '#about' },
  { key: 'projects', href: '#projects' },
  { key: 'contact', href: '#contact' },
]

export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const changeLanguage = (lng: 'en' | 'cs') => i18n.changeLanguage(lng)

  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col items-center justify-center bg-[var(--color-dark)] backdrop-blur-xl transition-all duration-500 ease-in-out ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-[var(--color-white)] text-3xl focus:outline-none hover:scale-110 transition-transform duration-200 cursor-pointer"
        aria-label="Close menu"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav
        className="flex flex-col items-center space-y-6 mt-8"
        role="navigation"
        aria-label="Mobile menu"
      >
        {menuItems.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`text-3xl font-semibold text-[var(--color-white)] tracking-tight transition-all duration-500 ease-out cursor-pointer ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${menuOpen ? index * 90 : 0}ms` }}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* Divider */}
      <div className="w-16 h-px bg-[var(--color-border)] my-8" />

      {/* Language Switcher */}
      <div className="flex space-x-6">
        {['en', 'cs'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang as 'en' | 'cs')}
            className={`text-sm font-medium transition-opacity duration-200 cursor-pointer ${
              i18n.language === lang
                ? 'text-[var(--color-orange)] underline'
                : 'text-[var(--color-gray)] hover:opacity-80'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
