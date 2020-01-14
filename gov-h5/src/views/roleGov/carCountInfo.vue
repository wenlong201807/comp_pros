<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="navTitle">统计信息</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="count-info-con">
      <van-tabs v-model="active" :lazy-render="false">
        <van-tab title="充电统计">
          <div class="top">
            <h4><img src="../../assets/roleGov/icon1.png" alt=""> <span>重庆市电动汽车总充电次数</span></h4>
            <p class="value"><span >4598.6</span>万次</p>
            <p class="time">数据更新时间：2019年12月31日</p>
          </div>
          <van-row class="chart">
            <h4 class="common-title1"> <span>2019年充电次数统计</span></h4>
            <div id="echart1">
            </div>
          </van-row>
          <van-row class="chart">
            <h4 class="common-title1"> <span>充电次数增长情况</span></h4>
            <div id="echart2">
            </div>
          </van-row>
        </van-tab>
        <van-tab title="行驶统计">
          <div class="top">
            <h4><img src="../../assets/roleGov/icon2.png" alt=""> <span>重庆市电动汽车行驶统计</span></h4>
            <p class="value"><span >4598.6</span>公里<span style="margin-left: 30px">4598.6</span>万小时</p>
            <p class="time">数据更新时间：2019年12月31日</p>
          </div>
          <van-row class="chart">
            <h4 class="common-title1"> <span>2019年行驶按月统计</span></h4>
            <div id="echart3">
            </div>
          </van-row>
          <van-row class="chart">
            <h4 class="common-title1"> <span>行驶年度增长统计</span></h4>
            <div id="echart4">
            </div>
          </van-row>
        </van-tab>
        <van-tab title="节能减排">内容 3</van-tab>
        <van-tab title="行为分析">内容 4</van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
// const echarts = require('echarts/lib/echarts')
export default {
  name: 'CountInfo',
  data () {
    return {
      active: 0,
      echart1: null
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
    this.drawEchart1()
    this.drawEchart2()
    this.drawEchart3()
    this.drawEchart4()
    // window.onresize = function () {
    //   this.echart1.resize()
    // }
  },
  methods: {
    goBack () {
      this.$router.back()
    },
    drawEchart1 (name) {
      var margin = 10
      var echart = document.getElementById('echart1')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

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
          top: '2%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08'],
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
            name: '万次',
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
            data: [300, 400, 140, 240, 300, 400, 140, 240]
          }
        ]
      })
    },
    drawEchart2 (name) {
      var margin = 10
      var echart = document.getElementById('echart2')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

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
          top: '2%',
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['2015', '2016', '2017', '2018', '2019'],
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
            data: [300, 400, 140, 240, 500]
          }
        ]
      })
    },
    drawEchart3 (name) {
      var margin = 10
      var echart = document.getElementById('echart3')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

      var echart1 = this.$echarts.init(echart)
      echart1.setOption({
        // title: {
        //   text: '时段电价'
        // },
        color: ['#92bdfc', '#40ee9b'],
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
        legend: {
          data: ['里程', '时间']
        },
        xAxis: [
          {
            type: 'category',
            data: ['2019-01', '2019-02', '2019-03', '2019-04', '2019-05', '2019-06', '2019-07', '2019-08'],
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
            type: 'value',
            scale: true,
            name: '亿公里',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLine: {
              show: false // 不显示坐标轴线
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            scale: true,
            name: '万小时',
            max: 600,
            min: 0,
            boundaryGap: [0.2, 0.2],
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
            name: '里程',
            type: 'bar',
            barWidth: '10',
            barGap: 0,
            data: [3, 4, 14, 2, 5, 4, 14, 2]
          },
          {
            name: '时间',
            type: 'bar',
            barWidth: '10',
            barGap: 0,
            yAxisIndex: 1,
            data: [10, 200, 140, 340, 80, 140, 66, 33]
          }
        ]
      })
    },
    drawEchart4 (name) {
      var margin = 10
      var echart = document.getElementById('echart4')
      echart.style.width = (window.innerWidth - 2 * margin) + 'px'

      var echart1 = this.$echarts.init(echart)
      echart1.setOption({
        // title: {
        //   text: '时段电价'
        // },
        color: ['#92bdfc', '#40ee9b'],
        // toolbox: {
        //   feature: {
        //     dataView: { show: true, readOnly: false },
        //     magicType: { show: true, type: ['line', 'bar'] },
        //     restore: { show: true },
        //     saveAsImage: { show: true }
        //   }
        // },
        legend: {
          data: ['里程', '时间']
        },
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
            data: ['2015', '2016', '2017', '2018', '2019'],
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
            type: 'value',
            scale: true,
            name: '亿公里',
            max: 30,
            min: 0,
            boundaryGap: [0.2, 0.2],
            axisLine: {
              show: false // 不显示坐标轴线
            },
            axisTick: {
              show: false
            }
          },
          {
            type: 'value',
            scale: true,
            name: '万小时',
            max: 600,
            min: 0,
            boundaryGap: [0.2, 0.2],
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
            name: '里程',
            type: 'line',
            barWidth: '60%',
            data: [30, 40, 14, 24, 50]
          },
          {
            name: '时间',
            type: 'line',
            barWidth: '60%',
            yAxisIndex: 1,
            data: [300, 400, 140, 240, 500]
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
</style>
