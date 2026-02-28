import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import type { Plugin } from 'vite'

export const SITE_URL_PLACEHOLDER = 'https://plaminkova.com'

/**
 * Replaces SITE_URL placeholder in robots.txt, sitemap.xml, and index.html at build time.
 * Set VITE_SITE_URL env var (e.g. in Vercel) to override the default.
 */
export function siteUrlPlugin(): Plugin {
  return {
    name: 'site-url',
    writeBundle() {
      const siteUrl = process.env.VITE_SITE_URL || SITE_URL_PLACEHOLDER
      const publicDir = join(process.cwd(), 'public')
      const distDir = join(process.cwd(), 'dist')

      for (const file of ['robots.txt', 'sitemap.xml']) {
        const srcPath = join(publicDir, file)
        const destPath = join(distDir, file)
        if (existsSync(srcPath) && existsSync(distDir)) {
          let content = readFileSync(srcPath, 'utf-8')
          if (content.includes(SITE_URL_PLACEHOLDER)) {
            content = content.replaceAll(SITE_URL_PLACEHOLDER, siteUrl)
            writeFileSync(destPath, content, 'utf-8')
          }
        }
      }

      // Replace site URL in index.html (OG tags, canonical, JSON-LD)
      const htmlPath = join(distDir, 'index.html')
      if (existsSync(htmlPath)) {
        let html = readFileSync(htmlPath, 'utf-8')
        html = html.replaceAll(SITE_URL_PLACEHOLDER, siteUrl)
        writeFileSync(htmlPath, html, 'utf-8')
      }
    },
  }
}
