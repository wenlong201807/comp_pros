<template>
  <div class="con-liu">
    <loadingStatus :content="content"
                   :loadingStatus="showLoading"></loadingStatus>
    <div class="topBack">
      <div class="navTitle">发展趋势</div>
      <div class="backButton"
           @click="goBack"></div>
    </div>
    <div class="count-info-con">
      <div class="top">
        <h4>
          <img src="../../assets/roleGov/icon1.png"
               alt=""> <span>重庆市充电设施发展趋势</span>
        </h4>
        <van-row style="text-align: center">
          <van-col span="8">
            <p class="value">
              充电站数量
              <span>{{ stationNumber }}</span>
              <!-- <span>1573</span> -->
            </p>
          </van-col>
          <van-col span="8">
            <p class="value">
              充电桩数量
              <span>{{ stakeNumber }}</span>
              <!-- <span>14123</span> -->
            </p>
          </van-col>
          <van-col span="8">
            <p class="value">
              额定功率
              <span>{{ ratingPower }}</span>
            </p>
          </van-col>
        </van-row>
        <p class="time">数据更新时间：{{ timeCurrent }}</p>
      </div>
      <van-row class="chart">
        <h4 class="common-title1"> <span>充电站年度发展趋势</span></h4>
        <div id="echart1">
        </div>
      </van-row>
      <van-row class="chart">
        <h4 class="common-title1"> <span>充电桩年度发展趋势</span></h4>
        <div id="echart2">
        </div>
      </van-row>
    </div>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
// const echarts = require('echarts/lib/echarts')
export default {
  name: 'StakeCountInfo1',
  data () {
    return {
      active: 0,
      echart1: null,
      // operatorNumber: 0,
      stakeNumber: 0,
      stationNumber: 0,
      content: '加载中...',
      showLoading: true,
      timeCurrent: this.$moment().format('YYYY年MM月DD日'),
      endDate: 2019,
      ratingPower: null
    }
  },
  created () {
  },
  activated () {
    if (this.$route.params) {
      this.active = this.$route.params.active
    }
  },
  mounted () {
    var date = new Date()
    this.endDate = date.getFullYear()
    this.drawEchart1()
    this.drawEchart2()
    this.getNumber()
    this.initOperatortotalPower()
    // window.onresize = function () {
    //   this.echart1.resize()
    // }
  },
  methods: {
    initOperatortotalPower () {
      const params = [
        {
          field: 'areaCode',
          value: getStore('userSpecific').areaCode
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        // this.ratingPower = (parseInt(res.value) / 10000).toFixed(2)
        this.ratingPower = res[0].value || res.value
      })
    },
    getNumber () {
      var params = [
        {
          field: 'areaCode',
          value: getStore('userSpecific').areaCode
        }
      ]
      this.$store.dispatch('Number', params).then(data => {
        // this.operatorNumber = data.operatorNumber
        this.stakeNumber = data.stakeNumber
        this.stationNumber = data.stationNumber
      })
    },
    goBack () {
      this.$router.back()
    },
    drawEchart1 (name) {
      var margin = 10
      var echart = document.getElementById('echart1')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

      var echart1 = this.$echarts.init(echart)
      var params = {
        areaCode: getStore('userSpecific').areaCode,
        merchantNo: '',
        rankMonth: '年度',
        selectYear: this.endDate
      }
      this.$store.dispatch('StationIncrease', params).then(data => {
        echart1.setOption({
          // title: {
          //   text: '时段电价'
          // },
          color: ['#92bdfc'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: data.name,
              // data: ['2015', '2016', '2017', '2018', '2019'],
              // axisTick: {
              //   alignWithLabel: true
              // },
              axisLine: {
                show: true, // 不显示坐标轴线
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                interval: 0,
                rotate: 40
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              // max: 600,
              type: 'value',
              name: '个',
              minInterval: 0.8,
              axisLine: {
                show: false // 不显示坐标轴线
              },
              axisTick: {
                show: false
              }
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            }
          ],
          series: [
            {
              // name: '直接访问',
              type: 'bar',
              barWidth: 10,
              data: data.value
              // data: ['139', '255', '377', '981', '1573']
            }
          ]
        })
      })
    },
    drawEchart2 (name) {
      var margin = 10
      var echart = document.getElementById('echart2')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

      var echart1 = this.$echarts.init(echart)
      var params = {
        areaCode: getStore('userSpecific').areaCode,
        merchantNo: '',
        rankMonth: '年度',
        selectYear: this.endDate
      }
      this.$store.dispatch('StakeIncrease', params).then(data => {
        this.showLoading = false
        echart1.setOption({
          // title: {
          //   text: '时段电价'
          // },
          color: ['#92bdfc'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            top: '10%',
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [
            {
              type: 'category',
              data: data.name,
              // data: ['2015', '2016', '2017', '2018', '2019'],
              // axisTick: {
              //   alignWithLabel: true
              // },
              axisLine: {
                show: true, // 不显示坐标轴线
                lineStyle: {
                  color: '#ccc'
                }
              },
              axisLabel: {
                interval: 0,
                rotate: 40
              },
              axisTick: {
                show: false
              }
            }
          ],
          yAxis: [
            {
              // max: 600,
              type: 'value',
              name: '个',
              minInterval: 0.8,
              axisLine: {
                show: false // 不显示坐标轴线
              },
              axisTick: {
                show: false
              }
              // axisLabel: {
              //   formatter: '{value} ml'
              // }
            }
          ],
          series: [
            {
              // name: '直接访问',
              type: 'bar',
              barWidth: 10,
              data: data.value
              // data: ['1399', '1783', '2327', '8301', '14123']
            }
          ]
        })
      })
    }
  }
}
</script>

<style scoped>
.time {
  padding-left: 24px;
}
.chart {
  margin: 10px;
}
#echart1,
#echart2,
#echart3,
#echart4 {
  width: 100%;
  height: 280px;
}
.con-liu {
  height: 100%;
}
.count-info-con {
  height: calc(100% - 50px);
  position: absolute;
  overflow-y: auto;
}
.van-tabs {
  height: 100%;
}
.count-info-con /deep/ .van-tabs__content {
  width: 100%;
  height: calc(100% - 50px);
  top: 50px;
  background-color: #ffffff;
  overflow-y: auto;
  position: absolute;
}
/deep/ .van-tabs__line {
  background-color: #333333;
}
.con-liu .count-info-con .top .value span {
  display: block;
  margin: 0;
}
</style>
