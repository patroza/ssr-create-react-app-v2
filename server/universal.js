const path = require('path')
const fs = require('fs')

import { Helmet } from 'react-helmet'

const React = require('react')
const { Provider } = require('react-redux')
const { renderToString } = require('react-dom/server')
const { StaticRouter } = require('react-router-dom')

const { default: configureStore } = require('../src/store')
const { default: App } = require('../src/containers/App')
// TODO: Is there a better/more dynamic way than including all source files here as the app grows?
const { default: FirstPage } = require('../src/containers/FirstPage')

module.exports = function universalLoader(req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const context = {}
    const store = configureStore()

    // TODO: For better performance, fetch only what we need to render the page properly - Casus knackus hier: Auf welcher Page sind wir gerade? ^^
    const requiredData = [
      FirstPage.fetchData(store)
      // ...
    ]

    Promise.all(requiredData).then(() => {
      const markup = renderToString(
        <Provider store={store}>
          <StaticRouter location={req.url} context={context}>
            <App />
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
          .replace('{{WINDOW_DATA}}', JSON.stringify(store.getState()))
          .replace('{{HELMET_TITLE}}', helmet.title.toString())
          .replace('{{HELMET_META}}', helmet.meta.toString())

        res.send(RenderedApp)
      }
    })
  })
}
