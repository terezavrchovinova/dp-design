import { useMemo, useSyncExternalStore } from 'react'
import cs from './locales/cs/translation.json'
import en from './locales/en/translation.json'

export type Language = 'cs' | 'en'

const DEFAULT_LANGUAGE: Language = 'cs'
const FALLBACK_LANGUAGE: Language = 'en'

/** A node in a translation tree: a leaf string, a list, or a nested object. */
type TranslationNode =
  | string
  | readonly TranslationNode[]
  | { readonly [key: string]: TranslationNode }

const resources = { cs, en } as Record<Language, TranslationNode>

/**
 * A translation function compatible with the small subset of the i18next `t`
 * API this app relies on: plain lookups, a positional string default value,
 * and `returnObjects` for the structured `about.*` content.
 */
export interface TFunction {
  // Structured content (e.g. `about.jobs`) is returned untyped, mirroring
  // i18next's own `returnObjects` typing; callers narrow it at the use site.
  (key: string, options: { returnObjects: true }): unknown
  (key: string, defaultValue?: string): string
}

/** Walk a dotted key (e.g. `about.jobs`) through a language's translation tree. */
function lookup(language: Language, key: string): TranslationNode | undefined {
  let node: TranslationNode | undefined = resources[language]
  for (const part of key.split('.')) {
    if (node && typeof node === 'object' && !Array.isArray(node)) {
      node = (node as { readonly [key: string]: TranslationNode })[part]
    } else {
      return undefined
    }
  }
  return node
}

function createT(language: Language): TFunction {
  const translate = (
    key: string,
    secondArg?: string | { returnObjects?: boolean }
  ): TranslationNode => {
    const value = lookup(language, key) ?? lookup(FALLBACK_LANGUAGE, key)

    if (secondArg && typeof secondArg === 'object' && secondArg.returnObjects) {
      return value ?? key
    }
    if (typeof value === 'string') {
      return value
    }
    return typeof secondArg === 'string' ? secondArg : key
  }

  return translate as TFunction
}

/** Get a translation function bound to a fixed language (used by tests). */
export function getFixedT(language: Language): TFunction {
  return createT(language)
}

// --- Reactive language store (replaces the i18next/react-i18next runtime) ---

let currentLanguage: Language = DEFAULT_LANGUAGE
const listeners = new Set<() => void>()

function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function getSnapshot(): Language {
  return currentLanguage
}

function changeLanguage(language: Language): void {
  if (language === currentLanguage) {
    return
  }
  currentLanguage = language
  for (const listener of listeners) {
    listener()
  }
}

export interface Locale {
  language: Language
  changeLanguage: (language: Language) => void
}

/**
 * Returns the translation function `t` plus the current `locale` (language +
 * setter). Components re-render on language change via the store.
 */
export function useTranslation(): { t: TFunction; locale: Locale } {
  const language = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
  const t = useMemo(() => createT(language), [language])
  return { t, locale: { language, changeLanguage } }
}
