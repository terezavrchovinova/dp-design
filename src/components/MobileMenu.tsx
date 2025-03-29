import { useEffect } from 'react'

interface MobileMenuProps {
  menuOpen: boolean
  setMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const menuItems = [
  { label: 'Home', href: '#home' },
  { label: 'What I Do', href: '#what-i-do' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
]

export const MobileMenu = ({ menuOpen, setMenuOpen }: MobileMenuProps) => {
  // Disable body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
  }, [menuOpen])

  return (
    <div
      className={`fixed top-0 left-0 w-full bg-black backdrop-blur-lg z-40 flex flex-col items-center justify-center
        transition-all duration-500 ease-in-out overflow-hidden
        ${
          menuOpen
            ? 'h-screen opacity-100 pointer-events-auto'
            : 'h-0 opacity-0 pointer-events-none'
        }`}
    >
      {/* Close Button */}
      <button
        onClick={() => setMenuOpen(false)}
        className="absolute top-6 right-6 text-white text-3xl focus:outline-none cursor-pointer"
        aria-label="Close Menu"
      >
        &times;
      </button>

      {/* Menu Items */}
      <nav className="flex flex-col items-center space-y-6">
        {menuItems.map((item, index) => (
          <a
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className={`text-2xl font-semibold text-white transform transition-all duration-500
              ${
                menuOpen
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }
            `}
            style={{
              transitionDelay: `${menuOpen ? index * 100 : 0}ms`,
            }}
          >
            {item.label}
          </a>
        ))}
      </nav>
    </div>
  )
}
