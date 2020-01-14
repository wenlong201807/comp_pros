import {
  getOrgTree,
  getOrgInfoById,
  getOrg,
  createNewOrg,
  editOrg,
  delOrg
} from '@/api/upms/org'

const user = {
  state: {},

  mutations: {},

  actions: {
    // 删除组织机构
    DelOrg ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        delOrg(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 编辑组织机构
    EditOrg ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        editOrg(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 创建组织机构
    CreateNewOrg ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        createNewOrg(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取组织机构列表分页
    GetOrg ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getOrg(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取组织机构树
    GetOrgTree ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getOrgTree(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取一些组织机构的信息
    GetOrgInfoById ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        getOrgInfoById(data).then(response => {
          resolve(response)
        })
      })
    }
  }
}

export default user
