import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import configureStore from './store'
import App from './containers/App'

import styles from './index.css';

const initialState = window.DATA ? window.DATA : {}
const store = configureStore(initialState)
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => { removeCss.forEach(f => f()); };
};

// Only in dev mode necessary, unless we use extracttext
styles._insertCss();

const rootEl = document.getElementById('root');
const context = { insertCss };
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter context={context}>
      <App context={context} />
    </BrowserRouter>
  </Provider>,
  rootEl
)

if (module.hot) {
  module.hot.accept('./containers/App', () => {
    const NextApp = require('./containers/App').default
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter context={context}>
          <NextApp context={context} />
        </BrowserRouter>
      </Provider>,
      rootEl
    )
  })
}
