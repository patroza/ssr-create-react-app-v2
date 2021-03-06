import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import './App.css'

class NoMatch extends Component {
  static contextTypes = {
    router: PropTypes.shape({
      staticContext: PropTypes.object
    }).isRequired
  }

  componentWillMount() {
    this.context.router.staticContext.statusCode = 404
  }

  render() {
    return <div>Sorry, page not found</div>
  }
}

export default NoMatch
