import {
  axios
} from '@/utils/request'
import api from '../index'
export function authuserinfo (param) {
  return axios({
    url: api.GOV.Authuserinfo + param.id,
    method: 'get'
  })
}
export function driveMileage (param) {
  return axios({
    url: api.GOV.DriveMileage,
    data: param,
    method: 'post'
  })
}

export function driveTime (param) {
  return axios({
    url: api.GOV.DriveTime,
    data: param,
    method: 'post'
  })
}

export function driveDayMileage (param) {
  return axios({
    url: api.GOV.DriveDayMileage,
    data: param,
    method: 'post'

  })
}
export function driveTimeOneDay (param) {
  return axios({
    url: api.GOV.DriveTimeOneDay,
    data: param,
    method: 'post'
  })
}
export function socAnalyze (param) {
  return axios({
    url: api.GOV.SocAnalyze,
    data: param,
    method: 'post'
  })
}
export function customSettingList (param) {
  return axios({
    url: api.GOV.CustomSettingList,
    params: param,
    method: 'post'
  })
}
export function countByDay (param) {
  return axios({
    url: api.GOV.CountByDay,
    params: param,
    method: 'post'
  })
}
export function countByWeek (param) {
  return axios({
    url: api.GOV.CountByWeek,
    params: param,
    method: 'post'
  })
}
export function factoryAnalysis (param) {
  return axios({
    url: api.GOV.FactoryAnalysis,
    params: param,
    method: 'post'
  })
}
export function brandAnalysis (param) {
  return axios({
    url: api.GOV.BrandAnalysis,
    params: param,
    method: 'post'
  })
}
export function dayDriverMileage (param) {
  return axios({
    url: api.GOV.DayDriverMileage,
    params: param,
    method: 'post'
  })
}
export function dayDriverTime (param) {
  return axios({
    url: api.GOV.DayDriverTime,
    params: param,
    method: 'post'
  })
}
export function monthlyCharge (param) {
  return axios({
    url: api.GOV.MonthlyCharge,
    params: param,
    method: 'get'
  })
}
export function timeSlot (param) {
  return axios({
    url: api.GOV.TimeSlot,
    params: param,
    method: 'get'
  })
}
export function operatorListByPage (param) {
  return axios({
    url: api.GOV.OperatorListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function stationListByPage (param) {
  return axios({
    url: api.GOV.StationListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function stakeListByPage (param) {
  return axios({
    url: api.GOV.StakeListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function vehicleListByPage (param) {
  return axios({
    url: api.GOV.VehicleListByPage,
    params: param,
    method: 'post'
  })
}
export function vehicleList (param) {
  return axios({
    url: api.GOV.VehicleList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function groupStatisticsByFactory (param) {
  return axios({
    url: api.GOV.GroupStatisticsByFactory,
    data: param,
    method: 'post'
  })
}
export function groupStatisticsByBrand (param) {
  return axios({
    url: api.GOV.GroupStatisticsByBrand,
    data: param,
    method: 'post'
  })
}
export function driveDetail (param) {
  return axios({
    url: api.GOV.DriveDetail,
    params: param,
    method: 'post'
  })
}
export function chargeDetail (param) {
  return axios({
    url: api.GOV.ChargeDetail,
    params: param,
    method: 'post'
  })
}
export function waringLevel (param) {
  return axios({
    url: api.GOV.WaringLevel,
    params: param,
    method: 'post'
  })
}
export function warningCategory (param) {
  return axios({
    url: api.GOV.WarningCategory,
    params: param,
    method: 'post'
  })
}
export function warningCompany (param) {
  return axios({
    url: api.GOV.WarningCompany,
    params: param,
    method: 'post'
  })
}
export function warningMonthSize (param) {
  return axios({
    url: api.GOV.WarningMonthSize,
    params: param,
    method: 'post'
  })
}
export function warningTopThree (param) {
  return axios({
    url: api.GOV.WarningTopThree,
    params: param,
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
export function runStatus (param) {
  return axios({
    url: api.GOV.RunStatus,
    data: param,
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
export function groupStatisticsByModelCount (param) {
  return axios({
    url: api.GOV.GroupStatisticsByModelCount,
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
export function statisticsEleTimes (param) {
  return axios({
    url: api.GOV.StatisticsEleTimes,
    data: param.params,
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
export function timesAndEleChange (param) {
  return axios({
    url: api.GOV.TimesAndEleChange,
    params: param,
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
export function realPowerHistory (param) {
  return axios({
    url: api.GOV.RealPowerHistory,
    params: param,
    method: 'post'
  })
}
export function stakeNumRank (param) {
  return axios({
    url: api.GOV.StakeNumRank,
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
export function queryChargeUtilizationRatio (param) {
  return axios({
    url: api.GOV.QueryChargeUtilizationRatio,
    params: param,
    method: 'get'
  })
}
export function allstation (param) {
  return axios({
    url: api.GOV.Allstation,
    data: param,
    method: 'post'
  })
}
export function listAdministrativeOfArea (param) {
  return axios({
    url: api.GOV.ListAdministrativeOfArea,
    params: param,
    method: 'post'
  })
}
export function listIncrementMonth (param) {
  return axios({
    url: api.GOV.ListIncrementMonth,
    params: param,
    method: 'post'
  })
}
export function listStakeOperatorByPage (param) {
  return axios({
    url: api.GOV.ListStakeOperatorByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function listStakeProduceOperatorByPage (param) {
  return axios({
    url: api.GOV.ListStakeProduceOperatorByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function listcodeandname (param) {
  return axios({
    url: api.GOV.Listcodeandname,
    data: param,
    method: 'post'
  })
}
export function vehicleOnlineList (param) {
  return axios({
    url: api.GOV.VehicleOnlineList,
    params: param,
    method: 'get'
  })
}
export function joinUpStatusList (param) {
  return axios({
    url: api.GOV.JoinUpStatusList,
    params: param,
    method: 'get'
  })
}
export function listIncrementYear (param) {
  return axios({
    url: api.GOV.ListIncrementYear,
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
export function queryBrands (param) {
  return axios({
    url: api.GOV.QueryBrands,
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
export function queryPurpose (param) {
  return axios({
    url: api.GOV.QueryPurpose,
    params: param,
    method: 'post'
  })
}
export function stakeDataByAreaTime (param) {
  return axios({
    url: api.GOV.StakeDataByAreaTime,
    params: param,
    method: 'get'
  })
}
export function vehicleNumByMileage (param) {
  return axios({
    url: api.GOV.VehicleNumByMileage,
    params: param,
    method: 'get'
  })
}
export function queryAreaDataMax (param) {
  return axios({
    url: api.GOV.QueryAreaDataMax,
    params: param,
    method: 'get'
  })
}
export function vehicleMileageList (param) {
  return axios({
    url: api.GOV.VehicleMileageList,
    params: param,
    method: 'get'
  })
}
export function vehicleBatteryInfo (param) {
  return axios({
    url: api.GOV.VehicleBatteryInfo,
    params: param,
    method: 'get'
  })
}
export function listStakeDataByOperatorTime (param) {
  return axios({
    url: api.GOV.ListStakeDataByOperatorTime,
    params: param,
    method: 'get'
  })
}
export function stakeStatusNumber (param) {
  return axios({
    url: api.GOV.StakeStatusNumber,
    data: param,
    method: 'post'
  })
}
export function allStakeInfo (param) {
  return axios({
    url: api.GOV.AllStakeInfo,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function stakeStatusNumByMerchant (param) {
  return axios({
    url: api.GOV.StakeStatusNumByMerchant,
    params: param,
    method: 'get'
  })
}
export function queryAreaStationStakeTree (param) {
  return axios({
    url: api.GOV.QueryAreaStationStakeTree,
    params: param,
    method: 'get'
  })
}
export function batteryListByPage (param) {
  return axios({
    url: api.GOV.BatteryListByPage,
    params: param,
    method: 'post'
  })
}
export function historyWarningListByPage (param) {
  return axios({
    url: api.GOV.HistoryWarningListByPage,
    params: param,
    method: 'post'
  })
}
export function companyList (param) {
  return axios({
    url: api.GOV.CompanyList,
    data: param,
    method: 'post'
  })
}
export function forewaringInspectionList (param) {
  return axios({
    url: api.GOV.ForewaringInspectionList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function handleMassageList (param) {
  return axios({
    url: api.GOV.HandleMassageList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function alarmTypeList () {
  return axios({
    url: api.GOV.AlarmTypeList,

    method: 'post'
  })
}
export function handleTypeList () {
  return axios({
    url: api.GOV.HandleTypeList,

    method: 'post'
  })
}
export function forewaringInspectionHandleTypeList (param) {
  return axios({
    url: api.GOV.ForewaringInspectionHandleTypeList,
    params: param.basic,
    method: 'get'
  })
}
export function getVehicleData (param) {
  return axios({
    url: api.GOV.GetVehicleData,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function customSettingList1 (param) {
  return axios({
    url: api.GOV.CustomSettingList1,

    method: 'post'
  })
}
export function addCondition (param) {
  return axios({
    url: api.GOV.AddCondition,
    data: param.data,

    method: 'post'
  })
}
export function confirmOperator (param) {
  return axios({
    url: api.GOV.ConfirmOperator,
    params: param,

    method: 'post'
  })
}
export function updateStatus (param) {
  return axios({
    url: api.GOV.UpdateStatus,
    params: param,
    method: 'post'
  })
}
export function vHeatForMap (param) {
  return axios({
    url: api.GOV.VHeatForMap,
    params: param,
    method: 'post'
  })
}
export function mileageCurve (param) {
  return axios({
    url: api.GOV.MileageCurve,
    params: param,
    method: 'get'
  })
}
export function vehicleDetailData (param) {
  return axios({
    url: api.GOV.VehicleDetailData,
    params: param,
    method: 'get'
  })
}
export function vehicleGetCanList (param) {
  return axios({
    url: api.GOV.VehicleGetCanList,
    params: param,
    method: 'post'
  })
}
export function vehicleGetCanData (param) {
  return axios({
    url: api.GOV.VehicleGetCanData,
    params: param,
    method: 'post'
  })
}
export function getVehicleLocationStatus (param) {
  return axios({
    url: api.GOV.GetVehicleLocationStatus,
    params: param,
    method: 'get'
  })
}

export function stakeOperatorExp (param) {
  return axios({
    url: api.GOV.StakeOperatorExp,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationExp (param) {
  return axios({
    url: api.GOV.StationExp,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stakeExp (param) {
  return axios({
    url: api.GOV.StakeExp,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationtypenumber (param) {
  return axios({
    url: api.GOV.Stationtypenumber,
    data: param,
    method: 'post'
  })
}
export function stationtotalPower (param) {
  return axios({
    url: api.GOV.StationtotalPower,
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
export function carDetailData (param) {
  return axios({
    url: api.GOV.CarDetailData,
    params: param,
    method: 'get'
  })
}
export function realAlarmHandleList (param) {
  return axios({
    url: api.GOV.RealAlarmHandleList,
    data: param,
    method: 'post'
  })
}
export function handleList (param) {
  return axios({
    url: api.GOV.HandleList,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function vehicleExp (param) {
  return axios({
    url: api.GOV.VehicleExp,
    data: param.params,
    params: param.basic,
    method: 'post',
    responseType: 'blob'
  })
}
export function vehicleBatteryExp (param) {
  return axios({
    url: api.GOV.VehicleBatteryExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function joinUpStatusExp (param) {
  return axios({
    url: api.GOV.JoinUpStatusExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function mileageOfBrandExp (param) {
  return axios({
    url: api.GOV.MileageOfBrandExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function onlineExp (param) {
  return axios({
    url: api.GOV.OnlineExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function vehicleNumOfMileageExp (param) {
  return axios({
    url: api.GOV.VehicleNumOfMileageExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function waringExp (param) {
  return axios({
    url: api.GOV.WaringExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function forewaringList (param) {
  return axios({
    url: api.GOV.ForewaringList,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function dataTransferHandleList (param) {
  return axios({
    url: api.GOV.DataTransferHandleList,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function heandleDateTransfetStatus (param) {
  return axios({
    url: api.GOV.HeandleDateTransfetStatus,
    params: param,

    method: 'post'
  })
}
export function merchantMissingStation (param) {
  return axios({
    url: api.GOV.MerchantMissingStation,
    params: param,
    method: 'post'
  })
}
export function merchantStakeStatusExpoer (param) {
  return axios({
    url: api.GOV.MerchantStakeStatusExpoer,
    data: param.params,
    params: param.basic,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationMissingMerchant (param) {
  return axios({
    url: api.GOV.StationMissingMerchant,
    params: param,
    method: 'post'
  })
}
export function stationHasErrorAreaCode (param) {
  return axios({
    url: api.GOV.StationHasErrorAreaCode,
    params: param,
    method: 'post'
  })
}
export function stationNoStakeList (param) {
  return axios({
    url: api.GOV.StationNoStakeList,
    params: param,
    method: 'post'
  })
}
export function stakeNoStationList (param) {
  return axios({
    url: api.GOV.StakeNoStationList,
    params: param,
    method: 'post'
  })
}
export function stakeNoGunList (param) {
  return axios({
    url: api.GOV.StakeNoGunList,
    params: param,
    method: 'post'
  })
}
export function listByPage (param) {
  return axios({
    url: api.GOV.ListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function feedBackListByPage (param) {
  return axios({
    url: api.GOV.FeedBackListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function evaluationInfoListByPage (param) {
  return axios({
    url: api.GOV.EvaluationInfoListByPage,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function approvalProcess (param) {
  return axios({
    url: api.GOV.ApprovalProcess,
    data: param.params,
    params: param.basic,
    method: 'post'
  })
}
export function gunNoStakeList (param) {
  return axios({
    url: api.GOV.GunNoStakeList,
    params: param,
    method: 'post'
  })
}
export function gunNoStakeListExp (param) {
  return axios({
    url: api.GOV.GunNoStakeListExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stakeNoGunListExp (param) {
  return axios({
    url: api.GOV.StakeNoGunListExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationHasErrorAreaCodeExp (param) {
  return axios({
    url: api.GOV.StationHasErrorAreaCodeExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationNoStakeListExp (param) {
  return axios({
    url: api.GOV.StationNoStakeListExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stakeNoStationListExp (param) {
  return axios({
    url: api.GOV.StakeNoStationListExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function merchantMissingStationExp (param) {
  return axios({
    url: api.GOV.MerchantMissingStationExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function stationMissingMerchantExp (param) {
  return axios({
    url: api.GOV.StationMissingMerchantExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function canListExp (param) {
  return axios({
    url: api.GOV.CanListExp,
    params: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function opeNumber (param) {
  return axios({
    url: api.OPE.OpeNumber,
    data: param,
    method: 'post'
  })
}
export function opeOperatorTotalPower (param) {
  return axios({
    url: api.OPE.OpeOperatorTotalPower,
    data: param,
    method: 'post'
  })
}
export function opeStakeUsePower (param) {
  return axios({
    url: api.OPE.OpeStakeUsePower,
    data: param,
    method: 'post'
  })
}
export function opeStationIncrease (param) {
  return axios({
    url: api.OPE.OpeStationIncrease,
    params: param,
    method: 'post'
  })
}
export function opeStakeIncrease (param) {
  return axios({
    url: api.OPE.OpeStakeIncrease,
    params: param,
    method: 'post'
  })
}
export function opeRealPowerHistory (param) {
  return axios({
    url: api.OPE.OpeRealPowerHistory,
    params: param,
    method: 'post'
  })
}
export function opeTimesAndEleChange (param) {
  return axios({
    url: api.OPE.OpeTimesAndEleChange,
    params: param,
    method: 'post'
  })
}
export function opeStakeUseType (param) {
  return axios({
    url: api.OPE.OpeStakeUseType,
    params: param,
    method: 'post'
  })
}
export function opeStakeCategory (param) {
  return axios({
    url: api.OPE.OpeStakeCategory,
    params: param,
    method: 'post'
  })
}
export function opeStakeNumRank (param) {
  return axios({
    url: api.OPE.OpeStakeNumRank,
    params: param,
    method: 'post'
  })
}
export function opeAllStation (param) {
  return axios({
    url: api.OPE.OpeAllStation,
    data: param,
    method: 'post'
  })
}
export function operatorOperatorTotalPower (param) {
  return axios({
    url: api.OPE.OperatorOperatorTotalPower,
    data: param,
    method: 'post'
  })
}
export function opeStationTypeNumber (param) {
  return axios({
    url: api.OPE.OpeStationTypeNumber,
    data: param,
    method: 'post'
  })
}
export function opeStakeNumber (param) {
  return axios({
    url: api.OPE.OpeStakeNumber,
    data: param,
    method: 'post'
  })
}
export function opeStationTypeTotalPower (param) {
  return axios({
    url: api.OPE.OpeStationTypeTotalPower,
    data: param,
    method: 'post'
  })
}
export function operatorStakeUsePower (param) {
  return axios({
    url: api.OPE.OperatorStakeUsePower,
    data: param,
    method: 'post'
  })
}
export function opeStakeStatusNumber (param) {
  return axios({
    url: api.OPE.OpeStakeStatusNumber,
    data: param,
    method: 'post'
  })
}
export function opeStakeTypeNumber (param) {
  return axios({
    url: api.OPE.OpeStakeTypeNumber,
    data: param,
    method: 'post'
  })
}
export function opeStatisticsEleTimes (param) {
  return axios({
    url: api.OPE.OpeStatisticsEleTimes,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function opeAllStakeInfo (param) {
  return axios({
    url: api.OPE.OpeAllStakeInfo,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList0 (param) {
  return axios({
    url: api.GOV.GetTestDataList0,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList1 (param) {
  return axios({
    url: api.GOV.GetTestDataList1,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}

export function getTestDataList2 (param) {
  return axios({
    url: api.GOV.GetTestDataList2,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList3 (param) {
  return axios({
    url: api.GOV.GetTestDataList3,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList4 (param) {
  return axios({
    url: api.GOV.GetTestDataList4,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList5 (param) {
  return axios({
    url: api.GOV.GetTestDataList5,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList6 (param) {
  return axios({
    url: api.GOV.GetTestDataList6,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList7 (param) {
  return axios({
    url: api.GOV.GetTestDataList7,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList8 (param) {
  return axios({
    url: api.GOV.GetTestDataList8,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList9 (param) {
  return axios({
    url: api.GOV.GetTestDataList9,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList10 (param) {
  return axios({
    url: api.GOV.GetTestDataList10,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList11 (param) {
  return axios({
    url: api.GOV.GetTestDataList11,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList12 (param) {
  return axios({
    url: api.GOV.GetTestDataList12,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList13 (param) {
  return axios({
    url: api.GOV.GetTestDataList13,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataList14 (param) {
  return axios({
    url: api.GOV.GetTestDataList14,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getTestDataListExport (param) {
  return axios({
    url: api.GOV.GetTestDataListExport,
    data: param,
    method: 'post',
    responseType: 'blob'
  })
}
export function getBar (param) {
  return axios({
    url: api.GOV.GetBar,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function getPie (param) {
  return axios({
    url: api.GOV.GetPie,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function start (param) {
  return axios({
    url: api.GOV.Start,
    params: param.basic,
    data: param.params,
    method: 'post'
  })
}
export function sumVehicleMileageList (param) {
  return axios({
    url: api.GOV.SumVehicleMileageList,
    params: param,
    method: 'get'
  })
}
export function sumVehicleNumByMileage (param) {
  return axios({
    url: api.GOV.SumVehicleNumByMileage,
    params: param,
    method: 'get'
  })
}
// export function image(param) {
//   return axios({
//     url: api.Image,
//     params: param,
//     method: 'get'
//   })
// }
