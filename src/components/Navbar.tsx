import { motion } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../assets/icons/dp_icon_white.svg'
import globeDark from '../assets/icons/globe_dark.svg'
import globeLight from '../assets/icons/globe_light.svg'
import { LANGUAGES } from '../constants/i18n'
import { DEFAULT_TRANSITION } from '../constants/motion'
import { NAV_ITEMS } from '../constants/navigation'

const FALLBACK_EMAIL = 'email@example.com'

export interface NavbarProps {
  /** Whether the mobile menu is open */
  menuOpen: boolean
  /** Function to toggle mobile menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { t, i18n } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={DEFAULT_TRANSITION}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] navbar-safe-area"
      style={{
        backgroundColor: 'rgba(13,13,13,0.85)',
        backdropFilter: 'blur(12px)',
      }}
      aria-label="Main navigation"
    >
      <div className="hidden xl:flex xl:items-center xl:justify-between w-full relative">
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

        <div className="flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map(({ href, key }) => (
            <NavLink key={href} href={href} label={t(`nav.${key}`)} />
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <LanguageSwitcher currentLang={i18n.language} onChange={i18n.changeLanguage} />
          <EmailButton email={email} />
        </div>
      </div>

      <div className="flex xl:hidden items-center justify-between w-full">
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

interface LanguageSwitcherProps {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}

const LanguageSwitcher = ({ currentLang, onChange }: LanguageSwitcherProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

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
