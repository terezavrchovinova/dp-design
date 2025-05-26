import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../assets/icons/dp_icon_white.svg'
import greenDot from '../assets/icons/green_dot.json'
import globeLight from '../assets/icons/globe_light.svg'
import globeDark from '../assets/icons/globe_dark.svg'
import Lottie from 'lottie-react'

interface NavbarProps {
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const NAV_LINKS = [
  { href: '#home', key: 'nav.home' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#what-i-do', key: 'nav.whatIDo' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
] as const

const LANGUAGES = [
  { code: 'cs' as const, label: 'Čeština' },
  { code: 'en' as const, label: 'English' },
]

export const Navbar = ({ setMenuOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation()
  const email = t('contact.email')

  return (
    <nav
      className="fixed top-0 w-full z-40 backdrop-blur-lg border-b"
      style={{
        backgroundColor: 'rgba(10,10,10,0.75)',
        borderColor: 'var(--color-border)',
      }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop nav - unchanged */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-16 w-full px-6">
          <div className="flex items-center justify-start">
            <a href="#home" className="flex items-center" aria-label="Home">
              <img
                src={logo}
                alt="Daniela Plamínková Logo"
                className="w-16 h-auto"
              />
            </a>
          </div>

          <div className="flex items-center justify-center space-x-6">
            {NAV_LINKS.map(({ href, key }) => (
              <NavLink key={href} href={href} label={t(key)} />
            ))}
          </div>

          <div className="flex items-center justify-end space-x-4">
            <LanguageSwitcher
              currentLang={i18n.language}
              onChange={i18n.changeLanguage}
            />
            <EmailButton email={email} />
          </div>
        </div>

        {/* Mobile nav - only visible below md */}
        <div className="flex md:hidden items-center justify-between h-16 w-full px-4">
          <a href="#home" className="flex items-center z-10" aria-label="Home">
            <img
              src={logo}
              alt="Daniela Plamínková Logo"
              className="w-12 h-auto" // slightly smaller logo for mobile
            />
          </a>

          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col justify-between w-7 h-5 z-50 cursor-pointer"
          >
            {Array.from({ length: 3 }, (_, i) => (
              <span
                key={i}
                className="block h-0.5 w-full rounded-sm bg-[var(--color-white)]"
              />
            ))}
          </button>
        </div>
      </div>
    </nav>
  )
}

const NavLink = ({ href, label }: { href: string; label: string }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      className="text-sm transition-colors duration-200"
      style={{ color: isHovered ? 'var(--color-white)' : 'var(--color-gray)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </a>
  )
}

const EmailButton = ({ email }: { email: string }) => (
  <button
    onClick={() => (window.location.href = `mailto:${email}`)}
    className="flex items-center space-x-2 px-3 py-1.5 rounded-2xl bg-[var(--color-accent)] text-[var(--color-dark)] text-sm hover:bg-[var(--color-orange-light)] shadow-md cursor-pointer"
    aria-label="Send Email"
  >
    <span>{email}</span>
    <Lottie animationData={greenDot} loop style={{ width: 20, height: 20 }} />
  </button>
)

const LanguageSwitcher = ({
  currentLang,
  onChange,
}: {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false)
        setIsHovered(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={dropdownRef}
    >
      {/* Globe Icon */}
      <img
        src={isHovered ? globeLight : globeDark}
        alt="Language selector"
        className="w-5 sm:w-6 h-auto cursor-pointer transition duration-200"
        onClick={() => setIsOpen((prev) => !prev)}
      />

      {/* Language Dropdown */}
      {isOpen && (
        <div className="absolute mt-2 left-0 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md rounded-md text-sm z-50 min-w-[100px] overflow-hidden">
          {LANGUAGES.map(({ code, label }) => (
            <div
              key={code}
              onClick={() => {
                onChange(code)
                setIsOpen(false)
                setIsHovered(false)
              }}
              className={`px-4 py-2 hover:bg-[var(--color-border)] cursor-pointer text-[var(--color-white)] transition-colors duration-150 ${
                currentLang === code ? 'font-semibold' : ''
              }`}
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
