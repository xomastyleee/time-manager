import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'

import { resources } from './resources'

export const initI18n = (language: string) =>
  i18next.use(initReactI18next).init({
    lng: language,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    },
    resources
  })

export default i18next
