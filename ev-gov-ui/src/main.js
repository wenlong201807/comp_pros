// ie polyfill
import '@babel/polyfill'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import {
  VueAxios
} from './utils/request'

// mock
// import './mock'
import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

// 引入echarts
import echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// import
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)

new Vue({
  router,
  store,
  created: bootstrap,
  beforeCreate () {
    Vue.prototype.bus = this
  },
  render: h => h(App)
}).$mount('#app')
