import Vue from 'vue'
import App from './App.vue'
import router from './router/permission'
import beginNavigation from './components/js/beginNavigation.js'
import utils from './components/js/utils.js'
import store from './store'
import {
  VueAxios
} from './utils/request'
import './styles/common.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import VueScroller from 'vue-scroller'
import './styles/liu_css.css'
// 引入echarts
import echarts from 'echarts'
// import MintUI from 'mint-ui'
import { IndexList, IndexSection, Cell } from 'mint-ui'
import Mui from 'vue-awesome-mui'

import 'mint-ui/lib/style.css'

import customComponents from './custom-components'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import moment from 'moment'// 导入文件
Vue.prototype.$moment = moment// 赋值使用
moment.locale('zh-cn')// 需要汉化
Vue.use(VueAwesomeSwiper)
Vue.use(Mui)
// Vue.use(MintUI)
Vue.component(IndexList.name, IndexList)
Vue.component(IndexSection.name, IndexSection)
Vue.component(Cell.name, Cell)
Vue.prototype.$beginNavi = beginNavigation
Vue.prototype.$utils = utils
// Vue.component(Cell.name, Cell)

Vue.use(customComponents)
Vue.prototype.$echarts = echarts
Vue.use(Vant)
Vue.config.productionTip = false
Vue.use(VueAxios)
Vue.use(router)
Vue.use(VueScroller)
window.Event = new Vue()
window.addEventListener(
  'popstate',
  function (e) {
    router.isBack = true
  },
  false
)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
