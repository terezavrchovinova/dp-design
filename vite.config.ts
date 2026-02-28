import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { criticalCSS } from './vite-plugin-critical-css'
import { optimizeHead } from './vite-plugin-optimize-head'
import { siteUrlPlugin } from './vite-plugin-site-url'

export default defineConfig({
  base: '/',
  plugins: [react(), criticalCSS(), optimizeHead(), siteUrlPlugin()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console statements in production
        drop_debugger: true, // Remove debugger statements
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
      },
    },
    rollupOptions: {
      output: {
        // Manual code splitting for better caching
        manualChunks: (id) => {
          // Separate lottie-react into its own chunk for lazy loading
          // This prevents it from being included in the main bundle
          if (id.includes('lottie-react') || id.includes('lottie-web')) {
            return 'lottie-vendor'
          }
          // Keep motion separate from lottie
          if (id.includes('motion')) {
            return 'motion-vendor'
          }
          // React core
          if (id.includes('react') || id.includes('react-dom')) {
            return 'react-vendor'
          }
          // i18n
          if (id.includes('i18next') || id.includes('react-i18next')) {
            return 'i18n-vendor'
          }
          // Analytics
          if (
            id.includes('@vercel/analytics') ||
            id.includes('@vercel/speed-insights')
          ) {
            return 'analytics-vendor'
          }
          // Default: let Vite handle other chunks
        },
        // Consistent asset naming with content hashing
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      },
    },
    chunkSizeWarningLimit: 1000, // Warn if chunk exceeds 1MB
    cssCodeSplit: true, // Split CSS into separate files
    sourcemap: false, // Disable sourcemaps for smaller builds
    reportCompressedSize: false, // Disable compressed size reporting for faster builds
  },
  optimizeDeps: {
    // Pre-bundle these dependencies for faster dev server startup
    include: ['react', 'react-dom', 'i18next', 'react-i18next'],
  },
})
