import { lazy, Suspense, useEffect, useState } from 'react'

const LazyAnalytics = lazy(() =>
  import('@vercel/analytics/react').then((m) => ({ default: m.Analytics }))
)
const LazySpeedInsights = lazy(() =>
  import('@vercel/speed-insights/react').then((m) => ({ default: m.SpeedInsights }))
)

import './i18n'
import './index.css'

import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'
import { Navbar } from './components/Navbar'
import { Home } from './components/sections/Home'
import { ScrollAnimation } from './components/sections/ScrollAnimation'

const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({
    default: m.Projects,
  }))
)
const WhatIDo = lazy(() =>
  import('./components/sections/WhatIDo').then((m) => ({ default: m.WhatIDo }))
)
const About = lazy(() => import('./components/sections/About').then((m) => ({ default: m.About })))
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact }))
)

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
