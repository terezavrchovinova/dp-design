import { readFileSync } from 'node:fs'
import { join } from 'node:path'

// Load translation files using fs.readFileSync
// Using process.cwd() to get the project root since Playwright runs from project root
const projectRoot = process.cwd()
const enTranslations = JSON.parse(
  readFileSync(join(projectRoot, 'src/locales/en/translation.json'), 'utf-8')
)
const csTranslations = JSON.parse(
  readFileSync(join(projectRoot, 'src/locales/cs/translation.json'), 'utf-8')
)

/**
 * Get translation text for a given key in a specific language
 */
export const getTranslation = (key: string, lang: 'en' | 'cs' = 'cs'): string => {
  const translations = lang === 'en' ? enTranslations : csTranslations
  const keys = key.split('.')
  let value: unknown = translations

  for (const k of keys) {
    if (typeof value === 'object' && value !== null && k in (value as Record<string, unknown>)) {
      value = (value as Record<string, unknown>)[k]
    } else {
      return key // Return key if translation not found
    }
  }

  return typeof value === 'string' ? value : key
}

/**
 * Get translation text in both languages
 */
export const getTranslations = (key: string): { en: string; cs: string } => {
  return {
    en: getTranslation(key, 'en'),
    cs: getTranslation(key, 'cs'),
  }
}

/**
 * Get regex pattern that matches text in either language
 * Useful for Playwright tests that need to work with any language
 */
export const getTextPattern = (key: string): RegExp => {
  const translations = getTranslations(key)
  // Escape special regex characters in both translations
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = `${escapeRegex(translations.en)}|${escapeRegex(translations.cs)}`
  return new RegExp(pattern, 'i')
}

/**
 * Get array of translation texts in both languages
 * Useful for matching multiple possible strings
 */
export const getTextArray = (key: string): string[] => {
  const translations = getTranslations(key)
  return [translations.en, translations.cs]
}
