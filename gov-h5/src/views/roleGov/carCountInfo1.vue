<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="navTitle">发展趋势</div>
      <div class="backButton"
           @click="goBack"></div>
    </div>
    <div class="count-info-con">
      <div class="top">
        <h4>
          <img src="../../assets/roleGov/icon1.png"
               alt=""> <span>重庆市电动汽车发展趋势</span>
        </h4>
        <van-row style="text-align: center">
          <van-col span="24">
            <p class="value">
              车辆总数
              <span>{{ vNum }}</span>
            </p>
          </van-col>
        </van-row>
        <p class="time">数据更新时间：2019年12月31日</p>
      </div>
      <van-row class="chart">
        <h4 class="common-title1"> <span>车辆年增长情况</span></h4>
        <div id="echart1">
        </div>
      </van-row>
      <van-row class="chart">
        <h4 class="common-title1"> <span>车辆年增长率</span></h4>
        <div id="echart2">
        </div>
      </van-row>
    </div>
    <loadingStatus content="加载中..."
                   :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'CarCountInfo1',
  data () {
    return {
      loadingShow: false,
      topInfo: {},
      startDate: 2013,
      endDate: 2019,
      vNum: 0
    }
  },
  mounted () {
    var date = new Date()
    this.endDate = date.getFullYear()
    this.init()
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    init () {
      this.loadingShow = true
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.areaCode = this.userInfo.areaCode
      this.initRunStatus()
      this.runTotalGroupByMouth()
    },
    initRunStatus () {
      const params = [
        {
          field: 'areaCode',
          value: this.areaCode
        }
      ]
      this.$store.dispatch('RunStatus', params).then(res => {
        this.vNum = res.activatedNum + res.unActivatedNum
      })
    },
    showErr () {
      this.$toast('加载错误')
    },
    runTotalGroupByMouth () {
      const params = {
        areaCode: this.areaCode,
        endDate: this.endDate,
        startDate: this.startDate
      }
      // const params = { 'field': 'areaCode', areaCode: this.areaCode }
      this.$store.dispatch('ListIncrementYear', params).then(res => {
        if (res) {
          this.drawEchart1(res)
          this.drawEchart2(res)
          this.loadingShow = false
        }
      }).catch(() => {
        this.loadingShow = false
        this.showErr()
      })
    },
    drawEchart1 (data) {
      var margin = 10
      var echart = document.getElementById('echart1')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'
      // var xAxis1 = []
      // var series1 = []
      // data.forEach(function (item, index) {
      //   xAxis1.push(item.mouth)
      //   series1.push(item.mileage)
      // })
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
            data: data.name,
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
            name: '辆',
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
            data: data.total
          }
        ]
      })
    },
    drawEchart2 (data) {
      var margin = 10
      var echart = document.getElementById('echart2')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'
      // var xAxis1 = []
      // var series1 = []
      // data.forEach(function (item, index) {
      //   xAxis1.push(item.mouth)
      //   series1.push(item.duration)
      // })
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
            data: data.name,
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
            name: '%',
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
            data: data.rate
          }
        ]
      })
    }
  }
}
</script>

<style scoped>
.time {
  padding-left: 24px;
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
  width: 100%;
  height: calc(100% - 50px);
  top: 1rem;
  background-color: #ffffff;
  overflow-y: auto;
  position: absolute;
}
.con-liu .count-info-con .top .value span {
  display: block;
}
.con-liu .count-info-con .top .value span {
  display: block;
  margin: 0;
}
</style>
