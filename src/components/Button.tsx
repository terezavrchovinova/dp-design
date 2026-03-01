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
    'relative inline-block px-5 py-2.5 rounded-lg font-medium',
    'transition-colors duration-150',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border)]',
    'cursor-pointer',
    className,
  ].join(' ')

  // Variant-specific styles - minimal flat design
  const variantStyles = {
    primary:
      'text-[var(--color-dark)] bg-[var(--color-white)] hover:bg-[var(--color-light-gray)]',
    outline:
      'text-[var(--color-light-gray)] border border-[var(--color-border)] hover:text-[var(--color-white)] hover:border-[var(--color-light-gray)]',
  }

  // Render as button element
  if (as === 'button') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]}`}
      >
        {children}
      </button>
    )
  }

  // Render as anchor element
  return (
    <a href={href} className={`${baseStyles} ${variantStyles[variant]}`}>
      {children}
    </a>
  )
}
