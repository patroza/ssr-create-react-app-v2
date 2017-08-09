import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Link } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

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
    const { posts, route } = this.props

    return (
      <div>
        <h2>Posts</h2>
        {renderRoutes(route.routes)}
        <ul>
          {posts &&
            posts.map(post =>
              <Link key={post.id} to={`/posts/withcommentsfor/${post.id}`}>
                <li>
                  {post.title}
                </li>
              </Link>
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
