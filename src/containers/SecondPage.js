import React, { Component } from 'react'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Link } from 'react-router-dom'
import styles from './SecondPage.css';

class SecondPage extends Component {
  render() {
    return (
      <div className={styles.bold}>
        <h2>Second Page</h2>
        <Link to={'/'}>First</Link>
      </div>
    )
  }
}

const mapStateToProps = state => ({})

const mapDispatchToProps = dispatch => ({})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(SecondPage));
