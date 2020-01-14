import { login, getInfo, logout, image } from '../../api/login'
import { getStore, setStore, clearStore } from 'src/utils/store'
import { codeLog } from '../../api/information/info'
import { userInfoGet } from '../../api/memberInfo'
// import axios from 'src/utils/fetch'

const user = {
  state: {
    isLogin: false,
    user: {
      // name: getStore({ name: 'username' }) || '',
      // avatar: getStore({ name: 'avatar' }) || '',
      // token: getStore('Access-Token') || ''
    },
    token: getStore('Access-Token') || '',
    userInfo: '',
    userSpecific: ''
  },
  actions: { // 登录验证码
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

    Login ({ commit }, data) {
      return new Promise((resolve, reject) => {
        login(data).then(response => {
          commit('SET_TOKEN', response.access_token)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_USERINFO', '')
          commit('SET_USE_PERSON', '')
          clearStore()
        })
      })
    },
    // 获取个人资料
    userInfoGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        userInfoGet(data).then(response => {
          commit('SET_USE_PERSON', response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取用户信息
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          commit('SET_USERINFO', response.principal)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CodeLog ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        codeLog(data)
          .then(response => {
            commit('SET_TOKEN', response.access_token)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  },
  mutations: {
    SET_USERINFO (state, userInfo) {
      state.userInfo = userInfo
      setStore('userInfoAll', userInfo)
    },
    SET_TOKEN (state, token) {
      state.token = token
      setStore('Access-Token', token)
    },
    SET_USE_PERSON (state, userSpecific) {
      state.userSpecific = userSpecific
      setStore('userSpecific', userSpecific)
    }
  }
}
export default user
