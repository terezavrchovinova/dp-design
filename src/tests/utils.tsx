import { type RenderOptions, render } from '@testing-library/react'
import i18n from 'i18next'
import type { ReactElement } from 'react'
import { I18nextProvider } from 'react-i18next'
import csTranslations from '../locales/cs/translation.json'
import enTranslations from '../locales/en/translation.json'

// Initialize i18n for tests with actual translation files
const testI18n = i18n.createInstance()
testI18n.init({
  lng: 'cs', // Default language (Czech) - matches the app default
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: { translation: enTranslations },
    cs: { translation: csTranslations },
  },
  react: {
    useSuspense: false, // Disable suspense to prevent loading issues
  },
})

/**
 * Get translation text for a given key
 * This allows tests to be language-agnostic by using translation keys
 */
export const getTranslation = (key: string, lang: 'en' | 'cs' = 'cs'): string => {
  return testI18n.getFixedT(lang)(key)
}

/**
 * Get translation text in both languages
 * Useful for tests that need to check content regardless of language
 */
export const getTranslations = (key: string): { en: string; cs: string } => {
  return {
    en: testI18n.getFixedT('en')(key),
    cs: testI18n.getFixedT('cs')(key),
  }
}

/**
 * Change test language
 */
export const setTestLanguage = (lang: 'en' | 'cs') => {
  testI18n.changeLanguage(lang)
}

/**
 * Reset test language to default
 */
export const resetTestLanguage = () => {
  testI18n.changeLanguage('cs')
}

/**
 * Get text in both languages - useful for finding elements regardless of language
 * Returns a regex pattern that matches either language version
 */
export const getTextInAnyLanguage = (key: string): RegExp => {
  const translations = getTranslations(key)
  // Escape special regex characters in both translations
  const escapeRegex = (str: string) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const pattern = `${escapeRegex(translations.en)}|${escapeRegex(translations.cs)}`
  return new RegExp(pattern, 'i')
}

/**
 * Get current language
 */
export const getCurrentLanguage = (): string => {
  return testI18n.language
}

// Custom render function that includes i18n provider
const AllTheProviders = ({ children }: { children: React.ReactNode }) => {
  return <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }
