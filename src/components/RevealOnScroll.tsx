import { useEffect, useRef } from 'react'

interface RevealOnScrollProps {
  children: React.ReactNode
}

export const RevealOnScroll = ({ children }: RevealOnScrollProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container || typeof IntersectionObserver === 'undefined') return

    const revealElements = container.querySelectorAll('[data-reveal-child]')

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100', 'translate-y-0')
            entry.target.classList.remove('opacity-0', 'translate-y-6')
            obs.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    Array.from(revealElements).forEach((el) => observer.observe(el))

    return () => {
      Array.from(revealElements).forEach((el) => observer.unobserve(el))
    }
  }, [])

  return <div ref={containerRef}>{children}</div>
}
