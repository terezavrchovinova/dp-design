import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Vite plugin to optimize HTML head with preconnect and preload directives
 * This reduces critical path latency by establishing connections early
 */
export function optimizeHead(): Plugin {
  return {
    name: 'optimize-head',
    writeBundle() {
      const htmlPath = join(process.cwd(), 'dist', 'index.html')
      if (!existsSync(htmlPath)) return

      try {
        let html = readFileSync(htmlPath, 'utf-8')

        // Add preconnect for external services (Vercel Analytics)
        const preconnects = [
          '<link rel="preconnect" href="https://vitals.vercel-insights.com" crossorigin>',
          '<link rel="preconnect" href="https://v1.vercel-analytics.com" crossorigin>',
          '<link rel="dns-prefetch" href="https://vitals.vercel-insights.com">',
          '<link rel="dns-prefetch" href="https://v1.vercel-analytics.com">',
        ]

        // Check if preconnects already exist
        const hasVercelPreconnect = html.includes('vercel-insights.com') || html.includes('vercel-analytics.com')
        
        // Insert preconnects after meta tags but before existing preloads
        if (!hasVercelPreconnect) {
          const metaEndMatch = html.match(/<meta[^>]*author[^>]*>/i)
          if (metaEndMatch) {
            const insertPoint = metaEndMatch.index! + metaEndMatch[0].length
            const before = html.substring(0, insertPoint)
            const after = html.substring(insertPoint)
            html = before + '\n\n    <!-- Preconnect to external services -->\n    ' + 
              preconnects.join('\n    ') + '\n' + after
          } else {
            // Fallback: insert after viewport meta
            const viewportMatch = html.match(/<meta[^>]*viewport[^>]*>/i)
            if (viewportMatch) {
              const insertPoint = viewportMatch.index! + viewportMatch[0].length
              const before = html.substring(0, insertPoint)
              const after = html.substring(insertPoint)
              html = before + '\n\n    <!-- Preconnect to external services -->\n    ' + 
                preconnects.join('\n    ') + '\n' + after
            } else {
              // Last resort: insert before closing head tag
              html = html.replace(
                '</head>',
                '    <!-- Preconnect to external services -->\n    ' +
                preconnects.join('\n    ') + '\n  </head>'
              )
            }
          }
        }
        
        // Note: modulepreload links are already added by Vite automatically
        // We just ensure preconnects are there for external services

        writeFileSync(htmlPath, html, 'utf-8')
        console.log(`✓ Added preconnect and preload directives for critical resources`)
      } catch (error) {
        console.warn('Failed to optimize HTML head:', error)
      }
    },
  }
}

