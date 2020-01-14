<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span>
          <div class="titleFlag"></div><span style="padding-left:22px;padding-bottom:10px;">车辆行驶情况</span>
        </span>
        <div style="float:right;">
          <a-radio-group :options="plainOptions"
                         :defaultValue="value1"
                         @change="onChangeRadio"
                         slot="extra" />

          <a-range-picker v-if="isDay === 2"
                          :value="defaultValue"
                          :format="dateFormat"
                          :allowClear="false"
                          @change="onChange" />
          <a-range-picker v-else-if="isDay === 1"
                          :mode="['month', 'month']"
                          :value="defaultMonthValue"
                          :allowClear="false"
                          :format="dateFormatMonth"
                          @panelChange="handlePanelChange1" />
          <a-range-picker v-else-if="isDay === 0"
                          :mode="['year', 'year']"
                          :value="defaultYearValue"
                          :allowClear="false"
                          :format="dateFormatYear"
                          @panelChange="handlePanelChange2" />

        </div>

      </template>

      <div id="echart"
           style="height:350px;"></div>

    </a-card>

  </div>
</template>

<script>
import moment from 'moment'
var colors = [
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
]
export default {
  data () {
    return {
      plainOptions: [
        { label: '日', value: 2 },
        { label: '月', value: 1 },
        { label: '年', value: 0 }
      ],
      value1: 2,
      level: 2,
      chart: null,
      starttime: '',
      endtime: '',
      defaultValue: [],
      defaultMonthValue: [],
      defaultYearValue: [],
      dateFormat: 'YYYY-MM-DD',
      dateFormatMonth: 'YYYY-MM',
      dateFormatYear: 'YYYY',
      isDay: 2
    }
  },
  created () {
    this.starttime = moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD')
    this.endtime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [moment(moment(new Date()).subtract(30, 'days'), this.dateFormat), moment(new Date(), this.dateFormat)]
    this.defaultMonthValue = [moment(moment(new Date()).subtract(30, 'days'), this.dateFormatMonth), moment(new Date(), this.dateFormatMonth)]
    this.defaultYearValue = [moment(moment(new Date()).subtract(365, 'days'), this.dateFormatYear), moment(new Date(), this.dateFormatYear)]
  },
  mounted () {
    this.initData()
    window.onresize = () => {
      this.echart.resize()
    }
  },
  methods: {
    handlePanelChange1 (value, mode) {
      this.defaultMonthValue = value
      this.starttime = moment(value[0]).format('YYYY-MM')
      this.endtime = moment(value[1]).format('YYYY-MM')
      this.initData()
    },
    handlePanelChange2 (value, mode) {
      this.defaultYearValue = value
      this.starttime = moment(value[0]).format('YYYY')
      this.endtime = moment(value[1]).format('YYYY')
      this.initData()
    },
    initData () {
      var that = this
      var params = {
        areaCode: this.$ls.get('areaCode'),
        startDate: that.starttime,
        endDate: that.endtime,
        level: that.level
      }
      this.$store.dispatch('DriveDetail', params).then(res => {
        that.loadData(res)
      }).catch(error => {
        console.log(error)
      })
      this.echart = this.$echarts.init(document.getElementById('echart'))
    },
    onChangeRadio (e) {
      if (e.target.value === 2) {
        this.starttime = moment(new Date()).subtract(30, 'days').format('YYYY-MM-DD')
        this.endtime = moment(new Date()).format('YYYY-MM-DD')
        this.isDay = 2
      } else if (e.target.value === 1) {
        this.starttime = moment(new Date()).subtract(30, 'days').format('YYYY-MM')
        this.endtime = moment(new Date()).format('YYYY-MM')
        this.isDay = 1
      } else {
        this.isDay = 0
      }
      this.level = e.target.value
      this.initData()
    },
    onChange (date, dateString) {
      this.starttime = dateString[0]
      this.endtime = dateString[1]
      this.initData()
    },
    loadData (result) {
      // 图标颜色
      var name = result.name
      var value = result.value
      var travel = result.travel
      var option = {}
      // 如果返回的数据是null ，需要给出默认值，否则 echart会抛出异常
      option = {
        color: colors,
        tooltip: {
          trigger: 'axis',
          formatter: function (a) {
            var relVal = ''
            if (a[0].name) {
              relVal = '行驶分析<br/>'
              relVal += '行驶里程：' + a[0].value + '千米<br/>'
              relVal += '充电时长：' + a[1].value + '小时<br/>'
              return relVal
            } else {
              relVal = '暂无数据'
              return relVal
            }
          }
        },
        grid: {
          right: '7%',
          left: '7%',
          top: '15%',
          bottom: '15%'
        },
        toolbox: {
          right: 20,
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
          }
        },
        legend: {
          data: ['行驶里程', '充电时长'],
          bottom: '10'
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: name
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '行驶里程',
            position: 'right',
            axisLabel: {
              formatter: '{value}'
            }
          },
          {
            type: 'value',
            name: '充电时长',
            position: 'left',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '行驶里程',
            type: 'bar',
            data: travel
          },
          {
            name: '充电时长',
            type: 'bar',
            yAxisIndex: 1,
            data: value
          }
        ]
      }
      this.echart.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
