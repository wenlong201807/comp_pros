<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="navTitle">运行情况</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="count-info-con">
      <scroller :on-refresh="refresh" ref="myscroller" style="width: 100%;height: 100%;">
        <div class="top">
          <h4><img src="../../assets/roleGov/icon1.png" alt=""> <span>重庆市电动汽车实时占用功率</span></h4>
          <van-row>
            <p class="value"><span >{{ nowPower }}</span>千瓦</p>
          </van-row>
          <p class="time">数据更新时间：{{ timeCurrent }}</p>
        </div>
        <van-row class="chart">
          <h4 class="common-title1"> <span>实时充电功率变化</span></h4>
          <div id="echart2">
          </div>
        </van-row>
      </scroller>
    </div>
    <loadingStatus :content="content" :loadingStatus="showLoading"></loadingStatus>
  </div>
</template>
<script>
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { getStore } from 'src/utils/store'
export default {
  name: 'StakeCountInfo3',
  data () {
    return {
      active: 0,
      echart1: null,
      echart2: null,
      startTime: '',
      endTime: '',
      userSpecific: '',
      eleAll: '',
      eleAllFor: '',
      times: '',
      name: '',
      content: '数据加载中...',
      showLoading: false,
      totalTimes: '-',
      ele: '-',
      timeCurrent: this.$moment().format('YYYY年MM月DD日'),
      nowPower: ''
    }
  },
  created () {
  },
  activated () {
    this.userSpecific = getStore('userSpecific')
  },
  mounted () {
    this.userSpecific = getStore('userSpecific')
    var that = this
    this.ws = new ReconnectingWebSocket(`ws://47.92.138.8:11007?token=${getStore('Access-Token')}`, null, { reconnectInterval: 10000 })
    this.ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      var value = JSON.parse(data.content)
      that.totalTimes = (parseInt(value.totalTimes) / 10000).toFixed(2)
      that.ele = (parseInt(value.totalEle) / 10000).toFixed(2)
    }
    this.startTime = this.$moment().subtract('days', 6).format('YYYY-MM-DD')
    this.endTime = this.$moment().format('YYYY-MM-DD')
    this.initStakeUsePower()
    this.initData()
  },
  methods: {
    // 下拉刷新
    refresh () {
      var that = this
      const promise = Promise.all([this.initStakeUsePower(), this.initData()])
      promise.then(res => {
        /* 没有数据 */
        that.$refs.myscroller.finishPullToRefresh() /// 刷新完毕关闭刷新的转圈圈
      })
    },
    initStakeUsePower () {
      return new Promise((resolve, reject) => {
        const params = [
          {
            field: 'areaCode',
            value: this.userSpecific.areaCode
          },
          {
            field: 'operatorid',
            value: this.userSpecific.operatorid
          }
        ]
        this.$store.dispatch('StakeUsePower', params).then(res => {
          resolve(res)
          this.nowPower = res[0].value
        })
      })
    },
    initData () {
      var that = this
      return new Promise((resolve, reject) => {
        var params = {
          areaCode: this.userSpecific.areaCode,
          startTime: that.endTime,
          operatorId: this.userSpecific.operatorid
        }
        this.showLoading = true
        this.$store.dispatch('RealPowerHistory', params).then(data => {
          this.showLoading = false
          resolve(data)
          this.name = data.keys
          this.eleAll = data.power
          this.eleAllFor = data.forecastPower
          this.echart2 = this.$echarts.init(document.getElementById('echart2'))
          this.drawEchart2()
          window.onresize = function () {
            that.echart2.resize()
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
    drawEchart2 (name) {
      this.echart2.setOption({
        color: ['#3486fe', '#83D944'],
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
              rotate: 40,
              interval: 30
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
            data: this.eleAll
          },
          {
            // name: '直接访问',
            type: 'line',
            barWidth: '60%',
            data: this.eleAllFor
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
