import {
  axios
} from '@/utils/request'
import api from '../index'

export function creatRoleResource (param) {
  return axios({
    url: api.UPMS.BasicRoleResource,
    data: param,
    method: 'POST'
  })
}
