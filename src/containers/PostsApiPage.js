import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchPostsIfNeeded } from '../actions/posts'

class PostsApiPage extends Component {
  static fetchData(store) {
    return store.dispatch(fetchPostsIfNeeded())
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded())
  }

  render() {
    const { posts } = this.props

    return (
      <div>
        <h2>Posts</h2>
        <ul>
          {posts &&
            posts.map(post =>
              <li key={post.id}>
                {post.title}
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

export default connect(mapStateToProps)(PostsApiPage)
