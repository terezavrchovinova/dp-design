import { motion } from 'motion/react'

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
  /** Accessible label for screen readers */
  'aria-label'?: string
}

const hoverTransition = { duration: 0.15, ease: 'easeOut' as const }

export const Button = ({
  children,
  href = '#',
  variant = 'primary',
  as = 'a',
  type = 'button',
  className = '',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const baseStyles = [
    'relative inline-block py-2 px-5 text-[0.8rem] md:py-[0.85rem] md:px-8 md:text-[0.9rem] rounded-[100px] font-bold',
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-[var(--color-border)]',
    'cursor-pointer',
    className,
  ].join(' ')

  const variantStyles = {
    primary: 'text-[var(--color-white)] bg-[var(--color-accent)]',
    outline: 'text-[var(--color-white)] border-[1.5px] border-[var(--color-border)]',
  }

  const motionProps = {
    whileHover:
      variant === 'primary'
        ? {
            scale: 1.04,
            boxShadow: '0 0 24px rgba(255, 107, 43, 0.35), 0 0 48px rgba(255, 107, 43, 0.15)',
            transition: hoverTransition,
          }
        : {
            scale: 1.04,
            borderColor: 'rgba(255, 107, 43, 0.6)',
            boxShadow: '0 0 20px rgba(255, 107, 43, 0.2), inset 0 0 20px rgba(255, 107, 43, 0.05)',
            transition: hoverTransition,
          },
    whileTap: { scale: 0.98 },
    className: `${baseStyles} ${variantStyles[variant]}`,
  }

  if (as === 'button') {
    return (
      <motion.button type={type} onClick={onClick} aria-label={ariaLabel} {...motionProps}>
        {children}
      </motion.button>
    )
  }

  return (
    <motion.a href={href} aria-label={ariaLabel} {...motionProps}>
      {children}
    </motion.a>
  )
}
