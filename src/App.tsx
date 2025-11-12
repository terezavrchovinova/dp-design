import { useState, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Global styles & i18n configuration
import './i18n'
import './index.css'

// Core components (loaded immediately)
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'
import { Home } from './components/sections/Home'

// Lazy load non-critical sections for code splitting
const Projects = lazy(() =>
  import('./components/sections/Projects').then((m) => ({
    default: m.Projects,
  })),
)
const WhatIDo = lazy(() =>
  import('./components/sections/WhatIDo').then((m) => ({ default: m.WhatIDo })),
)
const About = lazy(() =>
  import('./components/sections/About').then((m) => ({ default: m.About })),
)
const Contact = lazy(() =>
  import('./components/sections/Contact').then((m) => ({ default: m.Contact })),
)

/**
 * App component
 *
 * Manages the overall application structure, including navigation,
 * mobile menu state, and lazy-loaded sections.
 */
function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
