import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './resources'

export const initI18n = (lng?: string) =>
  i18next.use(initReactI18next).init({
    lng,
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
    load: 'languageOnly',
    interpolation: { escapeValue: false },
    resources
  })

export default i18next
