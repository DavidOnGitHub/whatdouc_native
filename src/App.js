import React from 'react';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloProvider } from 'react-apollo';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import { getItem } from './utils/storage';
import { setAuth } from './actions/auth';
import reducers from './reducers';
import { Routes } from './routes';
import BottomTab from './components/BottomTab';

console.disableYellowBox = true;

export const store = createStore(reducers, composeWithDevTools(
  applyMiddleware(thunk)
));

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
});
const authLink = setContext(async (_, { headers }) => {
  const token = await getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});
const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default class App extends React.Component {
  componentDidMount() {
    const _XHR = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

    // global.FormData = global.originalFormData

    XMLHttpRequest = _XHR;

    getItem('auth').then(auth => {
      if (auth) {
        store.dispatch(setAuth(auth));
      }
    });
  }

  render() {
    return (
      <ApolloProvider client={apolloClient}>
        <Provider store={store}>
          <Routes />
          {/* <BottomTab /> */}
        </Provider>
      </ApolloProvider>
    );
  }
}
