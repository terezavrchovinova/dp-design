type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'outline'
  as?: 'a' | 'button'
  type?: 'button' | 'submit' | 'reset'
  className?: string
  onClick?: () => void
}

export const Button = ({
  children,
  href = '#',
  variant = 'primary',
  as = 'a',
  type = 'button',
  className = '',
  onClick,
}: ButtonProps) => {
  const base = [
    'relative inline-block px-6 py-3 rounded-xl font-semibold',
    'transition-all duration-300 ease-in-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'focus-visible:ring-[var(--color-orange-light)]',
    'cursor-pointer',
    className,
  ].join(' ')

  const variants = {
    primary: 'text-white shadow-soft hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'text-[var(--color-orange)] border border-[var(--color-orange)] hover:text-white hover:bg-[var(--color-orange)]/10 hover:shadow-md hover:-translate-y-0.5',
  }

  const style =
    variant === 'primary'
      ? {
          backgroundImage: 'var(--gradient-accent)',
          backgroundSize: '200% auto',
          backgroundPosition: 'left',
        }
      : undefined

  if (as === 'button') {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`group ${base} ${variants[variant]}`}
        style={style}
      >
        <span className="relative z-10">{children}</span>
      </button>
    )
  }

  return (
    <a
      href={href}
      className={`group ${base} ${variants[variant]}`}
      style={style}
    >
      <span className="relative z-10">{children}</span>
    </a>
  )
}
