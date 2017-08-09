import FirstPage from './containers/FirstPage'
import SecondPage from './containers/SecondPage'
import PostsApiPage from './containers/PostsApiPage'
import PostComments from './containers/PostComments'

import NoMatch from './components/NoMatch'

const routes = [
  {
    path: '/',
    exact: true,
    component: FirstPage
  },
  {
    path: '/second',
    component: SecondPage
  },
  {
    path: '/posts',
    component: PostsApiPage,
    routes: [
      {
        path: '/posts/withcommentsfor/:id',
        component: PostComments
      }
    ]
  },
  {
    component: NoMatch
  }
]

export default routes
