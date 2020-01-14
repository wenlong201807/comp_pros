import store from '../store'
import { router } from './router'
// import Alert from '../components/Dialog/index.js'

router.beforeEach((to, from, next) => {
  /* 这里 就可以获取router文件夹下的index.js的参数了 */
  if (to.meta.isAuth) { // 判断前往的界面是否需要登陆
    if (store.state.user.token) { // 是否已经登陆
      console.log(store)
      next()
    } else {
      // Vue.prototype.$alert('请先登录!')
      // Alert('请先登录sssssssss!').then(() => {
      //   store.state.user.isLogin = true
      // })
      // alert('请先登录sssssssss')
      next('/login')
      // store.state.user.isLogin = true
      // Event.$on('userInfo', function () {
      //   next()
      // })
    }
  } else {
    /* pageloading 是一个控制 滚动条的 (转圈的那个) */
    if (to.meta.page) store.state.app.pageLoading = true
    next()
  }
})

router.afterEach((to, from) => {
  if (to.meta.page) store.state.app.pageLoading = false
  document.title = to.name
})
export default router
