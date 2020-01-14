<template>
  <div class="divMain">
    <div class="registerTop">
      <van-row class="registerTopRow">
        <van-col span="2">
          <span class="icon" @click="goBack"></span>
        </van-col>
        <span>车辆分布</span>
      </van-row>
    </div>
    <div class="evaluateMain">
      <scroller :on-refresh="refresh" ref="myscroller">
        <van-row>
          <div class="vehicle">
            <div class="vehicleByCar">
              <div class="chartDiv">
                <div id="echart1"></div>
              </div>
            </div>
            <div class="vehicleByCar">
              <div class="chartDiv">
                <div id="echart2"></div>
              </div>
            </div>
            <div class="vehicleByCar1" style="border-bottom: none;">
              <div class="chartDiv1">
                <div id="echart3"></div>
              </div>
            </div>
            <div class="noMsg">
              <span>—— 暂无更多统计 ——</span>
            </div>
          </div>
        </van-row>
      </scroller>
    </div>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
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
      echart1: null,
      echart2: null,
      echart3: null,
      user: null
    }
  },
  mounted () {
    this.user = getStore('userSpecific')
    this.$nextTick(() => {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      window.onresize = function () {
        this.echart1.resize()
        this.echart2.resize()
        this.echart3.resize()
      }
    })
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    refresh () {
      this.initChart1()
      this.initChart2()
      this.initChart3()
      setTimeout(() => {
        this.$refs.myscroller.finishPullToRefresh()
      }, 3000)
    },
    initChart1 () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryExterior', params).then(res => {
        this.showLoading = false
        this.echart1 = this.$echarts.init(
          document.getElementById('echart1')
        )
        this.echart1.setOption({
          color: that.colors,
          title: {
            text: '车辆类型分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆类型分布',
              type: 'pie',
              radius: [30, 68],
              center: ['60%', '50%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initChart2 () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryMileage', params).then(res => {
        this.echart2 = this.$echarts.init(
          document.getElementById('echart2')
        )
        this.echart2.setOption({
          color: that.colors,
          title: {
            text: '纯电动汽车续航里程（公里）',
            x: 'left',
            y: 'top',
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          calculable: true,
          series: [
            {
              name: '纯电动汽车续航里程（公里）',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['60%', '50%'],
              // eslint-disable-next-line no-dupe-keys
              type: 'pie',
              x: '50%',
              max: 50,
              sort: 'ascending',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: function (params) {
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      /* if (key.length > 6) {
                                            allKey = key.slice(0, 6) + '\n' + key.slice(6, key.length) + ':'
                                        } else { */
                      allKey = key + ':'
                      //  }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initChart3 () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryPurpose', params).then(res => {
        this.echart3 = this.$echarts.init(
          document.getElementById('echart3')
        )
        // 绘制图表
        this.echart3.setOption({
          color: that.colors,
          title: {
            text: '车辆用途分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: 'bottom',
            // orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆用途分布',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['60%', '45%'],
              // eslint-disable-next-line no-dupe-keys
              type: 'pie',
              x: '50%', // for funnel
              max: 50, // for funnel
              sort: 'ascending', // for funnel
              itemStyle: {
                normal: {
                  label: {
                    show: true, // "{b}:{c}",
                    formatter: function (params) {
                      // var str = '{b}:{c}'
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      if (key.length > 6) {
                        allKey =
                          key.slice(0, 5) +
                          '\n' +
                          key.slice(6, key.length) +
                          ':'
                      } else {
                        allKey = key + ':'
                      }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.carCompanyImg {
  margin: 6px 0 6px 18px;
}
/deep/ .mint-indexlist-content {
  width: 100%;
  background: #f4f4f4;
}
.divMain {
  height: 100%;
  width: 100%;
}
.icon {
  margin-left: 4%;
  margin-top: 4%;
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(../../assets/back.png) no-repeat 50% 100%;
  background-size: contain;
}
.registerTop {
  height: 44px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding: 5px 0;
}
.registerTopRow {
  height: 34px;
  line-height: 34px;
  text-align: center;
}
/deep/._v-container {
  position: inherit;
}
.evaluateMain {
  width: 100%;
  height: calc(100% - 44px);
  background: #f4f4f4;
}
.carHotText {
  font-size: 14px;
  margin-top: 4px;
}

.vehicle {
  width: 100%;
  height: 100%;
  background: #f4f4f4;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
}
.scrollerCss {
  width: 100%;
  height: calc(100% - 44px);
}
.vehicleByCar {
  padding: 0 4%;
  height: 222px;
  background: #ffffff;
  border-bottom: 6px solid #ccc;
}
.vehicleByCar1 {
  padding: 0 4%;
  height: 422px;
  background: #ffffff;
  border-bottom: 6px solid #ccc;
}
.chartDiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
}
.chartDiv1 {
  width: 100%;
  height: 400px;
  display: flex;
  justify-content: space-around;
}
#echart1,#echart2,#echart3 {
  width: 100%;
  height: 100%;
}

.noMsg {
  text-align: center;
  color: #aaaaaa;
  margin-top: 6px;
}
</style>
