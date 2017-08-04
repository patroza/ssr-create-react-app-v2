import FirstPage from './containers/FirstPage'
import SecondPage from './containers/SecondPage'
import PostsApiPage from './containers/PostsApiPage'

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
    component: PostsApiPage
  }
]

export default routes
