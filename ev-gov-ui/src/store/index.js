import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import user from './modules/user'

import permission from './modules/async-router'
import getters from './getters'

// UPMS
import upmsUser from './modules/upms/user'
import org from './modules/upms/org'
import upmsRole from './modules/upms/role'
import upmsApp from './modules/upms/app'
import upmsResource from './modules/upms/resource'
import upmsRoleGroup from './modules/upms/roleGroup'
import upmsRoleResource from './modules/upms/roleResource'
import misgModel from './modules/misg/model'
import misgQrtd from './modules/misg/qrtd'

// design
import design from './modules/design/normal'
import map from './modules/amap'

// gov
import synthetic from './modules/gov/synthetic'

// ope
import ope from './modules/gov/ope'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    org,
    user,
    permission,
    upmsUser,
    upmsApp,
    upmsResource,
    upmsRoleGroup,
    upmsRoleResource,
    upmsRole,
    misgModel,
    misgQrtd,
    design,
    map,
    synthetic,
    ope
  },
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters
})
