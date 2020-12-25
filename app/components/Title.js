import React, { memo, useMemo } from 'react';
import { View, Text, TouchableOpacity, I18nManager } from 'react-native';

import { useTranslation } from 'react-i18next';
import RNRestart from 'react-native-restart'

import i18n from '../helpers/i18n';

import styles from './styles/TitleStyles';

const capitalize = (s = '') => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};

const toggleLanguage = () => {
  const isAr = i18n.language === 'ar';

  i18n.changeLanguage(!isAr ? 'ar' : 'en').then(() => {
    I18nManager.forceRTL(!isAr);
    RNRestart.Restart()
  });
};

const Title = memo(({ title }) => {
  const { i18n } = useTranslation();

  const currentLanguageLabel = useMemo(() => {
    return capitalize(i18n.language);
  }, [i18n.language]);

  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity style={styles.langButton} onPress={toggleLanguage}>
        <Text>{currentLanguageLabel}</Text>
      </TouchableOpacity>
    </View>
  );
});

export default Title;
