import React, { Component } from 'react'

import { renderRoutes } from 'react-router-config'
import routes from '../routes'

export default class App extends Component {
  render(){
    return (
      <div>
        <h1>Server Side Rendering with Create React App v2</h1>
        <p>Hey, so I've rewritten this example with react-router v4</p>
        <p>This code is on github: <a href='https://github.com/ayroblu/ssr-create-react-app-v2'>https://github.com/ayroblu/ssr-create-react-app-v2</a></p>
        <p>Medium article: <a href='https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9'>https://medium.com/@benlu/ssr-with-create-react-app-v2-1b8b520681d9</a></p>
        {renderRoutes(routes)}
      </div>
    )
  }
}
