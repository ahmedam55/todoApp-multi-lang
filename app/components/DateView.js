import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';

import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import { replaceEnWithArNumbers } from '../helpers';

import styles from './styles/DateViewStyles';

const DateView = memo(() => {
  const { i18n } = useTranslation();

  const day = useMemo(() => dayjs().format('ddd').toUpperCase(), [
    i18n.language,
  ]);
  const date = useMemo(() => {
    const isAr = i18n.language === 'ar';
    const day = dayjs().format('D');

    return isAr ? replaceEnWithArNumbers(day) : day;
  }, [i18n.language]);
  const month = useMemo(() => dayjs().format('MMMM').toUpperCase(), [
    i18n.language,
  ]);

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.month}>{month}</Text>
    </View>
  );
});

export default DateView;
