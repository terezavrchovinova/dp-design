import { type ComponentType, lazy, Suspense, useEffect, useState } from 'react'
import { Footer } from '@/components/layout/Footer'
import { MobileMenu } from '@/components/layout/MobileMenu'
import { Navbar } from '@/components/layout/Navbar'
import { Home } from '@/components/sections/Home'
import { ScrollAnimation } from '@/components/sections/ScrollAnimation'

/** `React.lazy` for modules with named (non-default) component exports. */
function lazyNamed<K extends string>(load: () => Promise<Record<K, ComponentType>>, exportName: K) {
  return lazy(() => load().then((module) => ({ default: module[exportName] })))
}

const LazyAnalytics = lazyNamed(() => import('@vercel/analytics/react'), 'Analytics')
const LazySpeedInsights = lazyNamed(() => import('@vercel/speed-insights/react'), 'SpeedInsights')

const Projects = lazyNamed(() => import('@/components/sections/Projects'), 'Projects')
const WhatIDo = lazyNamed(() => import('@/components/sections/WhatIDo'), 'WhatIDo')
const About = lazyNamed(() => import('@/components/sections/About'), 'About')
const Contact = lazyNamed(() => import('@/components/sections/Contact'), 'Contact')

const XL_BREAKPOINT = 1280

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    let wasXl = window.innerWidth >= XL_BREAKPOINT

    const handleResize = () => {
      const isXl = window.innerWidth >= XL_BREAKPOINT
      if (wasXl && !isXl) {
        window.scrollTo({ top: 0, behavior: 'auto' })
      }
      wasXl = isXl
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const [showVercelScripts, setShowVercelScripts] = useState(false)
  useEffect(() => {
    if (import.meta.env.PROD && !window.location.hostname.includes('localhost')) {
      setShowVercelScripts(true)
    }
  }, [])

  return (
    <>
      {showVercelScripts && (
        <Suspense fallback={null}>
          <LazyAnalytics />
          <LazySpeedInsights />
        </Suspense>
      )}

      <Navbar menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
      <MobileMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      <main>
        <Home />
        <div className="hidden xl:block">
          <ScrollAnimation />
        </div>

        <Suspense fallback={null}>
          <Projects />
        </Suspense>
        <Suspense fallback={null}>
          <WhatIDo />
        </Suspense>
        <Suspense fallback={null}>
          <About />
        </Suspense>
        <Suspense fallback={null}>
          <Contact />
        </Suspense>

        <Footer />
      </main>
    </>
  )
}

export default App
