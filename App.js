import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { persistCache } from 'apollo3-cache-persist';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Config from "react-native-config";

import './app/helpers/i18n';

import Loading from './app/components/Loading';
import ActiveTodosScreen from './app/containers/ActiveTodosScreen';

global.XMLHttpRequest = global.originalXMLHttpRequest
  ? global.originalXMLHttpRequest
  : global.XMLHttpRequest;
global.FormData = global.originalFormData
  ? global.originalFormData
  : global.FormData;

fetch; // Ensure to get the lazy property

if (window.__FETCH_SUPPORT__) {
  // it's RNDebugger only to have
  window.__FETCH_SUPPORT__.blob = false;
} else {
  /*
   * Set __FETCH_SUPPORT__ to false is just work for `fetch`.
   * If you're using another way you can just use the native Blob and remove the `else` statement
   */
  global.Blob = global.originalBlob ? global.originalBlob : global.Blob;
  global.FileReader = global.originalFileReader
    ? global.originalFileReader
    : global.FileReader;
}

const PORT = Config.PORT;
const cache = new InMemoryCache()

// Initialize Apollo Client
const client = new ApolloClient({
  uri: `http://localhost:${PORT}/graphql`,
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
});

const App = () => {
  const [loadingCache, setLoadingCache] = useState(true);

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false));
  }, []);

  return loadingCache ? (
    <Loading />
  ) : (
    <ApolloProvider client={client}>
      <StatusBar barStyle="dark-content" />
      <ActiveTodosScreen />
    </ApolloProvider>
  );
};

export default App;
