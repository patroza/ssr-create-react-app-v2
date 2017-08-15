const path = require('path')
const fs = require('fs')

import { Helmet } from 'react-helmet'

const React = require('react')
const { Provider } = require('react-redux')
const { renderToString } = require('react-dom/server')
const { StaticRouter, matchPath } = require('react-router-dom')

const { default: configureStore } = require('../src/store')
const { default: App } = require('../src/containers/App')

import routes from '../src/routes'
import styles from '../src/index.css';

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const css = [styles._getCss()]; // CSS for all rendered React components 
    const insertCss = (...styles) => {
      // eslint-disable-next-line no-underscore-dangle
      styles.forEach(style => css.push(style._getCss()));
    };
    const context = { insertCss };
  
    const store = configureStore()

    const requiredData = []
    // use `some` to imitate `<Switch>` behavior of selecting only
    // the first to match
    routes.some(route => {
      // use `matchPath` here
      const match = matchPath(req.url, route)

      if (match && route.component && route.component.fetchData) {
        requiredData.push(route.component.fetchData(store))
      }

      return match
    })

    Promise.all(requiredData).then(() => {
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App context={context} />
          </StaticRouter>
        </Provider>
      )

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        redirect(301, context.url)
      } else {
        const helmet = Helmet.renderStatic()
        // we're good, send the response
        const RenderedApp = htmlData
          .replace('{{SSR}}', markup)
          .replace('{{STYLES}}', `<style type="text/css">${css.join('')}</style>`)
          .replace('{{WINDOW_DATA}}', JSON.stringify(store.getState()))
          .replace('{{HELMET_TITLE}}', helmet.title.toString())
          .replace('{{HELMET_META}}', helmet.meta.toString())

        res.status(context.statusCode || 200).send(RenderedApp)
      }
    })
  })
}
