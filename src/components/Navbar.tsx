import { useEffect } from 'react'

interface NavbarProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const Navbar = ({ menuOpen, setMenuOpen }: NavbarProps) => {
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

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
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="#home" label="Home" />
            <NavLink href="#projects" label="Projects" />
            <NavLink href="#what-i-do" label="What I Do" />
            <NavLink href="#about" label="About" />
            <NavLink href="#contact" label="Contact" />
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
