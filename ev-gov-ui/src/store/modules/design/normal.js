import { designEdit, designSave } from '@/api/design/normal'

const normal = {
  state: {},
  mutations: {},
  actions: {
    DesignSave ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        designSave(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    DesignEdit ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        designEdit(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default normal
