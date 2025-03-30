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
      className={`fixed top-0 left-0 w-full h-screen z-40 bg-black backdrop-blur-lg flex flex-col items-center justify-center transition-all duration-500 ease-in-out ${
        menuOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Close Button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
        aria-label="Close menu"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav
        className="flex flex-col items-center space-y-6"
        role="navigation"
        aria-label="Mobile menu"
      >
        {menuItems.map((item, index) => (
          <a
            key={item.key}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white transform transition-all duration-500 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ transitionDelay: `${menuOpen ? index * 100 : 0}ms` }}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* Language Switcher */}
      <div className="flex space-x-4 mt-10">
        {['en', 'cs'].map((lang) => (
          <button
            key={lang}
            onClick={() => changeLanguage(lang as 'en' | 'cs')}
            className={`text-white text-sm font-medium hover:underline ${
              i18n.language === lang ? 'underline' : 'opacity-60'
            }`}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  )
}
