import React from 'react';
import { StatusBar } from 'react-native';

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
