import {
  axios
} from 'src/utils/request'
import api from '../index'

export function queryExterior (param) {
  return axios({
    url: api.GOV.QueryExterior,
    params: param,
    method: 'post'
  })
}
export function runStatus (param) {
  return axios({
    url: api.GOV.RunStatus,
    data: param,
    method: 'post'
  })
}
export function stationIncrease (param) {
  return axios({
    url: api.GOV.StationIncrease,
    params: param,
    method: 'post'
  })
}
export function stakeIncrease (param) {
  return axios({
    url: api.GOV.StakeIncrease,
    params: param,
    method: 'post'
  })
}
export function runDataStatus (param) {
  return axios({
    url: api.GOV.RunDataStatus,
    data: param,
    method: 'post'
  })
}
export function countByParameter (param) {
  return axios({
    url: api.GOV.CountByParameter,
    data: param,
    method: 'post'
  })
}
export function groupStatisticsByBrandCount (param) {
  return axios({
    url: api.GOV.GroupStatisticsByBrandCount,
    data: param,
    method: 'post'
  })
}
export function groupStatisticsByModelCount (param) {
  return axios({
    url: api.GOV.GroupStatisticsByModelCount,
    data: param,
    method: 'post'
  })
}
export function staketypenumber (param) {
  return axios({
    url: api.GOV.Staketypenumber,
    data: param,
    method: 'post'
  })
}
export function number (param) {
  return axios({
    url: api.GOV.Number,
    data: param,
    method: 'post'
  })
}
export function listIncrementYear (param) {
  return axios({
    url: api.GOV.ListIncrementYear,
    params: param,
    method: 'post'
  })
}
export function statisticsEleTimes (param) {
  return axios({
    url: api.GOV.StatisticsEleTimes,
    data: param,
    params: param.basic,

    method: 'post'
  })
}
export function operatortotalPower (param) {
  return axios({
    url: api.GOV.OperatortotalPower,
    data: param,
    method: 'post'
  })
}
export function stakeUsePower (param) {
  return axios({
    url: api.GOV.StakeUsePower,
    data: param,
    method: 'post'
  })
}
export function queryPurpose (param) {
  return axios({
    url: api.GOV.QueryPurpose,
    params: param,
    method: 'post'
  })
}
export function queryMileage (param) {
  return axios({
    url: api.GOV.QueryMileage,
    params: param,
    method: 'post'
  })
}
export function opeTimesAndEleChange (param) {
  return axios({
    url: api.GOV.TimesAndEleChange,
    params: param,
    method: 'post'
  })
}
export function queryChargeUtilizationRatio (param) {
  return axios({
    url: api.GOV.QueryChargeUtilizationRatio,
    params: param,
    method: 'get'
  })
}
export function realPowerHistory (param) {
  return axios({
    url: api.GOV.RealPowerHistory,
    params: param,
    method: 'post'
  })
}
export function stakeUseType (param) {
  return axios({
    url: api.GOV.StakeUseType,
    params: param,
    method: 'post'
  })
}
export function stakeCategory (param) {
  return axios({
    url: api.GOV.StakeCategory,
    params: param,
    method: 'post'
  })
}
export function stationBuildnNumber (param) {
  return axios({
    url: api.GOV.StationBuildnNumber,
    params: param,
    method: 'post'
  })
}
