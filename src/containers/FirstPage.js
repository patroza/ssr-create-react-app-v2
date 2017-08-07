import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as userActions from '../actions/user'
import { Link } from 'react-router-dom'
import './FirstPage.css'

class FirstPage extends Component {
  render() {
    const b64 = this.props.staticContext ? 'wait for it' : window.btoa('wait for it')
    return (
      <div className='bold'>
        <Helmet>
          <title>First Page</title>
        </Helmet>

        <h2>First Page</h2>
        <p>{`Email: ${this.props.user.email}`}</p>
        <p>{`b64: ${b64}`}</p>
        <Link to={'/second'}>Second</Link>
        {' '}
        <Link to={'/posts'}>Posts API Example</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(userActions, dispatch)
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FirstPage)
