/**
 * Internationalization (i18n) configuration
 * 
 * Sets up i18next for React with Czech (cs) as default language
 * and English (en) as fallback. Translations are loaded from
 * JSON files in the locales directory.
 */
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translation.json'
import cs from './locales/cs/translation.json'

// Supported languages
export const SUPPORTED_LANGUAGES = ['cs', 'en'] as const
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number]

// Default language (Czech)
const DEFAULT_LANGUAGE: SupportedLanguage = 'cs'

// Fallback language (English)
const FALLBACK_LANGUAGE: SupportedLanguage = 'en'

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      cs: { translation: cs },
    },
    lng: DEFAULT_LANGUAGE,
    fallbackLng: FALLBACK_LANGUAGE,
    interpolation: {
      escapeValue: false, // React already escapes values by default
    },
    react: {
      useSuspense: false, // Disable suspense to prevent loading issues
    },
  })

export default i18n
