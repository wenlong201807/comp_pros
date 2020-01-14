import Vue from 'vue'
import VueRouter from 'vue-router'
import PageRouter from './page/'
import ViewsRouter from './views/'

Vue.use(VueRouter)
export const router = new VueRouter({
  routes: [].concat([])
})
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return routerPush.call(this, location).catch(error => error)
}
router.addRoutes([...PageRouter, ...ViewsRouter])
