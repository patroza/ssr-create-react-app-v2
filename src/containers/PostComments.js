import React, { Component } from 'react'
import { connect } from 'react-redux'

import { fetchCommentsIfNeeded } from '../actions/comments'

class PostComments extends Component {
  static fetchData(store, match) {
    return store.dispatch(fetchCommentsIfNeeded(match.params.id))
  }

  fetchCommentsData() {
    const { dispatch } = this.props
    dispatch(fetchCommentsIfNeeded(this.props.match.params.id))
  }

  componentDidMount() {
    this.fetchCommentsData()
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchCommentsData()
    }
  }

  render() {
    const { comments } = this.props

    return (
      <div>
        <h3>
          Comments to Post {this.props.match.params.id}
        </h3>
        <ul>
          {comments &&
            comments.map(comment =>
              <li key={comment.id}>
                <strong>{comment.email}</strong> {comment.body}
              </li>
            )}
        </ul>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  let byPostMatch = state.comments.byPost[ownProps.match.params.id]

  return {
    comments: byPostMatch ? byPostMatch.items : null
  }
}

export default connect(mapStateToProps)(PostComments)
