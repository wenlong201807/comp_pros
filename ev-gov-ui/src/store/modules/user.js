import Vue from 'vue'
import {
  login,
  getInfo,
  logout,
  getLoginLog,
  image

} from '@/api/login'
import {
  getPersonalise,
  initializationPersonalise,
  updatePersonalise,
  getPersonaliseById
} from '@/api/personalise'
import {
  ACCESS_TOKEN
} from '@/store/mutation-types'
import {
  welcome
} from '@/utils/util'
import {
  updateThemeNoMessage
} from '../../components/SettingDrawer/settingConfig'

const user = {
  state: {
    token: '',
    name: '',
    welcome: '',
    avatar: '',
    roles: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, {
      name,
      welcome
    }) => {
      state.name = name
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_INFO: (state, info) => {
      state.info = info
    }
  },

  actions: {
    // 登录验证码
    Image ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        image(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登录
    Login ({
      commit
    }, userInfo) {
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const result = response
          /* TOKEN存储与失效时间 */
          Vue.ls.set(ACCESS_TOKEN, result.access_token, 7 * 24 * 60 * 60 * 1000)
          commit('SET_TOKEN', result.access_token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取指定用户的个性化信息
    GetPersonaliseById ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getPersonaliseById(data).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户个性化配置
    GetPersonalise ({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        getPersonalise().then(response => {
          const result = response.data
          if (result) {
            // 设置当默认头像
            commit('SET_AVATAR', !result.avatar ? '../avatar/default_avatar.png' : result.avatar)
            commit('TOGGLE_THEME', result.navTheme)
            commit('TOGGLE_LAYOUT_MODE', result.layout)
            commit('TOGGLE_FIXED_HEADER', result.fixedHeader !== 0)
            commit('TOGGLE_FIXED_SIDERBAR', result.fixedSiderBar !== 0)
            commit('TOGGLE_CONTENT_WIDTH', result.contentWidth)
            commit('TOGGLE_FIXED_HEADER_HIDDEN', result.autoHideHeader !== 0)
            commit('TOGGLE_WEAK', result.colorWeak !== 0)
            commit('TOGGLE_COLOR', result.primaryColor)
            state.info.personaliseId = result.id
            commit('SET_INFO', state.info)
            updateThemeNoMessage(result.primaryColor)
          }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 初始化个性化配置
    InitializationPersonaliseById ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        const obj = {
          autoHideHeader: 0,
          avatar: data.avatar,
          colorWeak: 0,
          contentWidth: 'Fixed',
          fixedHeader: 0,
          fixedSiderBar: 0,
          layout: 'sidemenu',
          navTheme: 'dark',
          primaryColor: '#1890FF',
          userId: data.id
        }
        initializationPersonalise(obj)
      })
    },
    // 初始化个性化配置
    InitializationPersonalise ({
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        const obj = {
          autoHideHeader: 0,
          avatar: '../../avatar/default_avatar.png',
          colorWeak: 0,
          contentWidth: 'Fixed',
          fixedHeader: 0,
          fixedSiderBar: 0,
          layout: 'sidemenu',
          navTheme: 'dark',
          primaryColor: '#1890FF'
        }
        // 设置当默认头像
        commit('SET_AVATAR', obj.avatar)
        commit('TOGGLE_THEME', obj.navTheme)
        commit('TOGGLE_LAYOUT_MODE', obj.layout)
        commit('TOGGLE_FIXED_HEADER', obj.fixedHeader !== 0)
        commit('TOGGLE_FIXED_SIDERBAR', obj.fixedSiderBar !== 0)
        commit('TOGGLE_CONTENT_WIDTH', obj.contentWidth)
        commit('TOGGLE_FIXED_HEADER_HIDDEN', obj.autoHideHeader !== 0)
        commit('TOGGLE_WEAK', obj.colorWeak !== 0)
        commit('TOGGLE_COLOR', obj.primaryColor)
        initializationPersonalise(obj)
      })
    },
    // 更新个性化配置
    updatePersonalise ({
      commit,
      state
    }, data) {
      data.id = state.info.personaliseId
      return new Promise((resolve, reject) => {
        updatePersonalise(data)
      })
    },
    // 获取用户信息
    GetInfo ({
      commit
    }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const result = response
          if (result.authorities) {
            commit('SET_ROLES', result.authorities)
            commit('SET_INFO', result.principal)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }

          commit('SET_NAME', {
            name: result.principal.displayName,
            welcome: welcome()
          })

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取登陆日志
    GetLoginLog ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getLoginLog(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({
      commit,
      state
    }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    }

  }
}

export default user
