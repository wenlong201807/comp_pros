import { getResource, getMenuTree, createNewMenu, editResource, delResource, getAllMenuTree } from '@/api/upms/resource'

const resource = {
  state: {},

  mutations: {},

  actions: {
    GetAllMenuTree ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getAllMenuTree().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DelResource ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        delResource(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditResource ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        editResource(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateNewMenu ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        createNewMenu(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetResource ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getResource(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetMenuTree ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getMenuTree().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default resource
