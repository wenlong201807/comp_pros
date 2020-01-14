import { getRole, delRole, createNewRole, editRole, getRoleTree, getRoleMenu } from '@/api/upms/role'

const role = {
  state: {},

  mutations: {},

  actions: {
    // 删除角色
    DelRole ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        delRole(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取角色信息
    GetRoleMsg ({ commit, state }) {
      return new Promise((resolve, reject) => {
        getRole().then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 创建新的角色
    CreateNewRole ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        createNewRole(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 修改角色信息
    EditRole ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        editRole(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取角色列表树
    GetRoleTree ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getRoleTree(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取角色列表树
    GetRoleMenu ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getRoleMenu(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default role
