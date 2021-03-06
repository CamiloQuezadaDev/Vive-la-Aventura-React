import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'constants'; 

import {ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

import { SessionProvider } from './contexts/SessionContext';
import { MapProvider } from './contexts/MapContext';
import { HeadProvider } from './contexts/HeadContext';

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

import { GRAPHQL_ENDPOINT } from './constants'; 

const httpLink = createHttpLink({
  uri: GRAPHQL_ENDPOINT
});

const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem('AUTH_TOKEN');
  return {
    headers: {
      ...headers,
      authorization: token
    }
  }
}); 


const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache({
    addTypename: false 
  }),
  fetchOptions: {
    credentials: 'include'
  }
});

const theme = createMuiTheme({
  palette: {
      primary: {
          main: '#388e3c'
      }
  }
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <SessionProvider>
          <HeadProvider>
            <MapProvider>
              <App />
            </MapProvider>
          </HeadProvider>
      </SessionProvider>
    </ThemeProvider>
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
