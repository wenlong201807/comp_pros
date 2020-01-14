import { axios } from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function getApp (param) {
  return axios({
    url: api.UPMS.GetAppList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}

export function delApp (param) {
  return axios({
    url: api.UPMS.BasicApp,
    params: param,
    method: 'delete',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function editApp (param) {
  return axios({
    url: api.UPMS.BasicApp,
    params: param,
    method: 'put'
  })
}

export function createNewApp (param) {
  return axios({
    url: api.UPMS.BasicApp,
    params: param,
    method: 'post'
  })
}
