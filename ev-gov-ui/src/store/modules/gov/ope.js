import {
  opeStationListByPage,
  opeStakeListByPage,
  opeStationRunInfo,
  opeStationListExp,
  opeStakeListExp,
  opeStationRunInfoExp,
  opeStakeLngLatInfo,
  stakeDataByAreaTime,
  queryAreaDataMax,
  opeDetailsSearch,
  opeDetailsAdd,
  opeDetailsDelete,
  opeEquipmentAdd,
  opeEquipmentQuery,
  opeTradeInfo,
  opeTradeInfoExp

} from '@/api/gov/ope'

const ope = {
  state: {},
  mutations: {},
  actions: {
    // 充电站档案
    OpeStationListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩档案
    OpeStakeListByPage ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeListByPage(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站运营情况展示
    OpeStationRunInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationRunInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电站档案导出
    OpeStationListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //  // 充电设施地区运营情况-地区日充电量趋势,地区日充电次数趋势
    StakeDataByAreaTime1 ({
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
    // 充电桩档案导出
    OpeStakeListExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeListExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电设施地区运营情况,充电设施运营商运营情况-数值查询-----运营商数据
    QueryAreaDataMax1 ({
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
    // 充电站运营情况导出
    OpeStationRunInfoExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStationRunInfoExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 充电桩使用分布密度
    OpeStakeLngLatInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeStakeLngLatInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商信息填报 - 查询接口
    OpeDetailsSearch ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeDetailsSearch(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商信息填报 - 编辑接口
    OpeDetailsAdd ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeDetailsAdd(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商信息填报 - 删除接口
    OpeDetailsDelete ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeDetailsDelete(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 保存设备所属方关联关系
    OpeEquipmentAdd ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeEquipmentAdd(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 设备所属方关联关系查询
    OpeEquipmentQuery ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeEquipmentQuery(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-订单信息查询
    OpeTradeInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeTradeInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 运营商接口-订单信息导出
    OpeTradeInfoExp ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        opeTradeInfoExp(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default ope
