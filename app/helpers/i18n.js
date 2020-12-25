import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

i18n.use(initReactI18next).init({
  lng: I18nManager.isRTL ? 'ar' : 'en',
  fallbackLng: 'en',
  resources: {
    en: {
      translation: {
        title: 'My Todo List!',
        addTodoPlaceholder: 'Type a todo, then hit enter!',
      },
    },
    ar: {
      translation: {
        title: 'مهامي اليومية!',
        addTodoPlaceholder: 'أكتب مهمة، ثم أنقر أذهب!',
      },
    },
  },
});

export default i18n;
