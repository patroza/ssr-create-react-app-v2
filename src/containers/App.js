import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
import FirstPage from './FirstPage'
import SecondPage from './SecondPage'
import NoMatch from '../components/NoMatch'

import { Helmet } from 'react-helmet'

export default class App extends Component {
  render() {
    return (
      <div>
        <Helmet defaultTitle="C00l App" titleTemplate="C00l App - %s">
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>

        <h1>Server Side Rendering with Create React App v2</h1>
        <Switch>
          <Route exact path="/" component={FirstPage} />
          <Route path="/second" component={SecondPage} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
