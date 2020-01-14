import { axios } from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function getRole () {
  return axios({
    url: api.UPMS.GetRoleList,
    method: 'post'
  })
}

export function delRole (param) {
  return axios({
    url: api.UPMS.BasicRole,
    params: param,
    method: 'DELETE',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function createNewRole (param) {
  return axios({
    url: api.UPMS.BasicRole,
    params: param,
    method: 'post'
  })
}

export function editRole (param) {
  return axios({
    url: api.UPMS.BasicRole,
    params: param,
    method: 'put'
  })
}

export function getRoleTree () {
  return axios({
    url: api.UPMS.GetRoleTree,
    method: 'get'
  })
}

export function getRoleMenu (param) {
  return axios({
    url: api.UPMS.GetRoleMenu,
    params: param,
    method: 'get'
  })
}
