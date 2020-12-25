import React, { memo, useMemo } from 'react';
import { View, Text } from 'react-native';

import dayjs from 'dayjs';
import styles from './styles/DateViewStyles';

const DateView = memo(() => {
  const day = useMemo(() => dayjs().format('ddd').toUpperCase(), []);
  const date = useMemo(() => dayjs().format('D'), []);
  const month = useMemo(() => dayjs().format('MMMM').toUpperCase(), []);

  return (
    <View style={styles.container}>
      <Text style={styles.day}>{day}</Text>
      <Text style={styles.date}>{date}</Text>
      <Text style={styles.month}>{month}</Text>
    </View>
  );
});

export default DateView;
