import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { asyncCss } from './vite-plugin-async-css' // Temporarily disabled

export default defineConfig({
  base: '/',
  plugins: [react()], // asyncCss() temporarily disabled - using default React plugin config
  build: {
    // Use esbuild minifier instead of terser for better React 19 compatibility
    minify: 'esbuild',
    rollupOptions: {
      output: {
        // Manual chunks for better code splitting (re-enabled with safer configuration)
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            // React core - must be together for React 19 compatibility
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // i18n
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor'
            }
            // Animation libraries - motion and lottie can be separate
            if (id.includes('motion')) {
              return 'motion-vendor'
            }
            if (id.includes('lottie')) {
              return 'lottie-vendor'
            }
            // Analytics - separate chunk for lazy loading
            if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
              return 'analytics-vendor'
            }
            // Other vendor code
            return 'vendor'
          }
        },
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 600, // Increased to accommodate React 19 larger bundles
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    // Enable tree shaking
    modulePreload: {
      polyfill: false, // Disable module preload polyfill to reduce size
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'i18next', 'react-i18next', 'motion/react'],
    exclude: ['@vercel/analytics', '@vercel/speed-insights'], // Exclude analytics from pre-bundling
  },
})
