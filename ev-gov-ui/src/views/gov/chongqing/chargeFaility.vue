<template>
  <div>
    <a-card style="width: 100%; margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          充电设施概况
        </span>
      </template>
      <a-select defaultValue="年度" style="width: 120px; margin-right: 30px;" @change="handleChange" slot="extra">
        <a-select-option value="年度">年度</a-select-option>
        <a-select-option value="季度">季度</a-select-option>
        <a-select-option value="月度">月度</a-select-option>
      </a-select>
      <a-select :defaultValue="defaultYear" style="width: 120px" @change="handleYearChange" slot="extra">
        <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>
      </a-select>
      <a-row>
        <a-col :span="8">
          <div style="height: 462px; padding: 15px; border-right: 1px solid #e7eaec;">
            <div
              style="background:url(/imageUrl/stationnum.png) no-repeat 20px 0px; margin-left:7%; background-size: contain;">
              <div style="font-size:20px;margin-left:40%;margin-top:30px;margin-bottom:50px">
                <div style="font-size:15px;"><b>充电站总数:</b></div>
                <div>
                  <span style="color:#00caaf;margin-left:0px;font-size: 25px;"><b>{{ stationNum }}</b></span><span
                    style="font-size:15px;margin-left:0px;float:right;margin-right: 20%;margin-top: 10px;"><b>座</b></span>
                </div>
              </div>
            </div>
            <div
              style="background:url(/imageUrl/stakenum.png) no-repeat 20px 0px; margin-left:7%; background-size: contain;">
              <div style="font-size:20px;margin-left:40%;margin-top:30px;margin-bottom:50px">
                <div style="font-size:15px;"><b>充电桩总数:</b></div>
                <div>
                  <span style="color:#00caaf;margin-left:0px;font-size: 25px;"><b>{{ stakeNum }}</b></span><span
                    style="font-size:15px;margin-left:0px;float:right;margin-right: 20%;margin-top: 10px;"><b>个</b></span>
                </div>
              </div>
            </div>
            <div
              style="background:url(/imageUrl/stakegl.png) no-repeat 20px 0px; margin-left:7%; background-size: contain;">
              <div style="font-size:20px;margin-left:40%;margin-top:30px;margin-bottom:50px">
                <div style="font-size:15px;"><b>总额定功率:</b></div>
                <div>
                  <span style="color:#00caaf;margin-left:0px;font-size: 25px;"><b>{{ ratingPower }}</b></span><span
                    style="font-size:15px;margin-left:0px;float:right;margin-right: 20%;margin-top: 10px;"><b>千瓦</b></span>
                </div>
              </div>
            </div>
            <div
              style="background:url(/imageUrl/stakegl2.png) no-repeat 20px 0px; margin-left:7%; background-size: contain;">
              <div style="font-size:20px;margin-left:40%;margin-top:30px;margin-bottom:50px">
                <div style="font-size:15px;"><b>实时占用功率:</b></div>
                <div>
                  <span style="color:#00caaf;margin-left:0px;font-size: 25px;"><b>{{ nowPower }}</b></span><span
                    style="font-size:15px;margin-left:0px;float:right;margin-right: 20%;margin-top: 10px;"><b>千瓦</b></span>
                </div>
              </div>
            </div>
          </div>
        </a-col>
        <a-col :span="16">
          <div style="height: 231px; padding: 15px; border-bottom: 1px solid #e7eaec;" id="Chart1"></div>
        </a-col>
        <a-col :span="16">
          <div style="height: 231px; padding: 15px;" id="Chart2"></div>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="width: 100%; margin-bottom:24px">
      <template slot="title" style="top:20px">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          实时充电功率变化
        </span>
      </template>
      <div style="height: 350px;" id="Chart3"></div>
    </a-card>
    <a-card style="width: 100%; margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          单日充电量/单日充电次数变化趋势
        </span>
      </template>
      <a-range-picker @change="onChange" :defaultValue="defaultValue" slot="extra" :allowClear="false"
                      :format="dateFormat" />
      <div style="height: 350px;" id="Chart4"></div>
    </a-card>
    <a-row :gutter="16" style="margin-bottom: 24px;">
      <a-col :span="8" style="padding-right: 12px;">
        <a-card :bordered="false">
          <template slot="title">
            <span style="margin-left: 18px">
              <div class="titleFlag" style="top:20px"></div>
              充电桩用途
            </span>
          </template>
          <div style="height: 350px;" id="Chart5"></div>
        </a-card>
      </a-col>
      <a-col :span="8" style="padding-left: 12px;padding-right: 12px;">
        <a-card :bordered="false">
          <template slot="title">
            <span style="margin-left: 18px">
              <div class="titleFlag" style="top:20px"></div>
              充电桩分类
            </span>
          </template>
          <div style="height: 350px;" id="Chart6"></div>
        </a-card>
      </a-col>
      <a-col :span="8" style="padding-left: 12px;">
        <a-card :bordered="false" :headStyle="{height: '56px'}" class="lastCard">
          <a-select defaultValue="充电设施建设规模排名" style="width: 190px;" @change="handleTypeChange" slot="extra">
            <a-select-option value="1">充电设施建设规模排名</a-select-option>
            <a-select-option value="2">充电桩额定功率排名</a-select-option>
            <a-select-option value="3">地区日充电量排名</a-select-option>
          </a-select>
          <div style="height: 350px;">
            <div style="height: 350px;">
              <div class="ulist">
                <div v-for="(item, index) in rankList.name" :key="item"
                     style="height:34px; border-bottom: 1px solid #ccc; line-height: 35px;">
                  <span v-if="index < 3"
                        style="background:#ff5c5b; display:inline-block; width: 20px; height:20px; text-align:center; line-height: 20px; color: #FFF;margin-right: 15%; margin-left: 15%;">{{ index + 1 }}</span>
                  <span v-else
                        style="background:#ffaa00; display:inline-block; width: 20px; height:20px; text-align:center; line-height: 20px; color: #FFF;margin-right: 15%; margin-left: 15%;">{{ index + 1 }}</span>
                  <div style="margin-left:20px; width:100px; display:inline-block;">{{ item }}</div>
                  <div v-if="rankType == 1" style="margin-left:20px; display:inline-block;">
                    <a-statistic :value="rankList.value[index]" style="display: inline-block;width:50px;"
                                 :valueStyle="{fontSize:'16px'}" /><span
                                   style="display: inline-block;text-align:right;width:40px;">个</span></div>
                  <div v-if="rankType == 2" style="margin-left:20px; display:inline-block;">
                    <a-statistic :value="rankList.value[index]" style="display: inline-block;width:50px;"
                                 :valueStyle="{fontSize:'16px'}" /><span
                                   style="display: inline-block;text-align:right;width:40px;">千瓦</span></div>
                  <div v-if="rankType == 3" style="margin-left:20px; display:inline-block;">
                    <a-statistic :value="rankList.value[index]" style="display: inline-block;width:50px;"
                                 :valueStyle="{fontSize:'16px'}" /><span
                                   style="display: inline-block;text-align:right;width:50px;">千瓦时</span></div>
                </div>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      colors: [
        '#87cefa',
        '#ff7f50',
        '#00caaf',
        '#ff7f50',
        '#6495ed',
        '#ff69b4',
        '#ba55d3',
        '#cd5c5c',
        '#ffa500',
        '#40e0d0',
        '#1e90ff',
        '#ff6347',
        '#7b68ee',
        '#00fa9a',
        '#ffd700',
        '#6b8e23',
        '#ff00ff',
        '#3cb371',
        '#b8860b',
        '#30e0e0'
      ],
      Charts: {
        Chart1: null,
        Chart2: null,
        Chart3: null,
        Chart4: null,
        Chart5: null,
        Chart6: null
      },
      yearList: [],
      defaultYear: null,
      rank: '充电设施建设规模排名',
      sendStartDate: '',
      sendEndDate: '',
      userInfo: null,
      totalnum: null,
      znum: null,
      zenum: null,
      elnum: null,
      alerttime: null,
      rankMonth: '年度',
      rankSecond: '2019',
      merchantNo: null,
      rankList: {
        name: [],
        value: []
      },
      startTime: '',
      endTime: '',
      defaultValue: [],
      dateFormat: 'YYYY-MM-DD',
      rankType: 1,
      ratingPower: 0,
      nowPower: 0,
      stationNum: 0,
      stakeNum: 0
    }
  },
  created () {
    for (var k = 0; k < 5; k++) {
      this.yearList.push(moment().get('year') - k)
    }
    this.defaultYear = this.yearList[0]
    this.startTime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(30, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
  },
  mounted () {
    var that = this
    this.initCharts()
    this.changeRankMonth()
    this.loadData()
    this.getdata()
    this.getRank()
    this.initStakeUsePower()
    this.initNumber()
    this.initOperatortotalPower()
    window.onresize = function () {
      for (var key in that.Charts) {
        that.Charts[key].resize()
      }
    }
  },
  methods: {
    initStakeUsePower () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('StakeUsePower', params).then(res => {
        this.nowPower = res[0].value
      })
    },
    initNumber () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('Number', params).then(res => {
        this.stakeNum = res.stakeNumber
        this.stationNum = res.stationNumber
      })
    },
    initOperatortotalPower () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        this.ratingPower = res.value
      })
    },
    onChange (date, dateString) {
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.loadData()
    },
    handleChange (value) {
      this.rankMonth = value
      this.changeRankMonth()
    },
    handleYearChange (value) {
      this.rankSecond = value
      this.changeRankMonth()
    },
    handleTypeChange (value) {
      this.rankType = value
      this.getRank()
    },
    loadData () {
      var that = this
      var params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime
      }
      this.$store
        .dispatch('TimesAndEleChange', params)
        .then(data => {
          var key = data.name
          var ele = data.ele
          var times = data.times
          var option4 = {
            color: that.colors,
            tooltip: {
              trigger: 'axis',
              formatter: function (a) {
                var relVal = ''
                if (a[0].name) {
                  relVal = a[0].name + '<br/>'
                  relVal += a[0].seriesName + '：' + a[0].value + '千瓦时<br/>'
                  relVal += a[1].seriesName + '：' + a[1].value + '次<br/>'
                  return relVal
                } else {
                  relVal = '暂无数据'
                  return relVal
                }
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 20
            },
            grid: {
              right: '7%',
              left: '7%',
              bottom: '15%',
              top: '15%'
            },
            legend: {
              data: ['充电总量', '充电次数'],
              bottom: '0'
            },
            xAxis: [
              {
                type: 'category',
                axisTick: {
                  alignWithLabel: true
                },
                data: key
              }
            ],
            yAxis: [
              {
                type: 'value',
                name: '千瓦时',
                position: 'left',
                axisLabel: {
                  formatter: '{value}'
                }
              },
              {
                type: 'value',
                name: '次',
                position: 'right',
                axisLabel: {
                  formatter: '{value}'
                }
              }
            ],
            series: [
              {
                name: '充电总量',
                type: 'bar',
                data: ele,
                yAxisIndex: 0,
                itemStyle: {
                  normal: {
                    color: that.colors[2]
                  }
                }
              },
              {
                name: '充电次数',
                type: 'line',
                data: times,
                yAxisIndex: 1,
                itemStyle: {
                  normal: {
                    color: that.colors[1]
                  }
                }
              }
            ]
          }
          that.Charts.Chart4.setOption(option4)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getdata () {
      var that = this
      var params = {
        areaCode: that.$ls.get('areaCode')
      }
      this.$store
        .dispatch('RealPowerHistory', params)
        .then(data => {
          var key = data.name
          var value = data.value
          var option3 = {
            color: that.colors,
            tooltip: {
              trigger: 'axis'
            },
            xAxis: {
              data: key
            },
            yAxis: {
              name: '千瓦',
              type: 'value',
              splitLine: {
                show: false
              }
            },
            toolbox: {
              show: true,
              right: 20,
              feature: {
                saveAsImage: {
                  show: true
                }
              }
            },
            grid: {
              left: '7%',
              right: '5%',
              top: '15%',
              bottom: '15%'
            },
            visualMap: {
              top: 10,
              right: 40,
              show: false,
              pieces: [
                {
                  gt: 0,
                  lte: 500,
                  color: '#096'
                },
                {
                  gt: 500,
                  lte: 1000,
                  color: '#ffde33'
                },
                {
                  gt: 1000,
                  lte: 1500,
                  color: '#ff9933'
                },
                {
                  gt: 1500,
                  lte: 2000,
                  color: '#cc0033'
                },
                {
                  gt: 2000,
                  lte: 2500,
                  color: '#660099'
                },
                {
                  gt: 2500,
                  color: '#7e0023'
                }
              ],
              outOfRange: {
                color: '#999'
              }
            },
            series: {
              name: '充电设施实时占用功率',
              type: 'line',
              data: value,
              markLine: {
                lineStyle: {
                  normal: {
                    opacity: 0.7
                  }
                },
                silent: true,
                data: [
                  {
                    yAxis: 500,
                    lineStyle: {
                      normal: {
                        color: '#096'
                      }
                    }
                  },
                  {
                    yAxis: 1000,
                    lineStyle: {
                      normal: {
                        color: '#ffde33'
                      }
                    }
                  },
                  {
                    yAxis: 1500,
                    lineStyle: {
                      normal: {
                        color: '#ff9933'
                      }
                    }
                  },
                  {
                    yAxis: 2000,
                    lineStyle: {
                      normal: {
                        color: '#cc0033'
                      }
                    }
                  },
                  {
                    yAxis: 2500,
                    lineStyle: {
                      normal: {
                        color: '#660099'
                      }
                    }
                  }
                ]
              }
            }
          }
          that.Charts.Chart3.setOption(option3)
        })
        .catch(error => {
          console.log(error)
        })

      var stakeParams = {
        areaCode: that.$ls.get('areaCode')
      }
      this.$store
        .dispatch('StakeUseType', stakeParams)
        .then(data => {
          var key = data.keys
          var value = data.values
          var option5 = {
            tooltip: {
              trigger: 'item',
              formatter: '{a} <br/>{b}：{c} ({d}%)'
            },
            legend: {
              orient: 'vertical',
              left: 'left',
              data: key
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 5
            },
            color: that.colors,
            series: [
              {
                name: '充电桩用途',
                type: 'pie',
                radius: '55%',
                center: ['50%', '60%'],
                data: value,
                itemStyle: {
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          }
          that.Charts.Chart5.setOption(option5)
        })
        .catch(error => {
          console.log(error)
        })

      this.$store
        .dispatch('StakeCategory', stakeParams)
        .then(data => {
          var key = data.name
          var value = data.value
          var total = value.reduce(function (a, b) {
            return a - 0 + (b - 0)
          })
          var option6 = {
            color: ['#ff7f50'],
            tooltip: {
              formatter: function (a) {
                var relVal = ''
                if (a[0].name) {
                  relVal = '充电桩分类<br>'
                  relVal = relVal + a[0].name + '：' + a[0].value + '个<br/>'
                  return relVal
                } else {
                  relVal = '暂无数据'
                  return relVal
                }
              },
              trigger: 'axis',
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 5
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                data: key,
                // axisTick: {
                //   alignWithLabel: true
                // },
                axisLabel: {
                  interval: 0,
                  rotate: 0
                }
              }
            ],
            yAxis: [
              {
                type: 'value'
              }
            ],
            series: [
              {
                type: 'bar',
                barWidth: '60%',
                data: value,
                itemStyle: {
                  normal: {
                    color: function (p) {
                      return that.colors[p.dataIndex]
                    }
                  }
                },
                label: {
                  normal: {
                    show: true,
                    formatter: function (a) {
                      return ((parseInt(a.data) / total) * 100).toFixed(2) + '%'
                    },
                    position: 'top'
                  }
                }
              }
            ]
          }
          that.Charts.Chart6.setOption(option6)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getRank () {
      var that = this
      var rankParams = {
        areaCode: that.$ls.get('areaCode'),
        rankType: that.rankType
      }
      this.$store
        .dispatch('StakeNumRank', rankParams)
        .then(data => {
          that.rankList = data
        })
        .catch(error => {
          console.log(error)
        })
    },
    initCharts () {
      for (var key in this.Charts) {
        this.Charts[key] = this.$echarts.init(document.getElementById([key]))
      }
    },
    changeRankMonth () {
      var that = this
      // 假数
      var params = {
        areaCode: that.$ls.get('areaCode'),
        merchantNo: '',
        rankMonth: that.rankMonth,
        selectYear: that.rankSecond
      }
      this.$store
        .dispatch('StationIncrease', params)
        .then(data => {
          var key = data.name
          var value = data.value
          var valueList = []
          for (var i in value) {
            if (i === '0') {
              valueList.push(value[i])
            } else {
              valueList.push(parseInt(value[i]) + parseInt(valueList[i - 1]))
            }
          }
          var rank = that.rankMonth.split('').join('\n')
          var option1 = {
            title: {
              text: '充\n电\n站\n' + rank + '\n发\n展\n趋\n势',
              textStyle: {
                color: '#676a6c'
              }
            },
            color: ['#ff7f50'],
            tooltip: {
              trigger: 'axis',
              formatter: function (params, ticket, callback) {
                var ret = '充电站数量：' + params[0].value + '&nbsp;座'
                return ret
              },
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '0%',
              top: '15%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 5
            },
            xAxis: [
              {
                type: 'category',
                data: key,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: {
              type: 'value',
              name: '个'
            },
            series: [
              {
                name: '充电站数量',
                type: 'bar',
                barWidth: '60%',
                data: valueList
              }
            ]
          }
          that.Charts.Chart1.setOption(option1)
        })
        .catch(error => {
          console.log(error)
        })

      this.$store
        .dispatch('StakeIncrease', params)
        .then(data => {
          var key = data.name
          var value = data.value
          var valueList = []
          for (var i in value) {
            if (i === '0') {
              valueList.push(value[i])
            } else {
              valueList.push(parseInt(value[i]) + parseInt(valueList[i - 1]))
            }
          }
          // eslint-disable-next-line no-redeclare
          var rank = that.rankMonth.split('').join('\n')
          var option2 = {
            title: {
              text: '充\n电\n桩\n' + rank + '\n发\n展\n趋\n势',
              textStyle: {
                color: '#676a6c'
              }
            },
            color: ['#00caaf'],
            tooltip: {
              trigger: 'axis',
              formatter: function (a) {
                var ret = '充电桩数量：' + a[0].value + '&nbsp;个'
                return ret
              },
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '5%',
              right: '5%',
              bottom: '0%',
              top: '15%',
              containLabel: true
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 5
            },
            xAxis: [
              {
                type: 'category',
                data: key,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: {
              type: 'value',
              name: '个'
            },
            series: [
              {
                name: '充电桩数量',
                type: 'bar',
                barWidth: '60%',
                data: valueList
              }
            ]
          }
          that.Charts.Chart2.setOption(option2)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.titleFlag {
  top: 24px;
}
/deep/.ant-card-extra {
  float: inherit;
  margin-left: inherit;
  margin: 0 auto !important;
}
</style>
