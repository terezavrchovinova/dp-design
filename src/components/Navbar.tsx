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
        <div className="flex items-center justify-between h-16 relative w-full px-6">
          {/* Logo vlevo */}
          <a href="#home" className="flex items-center z-10" aria-label="Home">
            <img
              src={logo}
              alt="Daniela Plamínková Logo"
              className="w-16 h-auto"
            />
          </a>

          {/* Desktop Navigation - středové, bez absolute, flex-grow vyplní prostor */}
          <div className="hidden md:flex flex-grow justify-center space-x-6 z-10">
            <NavLink href="#home" label={t('nav.home')} />
            <NavLink href="#projects" label={t('nav.projects')} />
            <NavLink href="#what-i-do" label={t('nav.whatIDo')} />
            <NavLink href="#about" label={t('nav.about')} />
            <NavLink href="#contact" label={t('nav.contact')} />
          </div>

          {/* Language switcher a e-mail vpravo */}
          <div className="hidden md:flex items-center space-x-4 z-10">
            <LanguageSwitcher
              currentLang={i18n.language}
              onChange={i18n.changeLanguage}
            />

            <button
              onClick={() => (window.location.href = `mailto:${email}`)}
              className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-[var(--color-accent)] text-[var(--color-dark)] font-medium text-sm hover:bg-[var(--color-orange-light)] transition-colors duration-300 shadow-md"
              aria-label="Send Email"
              type="button"
            >
              <span>{email}</span>
              <Lottie
                animationData={greenDot}
                loop
                style={{ width: 20, height: 20 }}
              />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden flex flex-col justify-between w-7 h-5 z-50 cursor-pointer ml-auto"
          >
            {[...Array(3)].map((_, i) => (
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

const NavLink = ({ href, label }: { href: string; label: string }) => (
  <a
    href={href}
    className="text-sm font-medium tracking-wide transition-colors duration-200"
    style={{
      color: 'var(--color-gray)',
    }}
    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-white)')}
    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-gray)')}
  >
    {label}
  </a>
)

const languages: { code: 'en' | 'cs'; label: string }[] = [
  { code: 'cs', label: 'Čeština' },
  { code: 'en', label: 'English' },
]

const LanguageSwitcher = ({
  currentLang,
  onChange,
}: {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}) => {
  const [hovered, setHovered] = useState(false)
  const [open, setOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false)
        setHovered(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div
      className="relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      ref={dropdownRef}
    >
      <img
        src={hovered ? globeLight : globeDark}
        alt="Language selector"
        className="w-6 h-6 cursor-pointer transition duration-200"
        onClick={() => {
          setOpen((prev) => !prev)
          setHovered(false)
        }}
      />
      {open && (
        <div className="absolute mt-2 left-0 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md rounded-md text-sm z-50 min-w-[100px] overflow-hidden">
          {languages.map(({ code, label }) => (
            <div
              key={code}
              onClick={() => {
                onChange(code)
                setOpen(false)
                setHovered(false)
              }}
              className={`px-4 py-2 hover:bg-[var(--color-border)] cursor-pointer text-[var(--color-white)] ${
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
