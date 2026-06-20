import { useEffect, useRef, useState } from 'react'
import globeIcon from '@/assets/icons/globe_dark.svg'
import { LANGUAGES } from '@/constants/languages'

interface LanguageSwitcherProps {
  currentLang: string
  onChange: (lng: 'en' | 'cs') => void
}

export const LanguageSwitcher = ({ currentLang, onChange }: LanguageSwitcherProps) => {
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
          className="w-4 sm:w-5 h-4 sm:h-5 object-contain transition-all duration-200 group-hover:brightness-[1.4]"
          loading="lazy"
        />
      </button>

      {isOpen && (
        <div
          className="absolute mt-2 left-0 bg-surface border border-border shadow-md rounded-md text-sm z-50 min-w-25 overflow-hidden"
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
              className={`w-full text-left px-4 py-2 hover:bg-accent/20 cursor-pointer text-white transition-all duration-200 ${
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
