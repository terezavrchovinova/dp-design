import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import cs from './locales/cs/translation.json'
import en from './locales/en/translation.json'

const DEFAULT_LANGUAGE = 'cs'
const FALLBACK_LANGUAGE = 'en'

i18n.use(initReactI18next).init({
  showSupportNotice: false, // Suppress Locize promotional message in console
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
