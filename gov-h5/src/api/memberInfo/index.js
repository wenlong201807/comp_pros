import { axios } from 'src/utils/request'
import api from '../index'
export function userInfoGet (param) {
  // debugger
  // console.log(param)
  return axios({
    url: api.UserInfo.UserInfoGet + param,
    // data: param,
    // params: param.basic,
    method: 'get'
  })
}

export function userInfoModify (param) {
  return axios({
    url: api.UserInfo.UserInfoModify,
    data: param,
    // params: param.basic,
    method: 'PUT'
  })
}
export function displayNameGet (param) {
  return axios({
    url: api.MemberInfo.DisplayNameGet + param,
    // data: param,
    // params: param.basic,
    method: 'get'
  })
}
export function displayNameModify (param) {
  console.log(param)
  return axios({
    url: api.MemberInfo.DisplayNameModify,
    params: param,
    // params: param.basic,
    method: 'put'
  })
}
