import { useState, lazy, Suspense } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
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

  return (
    <>
      <SpeedInsights />
      <Analytics />
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
