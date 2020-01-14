import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import common from './modules/common'
import user from './modules/user'
import info from './modules/infomation/info'
import map from './modules/amap'
import memberInfo from './modules/memberInfo/index'
// gov
import synthetic from './modules/gov/synthetic'
import roleGov from './modules/roleGov/index'
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    common,
    user,
    info,
    map,
    memberInfo,
    synthetic,
    roleGov
  },
  getters
})

export default store
