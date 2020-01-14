import { stakeStatisticsGet,
  statisticsEleTimeGet,
  stakeStatusNumberGet,
  stakeUsePowerGet,
  carRunStatusGet,
  carRunDataStatusGet,
  carRunTotalGroucpByMouthGet,
  carOnceDriveMileageGet,
  carDayDriveMileageGet,
  carDayCountByDayCet,
  carDayCountByWeekGet
} from 'src/api/roleGov/index'
const ope = {
  state: {
  },
  actions: {
    // 获取充电设施站、桩、运营商数量
    stakeStatisticsGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        stakeStatisticsGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取充电次数、量
    statisticsEleTimeGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        statisticsEleTimeGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取充电桩状态
    stakeStatusNumberGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        stakeStatusNumberGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取充电桩功率
    stakeUsePowerGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        stakeUsePowerGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取车状态
    carRunStatusGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carRunStatusGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取车co2
    carRunDataStatusGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carRunDataStatusGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取查询汽车行驶统计，车辆充电总量（按月分组）
    carRunTotalGroucpByMouthGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carRunTotalGroucpByMouthGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取车辆单次行驶里程
    carOnceDriveMileageGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carOnceDriveMileageGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取车辆单日行驶里程
    carDayDriveMileageGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carDayDriveMileageGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户驾驶习惯分析-全天各时段行驶车辆统计
    carDayCountByDayCet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carDayCountByDayCet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 用户驾驶习惯分析-一周每日驾驶次数统计
    carDayCountByWeekGet ({ commit, state }, data) {
      return new Promise((resolve, reject) => {
        carDayCountByWeekGet(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  },
  mutations: {
  }
}
export default ope
