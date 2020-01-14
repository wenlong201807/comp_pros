import {
  axios
} from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function delRoleGroup (param) {
  return axios({
    url: api.UPMS.BasicRoleGroup,
    params: param,
    method: 'DELETE',
    paramsSerializer: params => {
      return QS.stringify(params, {
        indices: false
      })
    }
  })
}
export function editRoleGroup (param) {
  return axios({
    url: api.UPMS.BasicRoleGroup,
    params: param,
    method: 'put'
  })
}

export function getRoleGroup (param) {
  return axios({

    url: api.UPMS.GetRoleGroupList,
    params: param,
    method: 'post'
  })
}

export function createNewRoleGroup (param) {
  return axios({
    url: api.UPMS.BasicRoleGroup,
    params: param,
    method: 'post'
  })
}
