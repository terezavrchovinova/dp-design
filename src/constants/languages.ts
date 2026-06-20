export const LANGUAGES = [
  { code: 'cs' as const, label: 'Čeština' },
  { code: 'en' as const, label: 'English' },
] as const

/** Language codes, derived from LANGUAGES so there's a single source of truth. */
export const SUPPORTED_LANGUAGES = LANGUAGES.map((lang) => lang.code)
