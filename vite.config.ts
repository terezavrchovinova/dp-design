import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { asyncCss } from './vite-plugin-async-css'

export default defineConfig({
  base: '/',
  plugins: [react(), asyncCss()],
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
        passes: 2, // Multiple passes for better optimization
        unsafe: true,
        unsafe_comps: true,
        unsafe_math: true,
        unsafe_methods: true,
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Separate node_modules into optimized chunks
          if (id.includes('node_modules')) {
            // React core
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            // i18n
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'i18n-vendor'
            }
            // Animation libraries
            if (id.includes('motion') || id.includes('lottie')) {
              return 'animation-vendor'
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
    chunkSizeWarningLimit: 500, // Lower limit to catch large chunks
    cssCodeSplit: true,
    sourcemap: false,
    reportCompressedSize: false,
    // Enable tree shaking
    modulePreload: {
      polyfill: false, // Disable module preload polyfill to reduce size
    },
  },
  optimizeDeps: {
    include: ['react', 'react-dom', 'i18next', 'react-i18next'],
    exclude: ['@vercel/analytics', '@vercel/speed-insights'], // Exclude analytics from pre-bundling
  },
})
