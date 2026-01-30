import type { Locale } from 'vue-i18n'
import type { UserModule } from '~/types'
import { createI18n } from 'vue-i18n'

// Configuration Constants
const STORAGE_KEY = 'user-locale'
const DEFAULT_LOCALE = 'en'

const locales = import.meta.glob('../../locales/*.yml', { eager: true }) as Record<string, any>

const messages = Object.fromEntries(
  Object.entries(locales).map(([path, module]) => [
    path.match(/([\w-]*)\.yml$/)?.[1],
    module.default
  ])
)

let initialLang = DEFAULT_LOCALE
if (typeof localStorage !== 'undefined') {
  const savedLang = localStorage.getItem(STORAGE_KEY)
  if (savedLang && Object.keys(messages).includes(savedLang)) {
    initialLang = savedLang
  }
}

const i18n = createI18n({
  legacy: false,
  locale: initialLang,
  fallbackLocale: DEFAULT_LOCALE,
  messages
})

export const availableLocales = Object.keys(messages)

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
  if (typeof document !== 'undefined') document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export async function loadLanguageAsync(lang: string): Promise<Locale> {
  // If the same language
  if (i18n.global.locale.value === lang) return setI18nLanguage(lang)

  // If the language was already loaded
  if (loadedLanguages.includes(lang)) return setI18nLanguage(lang)

  // If the language hasn't been loaded yet
  const messages = await localesMap[lang]()
  i18n.global.setLocaleMessage(lang, messages.default)
  loadedLanguages.push(lang)
  return setI18nLanguage(lang)
}

export const install: UserModule = ({ app }) => {
  app.use(i18n)

  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', i18n.global.locale.value)
  }
}
