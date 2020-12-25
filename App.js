import React from 'react';
import { StatusBar } from 'react-native';

import './app/helpers/i18n';

import ActiveTodosScreen from './app/containers/ActiveTodosScreen';

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <ActiveTodosScreen />
    </>
  );
};

export default App;
