import React, { memo } from 'react';
import { View, Text } from 'react-native';

import styles from './styles/TitleStyles';

const Title = memo(({ title }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
});

export default Title;
