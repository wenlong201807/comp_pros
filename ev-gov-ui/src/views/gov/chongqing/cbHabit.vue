<template>
  <div>
    <a-card style="width: 100%; margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>全天各时段行驶车辆统计
        </span>

      </template>
      <template slot="extra">
        <div>
          <a-radio-group :options="plainOptions" v-model="value1" :defaultValue="value1" slot="extra"
                         @change="onChangeRadio" />
          <a-date-picker v-if="value1==='日'" :defaultValue="dayData" slot="extra" @change="onChangeDay" />
          <a-month-picker v-if="value1==='月'" :defaultValue="monthData" slot="extra" @change="onChangeMonth" />
          <!-- <a-select v-if="value1==='年'" :defaultValue="nowYear"
                    style="width: 120px;display:inline-block;margin-top:4px;" @change="onChange">
            <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>

          </a-select> -->
          <a-date-picker v-if="value1==='年'" mode="year" :defaultValue="yearValue" format="YYYY" :value="yearValue"
                         :allowClear="false" :open="isopen" @openChange="handleOpenChange" @panelChange="onChange" />

        </div>
      </template>

      <div id="echarts-run" style="height:350px;"></div>
    </a-card>
    <a-card style="width: 100%; margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>一周每日驾驶次数统计
        </span>
      </template>
      <template slot="extra">
        <!-- <a-select :defaultValue="nowYear" style="width: 120px;display:inline-block;margin-top:4px;" @change="onChange">
          <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select> -->
        <a-date-picker mode="year" :defaultValue="yearValue1" format="YYYY" :value="yearValue1" :allowClear="false"
                       :open="isopen1" @openChange="handleOpenChange1" @panelChange="onChange1" />

      </template>
      <div id="echarts-charge" style="height:350px;"></div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      nowDay: null,
      nowMonth: null,
      nowYearData: null,
      dateFormat1: 'YYYY-MM-DD',
      dateFormat2: 'YYYY-MM',
      dayData: null,
      monthData: null,
      yearValue: null,
      yearValue1: null,

      isopen: false,
      isopen1: false,
      colors: [
        '#ff7f50',
        '#87cefa',
        '#da70d6',
        '#32cd32',
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
      mileageDate: null,
      timeDate: null,
      runChart: null,
      timeChart: null,
      userInfo: null,
      plainOptions: ['日', '月', '年'],
      value1: '日',
      startTime: '',
      startTime1: '',
      yearList: [],
      nowYear: ''
    }
  },
  created () {
    this.getYear()
    this.yearValue = moment().year(moment().get('year'))
    this.yearValue1 = moment().year(moment().get('year'))

    const dayData1 = moment(new Date())
      .add('year', 0)
      .format('YYYY-MM-DD')

    const monthData1 = moment()
      .locale('zh-cn')
      .format('YYYY-MM')
    const yearData1 = moment()
      .locale('zh-cn')
      .format('YYYY')

    this.dayData = moment(dayData1)
    this.monthData = moment(monthData1)
    this.startTime = dayData1
    this.startTime1 = yearData1
    this.nowDay = dayData1
    this.nowMonth = monthData1
    this.nowYearData = yearData1
  },
  mounted () {
    // var that = this
    this.initData()

    window.onresize = () => {
      this.runChart.resize()
      this.timeChart.resize()
    }
  },
  methods: {
    onChangeRadio (e) {
      if (this.value1 === '日') {
        this.startTime = this.nowDay
        this.initData()
      } else if (this.value1 === '月') {
        this.startTime = this.nowMonth
        this.initData()
      } else if (this.value1 === '年') {
        this.startTime = this.nowYearData
        this.initData()
      }
    },
    onChangeDay (value) {
      this.startTime = value.format('YYYY-MM-DD')
      this.nowDay = value.format('YYYY-MM-DD')

      this.initData()
    },
    onChangeMonth (value) {
      this.startTime = value.format('YYYY-MM')
      this.nowMonth = value.format('YYYY-MM')

      this.initData()
    },
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
    onChange (val) {
      this.yearValue = val

      this.startTime = val.format('YYYY')
      this.nowYearData = val.format('YYYY')
      this.isopen = false
      this.initData()
    },
    onChange1 (val) {
      this.yearValue1 = val
      this.startTime1 = val.format('YYYY')
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
    // onChange (value) {
    //   console.log(value)
    //   this.startTime = value
    //   this.initData()
    // },
    // onChange1 (value) {
    //   console.log(value)
    //   this.startTime1 = value
    //   this.initData()
    // },
    initData () {
      var that = this
      const data = {
        startTime: that.startTime,
        areaCode: that.$ls.get('areaCode')
      }
      const data1 = {
        startTime: that.startTime1,
        areaCode: that.$ls.get('areaCode')
      }
      this.$store.dispatch('CountByDay', data).then(res => {
        this.loadMileage(res)
      })
      this.$store.dispatch('CountByWeek', data1).then(res => {
        this.loadTime(res)
      })
    },
    // 全天各时段行驶车辆统计eharts
    loadMileage (data) {
      var that = this
      var colors = this.colors

      // 伪造的数据
      // var data = {
      //   name: [
      //     '00:00-03:00',
      //     '03:00-06:00',
      //     '06:00-09:00',
      //     '09:00-12:00',
      //     '12:00-14:00',
      //     '14:00-17:00',
      //     '17:00-20:00',
      //     '20:00-00:00'
      //   ],
      //   value: [
      //     '2212',
      //     '1171',
      //     '5242',
      //     '11903',
      //     '7441',
      //     '13830',
      //     '11563',
      //     '8489'
      //   ]
      // }
      if (!data) {
        var key = []
        var value = []
      } else {
        key = data.name
        value = data.value
      }

      var total = 0
      for (var i = 0; i < value.length; i++) {
        total = total + parseInt(value[i])
      }
      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          formatter: function (a) {
            var relVal = ''
            if (a[0].name) {
              relVal = a[0].name + '<br/>'
              relVal += '车辆次数：' + parseInt(a[0].value) + '次<br/>'
              return relVal
            } else {
              relVal = '暂无数据'
              return relVal
            }
          }
        },
        grid: {
          right: '5%',
          left: '7%',
          top: '15%',
          bottom: '15%'
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
              readOnly: false
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: true
            }
          },
          right: 20
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: key
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '车次/单日行驶里程',
            position: 'left',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '车次/单日行驶里程',
            type: 'bar',
            data: value,
            label: {
              normal: {
                show: true,
                formatter: function (a) {
                  return ((parseInt(a.data) / total) * 100).toFixed(2) + '%'
                },
                position: 'top'
              }
            },
            itemStyle: {
              normal: {
                color: colors[1]
              }
            }
          }
        ]
      }
      that.runChart = that.$echarts.init(document.getElementById('echarts-run'))
      that.runChart.setOption(option)
    },
    // 一周每日驾驶次数统计
    loadTime (data) {
      var that = this
      var colors = this.colors
      // 伪造的数据
      // var data = {
      //   name: [
      //     '星期一',
      //     '星期二',
      //     '星期三',
      //     '星期四',
      //     '星期五',
      //     '星期六',
      //     '星期日'
      //   ],
      //   value: ['8244', '6953', '17449', '13800', '1972', '11395', '2038']
      // }
      if (!data) {
        var key = []
        var value = []
      } else {
        key = data.name
        value = data.value
      }

      var total = 0
      for (var i = 0; i < value.length; i++) {
        total = total + parseInt(value[i])
      }
      var option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          formatter: function (a) {
            // eslint-disable-next-line semi
            var relVal = ''
            if (a[0].name) {
              relVal = a[0].name + '<br/>'
              // eslint-disable-next-line semi
              relVal += '车辆次数：' + parseInt(a[0].value) + '次<br/>'
              return relVal
            } else {
              // eslint-disable-next-line semi
              relVal = '暂无数据'
              return relVal
            }
          }
        },
        grid: {
          right: '5%',
          left: '7%',
          top: '15%',
          bottom: '15%'
        },
        toolbox: {
          feature: {
            dataView: {
              show: false,
              readOnly: false
            },
            restore: {
              show: false
            },
            saveAsImage: {
              show: true
            }
          },
          right: 20
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: key
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '车次/分钟',
            position: 'left',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '车次/分钟',
            type: 'bar',
            label: {
              normal: {
                show: true,
                formatter: function (a) {
                  return ((parseInt(a.data) / total) * 100).toFixed(2) + '%'
                },
                position: 'top'
              }
            },
            data: value
          }
        ]
      }
      that.timeChart = that.$echarts.init(
        document.getElementById('echarts-charge')
      )
      that.timeChart.setOption(option)
    }
  }
}
</script>

<style lang="less" scoped>
.titleFlag {
  top: 24px;
}
</style>
