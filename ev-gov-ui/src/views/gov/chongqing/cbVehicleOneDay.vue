<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>单日行驶里程
        </span>
      </template>
      <template slot="extra">
        <!-- <a-select :defaultValue="nowYear" style="width: 120px" @change="onChange">
          <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select> -->
        <a-date-picker mode="year" :defaultValue="yearValue" format="YYYY" :value="yearValue" :allowClear="false"
                       :open="isopen" @openChange="handleOpenChange" @panelChange="onChange" />
      </template>
      <a-row>
        <a-col id="oneDayMileage" style="width: 100%;height:350px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>单日行驶时长
        </span>
      </template>
      <template slot="extra">
        <!-- <a-select :defaultValue="nowYear" style="width: 120px" @change="onChange1">
          <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select> -->
        <a-date-picker mode="year" :defaultValue="yearValue1" format="YYYY" :value="yearValue1" :allowClear="false"
                       :open="isopen1" @openChange="handleOpenChange1" @panelChange="onChange1" />
      </template>
      <a-row>
        <div id="oneDayTime" style="width: 100%;height:350px;"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      isopen: false,
      yearValue: null,
      isopen1: false,
      yearValue1: null,
      year: '2019',
      year1: '2019',
      flag: true,
      oneDayMileageChart: null,
      oneDayTimeChart: null,
      echart: {
        oneDayMileageData: [],
        oneDayTimeData: []
      },
      yearList: [],
      nowYear: ''
    }
  },
  created () {
    this.getYear()
    this.yearValue = moment().year(moment().get('year'))
    this.yearValue1 = moment().year(moment().get('year'))
  },
  mounted () {
    this.initData()

    window.onresize = () => {
      this.oneDayMileageChart.resize()
      this.oneDayTimeChart.resize()
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
    onChange (val) {
      this.yearValue = val

      this.year = val.format('YYYY')

      this.isopen = false
      this.initData()
    },
    handleOpenChange1 (status) {
      if (status) {
        this.isopen1 = true
      } else {
        this.isopen1 = false
      }
    },
    onChange1 (val) {
      this.yearValue1 = val

      this.year1 = val.format('YYYY')

      this.isopen1 = false
      this.initData()
    },
    getYear () {
      var nowYear1 = moment()
        .locale('zh-cn')
        .format('YYYY-MM-DD')

      for (let index = 0; index < 10; index++) {
        this.yearList.push(parseInt(nowYear1) - index)
      }
      this.nowYear = this.yearList[0]
    },
    // 初始化数据
    initData () {
      var that = this
      const params = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        },

        {
          field: 'currtime',
          value: this.year
        }
      ]

      // const data = { areaCode: this.$ls.get('areaCode'), time: this.year }
      this.$store.dispatch('DriveDayMileage', params).then(res => {
        // console.log(res)
        // if (res) {
        this.echart.oneDayMileageData = res
        this.initoneDayMileage()
        // } else {
        //   this.$message.warning('没有找到对应的数据')
        //   this.echart.oneDayMileageData = null
        //   this.initoneDayMileage()
        // }
      })

      const params1 = [
        {
          field: 'areaCode',
          value: that.$ls.get('areaCode')
        },

        {
          field: 'currtime',
          value: this.year1
        }
      ]
      this.$store.dispatch('DriveTimeOneDay', params1).then(res => {
        // console.log(res)
        // if (res) {
        this.echart.oneDayTimeData = res
        this.initoneDayTime()
        // } else {
        //   this.$message.warning('没有找到对应的数据！')
        //   this.echart.oneDayTimeData = null
        //   this.initoneDayTime()
        // }
      })
    },
    // 改变事件
    // onChange (val) {
    //   this.year = val
    //   this.initData()
    // },
    // onChange1 (val) {
    //   this.year1 = val
    //   this.initData()
    // },
    // 初始化充电设施利用率Echart
    initoneDayTime () {
      if (!this.echart.oneDayTimeData) {
        this.echart.oneDayTimeData = {
          value: []
        }
      }
      // 基于准备好的dom，初始化echarts实例
      this.oneDayTimeChart = this.$echarts.init(
        document.getElementById('oneDayTime')
      )
      let total = 0
      this.echart.oneDayTimeData.value.forEach(item => {
        total = total + parseInt(item)
      })
      // 绘制图表
      this.oneDayTimeChart.setOption({
        color: ['#3398DB'],
        xAxis: {
          type: 'category',
          data: this.echart.oneDayTimeData.name
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
            name: '单日行驶时长',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.oneDayTimeData.value,
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
    initoneDayMileage () {
      if (!this.echart.oneDayMileageData) {
        this.echart.oneDayMileageData = {
          value: []
        }
      }
      // 基于准备好的dom，初始化echarts实例
      this.oneDayMileageChart = this.$echarts.init(
        document.getElementById('oneDayMileage')
      )
      // 绘制图表
      let total = 0
      this.echart.oneDayMileageData.value.forEach(item => {
        total = total + parseInt(item)
      })
      this.oneDayMileageChart.setOption({
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: this.echart.oneDayMileageData.name
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
            name: '单日行驶时长',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.oneDayMileageData.value,
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
