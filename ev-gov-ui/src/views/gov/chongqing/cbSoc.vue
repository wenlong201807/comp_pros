<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>行驶开始数量
        </span>
      </template>
      <template slot="extra">
        <a-date-picker mode="year" :defaultValue="yearValue" format="YYYY" :value="yearValue" :allowClear="false"
                       :open="isopen" @openChange="handleOpenChange" @panelChange="onChange" />
      </template>
      <a-row>
        <a-col id="start" style="width: 100%;height:350px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag" style="top:20px"></div>行驶结束数量
        </span>
      </template>
      <a-row>
        <div id="end" style="width: 100%;height:350px;"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      yearValue: null,
      isopen: false,
      flag: true,
      startChart: null,
      endChart: null,
      echart: {
        startData: [],
        endData: []
      }
    }
  },
  created () {
    this.yearValue = moment().year(moment().get('year'))
  },
  mounted () {
    this.initData()
    window.onresize = () => {
      this.startChart.resize()
      this.endChart.resize()
    }
  },
  methods: {
    handleOpenChange (status) {
      if (status) {
        this.isopen = true
      } else {
        this.isopen = false
      }
    },
    // 初始化数据
    initData () {
      var that = this
      var params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        },
        {
          field: 'currtime',
          value: that.yearValue.format('YYYY')
        }
      ]
      this.$store
        .dispatch('SocAnalyze', params)
        .then(res => {
          this.echart.startData = res
          this.echart.endData = res
          this.initEnd()
          this.initStart()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 改变事件
    onChange (val) {
      this.yearValue = val
      this.isopen = false
      this.initData()
    },
    // 初始化充电设施利用率Echart
    initEnd () {
      // 基于准备好的dom，初始化echarts实例
      this.endChart = this.$echarts.init(document.getElementById('end'))
      let total = 0
      this.echart.endData.endNum.forEach(item => {
        total = total + parseInt(item)
      })
      // 绘制图表
      this.endChart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: this.echart.endData.name
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        toolbox: {
          right: 24,
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {
          name: '辆'
        },
        series: [
          {
            name: '行驶结束数量',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.endData.endNum,
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
      })
    },
    // 初始化充电设施利用率趋势Echart
    initStart () {
      // 基于准备好的dom，初始化echarts实例
      this.startChart = this.$echarts.init(document.getElementById('start'))
      let total = 0
      this.echart.startData.startNum.forEach(item => {
        total = total + parseInt(item)
      })
      // 绘制图表
      this.startChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.echart.startData.name
        },
        toolbox: {
          right: 24,
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {
          name: '辆'
        },
        series: [
          {
            name: '行驶开始数量',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.startData.startNum,
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
      })
    }
  }
}
</script>

<style scoped>
.statisticData {
  text-align: center;
  margin-bottom: 24px;
}
.titleFlag {
  top: 24px;
}
</style>
