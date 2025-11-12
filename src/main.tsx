import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ErrorBoundary } from './components/ErrorBoundary'

// Protect against React DevTools errors in production
// React DevTools extension can cause "Activity" property errors with React 19
if (import.meta.env.PROD && typeof window !== 'undefined') {
  try {
    // Safely handle React DevTools hook if it exists
    const devToolsHook = (
      window as unknown as {
        __REACT_DEVTOOLS_GLOBAL_HOOK__?: {
          renderersUpdate?: (...args: unknown[]) => void
        }
      }
    ).__REACT_DEVTOOLS_GLOBAL_HOOK__
    if (devToolsHook && devToolsHook.renderersUpdate) {
      // Wrap the renderersUpdate function to catch errors
      const originalRenderersUpdate = devToolsHook.renderersUpdate
      devToolsHook.renderersUpdate = function (...args: unknown[]) {
        try {
          return originalRenderersUpdate.apply(this, args)
        } catch {
          // Silently ignore React DevTools errors in production
          return
        }
      }
    }
  } catch {
    // Ignore errors when accessing DevTools hook
  }
}

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
// ErrorBoundary added to catch and recover from React DevTools errors
createRoot(document.getElementById('root')!).render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>,
)
