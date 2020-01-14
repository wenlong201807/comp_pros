import {
  queryPurpose,
  queryMileage,
  stakeUsePower,
  operatortotalPower,
  statisticsEleTimes,
  groupStatisticsByBrandCount,
  queryExterior,
  runStatus,
  runDataStatus,
  groupStatisticsByModelCount,
  countByParameter,
  staketypenumber,
  opeTimesAndEleChange,
  realPowerHistory,
  queryChargeUtilizationRatio,
  stationIncrease,
  stakeIncrease,
  stakeUseType,
  stakeCategory,
  number,
  stationBuildnNumber,
  listIncrementYear
} from 'src/api/gov/synthetic'

const synthetic = {
  state: {},
  mutations: {},
  actions: {
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
    // 站建设场所统计
    StationBuildnNumber ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stationBuildnNumber(data).then(response => {
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
    }
  }
}
export default synthetic
