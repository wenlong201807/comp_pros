import api from './index'
import { axios } from '@/utils/request'
import QS from 'qs'

const Base64 = require('js-base64').Base64

export function login (parameter) {
  return axios({
    url: api.Login,
    method: 'post',
    data: QS.stringify(parameter),
    headers: {
      'Authorization': 'Basic ' + Base64.encode('ev_gov_pc:ev_gov_pc_secret')
    }
  })
}

export function getInfo () {
  return axios({
    url: api.GetInfo,
    method: 'get'
  })
}

export function getCurrentUserNav (token) {
  return axios({
    url: api.GetCurrentUserNav,
    method: 'get'
  })
}

export function logout () {
  return axios({
    url: api.Logout,
    method: 'post'
  })
}

export function getLoginLog (param) {
  return axios({
    url: api.GetLoginLog,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function image (param) {
  return axios({
    url: api.Image,
    params: param,
    responseType: 'arraybuffer',
    method: 'get'
  })
}
