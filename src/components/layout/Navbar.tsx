import * as m from 'motion/react-m'
import logo from '@/assets/icons/dp_icon_white.svg'
import { Button } from '@/components/ui/Button'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
import { FALLBACK_EMAIL } from '@/constants/contact'
import { DEFAULT_TRANSITION } from '@/constants/motion'
import { NAV_ITEMS } from '@/constants/navigation'
import { useTranslation } from '@/translations'

export interface NavbarProps {
  /** Whether the mobile menu is open */
  menuOpen: boolean
  /** Function to toggle mobile menu state */
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  const { t, locale } = useTranslation()
  const email = t('contact.email') || FALLBACK_EMAIL

  return (
    <m.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={DEFAULT_TRANSITION}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border navbar-safe-area navbar-bar"
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
          <LanguageSwitcher currentLang={locale.language} onChange={locale.changeLanguage} />
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
          className="flex items-center justify-center w-10 h-10 min-w-10 min-h-10 cursor-pointer hover:opacity-80 transition-opacity text-white text-2xl font-light leading-none"
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
    className="text-sm text-gray hover:text-white transition-all duration-(--duration-fast)"
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
    size="compact"
    aria-label={`Send email to ${email}`}
  >
    {email}
  </Button>
)
