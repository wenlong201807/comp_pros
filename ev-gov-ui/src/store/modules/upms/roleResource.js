import {
  creatRoleResource
} from '@/api/upms/roleResource'

const roleResource = {
  state: {},

  mutations: {},

  actions: {
    CreatRoleResource ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        creatRoleResource(data).then(response => {
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
export default roleResource
