import FirstPage from './containers/FirstPage'
import SecondPage from './containers/SecondPage'

const routes = [
  {
    path: '/',
    exact: true,
    component: FirstPage
  },
  {
    path: '/second',
    component: SecondPage
  }
]

export default routes
