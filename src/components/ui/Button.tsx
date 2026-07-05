import type { TargetAndTransition } from 'motion/react'
import * as m from 'motion/react-m'
import { TRANSITIONS } from '@/constants/motion'

type ButtonVariant = 'primary' | 'outline'
type ButtonElement = 'a' | 'button'
type ButtonType = 'button' | 'submit' | 'reset'
type ButtonSize = 'default' | 'compact'

export interface ButtonProps {
  /** Button content */
  children: React.ReactNode
  /** Link URL (used when as="a") */
  href?: string
  /** Visual style variant */
  variant?: ButtonVariant
  /** Size preset — `compact` is the smaller pill used in the navbar */
  size?: ButtonSize
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

const SIZE_STYLES: Record<ButtonSize, string> = {
  default: 'py-2 px-5 text-[0.8rem] md:py-[0.85rem] md:px-8 md:text-[0.9rem]',
  compact: 'py-[0.5rem] px-4 text-[0.8rem]',
}

const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary: 'text-white bg-accent-button',
  outline: 'text-white border-[1.5px] border-border',
}

const HOVER_EFFECTS: Record<ButtonVariant, TargetAndTransition> = {
  primary: {
    scale: 1.04,
    backgroundColor: 'var(--color-accent)',
    boxShadow: 'var(--btn-glow-primary)',
    transition: TRANSITIONS.fast,
  },
  outline: {
    scale: 1.04,
    borderColor: 'var(--btn-border-outline-hover)',
    backgroundColor: 'var(--btn-bg-outline-hover)',
    boxShadow: 'var(--btn-glow-outline)',
    transition: TRANSITIONS.fast,
  },
}

export const Button = ({
  children,
  href = '#',
  variant = 'primary',
  size = 'default',
  as = 'a',
  type = 'button',
  className = '',
  onClick,
  'aria-label': ariaLabel,
}: ButtonProps) => {
  const baseStyles = [
    'relative inline-block rounded-full font-bold',
    SIZE_STYLES[size],
    'focus:outline-none focus-visible:ring-1 focus-visible:ring-border',
    'cursor-pointer',
    className,
  ].join(' ')

  const motionProps = {
    whileHover: HOVER_EFFECTS[variant],
    whileTap: { scale: 0.98 },
    className: `${baseStyles} ${VARIANT_STYLES[variant]}`,
  }

  if (as === 'button') {
    return (
      <m.button type={type} onClick={onClick} aria-label={ariaLabel} {...motionProps}>
        {children}
      </m.button>
    )
  }

  return (
    <m.a href={href} aria-label={ariaLabel} {...motionProps}>
      {children}
    </m.a>
  )
}
