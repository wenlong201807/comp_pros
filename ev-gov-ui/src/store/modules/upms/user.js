import {
  listByPage,
  getRolesList,
  updateUser,
  saveUser,
  deleteUser,
  userListByPage,
  userRole
} from '@/api/upms/user'

const user = {
  state: {},

  mutations: {},

  actions: {
    // 查询用户列表
    ListByPageForUser ({
      commit,
      state
    }, data) {
      return new Promise((resolve) => {
        listByPage(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          resolve(error)
        })
      })
    },
    // 查询用户列表
    ListByPageForUser1 ({
      commit,
      state
    }, data) {
      return new Promise((resolve) => {
        userListByPage(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          resolve(error)
        })
      })
    },
    // 更新用户
    UpdateUser ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        updateUser(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 获取角色列表
    GetRoleList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getRolesList(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 删除用户
    DeleteUser ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        deleteUser(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 保存用户
    SaveUser ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        saveUser(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    },
    // 授权用户角色
    UserRole ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        userRole(data).then((response) => {
          resolve(response)
        }).catch((error) => {
          reject(error)
        })
      })
    }
  }
}

export default user
