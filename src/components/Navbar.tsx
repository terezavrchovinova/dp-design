import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Assets
import logo from '../assets/icons/dp_icon_white.svg'
import globeDark from '../assets/icons/globe_dark.svg'
import globeLight from '../assets/icons/globe_light.svg'
import greenDot from '../assets/icons/green_dot.json'
import { LazyLottie } from './LazyLottie'

// Constants
export interface NavbarProps {
  /** Whether the mobile menu is open */
  menuOpen: boolean
  /** Function to toggle mobile menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

/** Navigation links configuration */
const NAV_LINKS = [
  { href: '#home', key: 'nav.home' },
  { href: '#projects', key: 'nav.projects' },
  { href: '#what-i-do', key: 'nav.whatIDo' },
  { href: '#about', key: 'nav.about' },
  { href: '#contact', key: 'nav.contact' },
] as const

/** Supported languages */
const LANGUAGES = [
  { code: 'cs' as const, label: 'Čeština' },
  { code: 'en' as const, label: 'English' },
] as const

/**
 * Navbar component
 *
 * Main navigation bar with responsive design. Shows full navigation
 * on desktop and a menu toggle button on mobile.
 *
 * @param props - Navbar component props
 * @returns Navigation bar element
 */
export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation()
  const email = t('contact.email')

  return (
    <nav
      className="fixed top-0 w-full z-40 backdrop-blur-lg"
      style={{
        backgroundColor: 'rgba(10,10,10,0.75)',
      }}
      aria-label="Main navigation"
    >
      <div className="max-w-6xl mx-auto">
        {/* Desktop Navigation */}
        <div className="hidden md:grid md:grid-cols-3 items-center h-16 w-full px-6">
          {/* Logo */}
          <div className="flex items-center justify-start">
            <a href="#home" className="flex items-center" aria-label="Home">
              <img
                src={logo}
                alt="Daniela Plamínková Logo"
                width={40}
                height={40}
                className="w-10 h-auto"
                fetchPriority="high"
              />
            </a>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center justify-center space-x-6">
            {NAV_LINKS.map(({ href, key }) => (
              <NavLink key={href} href={href} label={t(key)} />
            ))}
          </div>

          {/* Language Switcher and Email */}
          <div className="flex items-center justify-end space-x-4">
            <LanguageSwitcher currentLang={i18n.language} onChange={i18n.changeLanguage} />
            <EmailButton email={email} />
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center justify-between h-16 w-full px-4">
          {/* Logo */}
          <a href="#home" className="flex items-center z-10" aria-label="Home">
            <img
              src={logo}
              alt="Daniela Plamínková Logo"
              width={36}
              height={36}
              className="w-9 h-auto"
              fetchPriority="high"
            />
          </a>

          {/* Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="flex flex-col justify-between w-7 h-5 z-50 cursor-pointer"
          >
            {(['top', 'middle', 'bottom'] as const).map((id) => (
              <span key={id} className="block h-0.5 w-full rounded-sm bg-[var(--color-white)]" />
            ))}
          </button>
        </div>
      </div>
    </nav>
  )
}

/**
 * NavLink component
 *
 * Individual navigation link with hover effects.
 *
 * @param props - NavLink component props
 * @returns Navigation link element
 */
interface NavLinkProps {
  href: string
  label: string
}

const NavLink = ({ href, label }: NavLinkProps) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={href}
      className="text-lg transition-colors duration-200"
      style={{ color: isHovered ? 'var(--color-white)' : 'var(--color-gray)' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {label}
    </a>
  )
}

/**
 * EmailButton component
 *
 * Button that opens the default email client with the contact email.
 *
 * @param props - EmailButton component props
 * @returns Email button element
 */
interface EmailButtonProps {
  email: string
}

const EmailButton = ({ email }: EmailButtonProps) => (
  <button
    type="button"
    onClick={() => {
      window.location.href = `mailto:${email}`
    }}
    className="flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[var(--color-border)] text-[var(--color-gray)] text-sm hover:text-[var(--color-white)] hover:border-[var(--color-light-gray)] transition-colors cursor-pointer"
    aria-label={`Send email to ${email}`}
  >
    <span>{email}</span>
    <LazyLottie animationData={greenDot} loop style={{ width: 20, height: 20 }} />
  </button>
)

/**
 * LanguageSwitcher component
 *
 * Dropdown menu for switching between supported languages.
 *
 * @param props - LanguageSwitcher component props
 * @returns Language switcher element
 */
interface LanguageSwitcherProps {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}

const LanguageSwitcher = ({ currentLang, onChange }: LanguageSwitcherProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setIsHovered(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div
      role="group"
      aria-label="Language switcher"
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      ref={dropdownRef}
    >
      {/* Globe Icon */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="size-8 flex items-center justify-center cursor-pointer p-0"
      >
        <img
          src={isHovered ? globeLight : globeDark}
          alt="Language selector"
          width={24}
          height={24}
          className="w-5 sm:w-6 h-5 sm:h-6 object-contain transition duration-200"
          loading="lazy"
        />
      </button>

      {/* Language Dropdown */}
      {isOpen && (
        <div
          className="absolute mt-2 left-0 bg-[var(--color-surface)] border border-[var(--color-border)] shadow-md rounded-md text-sm z-50 min-w-[100px] overflow-hidden"
          role="menu"
          aria-label="Language options"
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              role="menuitem"
              onClick={() => {
                onChange(code)
                setIsOpen(false)
                setIsHovered(false)
              }}
              className={`w-full text-left px-4 py-2 hover:bg-[var(--color-border)] cursor-pointer text-[var(--color-white)] transition-colors duration-150 ${
                currentLang === code ? 'font-semibold' : ''
              }`}
              aria-label={`Switch to ${label}`}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
