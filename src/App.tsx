import { useState } from 'react'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'
// Global styles & config
import './i18n'
import './index.css'

// Components
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { MobileMenu } from './components/MobileMenu'

// Sections
import { Home } from './components/sections/Home'
import { About } from './components/sections/About'
import { Projects } from './components/sections/Projects'
import { Contact } from './components/sections/Contact'
import { WhatIDo } from './components/sections/WhatIDo'

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
        <Projects />
        <WhatIDo />
        <About />
        <Contact />
        <Footer />
      </main>
    </>
  )
}

export default App
