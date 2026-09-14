import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../../public/languages/en.json';
import hiTranslation from '../../public/languages/hi.json';
import guTranslation from '../../public/languages/gu.json';
import mrTranslation from '../../public/languages/mr.json';
import bnTranslation from '../../public/languages/bn.json';
import teTranslation from '../../public/languages/te.json';
import taTranslation from '../../public/languages/ta.json';
import knTranslation from '../../public/languages/kn.json';
import mlTranslation from '../../public/languages/ml.json';
import paTranslation from '../../public/languages/pa.json';
import orTranslation from '../../public/languages/or.json';
import asTranslation from '../../public/languages/as.json';

const resources = {
  en: { translation: enTranslation },
  hi: { translation: hiTranslation },
  gu: { translation: guTranslation },
  mr: { translation: mrTranslation },
  bn: { translation: bnTranslation },
  te: { translation: teTranslation },
  ta: { translation: taTranslation },
  kn: { translation: knTranslation },
  ml: { translation: mlTranslation },
  pa: { translation: paTranslation },
  or: { translation: orTranslation },
  as: { translation: asTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'hi',
    lng: 'hi',
    interpolation: {
      escapeValue: false,
      prefix: '{',
      suffix: '}',
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
