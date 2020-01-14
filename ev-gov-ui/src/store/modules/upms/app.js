import { getApp, delApp, editApp, createNewApp } from '@/api/upms/app'

const app = {
  state: {},
  mutations: {},
  actions: {
    GetApp ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getApp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 删除应用
    DelApp ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        delApp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改角色信息
    EditApp ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        editApp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 创建新的应用
    CreateNewApp ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        createNewApp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default app
