import sys from '@/config/system.config'

const api = {
  /** login */
  Login: `${sys.oauthPrefix}/oauth/token`, // 登录
  GetInfo: `${sys.oauthPrefix}/oauth/userInfo`, // 获取用户信息
  Logout: `${sys.oauthPrefix}/oauth/logout`, // 登出
  GetCurrentUserNav: `${sys.upmsPrefix}/upms/resource/menu`, // 获取用户菜单
  GetLoginLog: `${sys.upmsPrefix}/upms/loginLog/listByPage`, // 获取登录日志
  /** personalise */
  BasicPersonalise: `${sys.upmsPrefix}/upms/personalise`, // 用户个性化配置基础
  Image: `${sys.oauthPrefix}/captcha/image`, // 登录验证码
  /** upms */
  UPMS: {
    /** user */
    BasicUser: `${sys.upmsPrefix}/upms/userManage`, // 用户基础
    GetUserList: `${sys.upmsPrefix}/upms/userManage/listByPage`, // 获取用户列表
    GetUserList1: `${sys.upmsPrefix}/upms/user/listByPage`, // 获取用户列表
    UserRole: `${sys.upmsPrefix}/upms/userrole`,
    /** app */
    BasicApp: `${sys.upmsPrefix}/upms/app`,
    GetAppList: `${sys.upmsPrefix}/upms/app/listByPage`,
    /** org */
    BasicOrg: `${sys.upmsPrefix}/upms/org`,
    GetOrgTree: `${sys.upmsPrefix}/upms/org/queryOrgTree`,
    GetOrgList: `${sys.upmsPrefix}/upms/org/listByPage`,
    /** resource */
    BasicResource: `${sys.upmsPrefix}/upms/resource`,
    GetResourceTree: `${sys.upmsPrefix}/upms/resource/menu`,
    GetResourceList: `${sys.upmsPrefix}/upms/resource/listByPage`,
    GetAllResource: `${sys.upmsPrefix}/upms/resource/getAllMenu`,
    /** role */
    BasicRole: `${sys.upmsPrefix}/upms/role`,
    GetRoleList: `${sys.upmsPrefix}/upms/roleGroup/queryGroupTree`,
    GetRoleTree: `${sys.upmsPrefix}/upms/role/queryRoleTree`,
    GetRoleMenu: `${sys.upmsPrefix}/upms/resource/queryResourceByRoleId`,

    /** roleGroup */
    BasicRoleGroup: `${sys.upmsPrefix}/upms/roleGroup`,
    GetRoleGroupList: `${sys.upmsPrefix}/upms/roleGroup/listByPage`,

    /** roleResource */
    BasicRoleResource: `${sys.upmsPrefix}/upms/roleResource`
  },
  MISG: {
    /** model */
    GetModelList: `${sys.flowablePrefix}/modeler/edit/json/list`,
    /* qrtd */
    GetCompleteList: `${sys.flowablePrefix}/task/complete/list`,
    GetFileList: `${sys.flowablePrefix}/task/end/list`,
    GetEntrustList: `${sys.flowablePrefix}/task/delegate/list`,
    GetAgencyList: `${sys.flowablePrefix}/task/todo/list`,
    BasicEntrust: `${sys.flowablePrefix}/execute/delegate/time/add`,
    EditEntrust: `${sys.flowablePrefix}/execute/delegate/time/update`,
    DelEntrust: `${sys.flowablePrefix}/execute/delegate/time/delete`,
    GetAgentList: `${sys.flowablePrefix}/task/delegate/list`,
    GetProcessDetails: `${sys.flowablePrefix}/task/circulation`
  },
  DESIGN: {
    SaveModel: `${sys.flowablePrefix}/modeler/edit/json/save`,
    EditModel: `${sys.flowablePrefix}/modeler/edit/json/query`
  },
  GOV: {
    Authuserinfo: `${sys.gov}/userInfo/authuserinfo/`, // 获取areaCode
    DriveMileage: `${sys.gov}/vehicle/once/driveMileage`,
    DriveTime: `${sys.gov}/vehicle/once/driveTime`,
    DriveDayMileage: `${sys.gov}/vehicle/oneDay/driveMileage`,
    DriveTimeOneDay: `${sys.gov}/vehicle/oneDay/driveTime`, // 车辆单日行驶分析,单日行驶时长
    SocAnalyze: `${sys.gov}/vehicle/socAnalyze`, // 行为SOC分析,行为SOC分析
    CustomSettingList: `${sys.gov}/vehicle/customSettingList`, // 预警自定义设置,预警自定义设置页面展示
    CountByDay: `${sys.gov}/vehicle/dataAnalysis/countByDay`, // 用户驾驶习惯分析,全天各时段行驶车辆统计
    CountByWeek: `${sys.gov}/vehicle/dataAnalysis/countByWeek`, // 用户驾驶习惯分析,一周每日驾驶次数统计
    FactoryAnalysis: `${sys.gov}/vehicle/dataAnalysis/factoryAnalysis`, // 市场竞争分析,车辆生产厂家市场竞争分析
    BrandAnalysis: `${sys.gov}/vehicle/dataAnalysis/brandAnalysis`, // 市场竞争分析,车辆品牌市场竞争分析
    DayDriverMileage: `${sys.gov}/vehicle/dataAnalysis/dayDriverMileage`, // 用户行为分析,单日行驶里程
    DayDriverTime: `${sys.gov}/vehicle/dataAnalysis/dayDriverTime`, // 用户行为分析,单日行驶时长
    MonthlyCharge: `${sys.gov}/vehicle/dataAnalysis/monthlyCharge`, // 充电特性分析,近30日充电时间段分析
    TimeSlot: `${sys.gov}/stake/dataAnalysis/timeSlot`, // 充电特性分析,时间段统计分析查询
    OperatorListByPage: `${sys.gov}/stake/stakeMerchant/listByPage`, // 充电设施运营商档案
    StationListByPage: `${sys.gov}/stake/station/listByPage`, // 充电站档案
    StakeListByPage: `${sys.gov}/stake/stakeinfo/listByPage`, // 充电桩档案
    VehicleListByPage: `${sys.gov}/vehicle/vehicleInfo/listByPage`, // 车辆档案
    VehicleList: `${sys.gov}/vehicle/list`, // 车辆档案详情
    GroupStatisticsByFactory: `${sys.gov}/vehicle/groupStatisticsByFactory`, // 车辆生产厂家下拉
    GroupStatisticsByBrand: `${sys.gov}/vehicle/groupStatisticsByBrand`, // 车辆品牌下拉
    DriveDetail: `${sys.gov}/vehicle/energyAnalysis/driveDetail`, // 车辆行驶情况
    ChargeDetail: `${sys.gov}/vehicle/energyAnalysis/chargeDetail`, // 车辆充电情况
    WaringLevel: `${sys.gov}/vehicle/energyAnalysis/waringLevel`, // 报警信息统计-报警等级占比
    WarningCategory: `${sys.gov}/vehicle/energyAnalysis/warningCategory`, // 报警信息统计-报警分类占比
    WarningCompany: `${sys.gov}/vehicle/energyAnalysis/warningCompany`, // 报警信息统计-报警生产厂家占比
    WarningMonthSize: `${sys.gov}/vehicle/energyAnalysis/warningMonthSize`, // 报警信息统计-各月份报警数量
    WarningTopThree: `${sys.gov}/vehicle/energyAnalysis/warningTopThree`, // 报警信息统计-报警数量排名前三名图表
    Number: `${sys.gov}/stake/stakeStatistics/number`, // 获取充电设施站、桩、运营商数量
    RunStatus: `${sys.gov}/vehicle/statistics/runStatus`, // 统计按运行转态-在线，离线，激活，未激活，行驶，充电
    RunDataStatus: `${sys.gov}/vehicle/statistics/runDataStatus`, // 运行数据统计-累计行驶里程，二氧化碳减排量，累计行驶里程，累计用电量
    GroupStatisticsByModelCount: `${sys.gov}/vehicle/groupStatisticsByModel/count`, // 分组统计-按接入车辆型号分组统计各车辆型号个数
    CountByParameter: `${sys.gov}/vehicle/vehicleInfo/countByParameter`, // 档案数据统计类，接入平台车辆，重庆牌照车辆数
    GroupStatisticsByBrandCount: `${sys.gov}/vehicle/groupStatisticsByBrand/count`, // 分组统计-按接入品牌分组统计各品牌个数
    StatisticsEleTimes: `${sys.gov}/stake/stakeStatistics/statisticsEleTimes`, // 获取累计充电量、充电次数
    OperatortotalPower: `${sys.gov}/stake/stakeStatistics/operatortotalPower`, // 总功率
    StakeUsePower: `${sys.gov}/stake/stakeStatistics/StakeUsePower`, // 实时占用功率
    TimesAndEleChange: `${sys.gov}/stake/general/timesAndEleChange`, // 充电设施概况-单日充电量/单日充电次数变化趋势
    StationIncrease: `${sys.gov}/stake/general/stationIncrease`, // 充电设施概况-充电站年/季/月度发展趋势
    StakeIncrease: `${sys.gov}/stake/general/stakeIncrease`, // 充电设施概况-充电桩年/季/月度发展趋势
    RealPowerHistory: `${sys.gov}/stake/general/realPowerHistory`, // 充电设施概况-实时充电功率变化
    StakeNumRank: `${sys.gov}/stake/general/stakeNumRank`, // 充电设施概况-充电设施建设规模排名(共三种)
    StakeUseType: `${sys.gov}/stake/general/stakeUseType`, // 充电设施概况-充电桩用途
    StakeCategory: `${sys.gov}/stake/general/stakeCategory`, // 充电设施概况-充电桩分类
    QueryChargeUtilizationRatio: `${sys.gov}/stake/statisticalnalysis/queryChargeUtilizationRatio`, // 充电设施利用情况分析-充电设施利用率、充电设施利用率析查询
    Allstation: `${sys.gov}/stake/station/allstation`, // 查询所有站站列表
    AllStakeInfo: `${sys.gov}/stake/stakeinfo/allStakeInfo`, // 查询列表-查询站下所有的桩列表，包含桩状态
    ListAdministrativeOfArea: `${sys.gov}/areacode/info/listAdministrativeOfArea`, // 地区下拉菜单
    ListStakeOperatorByPage: `${sys.gov}/stake/station/listStakeOperatorByPage`, // 充电站 - 运营商下拉菜单
    ListStakeProduceOperatorByPage: `${sys.gov}/stake/stakeinfo/listStakeProduceOperatorByPage`, // 设备生产商下拉菜单
    Listcodeandname: `${sys.gov}/dictionaries/info/listcodeandname`, // 充电站类型、站点状态、建设场所、充电桩类型
    VehicleOnlineList: `${sys.gov}/vehicle/onlineList`, // 车辆在线情况统计
    JoinUpStatusList: `${sys.gov}/vehicle/joinUpStatusList`, // 接入车辆状态统计
    VehicleNumByMileage: `${sys.gov}/vehicle/vehicleNumByMileage`, // 按行驶里程统计车辆
    VehicleMileageList: `${sys.gov}/vehicle/vehicleMileageList`, // 按品牌统计平均里程
    SumVehicleMileageList: `${sys.gov}/vehicle/sumVehicleMileageList`, // 按品牌统计平均里程-共计
    SumVehicleNumByMileage: `${sys.gov}/vehicle/sumVehicleNumByMileage`, // 按行驶里程统计车辆-共计加占比
    ListIncrementMonth: `${sys.gov}/vehicle/general/listIncrementMonth`, // 新能源车辆概况-车辆月增长情况
    ListIncrementYear: `${sys.gov}/vehicle/general/listIncrementYear`, // 新能源车辆概况-车辆年增长情况
    QueryBrands: `${sys.gov}/vehicle/general/queryBrands`, // 新能源车辆概况-车辆品牌分布
    QueryExterior: `${sys.gov}/vehicle/general/queryExterior`, // 新能源车辆概况-车辆类型分布
    QueryMileage: `${sys.gov}/vehicle/general/queryMileage`, // 新能源车辆概况-纯电动汽车续航里程
    QueryPurpose: `${sys.gov}/vehicle/general/queryPurpose`, // 新能源车辆概况-车辆用途分布
    StakeDataByAreaTime: `${sys.gov}/stake/statisticalnalysis/stakeDataByAreaTime`, //  充电设施地区运营情况-地区日充电量趋势,地区日充电次数趋势
    QueryAreaDataMax: `${sys.gov}/stake/statisticalnalysis/queryAreaDataMax`, // 充电设施地区运营情况,充电设施运营商运营情况-数值查询
    ListStakeDataByOperatorTime: `${sys.gov}/stake/statisticalnalysis/listStakeDataByOperatorTime`, // 充电设施运营商运营情况-运营商日充电量趋势,运营商日充电次数趋势
    StakeStatusNumber: `${sys.gov}/stake/stakeStatistics/stakeStatusNumber`, // 充电桩状态统计
    StakeStatusNumByMerchant: `${sys.gov}/stake/statisticalnalysis/StakeStatusNumByMerchant`, // 接入充电桩状态统计-表格
    BatteryListByPage: `${sys.gov}/vehicle/batteryListByPage`, // 电池实时信息
    HistoryWarningListByPage: `${sys.gov}/vehicle/history/warning/listByPage`, // 历史报警信息
    QueryAreaStationStakeTree: `${sys.gov}/stake/statisticalnalysis/queryAreaStationStakeTree`, // 查询地区、站、桩的tree
    CompanyList: `${sys.gov}/vehicle/CompanyList`, // 车企下拉列表
    ForewaringInspectionList: `${sys.gov}/vehicle/forewaringInspectionList`, // 车辆预警监测分页查询
    HandleMassageList: `${sys.gov}/vehicle/handleMassageList`, // 数据传输情况监测-已处理警报信息-分页查询
    AlarmTypeList: `${sys.gov}/vehicle/alarmTypeList`, // 数据传输情况监测-数据传输状态下拉列表查询
    HandleTypeList: `${sys.gov}/vehicle/handleTypeList`, // 数据传输情况监测-已处理警报信息-处理类型下拉列表的查询
    ForewaringInspectionHandleTypeList: `${sys.gov}/vehicle/forewaringInspection/handleList`, // 车辆预警监测已处理按钮分页查询
    GetVehicleData: `${sys.gov}/vehicle/getVehicleData`, // 数据传输情况监测首页分页查询
    CustomSettingList1: `${sys.gov}/vehicle/customSettingList`, // 预警自定义设置-页面展示
    AddCondition: `${sys.gov}/vehicle/addCondition`, //  预警自定义设置-保存
    ConfirmOperator: `${sys.gov}/vehicle/confirmOperator`, // 车辆预警监测-处理确认按钮
    UpdateStatus: `${sys.gov}/vehicle/updateStatus`, // 车辆预警监测-更改处理状态
    VHeatForMap: `${sys.gov}/vehicle/vHeatForMap`, // 车辆分布密度
    MileageCurve: `${sys.gov}/vehicle/day30/mileage/curve`, // 车辆里程统计
    VehicleDetailData: `${sys.gov}/vehicle/detail/data`, // 单车详情数据
    VehicleGetCanList: `${sys.gov}/vehicle/monitor/getCanList`, // 车辆CAN数据列表展示
    VehicleGetCanData: `${sys.gov}/vehicle/monitor/getCanData`, // 车辆CAN数据详情
    GetVehicleLocationStatus: `${sys.gov}/vehicle/getVehicleLocationStatus`, // 地图-车辆信息位置状态列表查询（通过左上，右下控制）
    StakeOperatorExp: `${sys.gov}/stake/excel/export/Operator`, // 充电设施运营商档案导出
    StationExp: `${sys.gov}/stake/excel/export/station`, // 充电站档案导出
    StakeExp: `${sys.gov}/stake/excel/export`, // 充电桩档案导出
    VehicleExp: `${sys.gov}/vehicle/excel/export`, // 单车详细数据,车辆档案信息,车辆里程统计,车辆电池统计-Excel导出
    VehicleBatteryExp: `${sys.gov}/vehicle/excel/export/battery`, // 电池实时信息-excel导出
    VehicleBatteryInfo: `${sys.gov}/vehicle/batter/info`, // 车辆电池统计-行驶分析、最高温度&最低温度、最高温度&最低温度、总电压、总电流
    JoinUpStatusExp: `${sys.gov}/vehicle/excel/export/joinUpStatus`, // 接入车辆状态统计-excel导出
    MileageOfBrandExp: `${sys.gov}/vehicle/excel/export/mileageOfBrand`, // 按品牌统计平均里程-excel导出
    OnlineExp: `${sys.gov}/vehicle/excel/export/online`, // 车辆在线情况统计-excel导出
    VehicleNumOfMileageExp: `${sys.gov}/vehicle/excel/export/vehicleNumOfMileage`, // 按行驶里程统计车辆-excel导出
    WaringExp: `${sys.gov}/vehicle/excel/export/waring`, // 历史报警信息-Excel导出
    Stationtypenumber: `${sys.gov}/stake/stakeStatistics/stationtypenumber`, // 数量-按站类型
    StationtotalPower: `${sys.gov}/stake/stakeStatistics/stationtotalPower`, // 总功率-按站类型
    Staketypenumber: `${sys.gov}/stake/stakeStatistics/staketypenumber`, // 数量-按桩交直流桩
    CarDetailData: `${sys.gov}/vehicle/detail/data`, // 单车详细数据-车辆详情，实时里程，电池状态
    RealAlarmHandleList: `${sys.gov}/vehicle/realAlarmHandleList`, // 实时报警-已处理信息分页
    HandleList: `${sys.gov}/vehicle/forewaringInspection/handleList`, // 车辆预警监测-分页查询处理数据列表
    ForewaringList: `${sys.gov}/vehicle/export/forewaringList`, // 已处理告警信息详情查看导出
    DataTransferHandleList: `${sys.gov}/vehicle/export/dataTransferHandleList`, // 已处理报警信息详情查看导出
    HeandleDateTransfetStatus: `${sys.gov}/vehicle/heandleDateTransfetStatus`, // 数据传输情况监测-更改处理状态
    MerchantMissingStation: `${sys.gov}/merchant/station/missingStation`, // 缺失站的运营商
    MerchantStakeStatusExpoer: `${sys.gov}/stake/statisticalnalysis/merchantStakeStatusExpoer`, // 缺失站的运营商
    StationMissingMerchant: `${sys.gov}/merchant/station/missingMerchant`, // 缺失运营商的站
    StationHasErrorAreaCode: `${sys.gov}/stake/stationHasErrorAreaCode`, // 充电站地区编码错误
    StationNoStakeList: `${sys.gov}/stake/stationNoStakeList`, // 缺失桩的站
    StakeNoStationList: `${sys.gov}/stake/stakeNoStationList`, // 缺失站的桩
    StakeNoGunList: `${sys.gov}/stake/stakeNoGunList`, // 缺失枪的桩
    ListByPage: `${sys.gov}/stake/platformFeedback/listByPage`, // 意见反馈展示管理
    FeedBackListByPage: `${sys.gov}/stake/feedback/listByPage`, // 充电站信息纠错（政府、运营商）
    EvaluationInfoListByPage: `${sys.gov}/stake/evaluationGrade/listByPage`, // 充电站评价管理—审核用户评价信息
    ApprovalProcess: `${sys.gov}/stake/evaluationGrade/approvalProcess`, // 审批用户评价
    GunNoStakeList: `${sys.gov}/stake/gunNoStakeList`, // 缺失桩的枪
    GunNoStakeListExp: `${sys.gov}/stake/excel/gunNoStakeList`, // 缺失桩的枪导出
    StakeNoGunListExp: `${sys.gov}/stake/excel/stakeNoGunList`, // 缺失枪的桩导出
    StationHasErrorAreaCodeExp: `${sys.gov}/stake/excel/stationHasErrorAreaCode`, // 充电站地区编码错误导出
    StationNoStakeListExp: `${sys.gov}/stake/export/stationList`, // 缺失桩的站导出
    StakeNoStationListExp: `${sys.gov}/stake/export/stakeList`, // 缺失站的桩导出
    MerchantMissingStationExp: `${sys.gov}/merchant/station/excel/export/merchant`, // 缺失站的运营商导出
    StationMissingMerchantExp: `${sys.gov}/merchant/station/excel/export/station`, // 缺失运营商的站导出
    CanListExp: `${sys.gov}/vehicle/monitor/excel/export/canList`, // 车辆can数据-excel导出
    // 充电设施云监测
    GetTestDataList0: `${sys.gov}/detect/result/listByPage`, // 获取获取项目检测结果管理
    GetTestDataList1: `${sys.gov}/detect/type1/list`, // 获取获取项目检测结果管理
    GetTestDataList2: `${sys.gov}/detect/type2/list`, // 获取获取项目检测结果管理
    GetTestDataList3: `${sys.gov}/detect/type3/list`, // 获取获取项目检测结果管理
    GetTestDataList4: `${sys.gov}/detect/type4/list`, // 获取获取项目检测结果管理
    GetTestDataList5: `${sys.gov}/detect/type5/list`, // 获取获取项目检测结果管理
    GetTestDataList6: `${sys.gov}/detect/type6/list`, // 获取获取项目检测结果管理
    GetTestDataList7: `${sys.gov}/detect/type7/list`, // 获取获取项目检测结果管理
    GetTestDataList8: `${sys.gov}/detect/type8/list`, // 获取获取项目检测结果管理
    GetTestDataList9: `${sys.gov}/detect/type9/list`, // 获取获取项目检测结果管理
    GetTestDataList10: `${sys.gov}/detect/type10/list`, // 获取获取项目检测结果管理
    GetTestDataList11: `${sys.gov}/detect/type11/list`, // 获取获取项目检测结果管理
    GetTestDataList12: `${sys.gov}/detect/type12/list`, // 获取获取项目检测结果管理
    GetTestDataList13: `${sys.gov}/detect/type13/list`, // 获取获取项目检测结果管理
    GetTestDataList14: `${sys.gov}/detect/type14/list`, // 获取获取项目检测结果管理
    GetTestDataListExport: `${sys.gov}/detect/result/excel/export/list`, // 项目检测结果excel导出
    GetBar: `${sys.gov}/detect/result/getBar`, // 充电设施云监测-指标统计分析柱状图
    GetPie: `${sys.gov}/detect/result/getPie`, // 充电设施云监测-指标统计分析饼状图
    Start: `${sys.gov}/detect/calculate/start`, // 项目检测计算接口
    // Image: `${sys.gov}/captcha/image` // 登录验证码

  },
  OPE: {
    OpeStationListByPage: `${sys.gov}/operator/info/stationListByPage`, // 充电站档案
    OpeStakeListByPage: `${sys.gov}/operator/info/stakeListByPage`, // 充电桩档案
    OpeStationRunInfo: `${sys.gov}/operator/info/stationRunInfo`, // 充电站运营情况展示
    OpeNumber: `${sys.gov}/merchant/data/number`, // 获取充电设施站、桩、运营商数量--运营商数据
    OpeOperatorTotalPower: `${sys.gov}/merchant/data/operatorTotalPower`, // 总额定功率--运营商数据
    OpeStakeUsePower: `${sys.gov}/merchant/data/StakeUsePower`, // 实时占用功率--运营商数据
    OpeStationIncrease: `${sys.gov}/merchant/data/stationIncrease`, // 充电设施概况-充电站年/季/月度发展趋势
    OpeStakeIncrease: `${sys.gov}/merchant/data/stakeIncrease`, // 充电设施概况-充电桩年/季/月度发展趋势
    OpeRealPowerHistory: `${sys.gov}/merchant/data/realPowerHistory`, // 充电设施概况-实时充电功率变化
    OpeTimesAndEleChange: `${sys.gov}/merchant/data/timesAndEleChange`, // 充电设施概况-单日充电量/单日充电次数变化趋势
    OpeStakeUseType: `${sys.gov}/merchant/data/stakeUseType`, // 充电设施概况-充电桩用途
    OpeStakeCategory: `${sys.gov}/merchant/data/stakeCategory`, // 充电设施概况-充电桩分类
    OpeStakeNumRank: `${sys.gov}/merchant/data/stakeNumRank`, // 充电设施概况-充电设施建设规模排名(共三种)
    OpeAllStation: `${sys.gov}/operator/info/allStation`, // 查询所有站站列表
    OpeTradeInfo: `${sys.gov}/operator/info/tradeInfo`, // 运营商接口-订单信息查询
    OpeTradeInfoExp: `${sys.gov}/operator/info/tradeInfoExport`, // 运营商接口-订单信息导出
    OperatorOperatorTotalPower: `${sys.gov}/operator/info/operatorTotalPower`, // 运营商接口-总功率
    OpeStationTypeNumber: `${sys.gov}/operator/info/stationTypeNumber`, // 站数量-按站类型统计
    OpeStakeNumber: `${sys.gov}/operator/info/stakeNumber`, // 运营商接口-充电设施站、桩、运营商数量
    OpeStationTypeTotalPower: `${sys.gov}/operator/info/stationTypeTotalPower`, // 运营商接口-总功率-按站类型
    OperatorStakeUsePower: `${sys.gov}/operator/info/stakeUsePower`, // 运营商接口-实时占用功率
    OpeStakeStatusNumber: `${sys.gov}/operator/info/stakeStatusNumber`, // 运营商接口-充电桩状态统计
    OpeStakeTypeNumber: `${sys.gov}/operator/info/stakeTypeNumber`, // 运营商接口-桩数量-按桩交直流桩
    OpeStatisticsEleTimes: `${sys.gov}/operator/info/statisticsEleTimes`, // 运营商接口-累计充电量、充电次数
    OpeAllStakeInfo: `${sys.gov}/operator/info/allStakeInfo`, // 运营商接口-查询站下所有的桩列表，包含桩状态
    OpeStationListExp: `${sys.gov}/operator/info/stationListExport`, // 充电站档案导出
    OpeStakeListExp: `${sys.gov}/operator/info/stakeListExport`, // 充电桩档案导出
    OpeStationRunInfoExp: `${sys.gov}/operator/info/stationRunInfoExport`, // 充电站运营情况导出
    OpeStakeLngLatInfo: `${sys.gov}/operator/info/stakeLngLatInfo`, // 充电桩使用分布密度
    OpeDetailsSearch: `${sys.gov}/operator/info/details`, // 运营商信息填报 - 查询接口
    OpeDetailsAdd: `${sys.gov}/operator/info/details/add`, // 运营商信息填报 - 编辑接口
    OpeDetailsDelete: `${sys.gov}/operator/info/details/delete`, // 运营商信息填报 - 删除接口
    OpeEquipmentAdd: `${sys.gov}/operator/info/equipmentownerId/add`, // 保存设备所属方关联关系
    OpeEquipmentQuery: `${sys.gov}/operator/info/equipmentownerId/query`, // 设备所属方关联关系查询
    StakeDataByAreaTime: `${sys.gov}/merchant/data/stakeDataByAreaTime`, // 充电设施地区运营情况-地区日充电量趋势,地区日充电次数趋势
    QueryAreaDataMax: `${sys.gov}/merchant/data/queryAreaDataMax` // 充电设施地区运营情况,充电设施运营商运营情况-数值查询-----运营商数据

  }
}
export default api
