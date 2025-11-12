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
        
        // Remove modulepreload for lottie-vendor (not on critical path, loads lazily)
        // This reduces critical path chain length
        html = html.replace(
          /<link rel="modulepreload"[^>]*lottie-vendor[^>]*>\s*/gi,
          ''
        )

        // Reorder modulepreload links: react-vendor should be first (most critical)
        // This ensures React loads before other dependencies
        const modulepreloadRegex = /<link rel="modulepreload"[^>]*>/gi
        const modulepreloads = html.match(modulepreloadRegex) || []
        
        if (modulepreloads.length > 0) {
          // Separate react-vendor from others
          const reactVendor = modulepreloads.find(link => link.includes('react-vendor'))
          const otherPreloads = modulepreloads.filter(link => !link.includes('react-vendor'))
          
          // Remove all modulepreloads
          html = html.replace(modulepreloadRegex, '')
          
          // Re-insert in optimal order: react-vendor first, then others
          // Insert before the script tag
          const scriptMatch = html.match(/<script[^>]*type="module"[^>]*>/i)
          if (scriptMatch) {
            const insertPoint = scriptMatch.index!
            const before = html.substring(0, insertPoint)
            const after = html.substring(insertPoint)
            
            const orderedPreloads = []
            if (reactVendor) orderedPreloads.push(reactVendor)
            orderedPreloads.push(...otherPreloads)
            
            html = before + orderedPreloads.map(link => '    ' + link).join('\n') + '\n    ' + after
          }
        }

        writeFileSync(htmlPath, html, 'utf-8')
        console.log(`✓ Optimized critical path: removed lottie-vendor preload, reordered modulepreloads`)
      } catch (error) {
        console.warn('Failed to optimize HTML head:', error)
      }
    },
  }
}

