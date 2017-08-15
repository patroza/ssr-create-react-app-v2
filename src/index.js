import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'

import configureStore from './store'
import App from './containers/App'

const initialState = window.DATA ? window.DATA : {}
const store = configureStore(initialState)
const insertCss = (...styles) => {
  // eslint-disable-next-line no-underscore-dangle
  const removeCss = styles.map(x => x._insertCss());
  return () => { removeCss.forEach(f => f()); };
};

const context = { insertCss };
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter context={context}>
      <App context={context} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
