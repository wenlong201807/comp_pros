import { getRoleGroup, createNewRoleGroup, editRoleGroup, delRoleGroup } from '@/api/upms/roleGroup'
const roleGroup = {
  state: {},
  mutations: {},
  actions: {
    DelRoleGroup ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        delRoleGroup(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditRoleGroup ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        editRoleGroup(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetRoleGroup ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getRoleGroup(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 创建新的角色组
    CreateNewRoleGroup ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        createNewRoleGroup(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}
export default roleGroup
