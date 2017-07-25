import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import './SecondPage.css'

class SecondPage extends Component {
  render() {
    return (
      <div className="bold">
        <h2>Second Page</h2>
        <Link to={'/'}>First</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(SecondPage)
