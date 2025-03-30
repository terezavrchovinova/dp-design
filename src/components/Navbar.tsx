import { useTranslation } from 'react-i18next'

interface NavbarProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation()

  return (
    <nav className="fixed top-0 w-full z-40 bg-black backdrop-blur-lg shadow-lg">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <a href="#home" className="flex items-center" aria-label="Home">
            <img
              src="/dp_icon_white.svg"
              alt="Daniela Plamínková Logo"
              className="w-8 h-8"
            />
          </a>

          {/* Mobile Hamburger */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-between w-7 h-5 z-50"
          >
            {[...Array(3)].map((_, i) => (
              <span
                key={i}
                className="block h-0.5 w-full bg-white rounded-sm"
              />
            ))}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink href="#home" label={t('nav.home')} />
            <NavLink href="#projects" label={t('nav.projects')} />
            <NavLink href="#what-i-do" label={t('nav.whatIDo')} />
            <NavLink href="#about" label={t('nav.about')} />
            <NavLink href="#contact" label={t('nav.contact')} />
            <LanguageSwitcher
              currentLang={i18n.language}
              onChange={i18n.changeLanguage}
            />
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

const LanguageSwitcher = ({
  currentLang,
  onChange,
}: {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}) => (
  <div className="flex space-x-2 ml-4">
    {['en', 'cs'].map((lng) => (
      <button
        key={lng}
        onClick={() => onChange(lng as 'en' | 'cs')}
        className={`text-sm font-medium hover:underline ${
          currentLang === lng ? 'text-white' : 'text-gray-400'
        }`}
      >
        {lng.toUpperCase()}
      </button>
    ))}
  </div>
)
