<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>单次行驶里程
        </span>
      </template>
      <template slot="extra">
        <a-date-picker mode="year" :defaultValue="yearValue" format="YYYY" :value="yearValue" :allowClear="false"
                       :open="isopen" @openChange="handleOpenChange" @panelChange="onChange" />
      </template>
      <a-row>
        <a-col id="onceMileage" style="width: 100%;height:350px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>单次行驶时长
        </span>
      </template>
      <template slot="extra">
        <a-date-picker mode="year" :defaultValue="yearValue1" format="YYYY" :value="yearValue1" :allowClear="false"
                       :open="isopen1" @openChange="handleOpenChange1" @panelChange="onChangeTime" />
      </template>
      <a-row>
        <div id="onceTime" style="width: 100%;height:350px;"></div>
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
      yearValue1: null,
      flag: true,
      onceMileageChart: null,
      onceTimeChart: null,
      echart: {
        onceMileageData: [],
        onceTimeData: []
      },
      isopen: false,
      isopen1: false
    }
  },
  created () {
    this.yearValue1 = moment().year(moment().get('year'))
    this.yearValue = moment().year(moment().get('year'))
  },
  mounted () {
    this.initMileageData()
    this.initTimeData()
    window.onresize = () => {
      this.onceMileageChart.resize()
      this.onceTimeChart.resize()
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
    handleOpenChange1 (status) {
      if (status) {
        this.isopen1 = true
      } else {
        this.isopen1 = false
      }
    },
    // 初始化数据
    initMileageData () {
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
        .dispatch('DriveMileage', params)
        .then(res => {
          if (!res) {
            this.echart.onceMileageData = {
              value: [],
              name: []
            }
          } else {
            this.echart.onceMileageData = res
          }
          this.initOnceMileage()
        })
        .catch(error => {
          console.log(error)
        })
    },
    initTimeData () {
      var that = this
      var params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        },
        {
          field: 'currtime',
          value: that.yearValue1.format('YYYY')
        }
      ]
      this.$store
        .dispatch('DriveTime', params)
        .then(res => {
          if (!res) {
            this.echart.onceTimeData = {
              value: [],
              name: []
            }
          } else {
            this.echart.onceTimeData = res
          }
          this.initOnceTime()
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 改变事件
    onChange (val) {
      this.yearValue = val
      this.isopen = false
      this.initMileageData()
    },
    onChangeTime (val) {
      this.yearValue1 = val
      this.isopen1 = false
      this.initTimeData()
    },
    // 初始化充电设施利用率Echart
    initOnceTime () {
      // 基于准备好的dom，初始化echarts实例
      this.onceTimeChart = this.$echarts.init(
        document.getElementById('onceTime')
      )
      let total = 0
      this.echart.onceTimeData.value.forEach(item => {
        total = total + parseInt(item)
      })
      // 绘制图表
      this.onceTimeChart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: this.echart.onceTimeData.name
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
          name: '车次/分钟'
        },
        series: [
          {
            name: '车辆次数',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.onceTimeData.value,
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
    initOnceMileage () {
      // 基于准备好的dom，初始化echarts实例
      this.onceMileageChart = this.$echarts.init(
        document.getElementById('onceMileage')
      )
      // 绘制图表
      let total = 0
      this.echart.onceMileageData.value.forEach(item => {
        total = total + parseInt(item)
      })
      this.onceMileageChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.echart.onceMileageData.name
        },
        toolbox: {
          right: 24,
          feature: {
            saveAsImage: {}
          }
        },
        yAxis: {
          name: '车次/单日行驶里程'
        },
        series: [
          {
            name: '车辆次数',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.onceMileageData.value,
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
