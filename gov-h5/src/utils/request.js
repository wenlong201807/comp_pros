import { getStore } from 'src/utils/store'
import axios from 'axios'
import store from 'src/store'
// import notification from 'ant-design-vue/es/notification'
import { VueAxios } from './axios'
// import { ACCESS_TOKEN } from '@/store/mutation-types'

// 创建 axios 实例
const service = axios.create({
  baseURL: '', // api base_url
  timeout: 60000 // 请求超时时间
})

const err = (error) => {
  if (error.response) {
    const data = error.response.data
    const token = getStore('Access-Token')
    if (error.response.status === 403) {
      this.$notify({ type: 'danger', message: data.message })
    }
    if (error.response.status === 401 && !(data.result && data.result.isLogin)) {
      this.$notify({ type: 'danger', message: '访问由于凭据无效被拒绝' })
      if (token) {
        store.dispatch('Logout').then(() => {
          setTimeout(() => {
            window.location.reload()
          }, 1500)
        })
      }
    }
  }
  return Promise.reject(error)
}

// request interceptor
service.interceptors.request.use(config => {
  const token = getStore('Access-Token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token // 让每个请求携带自定义 token 请根据实际情况自行修改
  }
  return config
}, err)
// response interceptor
service.interceptors.response.use((response) => {
  return response.data
}, err)

const installer = {
  vm: {},
  install (Vue) {
    Vue.use(VueAxios, service)
  }
}

export {
  installer as VueAxios,
  service as axios
}
