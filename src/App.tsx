import { useState, lazy, Suspense, useEffect, type ReactNode } from 'react'
// Global styles & config
import './i18n'
import './index.css'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'

// Critical section - load immediately
import { Home } from './components/sections/Home'

// Lazy load non-critical sections
const Projects = lazy(() => import('./components/sections/Projects').then(m => ({ default: m.Projects })))
const WhatIDo = lazy(() => import('./components/sections/WhatIDo').then(m => ({ default: m.WhatIDo })))
const About = lazy(() => import('./components/sections/About').then(m => ({ default: m.About })))
const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.Contact })))

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [analyticsComponents, setAnalyticsComponents] = useState<ReactNode>(null)

  // Load analytics after page is interactive - using dynamic import
  useEffect(() => {
    const loadAnalytics = async () => {
      // Wait for page to be fully loaded and interactive
      if (document.readyState !== 'complete') {
        await new Promise((resolve) => {
          if (document.readyState === 'complete') {
            resolve(void 0)
          } else {
            window.addEventListener('load', resolve, { once: true })
          }
        })
      }

      // Use requestIdleCallback if available, otherwise setTimeout
      const scheduleLoad = (callback: () => void) => {
        if ('requestIdleCallback' in window) {
          requestIdleCallback(callback, { timeout: 4000 })
        } else {
          setTimeout(callback, 2500)
        }
      }

      scheduleLoad(async () => {
        try {
          // Dynamically import analytics only when needed
          const [{ Analytics }, { SpeedInsights }] = await Promise.all([
            import('@vercel/analytics/react'),
            import('@vercel/speed-insights/react'),
          ])

          setAnalyticsComponents(
            <>
              <SpeedInsights />
              <Analytics />
            </>
          )
        } catch {
          // Silently fail if analytics can't be loaded - non-critical
        }
      })
    }

    loadAnalytics()
  }, [])

  return (
    <>
      {analyticsComponents}
      <Navbar setMenuOpen={setIsMenuOpen} />
      <MobileMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      <main>
        <Home />
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
