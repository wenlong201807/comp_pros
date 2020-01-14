<template>
  <div class="divMain">
    <div class="registerTop">
      <van-row class="registerTopRow">
        <van-col span="2">
          <span class="icon" @click="goBack"></span>
        </van-col>
        <span>设施分布</span>
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
      const stakeParams = {
        areaCode: that.user.areaCode
      }
      that.$store.dispatch('StakeUseType', stakeParams).then(data => {
        that.echart1 = that.$echarts.init(
          document.getElementById('echart1')
        )
        that.echart1.setOption({
          title: {
            text: '充电桩用途',
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
            orient: 'vertical',
            left: 'left',
            y: '10%',
            data: data.keys
            // data: ['个人', '专用', '公用']
          },
          color: that.colors,
          series: [{
            name: '充电桩用途',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: data.values,
            // data: [{ name: '个人', value: 782 }, { name: '专用', value: 3788 }, { name: '公用', value: 9553 }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        })
      }).catch(error => console.log(error))
    },
    initChart2 () {
      var that = this
      const stakeParams = {
        areaCode: that.user.areaCode
      }
      that.$store.dispatch('StakeCategory', stakeParams).then(data => {
        that.echart2 = that.$echarts.init(
          document.getElementById('echart2')
        )
        var key = data.name
        var value = data.value
        // var key = ['交流设备', '直流设备', '其他']
        // var value = ['7351', '6770', '2']
        var total = value.reduce(function (a, b) {
          return a - 0 + (b - 0)
        })
        that.echart2.setOption({
          color: ['#ff7f50'],
          title: {
            text: '充电桩分类',
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
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: [{
            type: 'category',
            data: key,
            axisLabel: {
              interval: 0,
              rotate: 0
            }
          }],
          yAxis: [{
            type: 'value'
          }],
          series: [{
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
          }]
        })
      }).catch(error => console.log(error))
    },
    initChart3 () {
      var that = this
      const stakeParams = {
        areaCode: that.user.areaCode,
        operatorId: ''
      }
      that.$store.dispatch('StationBuildnNumber', stakeParams).then(data => {
        console.log(data)
        that.echart3 = that.$echarts.init(
          document.getElementById('echart3')
        )
        that.echart3.setOption({
          title: {
            text: '充电站分布',
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
            // orient: 'vertical',
            // bottom: 'bottom',
            // y: '10%',
            x: 'left',
            y: 'bottom',
            data: data.keys
            // data: ['公共机构', '企事业单位', '城际高速服务区', '居民区', '大型建筑配建停车场', '其他']
          },
          color: that.colors,
          series: [{
            name: '充电站分布',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: data.value,
            // data: [{ name: '公共机构', value: 4676 }, { name: '企事业单位', value: 2909 }, { name: '城际高速服务区', value: 2342 }, { name: '居民区', value: 1724 }, { name: '大型建筑配建停车场', value: 1370 }, { name: '其他', value: 1102 }],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        })
      }).catch(error => console.log(error))
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
