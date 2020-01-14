/* eslint-disable no-array-constructor */
<template>
  <div>
    <a-card>
      <template slot="title">
        <span>
          <div class="titleFlag"
               style="top:20px;"></div><span style="padding-left:22px;padding-bottom:10px;">车辆充电情况分析</span>
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
                          :format="dateFormatMonth"
                          :allowClear="false"
                          @panelChange="handlePanelChange1" />
          <a-range-picker v-else-if="isDay === 0"
                          :mode="['year', 'year']"
                          :value="defaultYearValue"
                          :format="dateFormatYear"
                          :allowClear="false"
                          @panelChange="handlePanelChange2" />
        </div>

      </template>

      <div id="echart"
           style="height:350px;"></div>

    </a-card>
    <a-card style="margin-bottom:24px;margin-top:10px;width:100%">
      <template slot="title">
        <span>
          <div class="titleFlag"></div><span style="padding-left:22px;padding-bottom:10px;">车辆充电次数分析</span>
        </span>
      </template>

      <div id="echart1"
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
      chart1: null,
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
      this.chart.resize()
      this.chart1.resize()
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
      this.$store.dispatch('ChargeDetail', params).then(res => {
        that.loadData(res, 'echart')
        that.loadData(res, 'echart1')
      }).catch(error => {
        console.log(error)
      })
      this.echart = this.$echarts.init(document.getElementById('echart'))
      this.echart1 = this.$echarts.init(document.getElementById('echart1'))
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
    loadData (result, my) {
      // 图标颜色
      var ech = this[my]
      var option = {}
      var mileage = result.chargeConsume
      var charge = result.charge
      var time = result.value
      var key = result.name
      // 如果返回的数据是null ，需要给出默认值，否则 echart会抛出异常
      if (mileage == null) {
        // eslint-disable-next-line no-array-constructor
        mileage = new Array()
      }
      if (charge == null) {
        // eslint-disable-next-line no-array-constructor
        charge = new Array()
      }
      if (key == null) {
        // eslint-disable-next-line no-array-constructor
        key = new Array()
      }
      if (my === 'echart') {
        option = {
          color: colors,
          tooltip: {
            trigger: 'axis',
            formatter: function (a) {
              // eslint-disable-next-line semi
              var relVal = ''
              if (a[0].name) {
                relVal = a[0].name + '充电分析<br/>'
                relVal += '电能消耗：' + a[0].value + '度<br/>'
                relVal += '充电时间：' + a[1].value + '小时<br/>'
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
            data: ['充电量', '充电时长'],
            bottom: '10'
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
              name: '充电时长',
              position: 'right',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '充电量',
              position: 'left',
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          series: [
            {
              name: '充电量',
              type: 'bar',
              data: mileage
            },
            {
              name: '充电时长',
              type: 'bar',
              yAxisIndex: 1,
              data: charge
            }
          ]
        }
      } else {
        option = {
          color: colors,
          tooltip: {
            trigger: 'axis',
            formatter: function (a) {
              var relVal = ''
              if (a[0].name) {
                relVal = a[0].name + '充电次数分析<br/>'
                relVal += '充电次数：' + a[0].value + '次<br/>'
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
            data: ['充电次数'],
            bottom: '10'
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
              name: '充电次数',
              position: 'left',
              axisLabel: {
                formatter: '{value} 次'
              }
            }
          ],
          series: [
            {
              name: '充电次数',
              type: 'line',
              data: time
            }
          ]
        }
      }

      ech.setOption(option)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
