<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="navTitle">使用情况</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="count-info-con">
      <scroller :on-refresh="refresh" ref="myscroller" style="width: 100%;height: 100%;">
        <van-row class="chart">
          <h4 class="common-title1"> <span>充电设施利用率</span></h4>
          <div id="echart1">
          </div>
        </van-row>
      </scroller>
    </div>
    <loadingStatus :content="content" :loadingStatus="showLoading"></loadingStatus>
  </div>
</template>
<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'StakeCountInfo4',
  data () {
    return {
      active: 0,
      echart1: null,
      startTime: '',
      endTime: '',
      userSpecific: '',
      eleAll: '',
      times: '',
      name: '',
      content: '数据加载中...',
      showLoading: false,
      totalTimes: '-',
      ele: '-',
      timeCurrent: this.$moment().format('YYYY年MM月DD日')
    }
  },
  created () {

  },
  activated () {
    this.userSpecific = getStore('userSpecific')
  },
  mounted () {
    this.userSpecific = getStore('userSpecific')
    this.startTime = this.$moment().subtract('days', 6).format('YYYY-MM-DD')
    this.endTime = this.$moment().format('YYYY-MM-DD')
    this.initData()
  },
  methods: {
    // 下拉刷新
    refresh () {
      var that = this
      this.initData().then(res => {
        /* 没有数据 */
        that.$refs.myscroller.finishPullToRefresh() /// 刷新完毕关闭刷新的转圈圈
      })
    },
    initData () {
      var that = this
      return new Promise((resolve, reject) => {
        var params = {
          areaCode: this.userSpecific.areaCode,
          startTime: that.startTime,
          endTime: that.endTime,
          operatorId: this.userSpecific.operatorid
        }
        this.showLoading = true
        this.$store.dispatch('QueryChargeUtilizationRatio', params).then(data => {
          resolve(data)
          this.showLoading = false
          this.name = data.name
          this.eleAll = data.value
          this.echart1 = this.$echarts.init(document.getElementById('echart1'))
          this.drawEchart1()
          window.onresize = function () {
            that.echart1.resize()
          }
        }).catch(error => {
          console.log(error)
          this.showLoading = false
        })
      })
    },
    goBack () {
      this.$router.back()
    },
    drawEchart1 (name) {
      this.echart1.setOption({
        color: ['#92bdfc'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '2%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: this.name,
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
            name: '万次',
            minInterval: 0.8,
            axisLine: {
              show: false // 不显示坐标轴线
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            // name: '直接访问',
            type: 'bar',
            barWidth: 10,
            data: this.eleAll
          }
        ]
      })
    },
    drawEchart2 (name) {
      this.echart2.setOption({
        color: ['#3486fe'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '2%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              interval: 1
            },
            data: this.name,
            axisLine: {
              show: true, // 不显示坐标轴线
              lineStyle: {
                color: '#ccc'
              }
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
            name: '万次',
            minInterval: 0.8,
            axisLine: {
              show: false // 不显示坐标轴线
            },
            axisTick: {
              show: false
            }
          }
        ],
        series: [
          {
            // name: '直接访问',
            type: 'line',
            barWidth: '60%',
            data: this.times
          }
        ]
      })
    }
  }
}
</script>
<style scoped>
  .chart{
    margin: 10px ;
  }
  #echart1,#echart2,#echart3,#echart4 {
    width: 100%;
    height: 280px;
  }
  .con-liu{
    height: 100% ;
  }
  .count-info-con {
    height: calc(100% - 50px);
    position: absolute;
    overflow-y: auto;
    width: 100%;
  }
  .van-tabs {
    height: 100% ;
  }
  .count-info-con  /deep/ .van-tabs__content{
    width: 100%;
    height: calc(100% - 50px);
    top: 50px;
    background-color: #ffffff;
    overflow-y: auto;
    position: absolute;
  }
  /deep/ .van-tabs__line{
    background-color: #333333;
  }
  .valueText{
    display: block;
    font-size: 14px !important;
  }
</style>
