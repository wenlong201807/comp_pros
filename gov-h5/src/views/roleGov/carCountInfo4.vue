<template>
  <div class="con-liu" style="background: #f4f4f4;">
    <div class="topBack">
      <div class="navTitle">习惯分析</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <van-pull-refresh v-model="topLoadingShow" @refresh="refresh" class="count-info-con">
      <div class="">
      <van-row class="chart">
        <h4 class="common-title1"> <span>2019全天各时段行驶车辆统计</span></h4>
        <div id="echart1">
        </div>
      </van-row>
      <van-row class="chart">
        <h4 class="common-title1"> <span>2019每周驾驶次数统计</span></h4>
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
  name: 'CarCountInfo4',
  data () {
    return {
      topLoadingShow: false,
      loadingShow: false,
      topInfo: {}
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    showErr () {
      this.$toast('加载错误')
    },
    refresh () {
      this.topLoadingShow = true
      this.carDayCountByDayCet()
      this.carDayCountByWeekGet()
    },
    init () {
      this.loadingShow = true
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.areaCode = this.userInfo.areaCode
      this.carDayCountByDayCet()
      this.carDayCountByWeekGet()
    },
    carDayCountByDayCet () {
      const params = {
        basic: {
          startTime: 2019,
          areaCode: this.areaCode
        }
      }
      this.$store.dispatch('carDayCountByDayCet', params).then((res) => {
        if (res) {
          console.log(res)
          this.drawEchart1(res)
          this.loadingShow = false
        }
      }).catch(() => {
        this.loadingShow = false
        this.showErr()
      })
    },
    carDayCountByWeekGet () {
      const params = {
        basic: {
          startTime: 2019,
          areaCode: this.areaCode
        }
      }
      this.$store.dispatch('carDayCountByWeekGet', params).then((res) => {
        if (res) {
          console.log(res)
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
      var xAxis1 = data.name
      var series1 = data.value
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
            name: '车次/单日行驶里程',
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
            name: '车辆次数',
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
      var xAxis1 = data.name
      var series1 = data.value
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
            name: '车次/分钟',
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
            name: '车辆次数',
            type: 'bar',
            barWidth: 10,
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
    height: calc(100% - 44px);
    top: 44px;
    /*background-color: #ffffff;*/
    overflow-y: auto;
    position: absolute;
  }
  .count-info-con .chart{
    background-color: #ffffff;
  }
  .con-liu .common-title1{
    margin: 10px 0;
    padding: 10px 0;
  }
</style>
