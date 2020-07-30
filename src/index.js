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
import { Router } from 'react-router-dom';
import ScrollToTop from './hoc/ScrollToTop';
import * as serviceWorker from './serviceWorker';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory({
  basename: `${process.env.REACT_APP_BASE_URL}`,
});

ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ScrollToTop>
        <App />
      </ScrollToTop>
    </Provider>
  </Router>,
  document.getElementById('root')
);

serviceWorker.unregister();
