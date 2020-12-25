import React, { useCallback, useState } from 'react';
import { FlatList, View, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import SwipeView from 'react-native-swipeview';
import { useTranslation } from 'react-i18next';

import config from '../config';

import Title from '../components/Title';
import Input from '../components/Input';
import TodoRowItem from '../components/TodoRowItem';
import DateView from '../components/DateView';

import Todo from '../models/Todo';

import styles from './styles/ActiveTodosStyles';
import commonStyles from './styles';

Icon.loadFont();

const ActiveTodosScreen = () => {
  const [todos, setTodos] = useState([]);

  const { t } = useTranslation();

  const addTodo = useCallback((text) => {
    setTodos((todos) => [...todos, new Todo({ text })]);
  }, []);

  //toggle complete
  const completeTodo = useCallback((indexToComplete) => {
    setTodos((todos) =>
      todos.map((todo, index) => {
        return indexToComplete === index
          ? {
              ...todo,
              completed: !todo.completed,
            }
          : todo;
      }),
    );
  }, []);

  const deleteActiveTodo = useCallback((index) => {
    setTodos((todos) => todos.filter((todo, i) => index !== i));
    //Another way, of deleting an item in an immutable way, is cloning the original array, then call splice (mutate the cloned array) and return it
  }, []);

  const windowWidth = Dimensions.get('window').width;
  const leftOpenValue = windowWidth;
  const rightOpenValue = -windowWidth;

  return (
    <SafeAreaView style={commonStyles.topContainer}>
      <View style={commonStyles.container}>
        <Title title={t('title')} />
        <View style={styles.header}>
          <View style={styles.inputContainer}>
            <Input
              placeholder={t('addTodoPlaceholder')}
              placeholderTextColor={config.colors.white}
              selectionColor={config.colors.golden}
              underlineColorAndroid={config.colors.transparent}
              maxLength={
                config.constants.activeTodoScreen.addTodoInputMaxlength
              }
              clearTextOnFocus={
                config.constants.activeTodoScreen.addTodoInputClearTextOnFocus
              }
              onSubmitEditing={addTodo}
            />
          </View>
          <DateView />
        </View>
        <FlatList
          data={todos}
          keyExtractor={(todo) => todo.id}
          enableEmptySections={true}
          ItemSeparatorComponent={() => <View style={commonStyles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeView
              renderVisibleContent={() => (
                <TodoRowItem todo={{ ...item }} index={index} />
              )}
              renderLeftView={() => (
                <View style={commonStyles.rowLeft}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.check}
                    size={config.constants.hiddenRowIconSize}
                  />
                </View>
              )}
              renderRightView={() => (
                <View style={commonStyles.rowRight}>
                  <Icon
                    style={commonStyles.icon}
                    name={config.icons.times}
                    size={config.constants.hiddenRowIconSize}
                  />
                </View>
              )}
              leftOpenValue={leftOpenValue}
              rightOpenValue={rightOpenValue}
              swipeDuration={config.constants.rowSwipeDuration}
              swipeToOpenPercent={config.constants.rowSwipeOpenPercent}
              onSwipedLeft={() => deleteActiveTodo(index)}
              onSwipedRight={() => {
                completeTodo(index);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

export default ActiveTodosScreen;
