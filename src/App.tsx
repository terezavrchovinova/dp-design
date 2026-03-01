import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { lazy, Suspense, useEffect, useState } from 'react'

// Global styles & i18n configuration
import './i18n'
import './index.css'

import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'
// Core components (loaded immediately)
import { Navbar } from './components/Navbar'
import { Home } from './components/sections/Home'
import { ScrollAnimation } from './components/sections/ScrollAnimation'

// Lazy load non-critical sections for code splitting
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

/**
 * App component
 *
 * Manages the overall application structure, including navigation,
 * mobile menu state, and lazy-loaded sections.
 */
const XL_BREAKPOINT = 1280

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  // Prevent content jump on resize: when crossing below xl, scroll to top
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

  return (
    <>
      {/* Performance and analytics monitoring */}
      <SpeedInsights />
      <Analytics />

      {/* Navigation */}
      <Navbar menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />
      <MobileMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      {/* Main content */}
      <main>
        {/* Critical section - loaded immediately */}
        <Home />
        <div className="hidden xl:block">
          <ScrollAnimation />
        </div>

        {/* Non-critical sections - lazy loaded */}
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
