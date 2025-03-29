import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'

interface NavbarProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation()

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  const changeLanguage = (lng: 'en' | 'cs') => {
    i18n.changeLanguage(lng)
  }

  return (
    <nav className="fixed top-0 w-full z-40 bg-black backdrop-blur-lg shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center">
            <img
              src="/dp_icon_white.svg"
              alt="Daniela Plamínková Logo"
              className="w-8 h-8"
            />
          </a>

          {/* Hamburger menu for mobile */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-between w-7 h-5 focus:outline-none z-50"
          >
            <span className="block h-0.5 w-full bg-white rounded-sm"></span>
            <span className="block h-0.5 w-full bg-white rounded-sm"></span>
            <span className="block h-0.5 w-full bg-white rounded-sm"></span>
          </button>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#home" label={t('nav.home')} />
            <NavLink href="#projects" label={t('nav.projects')} />
            <NavLink href="#what-i-do" label={t('nav.whatIDo')} />
            <NavLink href="#about" label={t('nav.about')} />
            <NavLink href="#contact" label={t('nav.contact')} />

            {/* Language Switcher */}
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => changeLanguage('en')}
                className={`text-sm font-medium hover:underline ${
                  i18n.language === 'en' ? 'text-white' : 'text-gray-400'
                }`}
              >
                EN
              </button>
              <span className="text-gray-500">|</span>
              <button
                onClick={() => changeLanguage('cs')}
                className={`text-sm font-medium hover:underline ${
                  i18n.language === 'cs' ? 'text-white' : 'text-gray-400'
                }`}
              >
                CZ
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="text-white hover:text-white transition-colors duration-200 text-sm font-medium tracking-wide"
  >
    {label}
  </a>
)
