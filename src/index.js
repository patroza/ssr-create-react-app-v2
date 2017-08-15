import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import configureStore from './store'
import App from './containers/App'

// workaround for context problems
import {functions} from 'isomorphic-style-loader/lib/withStyles';

const initialState = window.DATA ? window.DATA : {}
const store = configureStore(initialState)
const insertCss = (styles) => styles._insertCss();
const context = { insertCss };
// workaround for context problems
functions.insertCss = insertCss;

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter context={context}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
