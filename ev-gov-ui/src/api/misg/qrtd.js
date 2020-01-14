import {
  axios
} from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function delEntrust (param) {
  return axios({
    url: api.MISG.DelEntrust,
    params: param,
    method: 'post',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}
export function editEntrust (param) {
  return axios({
    url: api.MISG.EditEntrust,
    params: param,
    method: 'post'
  })
}

export function createNewEntrust (param) {
  return axios({
    url: api.MISG.BasicEntrust,
    params: param,
    method: 'post'
  })
}
export function getFile (param) {
  return axios({
    url: api.MISG.GetFileList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getProcessDetails (param) {
  return axios({
    url: api.MISG.GetProcessDetails,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getAgency (param) {
  return axios({
    url: api.MISG.GetAgencyList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getComplete (param) {
  return axios({
    url: api.MISG.GetCompleteList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getEntrust (param) {
  return axios({
    url: api.MISG.GetEntrustList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
export function getAgent (param) {
  return axios({
    url: api.MISG.GetAgentList,
    data: param.params,
    params: param.basic,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
