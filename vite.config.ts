import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import removeConsole from 'vite-plugin-remove-console'
import { criticalCSS } from './vite-plugin-critical-css'
import { optimizeHead } from './vite-plugin-optimize-head'

export default defineConfig({
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    criticalCSS(),
    optimizeHead(),
    removeConsole({ includes: ['log', 'info', 'warn', 'error', 'debug'] }),
  ],
  build: {
    minify: 'esbuild', // 10x faster than terser; console removal handled by plugin above
    rollupOptions: {
      output: {
        // Manual code splitting for better caching. App code is left unassigned so
        // Vite keeps its lazy section chunks; only third-party deps are grouped.
        manualChunks: (id) => {
          if (!id.includes('node_modules')) {
            return undefined
          }
          // Separate the lottie player into its own chunk for lazy loading
          // This prevents it from being included in the main bundle
          if (id.includes('lottie-web')) {
            return 'lottie-vendor'
          }
          // Motion / framer-motion is intentionally left unassigned. Its DOM
          // animation feature graph is reached only through the lazy `import()` in
          // main.tsx, so Rollup emits it as an async chunk kept out of the eager
          // load. Forcing all of motion into one vendor chunk would drag those
          // features back into the eager graph (the lightweight `m` proxy and
          // `useInView` are imported statically), defeating the lazy load. Checked
          // before the React rule because motion's entry files are named react.mjs.
          if (id.includes('/motion/') || id.includes('/framer-motion/')) {
            return undefined
          }
          // React core
          if (id.includes('/react') || id.includes('/scheduler/')) {
            return 'react-vendor'
          }
          // Analytics
          if (id.includes('@vercel/analytics') || id.includes('@vercel/speed-insights')) {
            return 'analytics-vendor'
          }
          // Default: let Vite handle other chunks
          return undefined
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
    include: ['react', 'react-dom'],
  },
})
