import { LazyMotion, MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Load Motion's DOM animation features lazily: the feature bundle (the bulk of
// `motion-vendor`) is fetched in a separate async chunk after first paint rather
// than blocking the initial load. The lightweight `m` components render statically
// until it resolves, then animate in.
const loadMotionFeatures = () => import('./motion-features').then((mod) => mod.default)

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found. Ensure index.html has a div with id="root"')
}

createRoot(rootElement).render(
  <StrictMode>
    <LazyMotion features={loadMotionFeatures} strict>
      {/* Honour the OS "reduce motion" setting: transform animations are skipped
          for those users; everyone else gets the design unchanged. */}
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </LazyMotion>
  </StrictMode>
)
