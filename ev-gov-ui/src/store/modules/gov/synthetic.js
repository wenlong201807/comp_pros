import {
  authuserinfo,
  driveMileage,
  driveTime,
  driveDayMileage,
  driveTimeOneDay,
  socAnalyze,
  customSettingList,
  countByDay,
  countByWeek,
  factoryAnalysis,
  brandAnalysis,
  dayDriverMileage,
  dayDriverTime,
  monthlyCharge,
  timeSlot,
  operatorListByPage,
  stationListByPage,
  stakeListByPage,
  vehicleListByPage,
  vehicleList,
  groupStatisticsByFactory,
  groupStatisticsByBrand,
  number,
  runStatus,
  runDataStatus,
  groupStatisticsByModelCount,
  countByParameter,
  groupStatisticsByBrandCount,
  statisticsEleTimes,
  operatortotalPower,
  stakeUsePower,
  queryChargeUtilizationRatio,
  listAdministrativeOfArea,
  listStakeOperatorByPage,
  listStakeProduceOperatorByPage,
  listcodeandname,
  vehicleOnlineList,
  joinUpStatusList,
  vehicleNumByMileage,
  vehicleMileageList,
  listIncrementMonth,
  listIncrementYear,
  queryBrands,
  queryExterior,
  queryMileage,
  queryPurpose,
  stakeDataByAreaTime,
  queryAreaDataMax,
  listStakeDataByOperatorTime,
  stakeStatusNumber,
  timesAndEleChange,
  stationIncrease,
  stakeIncrease,
  realPowerHistory,
  stakeNumRank,
  stakeUseType,
  stakeCategory,
  allstation,
  allStakeInfo,
  stakeStatusNumByMerchant,
  batteryListByPage,
  historyWarningListByPage,
  queryAreaStationStakeTree,
  companyList,
  forewaringInspectionList,
  forewaringInspectionHandleTypeList,
  handleMassageList,
  alarmTypeList,
  handleTypeList,
  getVehicleData,
  customSettingList1,
  addCondition,
  confirmOperator,
  updateStatus,
  vHeatForMap,
  mileageCurve,
  vehicleDetailData,
  getVehicleLocationStatus,
  carDetailData,
  vehicleGetCanList,
  vehicleGetCanData,
  stakeOperatorExp,
  stationExp,
  stakeExp,
  stationtypenumber,
  stationtotalPower,
  staketypenumber,
  realAlarmHandleList,
  handleList,
  vehicleExp,
  vehicleBatteryExp,
  waringExp,
  vehicleNumOfMileageExp,
  onlineExp,
  mileageOfBrandExp,
  joinUpStatusExp,
  chargeDetail,
  driveDetail,
  warningCategory,
  waringLevel,
  warningCompany,
  warningMonthSize,
  warningTopThree,
  forewaringList,
  dataTransferHandleList,
  heandleDateTransfetStatus,
  merchantMissingStation,
  merchantStakeStatusExpoer,
  stationMissingMerchant,
  stationHasErrorAreaCode,
  stationNoStakeList,
  stakeNoStationList,
  stakeNoGunList,
  listByPage,
  feedBackListByPage,
  evaluationInfoListByPage,
  approvalProcess,
  gunNoStakeList,
  gunNoStakeListExp,
  stakeNoGunListExp,
  stationHasErrorAreaCodeExp,
  stationNoStakeListExp,
  stakeNoStationListExp,
  merchantMissingStationExp,
  stationMissingMerchantExp,
  canListExp,
  opeNumber,
  opeOperatorTotalPower,
  opeStakeUsePower,
  opeStationIncrease,
  opeStakeIncrease,
  opeRealPowerHistory,
  opeTimesAndEleChange,
  opeStakeUseType,
  opeStakeCategory,
  opeStakeNumRank,
  opeAllStation,
  operatorOperatorTotalPower,
  opeStationTypeNumber,
  opeStakeNumber,
  opeStationTypeTotalPower,
  operatorStakeUsePower,
  opeStakeStatusNumber,
  opeStakeTypeNumber,
  opeStatisticsEleTimes,
  opeAllStakeInfo,
  getTestDataList0,
  getTestDataList1,
  getTestDataList2,
  getTestDataList3,
  getTestDataList4,
  getTestDataList5,
  getTestDataList6,
  getTestDataList7,
  getTestDataList8,
  getTestDataList9,
  getTestDataList10,
  getTestDataList11,
  getTestDataList12,
  getTestDataList13,
  getTestDataList14,
  getTestDataListExport,
  getBar,
  getPie,
  start,
  sumVehicleMileageList,
  sumVehicleNumByMileage,
  vehicleBatteryInfo,
  image

} from '@/api/gov/synthetic'

