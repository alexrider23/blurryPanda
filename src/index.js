import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider  } from '@chakra-ui/react'
import theme from './Lib/theme';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
   // https://community.auth0.com/t/why-is-authentication-lost-after-refreshing-my-single-page-application/56276
  <React.StrictMode>
    <Auth0Provider
      domain="https://dev-7wje8o2ffd0q20mn.us.auth0.com"
      clientId="Dr5oIfpyGvCYugzGVfUrsUoZ7OPV1rJy"
      authorizationParams={{
        redirect_uri: "http://localhost:3001",
        audience: "https://dev-7wje8o2ffd0q20mn.us.auth0.com/api/v2/",
        scope: "openid profile email offline_access",
        useRefreshTokens: true, // Enable refresh tokens
        cacheLocation: "localstorage"
      }}
    >
      <App />
    </Auth0Provider>
  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
