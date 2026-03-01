import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
// Assets
import logo from '../assets/icons/dp_icon_white.svg'
import globeDark from '../assets/icons/globe_dark.svg'
import globeLight from '../assets/icons/globe_light.svg'

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
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] navbar-safe-area"
      style={{
        backgroundColor: 'rgba(13,13,13,0.85)',
        backdropFilter: 'blur(12px)',
      }}
      aria-label="Main navigation"
    >
      {/* Desktop Navigation - logo left, links center, email right (xl+ only to avoid overlap) */}
      <div className="hidden xl:flex xl:items-center xl:justify-between w-full relative">
        {/* Logo - left */}
        <a href="#home" className="flex items-center shrink-0" aria-label="Home">
          <img
            src={logo}
            alt="Daniela Plamínková Logo"
            width={40}
            height={40}
            className="w-10 h-auto"
            fetchPriority="high"
          />
        </a>

        {/* Navigation Links - center */}
        <div className="flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_LINKS.map(({ href, key }) => (
            <NavLink key={href} href={href} label={t(key)} />
          ))}
        </div>

        {/* Language Switcher and Email - right */}
        <div className="flex items-center gap-4 shrink-0">
          <LanguageSwitcher currentLang={i18n.language} onChange={i18n.changeLanguage} />
          <EmailButton email={email} />
        </div>
      </div>

      {/* Mobile / Tablet Navigation - hamburger up to xl breakpoint */}
      <div className="flex xl:hidden items-center justify-between w-full">
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

        {/* Menu Toggle Button - hamburger (☰) always renders as text */}
        <button
          type="button"
          aria-label="Toggle Menu"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((prev) => !prev)}
          className="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 cursor-pointer hover:opacity-80 transition-opacity text-[var(--color-white)] text-2xl font-light leading-none"
        >
          &#9776;
        </button>
      </div>
    </motion.nav>
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
      className="text-sm transition-all duration-200 ease-out"
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
    className="py-[0.45rem] px-[1.3rem] rounded-[100px] bg-[var(--color-accent)] text-[var(--color-white)] text-[0.8rem] font-bold hover:opacity-90 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 ease-out cursor-pointer leading-none"
    aria-label={`Send email to ${email}`}
  >
    {email}
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
              className={`w-full text-left px-4 py-2 hover:bg-[var(--color-accent)]/20 cursor-pointer text-[var(--color-white)] transition-all duration-200 ease-out ${
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