const synthetic = {
  state: {},
  mutations: {},
  actions: {
    // 获取areaCode
    Authuserinfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        authuserinfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆单次行驶分析 - 单次行驶里程
    DriveMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        driveMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆单次行驶分析 - 单次行驶时长
    DriveTime ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        driveTime(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆单日行驶分析 - 单日行驶里程
    DriveDayMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        driveDayMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  车辆单日行驶分析,单日行驶时长
    DriveTimeOneDay ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        driveTimeOneDay(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 行为SOC分析,行为SOC分析
    SocAnalyze ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        socAnalyze(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 预警自定义设置,预警自定义设置页面展示
    CustomSettingList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        customSettingList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户驾驶习惯分析,全天各时段行驶车辆统计
    CountByDay ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        countByDay(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户驾驶习惯分析,一周每日驾驶次数统计
    CountByWeek ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        countByWeek(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 市场竞争分析,车辆生产厂家市场竞争分析
    FactoryAnalysis ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        factoryAnalysis(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 市场竞争分析,车辆品牌市场竞争分析
    BrandAnalysis ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        brandAnalysis(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆充电情况
    ChargeDetail ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        chargeDetail(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆行驶情况
    DriveDetail ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        driveDetail(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 报警信息统计
    WarningCategory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        warningCategory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 报警信息统计-报警等级占比
    WaringLevel ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        waringLevel(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 报警信息统计-报警生产厂家占比
    WarningCompany ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        warningCompany(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 报警信息统计-各月份报警数量
    WarningMonthSize ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        warningMonthSize(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 报警信息统计-报警数量排名前三名图表
    WarningTopThree ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        warningTopThree(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户行为分析,单日行驶里程
    DayDriverMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        dayDriverMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户行为分析,单日行驶时长
    DayDriverTime ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        dayDriverTime(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电特性分析,近30日充电时间段分析
    MonthlyCharge ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        monthlyCharge(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电特性分析,时间段统计分析查询
    TimeSlot ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        timeSlot(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施运营商档案
    OperatorListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        operatorListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站档案
    StationListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩档案
    StakeListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆档案
    VehicleListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆档案详情
    VehicleList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆生产厂家下拉
    GroupStatisticsByFactory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        groupStatisticsByFactory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆品牌下拉
    GroupStatisticsByBrand ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        groupStatisticsByBrand(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取充电设施站、桩、运营商数量
    Number ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        number(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 统计按运行转态-在线，离线，激活，未激活，行驶，充电
    RunStatus ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        runStatus(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运行数据统计-累计行驶里程，二氧化碳减排量，累计行驶里程，累计用电量
    RunDataStatus ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        runDataStatus(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组统计-按接入车辆型号分组统计各车辆型号个数
    GroupStatisticsByModelCount ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        groupStatisticsByModelCount(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组统计-按接入车辆型号分组统计各车辆型号个数
    CountByParameter ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        countByParameter(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 分组统计-按接入品牌分组统计各品牌个数
    GroupStatisticsByBrandCount ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        groupStatisticsByBrandCount(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取累计充电量、充电次数
    StatisticsEleTimes ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        statisticsEleTimes(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 总功率
    OperatortotalPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        operatortotalPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 实时占用功率
    StakeUsePower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeUsePower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  充电设施利用情况分析-充电设施利用率、充电设施利用率析查询
    QueryChargeUtilizationRatio ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryChargeUtilizationRatio(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-车辆月增长情况
    ListIncrementMonth ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listIncrementMonth(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-车辆年增长情况
    ListIncrementYear ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listIncrementYear(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-车辆品牌分布
    QueryBrands ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryBrands(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-车辆类型分布
    QueryExterior ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryExterior(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-纯电动汽车续航里程
    QueryMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 新能源车辆概况-车辆用途分布
    QueryPurpose ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryPurpose(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 充电设施概况-单日充电量/单日充电次数变化趋势
    TimesAndEleChange ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        timesAndEleChange(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电站年/季/月度发展趋势
    StationIncrease ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationIncrease(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 充电设施概况-实时充电功率变化
    RealPowerHistory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        realPowerHistory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电设施建设规模排名(共三种)
    StakeNumRank ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeNumRank(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩用途
    StakeUseType ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeUseType(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩分类
    StakeCategory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeCategory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 充电设施地区运营情况-地区日充电量趋势,地区日充电次数趋势
    StakeDataByAreaTime ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeDataByAreaTime(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施地区运营情况,充电设施运营商运营情况-数值查询
    QueryAreaDataMax ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryAreaDataMax(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施运营商运营情况-运营商日充电量趋势,运营商日充电次数趋势
    ListStakeDataByOperatorTime ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listStakeDataByOperatorTime(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // // 充电桩状态统计
    StakeStatusNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeStatusNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 地区下拉
    ListAdministrativeOfArea ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listAdministrativeOfArea(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站 - 运营商下拉菜单
    ListStakeOperatorByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listStakeOperatorByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设备生产商下拉菜单
    ListStakeProduceOperatorByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listStakeProduceOperatorByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站类型、站点状态、建设场所、充电桩类型
    Listcodeandname ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listcodeandname(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆在线情况统计
    VehicleOnlineList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleOnlineList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 接入车辆状态统计
    JoinUpStatusList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        joinUpStatusList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按行驶里程统计车辆
    VehicleNumByMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleNumByMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按品牌统计平均里程
    VehicleMileageList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleMileageList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 接入充电桩状态统计-表格
    StakeStatusNumByMerchant ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeStatusNumByMerchant(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  查询地区，站，桩的tree
    QueryAreaStationStakeTree ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        queryAreaStationStakeTree(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 电池实时信息
    BatteryListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        batteryListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //   车企下拉列表
    CompanyList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        companyList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 历史报警信息
    HistoryWarningListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        historyWarningListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //   // 车辆预警监测分页查询
    ForewaringInspectionList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        forewaringInspectionList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 数据传输情况监测-已处理警报信息-分页查询
    HandleMassageList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        handleMassageList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆分布密度
    VHeatForMap ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vHeatForMap(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有站站列表
    Allstation ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        allstation(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询列表-查询站下所有的桩列表，包含桩状态
    AllStakeInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        allStakeInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆里程统计
    MileageCurve ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        mileageCurve(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 单车详情数据
    VehicleDetailData ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleDetailData(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆CAN数据列表展示
    VehicleGetCanList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleGetCanList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 地图-车辆信息位置状态列表查询（通过左上，右下控制）
    GetVehicleLocationStatus ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getVehicleLocationStatus(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 单车详细数据-车辆详情，实时里程，电池状态
    CarDetailData ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        carDetailData(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆CAN数据详情
    VehicleGetCanData ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleGetCanData(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电桩年/季/月度发展趋势
    StakeIncrease ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeIncrease(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 数据传输情况监测-数据传输状态下拉列表查询
    AlarmTypeList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        alarmTypeList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 数据传输情况监测-数据传输状态下拉列表查询
    HandleTypeList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        handleTypeList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测已处理按钮分页查询
    ForewaringInspectionHandleTypeList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        forewaringInspectionHandleTypeList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测已处理按钮分页查询
    GetVehicleData ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getVehicleData(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测已处理按钮分页查询
    CustomSettingList1 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        customSettingList1(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测已处理按钮分页查询
    AddCondition ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        addCondition(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测-处理确认按钮
    ConfirmOperator ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        confirmOperator(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆预警监测-更改处理状态
    UpdateStatus ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        updateStatus(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施运营商档案导出
    StakeOperatorExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeOperatorExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /// / 数量-按站类型
    Stationtypenumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationtypenumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站档案导出
    StationExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    /// / 总功率-按站类型
    StationtotalPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationtotalPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩档案导出
    StakeExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 数量-按桩交直流桩
    Staketypenumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        staketypenumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  实时报警-已处理信息分页
    RealAlarmHandleList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        realAlarmHandleList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 单车详细数据,车辆档案信息,车辆里程统计,车辆电池统计-Excel导出
    VehicleExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  车辆预警监测-分页查询处理数据列表
    HandleList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        handleList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 电池实时信息-excel导出
    VehicleBatteryExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleBatteryExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 接入车辆状态统计-excel导出
    JoinUpStatusExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        joinUpStatusExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按品牌统计平均里程-excel导出
    MileageOfBrandExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        mileageOfBrandExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆在线情况统计-excel导出
    OnlineExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        onlineExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按行驶里程统计车辆-excel导出
    VehicleNumOfMileageExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleNumOfMileageExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 历史报警信息-Excel导出
    WaringExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        waringExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 已处理告警信息详情查看导出
    ForewaringList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        forewaringList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 已处理告警信息详情查看导出
    DataTransferHandleList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        dataTransferHandleList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 已处理告警信息详情查看导出
    HeandleDateTransfetStatus ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        heandleDateTransfetStatus(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失站的运营商
    MerchantMissingStation ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        merchantMissingStation(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 导出运营商设备状态统计信息
    MerchantStakeStatusExpoer ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        merchantStakeStatusExpoer(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 缺失运营商的站
    StationMissingMerchant ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationMissingMerchant(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站地区编码错误
    StationHasErrorAreaCode ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationHasErrorAreaCode(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失桩的站
    StationNoStakeList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationNoStakeList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失站的桩
    StakeNoStationList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeNoStationList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失枪的桩
    StakeNoGunList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeNoGunList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 意见反馈展示管理
    ListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        listByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失桩的枪
    GunNoStakeList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        gunNoStakeList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站信息纠错（政府、运营商）
    FeedBackListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        feedBackListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失桩的枪导出
    GunNoStakeListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        gunNoStakeListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  充电站评价管理—审核用户评价信息
    EvaluationInfoListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        evaluationInfoListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失枪的桩导出
    StakeNoGunListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeNoGunListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 审批用户评价
    ApprovalProcess ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        approvalProcess(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站地区编码错误导出
    StationHasErrorAreaCodeExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationHasErrorAreaCodeExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失桩的站导出
    StationNoStakeListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationNoStakeListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失站的桩导出
    StakeNoStationListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeNoStationListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失站的运营商导出
    MerchantMissingStationExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        merchantMissingStationExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 缺失运营商的站导出
    StationMissingMerchantExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationMissingMerchantExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆can数据-excel导出
    CanListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        canListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取充电设施站、桩、运营商数量--运营商数据
    OpeNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 总额定功率--运营商数据
    OpeOperatorTotalPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeOperatorTotalPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 实时占用功率--运营商数据
    OpeStakeUsePower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeUsePower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 实时占用功率--运营商数据
    OpeStationIncrease ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationIncrease(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电桩年/季/月度发展趋势
    OpeStakeIncrease ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeIncrease(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-实时充电功率变化
    OpeRealPowerHistory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeRealPowerHistory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-单日充电量/单日充电次数变化趋势
    OpeTimesAndEleChange ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeTimesAndEleChange(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电桩用途
    OpeStakeUseType ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeUseType(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电桩分类
    OpeStakeCategory ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeCategory(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施概况-充电设施建设规模排名(共三种)
    OpeStakeNumRank ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeNumRank(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询所有站站列表
    OpeAllStation ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeAllStation(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-总功率
    OperatorOperatorTotalPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        operatorOperatorTotalPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 站数量-按站类型统计
    OpeStationTypeNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationTypeNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-充电设施站、桩、运营商数量
    OpeStakeNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-总功率-按站类型
    OpeStationTypeTotalPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationTypeTotalPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-实时占用功率
    OperatorStakeUsePower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        operatorStakeUsePower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-充电桩状态统计
    OpeStakeStatusNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeStatusNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-桩数量-按桩交直流桩
    OpeStakeTypeNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeTypeNumber(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-累计充电量、充电次数
    OpeStatisticsEleTimes ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStatisticsEleTimes(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-查询站下所有的桩列表，包含桩状态
    OpeAllStakeInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeAllStakeInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测结果管理
    getTestDataList0 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList0(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList1 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList1(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList2 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList2(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList3 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList3(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList4 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList4(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList5 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList5(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList6 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList6(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList7 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList7(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList8 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList8(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList9 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList9(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList10 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList10(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList11 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList11(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList12 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList12(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList13 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList13(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    getTestDataList14 ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataList14(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    GetTestDataListExport ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getTestDataListExport(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    GetBar ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getBar(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    GetPie ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        getPie(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取项目检测表结构1
    Start ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        start(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按品牌统计平均里程-共计
    SumVehicleMileageList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        sumVehicleMileageList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 按行驶里程统计车辆-共计加占比
    SumVehicleNumByMileage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        sumVehicleNumByMileage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 车辆电池统计-行驶分析、最高温度&最低温度、最高温度&最低温度、总电压、总电流
    VehicleBatteryInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        vehicleBatteryInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }

  }
}
export default synthetic
