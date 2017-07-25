import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded } from '../actions/posts'
import { Link } from 'react-router-dom'
import './FirstPage.css'

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
      <div className="bold">
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

export default connect(mapStateToProps)(FirstPage)
