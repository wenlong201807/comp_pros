import { axios } from 'src/utils/request'
import api from '../index'
export function stakeStatisticsGet (param) {
  return axios({
    url: api.RoleGov.StakeStatisticsGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function statisticsEleTimeGet (param) {
  return axios({
    url: api.RoleGov.StatisticsEleTimeGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function stakeStatusNumberGet (param) {
  return axios({
    url: api.RoleGov.StakeStatusNumberGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function stakeUsePowerGet (param) {
  return axios({
    url: api.RoleGov.StakeUsePowerGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function carRunStatusGet (param) {
  return axios({
    url: api.RoleGov.CarRunStatusGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function carRunDataStatusGet (param) {
  return axios({
    url: api.RoleGov.CarrunDataStatusGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function carRunTotalGroucpByMouthGet (param) {
  return axios({
    url: api.RoleGov.CarRunTotalGroupByMouthGet,
    // data: param,
    params: param.basic,
    method: 'post'
  })
}
export function carOnceDriveMileageGet (param) {
  return axios({
    url: api.RoleGov.CarOnceDriveMileageGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function carDayDriveMileageGet (param) {
  return axios({
    url: api.RoleGov.CarDayDriveMileageGet,
    data: param,
    // params: param,
    method: 'post'
  })
}
export function carDayCountByDayCet (param) {
  return axios({
    url: api.RoleGov.CarDayCountByDayGet,
    // data: param,
    params: param.basic,
    method: 'post'
  })
}
export function carDayCountByWeekGet (param) {
  return axios({
    url: api.RoleGov.CarDayCountByWeekGet,
    // data: param,
    params: param.basic,
    method: 'post'
  })
}
