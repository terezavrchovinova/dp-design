import type { Plugin } from 'vite'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { join } from 'path'

/**
 * Vite plugin to inline critical CSS and load the rest asynchronously
 * This reduces render-blocking CSS and improves LCP
 */
export function criticalCSS(): Plugin {
  let cssFileName: string | null = null

  return {
    name: 'critical-css',
    generateBundle(_options, bundle) {
      // Find the CSS file in the bundle
      const cssAsset = Object.values(bundle).find(
        (asset) => asset.type === 'asset' && asset.fileName.endsWith('.css'),
      )

      if (cssAsset && 'fileName' in cssAsset) {
        cssFileName = cssAsset.fileName
      }
    },
    writeBundle() {
      // Process HTML after bundle is written
      if (!cssFileName) return

      const htmlPath = join(process.cwd(), 'dist', 'index.html')
      if (!existsSync(htmlPath)) return

      try {
        let html = readFileSync(htmlPath, 'utf-8')
        const cssPath = join(process.cwd(), 'dist', cssFileName)

        if (!existsSync(cssPath)) return

        // Read the CSS file
        const fullCSS = readFileSync(cssPath, 'utf-8')

        // Extract critical CSS (first ~14KB for above-the-fold content)
        const criticalCSS = extractCriticalCSS(fullCSS)

        // Create inline style tag and async CSS loader
        const criticalStyleTag = `<style id="critical-css">${criticalCSS}</style>`
        // Use preload with onload for async CSS loading, with noscript fallback
        const asyncCSSLink = `<link rel="preload" href="/${cssFileName}" as="style" onload="this.onload=null;this.rel='stylesheet'"><noscript><link rel="stylesheet" href="/${cssFileName}"></noscript>`

        // Find and replace the blocking stylesheet link
        const stylesheetRegex = new RegExp(
          `<link[^>]*href="/${cssFileName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`,
          'i',
        )

        if (stylesheetRegex.test(html)) {
          html = html.replace(
            stylesheetRegex,
            criticalStyleTag + '\n    ' + asyncCSSLink,
          )
          writeFileSync(htmlPath, html, 'utf-8')
          console.log(
            `✓ Inlined critical CSS and made main CSS load asynchronously`,
          )
        }
      } catch (error) {
        console.warn('Failed to inline critical CSS:', error)
      }
    },
  }
}

/**
 * Extract critical CSS from the full CSS
 * Includes: CSS variables, base styles, typography, and essential utilities
 */
function extractCriticalCSS(fullCSS: string): string {
  // Extract CSS custom properties (variables)
  const variablesMatch = fullCSS.match(/@theme\s*\{[^}]*\}/s)
  const variables = variablesMatch ? variablesMatch[0] : ''

  // Extract @font-face
  const fontFaceMatch = fullCSS.match(/@font-face\s*\{[^}]*\}/s)
  const fontFace = fontFaceMatch ? fontFaceMatch[0] : ''

  // Extract html, body styles
  const htmlBodyMatch =
    fullCSS.match(/html[^}]*body[^}]*\{[^}]*\}/s) ||
    fullCSS.match(/html\s*,[^}]*\{[^}]*\}/s) ||
    fullCSS.match(/body\s*\{[^}]*\}/s)
  const htmlBody = htmlBodyMatch ? htmlBodyMatch[0] : ''

  // Extract h1, h2, h3 styles
  const headingsMatch = fullCSS.match(/h[1-3][^}]*\{[^}]*\}/gs)
  const headings = headingsMatch ? headingsMatch.join('\n') : ''

  // Extract .section utility (needed for Home section)
  const sectionMatch = fullCSS.match(/\.section\s*\{[^}]*\}/s)
  const section = sectionMatch ? sectionMatch[0] : ''

  // Get first 10KB of CSS (which typically contains most critical styles)
  // This is a fallback to ensure we get enough critical CSS
  const first10KB = fullCSS.substring(0, 10000)

  // Combine critical parts
  let critical =
    variables +
    '\n' +
    fontFace +
    '\n' +
    htmlBody +
    '\n' +
    headings +
    '\n' +
    section

  // If critical CSS is too small, use first 10KB as fallback
  if (critical.length < 5000) {
    critical = first10KB
  }

  // Limit to ~14KB (recommended size for inline CSS)
  if (critical.length > 14000) {
    critical = critical.substring(0, 14000)
    // Try to end at a complete rule
    const lastBrace = critical.lastIndexOf('}')
    if (lastBrace > 0) {
      critical = critical.substring(0, lastBrace + 1)
    }
  }

  return critical.trim()
}
