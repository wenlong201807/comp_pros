import { axios } from '@/utils/request'
import QS from 'qs'
import api from '../index'

export function delOrg (param) {
  return axios({
    url: api.UPMS.BasicOrg,
    params: param,
    method: 'delete',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function editOrg (param) {
  return axios({
    url: api.UPMS.BasicOrg,
    params: param,
    method: 'put'
  })
}
export function createNewOrg (param) {
  return axios({
    url: api.UPMS.BasicOrg,
    params: param,
    method: 'post'
  })
}

export function getOrg (param) {
  return axios({
    url: api.UPMS.GetOrgList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}

export function getOrgTree (param) {
  return axios({
    url: api.UPMS.GetOrgTree,
    method: 'post',
    params: param
  })
}

export function getOrgInfoById (param) {
  return axios({
    url: api.UPMS.BasicOrg + param.id,
    method: 'get'
  })
}
