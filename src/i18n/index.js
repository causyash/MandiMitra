import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../public/languages/en.json';
import hiTranslation from '../../public/languages/hi.json';
import guTranslation from '../../public/languages/gu.json';
import mrTranslation from '../../public/languages/mr.json';

const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
  gu: { translation: guTranslation },
  mr: { translation: mrTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hi',
    lng: 'hi',
    interpolation: {
      escapeValue: false,
    },
    returnNull: false,
    returnEmptyString: false,
    debug: process.env.NODE_ENV === 'development',
  });

// Expose translations globally for components to access
i18n.on('languageChanged', (lng) => {
  window._i18n = i18n;
  window.__i18n_lng = lng;
});

// Initialize with default language
window._i18n = i18n;
window.__i18n_lng = 'hi';

export default i18n;
