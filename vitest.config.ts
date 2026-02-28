import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
    include: ['src/tests/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'src/tests/',
        'e2e/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/',
        'vite-plugin-*.ts',
        'src/main.tsx',
        'src/App.tsx',
        'src/i18n.ts', // i18n configuration is tested via e2e tests
      ],
      // Allow lower coverage for specific files where some branches are tested via e2e
      thresholds: {
        lines: 95,
        functions: 85,
        branches: 85,
        statements: 95,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
