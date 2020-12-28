import React, { useCallback, useMemo, useState } from 'react';
import { FlatList, View, Dimensions, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

import SwipeView from 'react-native-swipeview';
import { useTranslation } from 'react-i18next';
import { gql, useMutation, useQuery } from '@apollo/client';

import config from '../config';

import Title from '../components/Title';
import Input from '../components/Input';
import TodoRowItem from '../components/TodoRowItem';
import DateView from '../components/DateView';

import Todo from '../models/Todo';

import styles from './styles/ActiveTodosStyles';
import commonStyles from './styles';

Icon.loadFont();

const LeftSwipingView = () => (
  <View style={commonStyles.rowLeft}>
    <Icon
      style={commonStyles.icon}
      name={config.icons.check}
      size={config.constants.hiddenRowIconSize}
    />
  </View>
);

const RightSwipingView = () => (
  <View style={commonStyles.rowRight}>
    <Icon
      style={commonStyles.icon}
      name={config.icons.times}
      size={config.constants.hiddenRowIconSize}
    />
  </View>
);

const TODOS_QUERY = gql`
  query todos {
    getTodos {
      id
      body
      created
    }
  }
`;

const ADD_TODO = gql`
  mutation createTodo($text: String!) {
    createTodo(body: $text) {
      id
      body
      created
    }
  }
`;

const DELETE_TODO = gql`
  mutation deleteTodo($id: ID!) {
    deleteTodo(todoId: $id)
  }
`;

const ActiveTodosScreen = () => {
  const { data, loading, client } = useQuery(TODOS_QUERY);
  const [createTodo] = useMutation(ADD_TODO, {
    refetchQueries: [{ query: TODOS_QUERY }],
  });

  const [removeTodo] = useMutation(DELETE_TODO);

  const { t } = useTranslation();

  const todos = useMemo(() => {
    return data.getTodos != null
      ? data.getTodos.map((todo) => ({
          ...todo,
          text: todo.body,
        }))
      : [];
  }, [data]);

  const addTodo = useCallback(
    (text) => {
      createTodo({ variables: { text: text } });
    },
    [createTodo],
  );

  //toggle complete
  const completeTodo = useCallback((indexToComplete) => {
    // setTodos((todos) =>
    //   todos.map((todo, index) => {
    //     return indexToComplete === index
    //       ? {
    //           ...todo,
    //           completed: !todo.completed,
    //         }
    //       : todo;
    //   }),
    // );
  }, []);

  const deleteActiveTodo = useCallback(
    (id) => {
      client.writeQuery({
        query: TODOS_QUERY,
        data: {
          getTodos: data.getTodos.filter((todo) => todo.id !== id),
        },
      });

      removeTodo({ variables: { id: id } });
    },
    [client, data, removeTodo],
  );

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
              renderLeftView={LeftSwipingView}
              renderRightView={RightSwipingView}
              leftOpenValue={leftOpenValue}
              rightOpenValue={rightOpenValue}
              swipeDuration={config.constants.rowSwipeDuration}
              swipeToOpenPercent={config.constants.rowSwipeOpenPercent}
              onSwipedLeft={() => deleteActiveTodo(item.id)}
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
