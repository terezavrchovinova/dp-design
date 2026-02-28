export type ButtonVariant = 'primary' | 'outline'
export type ButtonElement = 'a' | 'button'
export type ButtonType = 'button' | 'submit' | 'reset'

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode
  /** Link URL (used when as="a") */
  href?: string
  /** Visual style variant */
  variant?: ButtonVariant
  /** Element type to render */
  as?: ButtonElement
  /** Button type (used when as="button") */
  type?: ButtonType
  /** Additional CSS classes */
  className?: string
  /** Click handler (used when as="button") */
  onClick?: () => void
}

/**
 * Button component
 *
 * @param props - Button component props
 * @returns Button or anchor element based on `as` prop
 */
export const Button = ({
  children,
  href = '#',
  variant = 'primary',
  as = 'a',
  type = 'button',
  className = '',
  onClick,
}: ButtonProps) => {
  // Base styles shared by all button variants
  const baseStyles = [
    'relative inline-block px-6 py-3 rounded-xl font-semibold',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--color-orange-light)]',
    'cursor-pointer',
    className,
  ].join(' ')

  // Variant-specific styles
  const variantStyles = {
    primary: 'text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'text-[var(--color-orange)] border border-[var(--color-orange)] hover:text-white hover:bg-[var(--color-orange)]/10 hover:shadow-md hover:-translate-y-0.5',
  }

  // Primary variant uses gradient background
  const primaryStyle =
    variant === 'primary'
      ? {
          backgroundImage: 'var(--gradient-accent)',
          backgroundSize: '200% auto',
          backgroundPosition: 'left',
        }
      : undefined

  // Render as button element
  if (as === 'button') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`group ${baseStyles} ${variantStyles[variant]}`}
        style={primaryStyle}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  }

  // Render as anchor element
  return (
    <a href={href} className={`group ${baseStyles} ${variantStyles[variant]}`} style={primaryStyle}>
      <span className="relative z-10">{children}</span>
    </a>
  )
}
