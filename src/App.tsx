import { useState } from 'react'

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
import Dribbble from './components/sections/Dribbble'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <Navbar setMenuOpen={setIsMenuOpen} />
      <MobileMenu menuOpen={isMenuOpen} setMenuOpen={setIsMenuOpen} />

      <main>
        <Home />
        <Projects />
        <Dribbble />
        <WhatIDo />
        <About />
        <Contact />
      </main>
    </>
  )
}

export default App
