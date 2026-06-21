import { type RenderOptions, render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { getFixedT } from '@/translations'

/**
 * Get translation text for a given key.
 * This allows tests to be language-agnostic by using translation keys.
 */
export const getTranslation = (key: string, lang: 'en' | 'cs' = 'cs'): string => {
  return getFixedT(lang)(key)
}

/**
 * Get translation text in both languages.
 * Useful for tests that need to check content regardless of language.
 */
const getTranslations = (key: string): { en: string; cs: string } => {
  return {
    en: getFixedT('en')(key),
    cs: getFixedT('cs')(key),
  }
}

/**
 * Get text in both languages - useful for finding elements regardless of language.
 * Returns a regex pattern that matches either language version.
 */
export const getTextInAnyLanguage = (key: string): RegExp => {
  const translations = getTranslations(key)
  // Escape special regex characters in both translations
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = `${escapeRegex(translations.en)}|${escapeRegex(translations.cs)}`
  return new RegExp(pattern, 'i')
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, options)

export * from '@testing-library/react'
export { customRender as render }
