import type { Locale } from 'vue-i18n'
import type { UserModule } from '~/types'
import { createI18n } from 'vue-i18n'

// Configuration Constants
const STORAGE_KEY = 'user-locale'
const DEFAULT_LOCALE = 'en'

// Create i18n instance
const i18n = createI18n({
  legacy: false,
  locale: '',
  messages: {},
})

// Map all available locale files
const localesMap = Object.fromEntries(
  Object.entries(import.meta.glob('../../locales/*.yml'))
    .map(([path, loadLocale]) => [path.match(/([\w-]*)\.yml$/)?.[1], loadLocale]),
) as Record<Locale, () => Promise<{ default: Record<string, string> }>>

export const availableLocales = Object.keys(localesMap)

const loadedLanguages: string[] = []

/**
 * Sets the active language in i18n, updates the HTML lang attribute, and persists the setting.
 */
function setI18nLanguage(lang: Locale) {
  // Save to localStorage for persistence
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, lang)
  }

  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined')
    document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang)
    return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang))
    return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export const install: UserModule = ({ app }) => {
  app.use(i18n)

  let initialLang: string = DEFAULT_LOCALE

  // Check localStorage for a saved locale
  if (typeof localStorage !== 'undefined') {
    const savedLang = localStorage.getItem(STORAGE_KEY)

    // Validate saved locale against available locales
    if (savedLang && availableLocales.includes(savedLang)) {
      initialLang = savedLang
    }
  }

  // Load the determined language (saved, or default 'en')
  loadLanguageAsync(initialLang)
}
