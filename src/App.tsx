import { useState } from 'react'
import { SpeedInsights } from '@vercel/speed-insights/react'
// Global styles & config
import './i18n'
import './App.css'
import './index.css'

// Components
import { Navbar } from './components/Navbar'
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
      <Navbar setMenuOpen={setIsMenuOpen} />
      <MobileMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      <main>
        <Home />
        <Projects />
        <WhatIDo />
        <About />
        <Contact />
      </main>
    </>
  )
}

export default App
