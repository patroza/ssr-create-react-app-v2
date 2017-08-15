import React, { Component, PropTypes } from 'react'
import { Switch, Route } from 'react-router-dom'

import NoMatch from '../components/NoMatch'
import routes from '../routes'

import { Helmet } from 'react-helmet'

// TODO: Extract higher order?
const ContextType = {
  // Enables critical path CSS rendering
  // https://github.com/kriasoft/isomorphic-style-loader
  insertCss: PropTypes.func.isRequired,
};

export default class App extends Component {
  static propTypes = {
    context: PropTypes.shape(ContextType).isRequired,
    //children: PropTypes.element.isRequired,
  };
  static childContextTypes = ContextType;
  getChildContext() {
    return this.props.context;
  }

  render() {
    return (
      <div>
        <Helmet defaultTitle="C00l App" titleTemplate="C00l App - %s">
          <meta charSet="utf-8" />
          <title>My Title</title>
        </Helmet>

        <h1>Server Side Rendering with Create React App v2</h1>
        <Switch>
          {routes.map(route => <Route key={route.path} {...route} />)}
          <Route component={NoMatch} />
        </Switch>
      </div>
    )
  }
}
