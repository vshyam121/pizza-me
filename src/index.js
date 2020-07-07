import 'react-app-polyfill/ie9';
import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store/store';
import { BrowserRouter } from 'react-router-dom';
import ScrollToTop from './hoc/ScrollToTop';

ReactDOM.render(
  <BrowserRouter basename={process.env.REACT_APP_BASE_URL}>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);
