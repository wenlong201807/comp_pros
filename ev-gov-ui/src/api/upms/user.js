import api from '../index'
import {
  axios
} from '@/utils/request'
import QS from 'qs'

export function listByPage (param) {
  return axios({
    url: api.UPMS.GetUserList,
    method: 'post',
    data: param.params,
    params: param.basic
  })
}
export function userListByPage (param) {
  return axios({
    url: api.UPMS.GetUserList1,
    method: 'post',
    data: param.params,
    params: param.basic
  })
}

export function updatePassword (param) {
  return axios({
    url: api.UPMS.UpdatePassword,
    method: 'put',
    params: param
  })
}

export function updateUser (param) {
  return axios({
    url: api.UPMS.BasicUser,
    method: 'put',
    params: param,
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function saveUser (param) {
  return axios({
    url: api.UPMS.BasicUser,
    method: 'post',
    params: param,
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function deleteUser (param) {
  return axios({
    url: api.UPMS.BasicUser,
    method: 'delete',
    params: param,
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}

export function userRole (param) {
  return axios({
    url: api.UPMS.UserRole,
    method: 'post',
    params: param,
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}
