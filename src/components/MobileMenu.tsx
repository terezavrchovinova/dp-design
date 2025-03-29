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
  }, [menuOpen])

  const changeLanguage = (lng: 'en' | 'cs') => {
    i18n.changeLanguage(lng)
  }

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black backdrop-blur-lg z-40 flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out overflow-hidden
        ${
          menuOpen
            ? 'h-screen opacity-100 pointer-events-auto'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
    >
      {/* Close Button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col items-center space-y-6">
        {menuItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white transform transition-all duration-500
              ${
                menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }
            `}
            style={{
              transitionDelay: `${menuOpen ? index * 100 : 0}ms`,
            }}
          >
            {t(`nav.${item.key}`)}
          </a>
        ))}
      </nav>

      {/* Language Switcher */}
      <div className="flex space-x-4 mt-10">
        <button
          onClick={() => changeLanguage('en')}
          className={`text-white text-sm font-medium hover:underline ${
            i18n.language === 'en' ? 'underline' : 'opacity-60'
          }`}
        >
          EN
        </button>
        <span className="text-white opacity-50">|</span>
        <button
          onClick={() => changeLanguage('cs')}
          className={`text-white text-sm font-medium hover:underline ${
            i18n.language === 'cs' ? 'underline' : 'opacity-60'
          }`}
        >
          CZ
        </button>
      </div>
    </div>
  )
}
