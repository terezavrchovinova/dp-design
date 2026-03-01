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
    'relative inline-block py-[0.85rem] px-8 rounded-[100px] font-bold text-[0.9rem]',
    'transition-all duration-200 ease-out',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border)]',
    'cursor-pointer',
    className,
  ].join(' ')

  // Variant-specific styles - plaminkova-inspired
  const variantStyles = {
    primary:
      'text-[var(--color-white)] bg-[var(--color-accent)] hover:opacity-[0.9] hover:scale-[1.02] active:scale-[0.98]',
    outline:
      'text-[var(--color-white)] border-[1.5px] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:scale-[1.02] active:scale-[0.98]',
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
