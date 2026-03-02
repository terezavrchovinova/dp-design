import * as m from 'motion/react-m'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import logo from '../assets/icons/dp_icon_white.svg'
import globeIcon from '../assets/icons/globe_dark.svg'
import { Button } from './Button'
import { LANGUAGES } from '../constants/i18n'
import { DEFAULT_TRANSITION } from '../constants/motion'
import { NAV_ITEMS } from '../constants/navigation'

const FALLBACK_EMAIL = 'dancaplaminkova@sezenam.cz'

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
    <m.nav
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
    </m.nav>
  )
}

interface NavLinkProps {
  href: string
  label: string
}

const NavLink = ({ href, label }: NavLinkProps) => (
  <a
    href={href}
    className="text-sm text-[var(--color-gray)] hover:text-[var(--color-white)] transition-all duration-200 ease-out"
  >
    {label}
  </a>
)

interface EmailButtonProps {
  email: string
}

const EmailButton = ({ email }: EmailButtonProps) => (
  <Button
    as="a"
    href={`mailto:${email}`}
    variant="primary"
    className="!py-[0.5rem] !px-4 !text-[0.8rem]"
    aria-label={`Send email to ${email}`}
  >
    {email}
  </Button>
)

interface LanguageSwitcherProps {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}

const LanguageSwitcher = ({ currentLang, onChange }: LanguageSwitcherProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <div role="group" aria-label="Language switcher" className="relative group" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Change language"
        aria-expanded={isOpen}
        className="size-7 flex items-center justify-center cursor-pointer p-0"
      >
        <img
          src={globeIcon}
          alt="Language selector"
          width={20}
          height={20}
          className="w-4 sm:w-5 h-4 sm:h-5 object-contain transition-all duration-200 ease-out group-hover:brightness-[1.4]"
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
