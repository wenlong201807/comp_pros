<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="navTitle">当前现状</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <van-pull-refresh v-model="topLoadingShow" @refresh="refresh" class="count-info-con">
      <div class="">
        <div class="top">
          <h4><img src="../../assets/roleGov/icon1.png" alt=""> <span>重庆市电动汽车当前现状</span></h4>
          <van-row style="text-align: center">
            <van-col span="8">
              <p class="value">
                行驶里程/万公里
                <span >{{ Math.floor(topInfo.totalMileage/10000) }}</span>
              </p>
            </van-col>
            <van-col span="8">
              <p class="value">
                行驶时间/万小时
                <span >{{ Math.floor(topInfo.totalTime/10000) }}</span>
              </p>
            </van-col>
            <van-col span="8">
              <p class="value">
                二氧化碳/万吨
                <span >{{ Math.floor(topInfo.co2/10000) }}</span>
              </p>
            </van-col>
          </van-row>
          <p class="time">数据更新时间：{{ date }}</p>
        </div>
        <van-row class="chart">
          <h4 class="common-title1"> <span>2019年里程统计</span></h4>
          <div id="echart1">
          </div>
        </van-row>
        <van-row class="chart">
          <h4 class="common-title1"> <span>2019年时间统计</span></h4>
          <div id="echart2">
          </div>
        </van-row>
      </div>
    </van-pull-refresh>
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'CarCountInfo2',
  data () {
    return {
      topLoadingShow: false,
      loadingShow: false,
      topInfo: {},
      date: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    refresh () {
      this.topLoadingShow = true
      this.carRunDataStatusGet()
      this.runTotalGroupByMouth()
    },
    init () {
      this.loadingShow = true
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.areaCode = this.userInfo.areaCode
      this.carRunDataStatusGet()
      this.runTotalGroupByMouth()
      this.date = this.getDay()
      // this.now = new Date()
    },
    showErr () {
      this.$toast('加载错误')
    },
    getDay () {
      var now = new Date()
      var year = now.getFullYear()
      var month = now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()
      var day = now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
      return year + '年' + month + '月' + day + '日'
    },
    // 获取车co2减排量
    carRunDataStatusGet () {
      // var that = this
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('carRunDataStatusGet', params).then((res) => {
        if (res) {
          this.topInfo = res
          // this.carNumInfo = res
        }
      })
    },
    runTotalGroupByMouth () {
      const params = {
        basic: {
          areaCode: this.areaCode
        }
      }
      // const params = { 'field': 'areaCode', areaCode: this.areaCode }
      this.$store.dispatch('carRunTotalGroucpByMouthGet', params).then((res) => {
        if (res) {
          console.log(res)
          this.drawEchart1(res)
          this.drawEchart2(res)
          this.loadingShow = false
          this.topLoadingShow = false
        }
      }).catch(() => {
        this.loadingShow = false
        this.topLoadingShow = false
        this.showErr()
      })
    },
    drawEchart1 (data) {
      var margin = 10
      var echart = document.getElementById('echart1')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'
      var xAxis1 = []
      var series1 = []
      data.forEach(function (item, index) {
        xAxis1.push(item.mouth)
        series1.push(item.mileage)
      })
      var echart1 = this.$echarts.init(echart)
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
          left: '5%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis1,
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
            name: '公里',
            // minInterval: 0.8,
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
            data: series1
          }
        ]
      })
    },
    drawEchart2 (data) {
      var margin = 10
      var echart = document.getElementById('echart2')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'
      var xAxis1 = []
      var series1 = []
      data.forEach(function (item, index) {
        xAxis1.push(item.mouth)
        series1.push(item.duration)
      })
      var echart1 = this.$echarts.init(echart)
      echart1.setOption({
        // title: {
        //   text: '时段电价'
        // },
        color: ['#3486fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '10%',
          left: '5%',
          right: '5%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: xAxis1,
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
            name: '小时',
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
            type: 'line',
            barWidth: '60%',
            data: series1
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
  #echart1,#echart2,#echart3,#echart4 {
    width: 100%;
    height: 280px;
  }
  .con-liu {
    height: 100%;
  }
  .count-info-con {
    width: 100%;
    height: calc(100% - 50px);
    top: 1rem;
    background-color: #ffffff;
    overflow-y: auto;
    position: absolute;
  }
  .con-liu .count-info-con .top .value span{
    display: block;
  }
</style>
