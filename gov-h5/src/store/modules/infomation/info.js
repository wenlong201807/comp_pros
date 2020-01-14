import {
  mapStation,
  informationListGet,
  smsCode,
  add,
  appOperatorInfo,
  save,
  informationDetail,
  phonePassword,
  appMapStation,
  appFeedbackAdd,
  appCollectionList,
  appAddCollection,
  appDeleteCollection,
  letterList,
  carRank,
  stakeRank,
  appEvaluationInfo,
  stakeLetterList,
  appAllStakeInfo,
  appMapstake,
  appEvaluationGrade,
  operatortotalPower,
  todayVariousPower,
  opeStakeCategory,
  opeStakeUseType,
  powerForecastAndEle,
  indexList
} from 'src/api/information/info'

const ope = {
  state: {},
  mutations: {},
  actions: {
    // 充电站档案
    InformationListGet ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        informationListGet(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AppEvaluationInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appEvaluationInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    InformationDetail ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        informationDetail(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SmsCode ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        smsCode(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Add ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        add(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    Save ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        save(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    PhonePassword ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        phonePassword(data)
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    AppMapStation ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appMapStation(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppOperatorInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appOperatorInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppFeedbackAdd ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appFeedbackAdd(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppCollectionList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appCollectionList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    MapStation ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        mapStation(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppAddCollection ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appAddCollection(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppDeleteCollection ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appDeleteCollection(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    CarRankRequest ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        carRank(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    stakeRankRequest ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeRank(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    LetterList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        letterList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    StakeLetterList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        stakeLetterList(data).then(response => {
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
    AppAllStakeInfo ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appAllStakeInfo(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppMapstake ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appMapstake(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    AppEvaluationGrade ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        appEvaluationGrade(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    PowerForecastAndEle ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        powerForecastAndEle(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
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
    TodayVariousPower ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        todayVariousPower(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    IndexList ({
      commit,
      state
    }, data) {
      return new Promise((resolve, reject) => {
        indexList(data).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}
export default ope
