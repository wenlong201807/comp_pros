import { userInfoModify, displayNameGet, displayNameModify } from 'src/api/memberInfo/index'
const ope = {
  state: {
  },
  actions: {
    // 修改个人资料
    userInfoModify ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        userInfoModify(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取昵称
    displayNameGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        displayNameGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改昵称
    displayNameModify ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        displayNameModify(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
  }
}
export default ope
