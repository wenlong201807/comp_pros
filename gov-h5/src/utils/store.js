// import { validatenull } from 'src/utils/validate'

const keyName = 'store' + '-'
/**
 * 存储localStorage
 */
export const setStore = (key, value) => {
  // key = keyName + key
  var curTime = new Date().getTime()
  window.localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }))
}
/**
 * 获取localStorage
 */

export const getStoreNoTime = (key, exp) => {
  // var { key, exp } = params
  // key = keyName + key
  var data = window.localStorage.getItem(key)
  var dataObj = JSON.parse(data)
  if (dataObj != null) {
    if (new Date().getTime() - dataObj.time > exp) {
      console.log('信息已过期')
    } else {
      var dataObjDatatoJson = dataObj.data
      return dataObjDatatoJson
    }
  }
}

export const getStore = (key) => {
  // key = keyName + key
  var exp = 7 * 24 * 60 * 60 * 1000 * 1000
  var data = window.localStorage.getItem(key)
  var dataObj = JSON.parse(data)
  if (dataObj != null) {
    if (new Date().getTime() - dataObj.time > exp) {
      console.log('信息已过期')
    } else {
      var dataObjDatatoJson = dataObj.data
      return dataObjDatatoJson
    }
  }
}

/**
 * 删除localStorage
 */
export const removeStore = (params = {}) => {
  var {
    name,
    type
  } = params
  name = keyName + name
  if (type) {
    window.sessionStorage.removeItem(name)
  } else {
    window.localStorage.removeItem(name)
  }
}

/**
 * 获取全部localStorage
 */
export const getAllStore = (params = {}) => {
  const list = []
  const {
    type
  } = params
  if (type) {
    for (let i = 0; i <= window.sessionStorage.length; i++) {
      list.push({
        name: window.sessionStorage.key(i),
        content: getStore({
          name: window.sessionStorage.key(i),
          type: 'session'
        })
      })
    }
  } else {
    for (let i = 0; i <= window.localStorage.length; i++) {
      list.push({
        name: window.localStorage.key(i),
        content: getStore({
          name: window.localStorage.key(i)
        })
      })
    }
  }
  return list
}

/**
 * 清空全部localStorage
 */
export const clearStore = (params = {}) => {
  const { type } = params
  if (type) {
    window.sessionStorage.clear()
  } else {
    window.localStorage.clear()
  }
}
