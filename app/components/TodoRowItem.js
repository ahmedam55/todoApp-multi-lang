import React, { memo } from 'react';
import { View, Text } from 'react-native';

import config from '../config';

import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles/TodoRowItemStyles';

const TodoRowItem = memo(({ todo }) => {
  const { text, completed } = todo;

  return (
    <View
      style={[styles.row, completed ? styles.rowCompleted : null]}
      key={todo.id}>
      <View style={styles.timeline}>
        <View style={styles.timelineVerticalLink} />
        <Icon
          style={styles.icon}
          name={config.icons.circle}
          size={config.constants.rowTimelineIconSize}
        />
      </View>
      <View style={styles.content}>
        <Text style={[styles.text, completed ? styles.textCompleted : null]}>
          {text}
        </Text>
      </View>
    </View>
  );
});

export default TodoRowItem;
