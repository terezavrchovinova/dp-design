import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
}

export const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
  const ref = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!ref.current) return

    const revealElements = ref.current.querySelectorAll('[data-reveal-child]')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-6')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    revealElements.forEach((el) => observer.observe(el))

    return () => {
      revealElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return <div ref={ref}>{children}</div>
}
