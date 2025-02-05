import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './src/locales/en/translations.json'
import ua from './src/locales/ua/translations.json'

i18next
  .use(initReactI18next)
  .init({
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
    resources: {
      en: { translation:en },
      ua: { translation:ua }
  }
  });

export default i18next;
