import {
  axios
} from '@/utils/request'
import api from '../index'
export function opeStationListByPage (param) {
  return axios({
    url: api.OPE.OpeStationListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function opeStakeListByPage (param) {
  return axios({
    url: api.OPE.OpeStakeListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function opeStationRunInfo (param) {
  return axios({
    url: api.OPE.OpeStationRunInfo,
    params: param,
    method: 'post'
  })
}
export function opeStationListExp (param) {
  return axios({
    url: api.OPE.OpeStationListExp,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function opeStakeListExp (param) {
  return axios({
    url: api.OPE.OpeStakeListExp,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function opeStationRunInfoExp (param) {
  return axios({
    url: api.OPE.OpeStationRunInfoExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function opeStakeLngLatInfo (param) {
  return axios({
    url: api.OPE.OpeStakeLngLatInfo,
    params: param,
    method: 'post'
  })
}
export function stakeDataByAreaTime (param) {
  return axios({
    url: api.OPE.StakeDataByAreaTime,
    params: param,
    method: 'get'
  })
}
export function queryAreaDataMax (param) {
  return axios({
    url: api.OPE.QueryAreaDataMax,
    params: param,
    method: 'get'
  })
}
export function opeDetailsSearch (param) {
  return axios({
    url: api.OPE.OpeDetailsSearch,
    method: 'post'
  })
}
export function opeDetailsAdd (param) {
  return axios({
    url: api.OPE.OpeDetailsAdd,
    data: param,
    method: 'post'
  })
}
export function opeDetailsDelete (param) {
  return axios({
    url: api.OPE.OpeDetailsDelete,
    params: param,
    method: 'post'
  })
}
export function opeEquipmentAdd (param) {
  return axios({
    url: api.OPE.OpeEquipmentAdd,
    data: param,
    method: 'post'
  })
}
export function opeEquipmentQuery (param) {
  return axios({
    url: api.OPE.OpeEquipmentQuery,
    params: param,
    method: 'post'
  })
}
export function opeTradeInfo (param) {
  return axios({
    url: api.OPE.OpeTradeInfo,
    params: param,
    method: 'post'
  })
}
export function opeTradeInfoExp (param) {
  return axios({
    url: api.OPE.OpeTradeInfoExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
