type ButtonProps = {
  children: React.ReactNode
  href: string
  variant?: 'primary' | 'outline'
}

export const Button = ({
  children,
  href,
  variant = 'primary',
}: ButtonProps) => {
  const base =
    'relative inline-block px-6 py-3 rounded-2xl font-semibold transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variants = {
    primary:
      'text-white bg-[linear-gradient(90deg,var(--color-orange),var(--color-red),var(--color-dark-red))] bg-[length:200%_auto] bg-left hover:bg-right shadow-md hover:shadow-lg hover:-translate-y-0.5',
    outline:
      'border border-[var(--color-orange)] text-[var(--color-orange)] hover:bg-[var(--color-orange)]/10 hover:text-[var(--color-white)] hover:shadow-md hover:-translate-y-0.5',
  }

  return (
    <a href={href} className={`group ${base} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
    </a>
  )
}
