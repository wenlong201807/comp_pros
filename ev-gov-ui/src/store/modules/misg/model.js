import {
  getModel

} from '@/api/misg/model'

const model = {
  state: {},

  mutations: {},

  actions: {

    // 获取角色信息
    GetModel ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getModel(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}

export default model
