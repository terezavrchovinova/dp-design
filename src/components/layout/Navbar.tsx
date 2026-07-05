import * as m from 'motion/react-m'
import logo from '@/assets/icons/dp_icon_white.svg'
import { EmailButton } from '@/components/ui/EmailButton'
import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher'
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

  return (
    <m.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={DEFAULT_TRANSITION}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border navbar-safe-area navbar-bar"
      aria-label="Main navigation"
    >
      <div className="hidden xl:flex xl:items-center xl:justify-between w-full relative">
        <LogoLink variant="desktop" />

        <div className="flex items-center justify-center gap-8 absolute left-1/2 -translate-x-1/2">
          {NAV_ITEMS.map(({ href, key }) => (
            <NavLink key={href} href={href} label={t(`nav.${key}`)} />
          ))}
        </div>

        <div className="flex items-center gap-4 shrink-0">
          <LanguageSwitcher currentLang={locale.language} onChange={locale.changeLanguage} />
          <EmailButton size="compact" />
        </div>
      </div>

      <div className="flex xl:hidden items-center justify-between w-full">
        <LogoLink variant="mobile" />

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

/** The logo is slightly larger on desktop and needs different layout classes per bar. */
const LOGO_VARIANTS = {
  desktop: { anchor: 'shrink-0', img: 'w-10 h-auto', size: 40 },
  mobile: { anchor: 'z-10', img: 'w-9 h-auto', size: 36 },
} as const

const LogoLink = ({ variant }: { variant: keyof typeof LOGO_VARIANTS }) => {
  const { anchor, img, size } = LOGO_VARIANTS[variant]

  return (
    <a href="#home" className={`flex items-center ${anchor}`} aria-label="Home">
      <img
        src={logo}
        alt="Daniela Plamínková Logo"
        width={size}
        height={size}
        className={img}
        fetchPriority="high"
      />
    </a>
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
