import sys from 'src/config/system.config'

const api = {
  /** login */
  Login: `${sys.oauthPrefix}/oauth/token`, // 登录
  GetInfo: `${sys.oauthPrefix}/oauth/userInfo`, // 获取用户信息
  Logout: `${sys.oauthPrefix}/oauth/logout`, // 登出
  Image: `${sys.oauthPrefix}/captcha/image`, // 登录验证码
  PhonePassword: `${sys.upmsPrefix}/upms/user/update/phone/password`, // 修改密码
  Info: {
    MapStation: `${sys.gov}/app/stake/mapStation/list`, // 获取app地图上站信息
    InfoListByPage: `${sys.gov}/app/portal/listByPage`, // 咨询
    InfoListDetail: `${sys.gov}/app/portal/details`, // 咨询
    SmsCode: `${sys.oauthPrefix}/captcha/smsCode/`, // 获取验证码
    Add: `${sys.gov}/app/register/cq`, // 注册
    AppMapStation: `${sys.gov}/app/stake/mapStation`, // 获取app地图上站信息
    AppOperatorInfo: `${sys.gov}/app/stake/operatorInfo`, // 获取运营商信息
    AppFeedbackAdd: `${sys.gov}/stake/platformFeedback/save`, // 新增意见反馈
    AppCollectionList: `${sys.gov}/app/portal/collection/list`, // 查询收藏资讯列表
    AppAddCollection: `${sys.gov}/app/collection/addCollection`, // 增加收藏
    AppDeleteCollection: `${sys.gov}/app/collection/deleteCollection`, // 删除收藏
    AppMapstake: `${sys.gov}/app/stake/mapstake`, // 获取站内桩
    AppEvaluationGrade: `${sys.gov}/stake/evaluationGrade/list`, // 根据种类查询用户列表
    AppAllStakeInfo: `${sys.gov}/stake/stakeinfo/allStakeInfo`, // 查询列表-查询站下所有的桩列表，包含桩状态
    // Add: `${sys.gov}/upms/register/cq/app`, // 注册
    Save: `${sys.gov}/stake/evaluationGrade/save`, // 评价提交接口
    CodeLog: `${sys.oauthPrefix}/oauth/sms`, // 注册
    LetterList: `${sys.gov}/app/vehicle/letterList`, // 接入车企
    CarRank: `${sys.gov}/app/vehicle/rankList`, // 车企业排行
    StakeRank: `${sys.gov}/stake/stakeStatistics/operatorStaketNumber`, // 桩企业排行
    StakeLetterList: `${sys.gov}/app/stake/letterList`, // 接入桩企
    IndexList: `${sys.gov}/app/stake/stationLetterList` // 接入桩企
  },
  GOV: {
    QueryExterior: `${sys.gov}/vehicle/general/queryExterior`, // 新能源车辆概况-车辆类型分布
    AppEvaluationInfo: `${sys.gov}/stake/evaluationInfo/`, // 获取评价总数
    Number: `${sys.gov}/stake/stakeStatistics/number`, // 获取充电设施站、桩、运营商数量
    RunStatus: `${sys.gov}/vehicle/statistics/runStatus`, // 统计按运行转态-在线，离线，激活，未激活，行驶，充电
    RunDataStatus: `${sys.gov}/vehicle/statistics/runDataStatus`, // 运行数据统计-累计行驶里程，二氧化碳减排量，累计行驶里程，累计用电量
    GroupStatisticsByModelCount: `${sys.gov}/vehicle/groupStatisticsByModel/count`, // 分组统计-按接入车辆型号分组统计各车辆型号个数
    CountByParameter: `${sys.gov}/vehicle/vehicleInfo/countByParameter`, // 档案数据统计类，接入平台车辆，重庆牌照车辆数
    GroupStatisticsByBrandCount: `${sys.gov}/vehicle/groupStatisticsByBrand/count`, // 分组统计-按接入品牌分组统计各品牌个数
    StationIncrease: `${sys.gov}/stake/general/stationIncrease`, // 充电设施概况-充电站年/季/月度发展趋势
    StakeIncrease: `${sys.gov}/stake/general/stakeIncrease`, // 充电设施概况-充电桩年/季/月度发展趋势
    ListIncrementYear: `${sys.gov}/vehicle/general/listIncrementYear`, // 新能源车辆概况-车辆年增长情况
    Staketypenumber: `${sys.gov}/stake/stakeStatistics/staketypenumber`, // 数量-按桩交直流桩
    StatisticsEleTimes: `${sys.gov}/stake/stakeStatistics/statisticsEleTimes`, // 获取累计充电量、充电次数
    OperatortotalPower: `${sys.gov}/stake/stakeStatistics/operatortotalPower`, // 总功率
    StakeUsePower: `${sys.gov}/stake/stakeStatistics/StakeUsePower`, // 实时占用功率
    QueryMileage: `${sys.gov}/vehicle/general/queryMileage`, // 新能源车辆概况-纯电动汽车续航里程
    QueryPurpose: `${sys.gov}/vehicle/general/queryPurpose`, // 新能源车辆概况-车辆用途分布
    TimesAndEleChange: `${sys.gov}/stake/general/timesAndEleChange`, // 充电设施概况-单日充电量/单日充电次数变化趋势
    RealPowerHistory: `${sys.gov}/stake/general/realPowerForecast`, // 充电设施概况-实时充电功率变化
    StakeUseType: `${sys.gov}/stake/general/stakeUseType`, // 充电设施概况-充电桩用途
    StakeCategory: `${sys.gov}/stake/general/stakeCategory`, // 充电设施概况-充电桩分类
    PowerForecastAndEle: `${sys.gov}/app/stake/powerForecastAndEle`, // 横屏功率
    TodayVariousPower: `${sys.gov}/app/stake/todayVariousPower`, // 横屏负荷率
    OpeStakeUseType: `${sys.gov}/merchant/data/stakeUseType`, // 运营商充电设施概况-充电桩用途
    OpeStakeCategory: `${sys.gov}/merchant/data/stakeCategory`, // 运营商充电设施概况-充电桩分类
    StationBuildnNumber: `${sys.gov}/stake/stakeStatistics/stationBuildnNumber`, // 站建设场所统计
    QueryChargeUtilizationRatio: `${sys.gov}/stake/statisticalnalysis/queryChargeUtilizationRatio` // 充电设施利用情况分析-充电设施利用率、充电设施利用率析查询
  },
  UserInfo: {
    UserInfoGet: `${sys.gov}/app/userInfo/`,
    UserInfoModify: `${sys.gov}/app/userInfo`
  },
  MemberInfo: {
    DisplayNameGet: `${sys.upmsPrefix}/upms/user/`,
    DisplayNameModify: `${sys.upmsPrefix}/upms/user`
  },
  RoleGov: {
    StakeStatisticsGet: `${sys.gov}/stake/stakeStatistics/number`,
    StatisticsEleTimeGet: `${sys.gov}/stake/stakeStatistics/statisticsEleTimes`,
    StakeStatusNumberGet: `${sys.gov}/stake/stakeStatistics/stakeStatusNumber`,
    StakeUsePowerGet: `${sys.gov}/stake/stakeStatistics/StakeUsePower`,
    CarRunStatusGet: `${sys.gov}/vehicle/statistics/runStatus`,
    CarrunDataStatusGet: `${sys.gov}/vehicle/statistics/runDataStatus`,
    CarRunTotalGroupByMouthGet: `${sys.gov}/app/vehicle/runTotalGroupByMouth`,
    CarOnceDriveMileageGet: `${sys.gov}/vehicle/once/driveMileage`,
    CarDayDriveMileageGet: `${sys.gov}/vehicle/oneDay/driveMileage`,
    CarDayCountByDayGet: `${sys.gov}/vehicle/dataAnalysis/countByDay`,
    CarDayCountByWeekGet: `${sys.gov}/vehicle/dataAnalysis/countByWeek`
  }
}
export default api
