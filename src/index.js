import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './responsive'
import './assets/icon/loadAll.js'
import 'react-vant/lib/index.css';
import './utils/common.js'

import { Provider } from 'react-redux'
import App from 'page/app'
import {HashRouter as Router} from "react-router-dom";

import store from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
     <PersistGate loading={null} persistor={persistor}>
          <Router>
            <App/>
          </Router>
    </PersistGate>
  </Provider>,
  document.getElementById('root')
);

