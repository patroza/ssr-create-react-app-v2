import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded } from '../actions/posts'
import { Link } from 'react-router-dom'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './FirstPage.css'

import { Helmet } from 'react-helmet'

class FirstPage extends Component {
  static fetchData(store) {
    return store.dispatch(fetchPostsIfNeeded())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { posts } = this.props

    const b64 = this.props.staticContext
      ? 'wait for it'
      : window.btoa('wait for it')

    return (
      <div className={styles.bold}>
        {posts &&
          <Helmet>
            <title>
              {posts.length + ' Posts'}
            </title>
          </Helmet>}

        <h2>First Page</h2>
        <p>{`b64: ${b64}`}</p>
        <Link to={'/second'}>Second</Link>
        <ul>
          {posts &&
            posts.map(post =>
              <li key={post.id}>
                {post.permalink}
              </li>
            )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  posts: state.posts.items
})

export default connect(mapStateToProps)(withStyles(styles)(FirstPage))
