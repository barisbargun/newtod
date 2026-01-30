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

export function setI18nLanguage(lang: Locale) {
  localStorage.setItem(STORAGE_KEY, lang)

  i18n.global.locale.value = lang as any
  if (typeof document !== 'undefined') document.querySelector('html')?.setAttribute('lang', lang)
  return lang
}

export const install: UserModule = ({ app }) => {
  app.use(i18n)

  if (typeof document !== 'undefined') {
    document.querySelector('html')?.setAttribute('lang', i18n.global.locale.value)
  }
}
