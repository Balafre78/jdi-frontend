import { createI18n } from 'vue-i18n'
import en from './../assets/lang/en.json'
import fr from './../assets/lang/fr.json'

const locale = localStorage.getItem('locale') || 'en';

export const i18n = createI18n({
  legacy: false,
  locale: locale,
  fallbackLocale: 'en',
  messages: {
    en,
    fr
  }
});
