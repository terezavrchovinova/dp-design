import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/',
  plugins: [react()],
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
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'i18n-vendor': ['i18next', 'react-i18next'],
          'animation-vendor': ['motion', 'lottie-react'],
          'analytics-vendor': ['@vercel/analytics', '@vercel/speed-insights'],
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
