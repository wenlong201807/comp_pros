import { axios } from '@/utils/request'
import api from '../index'
import QS from 'qs'

export function designSave (param) {
  return axios({
    url: api.DESIGN.SaveModel,
    data: QS.stringify(param),
    method: 'post'
  })
}
export function designEdit (param) {
  return axios({
    url: api.DESIGN.EditModel,
    data: QS.stringify(param),
    method: 'post'
  })
}
