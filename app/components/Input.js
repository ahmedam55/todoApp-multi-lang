import React, { memo, useCallback, useState } from 'react';
import { TextInput } from 'react-native';

import styles from './styles/InputStyles';

const leadingAndTrailingSpaces = /^\s+|\s+$/g;

const isValidText = (string) => {
  return Boolean(string.replace(leadingAndTrailingSpaces, ''));
};

const Input = memo(
  ({
    onSubmitEditing,
    placeholder,
    placeholderTextColor,
    selectionColor,
    underlineColorAndroid,
    maxLength,
    clearTextOnFocus,
  }) => {
    const [text, setText] = useState('');

    const onChangeText = useCallback((text) => setText(text), []);

    const clearText = useCallback(() => {
      //another pattern of doing this, is the early return:
      // if(!isValidText(text)) return

      if (isValidText(text)) {
        onSubmitEditing(text);
        setText('');
      }
    }, [text, onSubmitEditing]);

    return (
      <TextInput
        style={styles.input}
        value={text}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        selectionColor={selectionColor}
        underlineColorAndroid={underlineColorAndroid}
        maxLength={maxLength}
        clearTextOnFocus={clearTextOnFocus}
        onChangeText={onChangeText}
        onSubmitEditing={clearText}
      />
    );
  },
);

export default Input;
