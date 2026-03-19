import { createI18n } from 'vue-i18n'
import enUS from './en-US'

// Create i18n instance (English only)
const i18n = createI18n({
  legacy: false, // Use Composition API mode
  locale: 'en-US',
  fallbackLocale: 'en-US',
  messages: {
    'en-US': enUS
  }
})

// Set document language
document.documentElement.lang = 'en-US'

export default i18n