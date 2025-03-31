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
      'text-white bg-gradient-to-r from-[orange] via-[red] to-[dark-red] bg-[length:200%_auto] bg-left hover:bg-right shadow-lg shadow-[#ff670080] hover:shadow-[#ff670060] hover:-translate-y-0.5',
    outline:
      'text-[#ff6700] border border-[#ff6700] hover:text-white hover:bg-[#ff67001a] hover:shadow-[0_0_20px_rgba(255,103,0,0.3)] hover:-translate-y-0.5',
  }

  const shine =
    variant === 'primary'
      ? 'absolute top-0 left-[-75%] w-1/2 h-full bg-gradient-to-r from-white/10 to-transparent skew-x-[-20deg] hover:left-[130%] transition-all duration-500 ease-in-out'
      : 'absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,103,0,0.1),transparent_70%)] hover:opacity-100 transition-opacity duration-300'

  return (
    <a href={href} className={`${base} ${variants[variant]}`}>
      <span className="relative z-10">{children}</span>
      <span className={shine} />
    </a>
  )
}
