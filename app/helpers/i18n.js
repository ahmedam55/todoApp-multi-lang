import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import RNRestart from 'react-native-restart';
import dayjs from 'dayjs'

i18n
  .use(initReactI18next)
  .init({
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
  })
  .then(() => {
    const isAr = i18n.language === 'ar';

    if (isAr) {
      require('dayjs/locale/ar');
    }

    dayjs.locale(i18n.language);
  });

export const toggleLanguage = () => {
  const isAr = i18n.language === 'ar';

  i18n.changeLanguage(!isAr ? 'ar' : 'en').then(() => {
    I18nManager.forceRTL(!isAr);
    RNRestart.Restart();
  });
};

export default i18n;
