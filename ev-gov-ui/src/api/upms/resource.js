import { axios } from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function delResource (param) {
  return axios({
    url: api.UPMS.BasicResource,
    params: param,
    method: 'delete',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}
export function getAllMenuTree () {
  return axios({
    url: api.UPMS.GetAllResource,
    method: 'get'
  })
}
export function editResource (param) {
  return axios({
    url: api.UPMS.BasicResource,
    params: param,
    method: 'put'
  })
}

export function createNewMenu (param) {
  return axios({
    url: api.UPMS.BasicResource,
    params: param,
    method: 'post'
  })
}

export function getResource (param) {
  return axios({

    url: api.UPMS.GetResourceList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}

export function getMenuTree () {
  return axios({
    url: api.UPMS.GetResourceTree,
    method: 'get'
  })
}
