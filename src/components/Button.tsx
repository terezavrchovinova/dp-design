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
    'relative inline-block py-3 px-6 rounded-xl font-semibold overflow-hidden transition-all duration-300 ease-out'
  const variants = {
    primary:
      'text-white bg-gradient-to-r from-blue-500 to-blue-400 bg-[length:200%_auto] bg-left hover:bg-right shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5',
    outline:
      'text-blue-400 border border-blue-500/50 hover:text-white hover:bg-blue-500/10 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-0.5',
  }

  const shine =
    variant === 'primary'
      ? 'absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-white/30 to-transparent skew-x-[-20deg] hover:left-[130%] transition-all duration-500 ease-in-out'
      : 'absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.2),transparent_70%)] opacity-0 hover:opacity-100 transition-opacity duration-300'

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
      <span className={shine} />
    </a>
  )
}
