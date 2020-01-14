export default [
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "page" */ 'src/components/error-page/404'),
    name: '404',
    meta: {
      keepAlive: false,
      isAuth: false
    }
  },
  {
    path: '/',
    name: '主页',
    redirect: '/home'
  }
]
