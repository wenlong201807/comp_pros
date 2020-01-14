import {
  getAgency,
  getComplete,
  getEntrust,
  getFile,
  createNewEntrust,
  editEntrust,
  delEntrust,
  getAgent,
  getProcessDetails

} from '@/api/misg/qrtd'

const qrtd = {
  state: {},

  mutations: {},

  actions: {
    DelEntrust ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        delEntrust(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    EditEntrust ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        editEntrust(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    CreateNewEntrust ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        createNewEntrust(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAgency ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getAgency(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetProcessDetails ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getProcessDetails(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetComplete ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getComplete(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetEntrust ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getEntrust(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetAgent ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getAgent(data).then(response => {
          const result = response.data
          console.log('result' + result)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetFile ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getFile(data).then(response => {
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

export default qrtd
