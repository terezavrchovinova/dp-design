import type { Plugin } from 'vite'

/**
 * Plugin to make CSS loading non-blocking by converting CSS links
 * to use media="print" trick, which prevents CSS from blocking rendering.
 * This only applies during production build.
 */
export function asyncCss(): Plugin {
  return {
    name: 'async-css',
    apply: 'build', // Only apply during build
    enforce: 'post', // Run after other plugins
    transformIndexHtml: (html: string): string => {
      // Find all CSS link tags and convert them to async loading
      return html.replace(
        /<link([^>]*?)rel=["']stylesheet["']([^>]*?)>/gi,
        (match: string): string => {
          // Skip if it's already async or has onload/media attributes
          if (match.includes('onload') || match.includes('media=')) {
            return match
          }

          // Extract href from the link tag to verify it's a CSS file
          const hrefMatch = match.match(/href=["']([^"']+)["']/)
          if (!hrefMatch || !hrefMatch[1].match(/\.css/)) {
            return match
          }

          // Use media trick: load with media="print" first, then change to "all"
          // This makes CSS non-blocking while still loading it early
          // Browsers don't block rendering on print media stylesheets
          const asyncMatch = match.replace(
            /rel=["']stylesheet["']/,
            'rel="stylesheet" media="print" onload="this.media=\'all\'"',
          )

          // Add noscript fallback for browsers without JavaScript
          return asyncMatch + '\n<noscript>' + match + '</noscript>'
        },
      )
    },
  }
}
