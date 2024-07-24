import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { en, vi } from '@/assets/locales/index'
import { initReactI18next } from 'react-i18next'

export const resources = {
  en,
  vi
} as const

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'en',
    debug: true,
    detection: {
      order: ['querystring', 'cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie']
    },
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
