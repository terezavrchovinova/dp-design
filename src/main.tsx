import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Register Service Worker for caching Usercentrics CMP files
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(() => {
        // Service Worker registered successfully
      })
      .catch(() => {
        // Service Worker registration failed - silently fail, non-critical
      })
  })
}

// StrictMode temporarily disabled due to React 19 compatibility issues
// TODO: Re-enable StrictMode once React 19 compatibility is confirmed
createRoot(document.getElementById('root')!).render(<App />)
