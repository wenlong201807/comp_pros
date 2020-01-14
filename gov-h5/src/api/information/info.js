import {
  axios
} from 'src/utils/request'
import api from '../index'
import QS from 'qs'
const Base64 = require('js-base64').Base64
export function informationListGet (param) {
  console.log(api.Info.InfoListByPage)
  return axios({
    url: api.Info.InfoListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function appEvaluationInfo (param) {
  return axios({
    url: api.GOV.AppEvaluationInfo + param.id,
    method: 'get'
  })
}
export function informationDetail (param) {
  console.log(api.Info.InfoListByPage)
  return axios({
    url: api.Info.InfoListDetail,
    params: param,
    method: 'get'
  })
}
export function smsCode (param) {
  return axios({
    url: api.Info.SmsCode + param.basic,
    // data: param.params,
    // params: param.basic,
    method: 'get'
  })
}
export function add (param) {
  return axios({
    url: api.Info.Add,
    params: param,
    method: 'post'
  })
}
export function appMapStation (param) {
  return axios({
    url: api.Info.AppMapStation,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function appOperatorInfo (param) {
  return axios({
    url: api.Info.AppOperatorInfo,
    data: param,
    method: 'post'
  })
}
export function save (param) {
  return axios({
    url: api.Info.Save,
    data: param,
    method: 'post'
  })
}
export function appAddCollection (param) {
  return axios({
    url: api.Info.AppAddCollection,
    params: param,
    method: 'post'
  })
}
export function appDeleteCollection (param) {
  return axios({
    url: api.Info.AppDeleteCollection,
    params: param,
    method: 'post'
  })
}
export function codeLog (param) {
  return axios({
    url: api.Info.CodeLog,
    data: QS.stringify(param),
    method: 'post',
    headers: {
      'Authorization': 'Basic ' + Base64.encode('ev_gov_pc:ev_gov_pc_secret')
    }
  })
}
export function mapStation (param) {
  return axios({
    url: api.Info.MapStation,
    data: param,
    method: 'post'
  })
}
export function phonePassword (param) {
  return axios({
    url: api.PhonePassword,
    data: QS.stringify(param),
    method: 'put'
  })
}
export function appFeedbackAdd (param) {
  return axios({
    url: api.Info.AppFeedbackAdd,
    data: param,
    method: 'post'
  })
}
export function appCollectionList (param) {
  return axios({
    url: api.Info.AppCollectionList,
    data: param,
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
export function carRank (param) {
  return axios({
    url: api.Info.CarRank,
    params: param,
    method: 'post'
  })
}
export function todayVariousPower (param) {
  return axios({
    url: api.GOV.TodayVariousPower,
    params: param,
    method: 'post'
  })
}
export function stakeRank (param) {
  return axios({
    url: api.Info.StakeRank,
    data: param,
    method: 'post'
  })
}
export function letterList (param) {
  return axios({
    url: api.Info.LetterList,
    params: param,
    method: 'post'
  })
}
export function stakeLetterList (param) {
  return axios({
    url: api.Info.StakeLetterList,
    params: param,
    method: 'post'
  })
}
export function queryExterior (param) {
  return axios({
    url: api.GOV.QueryExterior,
    params: param,
    method: 'post'
  })
}
export function appAllStakeInfo (param) {
  return axios({
    url: api.Info.AppAllStakeInfo,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function appMapstake (param) {
  return axios({
    url: api.Info.AppMapstake,
    params: param,
    method: 'post'
  })
}
export function appEvaluationGrade (param) {
  return axios({
    url: api.Info.AppEvaluationGrade,
    params: param,
    method: 'post'
  })
}
export function opeStakeUseType (param) {
  return axios({
    url: api.GOV.OpeStakeUseType,
    params: param,
    method: 'post'
  })
}
export function opeStakeCategory (param) {
  return axios({
    url: api.GOV.OpeStakeCategory,
    params: param,
    method: 'post'
  })
}
export function indexList (param) {
  return axios({
    url: api.Info.IndexList,
    params: param,
    method: 'post'
  })
}
export function powerForecastAndEle (param) {
  return axios({
    url: api.GOV.PowerForecastAndEle,
    params: param,
    method: 'post'
  })
}
