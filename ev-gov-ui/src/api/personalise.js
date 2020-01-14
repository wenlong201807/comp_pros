import api from './index'
import { axios } from '@/utils/request'
import QS from 'qs'

export function initializationPersonalise (param) {
  return axios({
    url: api.BasicPersonalise,
    data: QS.stringify(param),
    method: 'post'
  })
}
// 更新个性化配置
export function updatePersonalise (param) {
  return axios({
    url: api.BasicPersonalise,
    data: QS.stringify(param),
    method: 'put'
  })
}
export function getPersonalise () {
  return axios({
    url: api.BasicPersonalise,
    method: 'get'
  })
}
export function getPersonaliseById (param) {
  return axios({
    url: api.BasicPersonalise + param.id,
    method: 'get'
  })
}
