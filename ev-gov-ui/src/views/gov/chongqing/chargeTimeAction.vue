<template>
  <div>
    <a-card style="width: 100%; margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电时间段分析
        </span>
      </template>
      <a-range-picker @change="onChange" :defaultValue="defaultValue" slot="extra" :allowClear="false"
                      :format="dateFormat" />
      <div id="30dayChargeTime" style="height:350px;"></div>
    </a-card>
    <a-card style="width: 100%; margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag" style="top:20px"></div>时间段统计分析查询
        </span>
      </template>
      <div style="height:350px; position:absolute; right: 20px; height: 30px;">
        <span style="margin-right:20px;">{{ areaName }}</span>
        <a-button type="primary" @click="showModal" style="margin-right:20px;">点击选择</a-button>
        <a-modal title="请选择需要查询的数据" v-model="visible" @ok="handleOk">
          <div style="height: 400px;overflow-y: scroll;">
            <a-tree :treeData="treeData" @select="this.onSelect" />
          </div>
        </a-modal>
        <a-range-picker @change="onChangeTime" :defaultValue="defaultValue" :format="dateFormat" :allowClear="false"
                        style="margin-right:20px;" />
        <a-button type="primary" @click="searchZtree">查询</a-button>
      </div>
      <div id="chargeTimeAction" style="height:350px; margin-top:30px"></div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      sendStartDate: '',
      sendEndDate: '',
      ChargeTimeChart: '',
      ChartTime: '',
      starttime: '',
      endtime: '',
      ztreeStarttime: '',
      ztreeEndtime: '',
      selectType: '',
      dataId: '',
      // 弹出框显示隐藏
      visible: false,
      defaultValue: [],
      dateFormat: 'YYYY-MM-DD',
      treeData: [],
      areaName: '地区：重庆市'
    }
  },
  created () {
    this.starttime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.endtime = moment(new Date()).format('YYYY-MM-DD')
    this.ztreeStarttime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.ztreeEndtime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(30, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
    this.selectType = 2
    var that = this
    this.dataId = that.$ls.get('areaCode')
  },
  mounted () {
    var that = this
    // 加载树数据
    const treeParams = {
      areaCode: that.$ls.get('areaCode')
    }
    this.$store.dispatch('QueryAreaStationStakeTree', treeParams).then(res => {
      this.treeData = res
    })
    this.setChargeTime30DayEcharts()
    this.zTreeCheck()
    window.onresize = () => {
      this.ChargeTimeChart.resize()
      this.ChartTime.resize()
    }
  },
  methods: {
    moment,
    onSelect (selectedKeys, e) {
      var that = this
      that.selectType = e.node.dataRef.selectType
      that.dataId = e.node.eventKey
      if (that.selectType == 2) {
        that.areaName = '地区：' + e.node.title
      } else if (that.selectType == 1) {
        that.areaName = '充电站：' + e.node.title
      } else if (that.selectType == 0) {
        that.areaName = '充电桩：' + e.node.title
      }
    },
    // 改变事件
    onChange (date, dateString) {
      this.starttime = dateString[0]
      this.endtime = dateString[1]
      this.setChargeTime30DayEcharts()
    },
    onChangeTime (date, dateString) {
      this.ztreeStarttime = dateString[0]
      this.ztreeEndtime = dateString[1]
    },
    searchZtree () {
      this.zTreeCheck()
    },
    // 打开弹出框
    showModal () {
      this.visible = true
    },
    // 关闭弹出框
    handleOk (e) {
      this.visible = false
    },
    // 充电时间段分析echarts表
    setChargeTime30DayEcharts () {
      var that = this
      that.ChargeTimeChart = that.$echarts.init(
        document.getElementById('30dayChargeTime')
      )
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
      var hours = []
      var params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.starttime,
        endTime: that.endtime
      }
      this.$store
        .dispatch('MonthlyCharge', params)
        .then(data => {
          if (!data) {
            data = {
              value: []
            }
          }
          if (data.value.length === 0) {
            hours = ['无']
          } else {
            hours = [
              '0点',
              '1点',
              '2点',
              '3点',
              '4点',
              '5点',
              '6点',
              '7点',
              '8点',
              '9点',
              '10点',
              '11点',
              '12点',
              '13点',
              '14点',
              '15点',
              '16点',
              '17点',
              '18点',
              '19点',
              '20点',
              '21点',
              '22点',
              '23点',
              '0点'
            ]
          }
          var n = {
            color: colors,
            tooltip: {
              trigger: 'axis',
              formatter: function (params) {
                if (params[0].value == null) {
                  return false
                } else {
                  return (
                    '充电时间段分析<br/>' +
                    params[0].name +
                    '   :' +
                    params[0].value +
                    '千瓦/时'
                  )
                }
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '10%',
              top: '10%'
            },
            toolbox: {
              feature: {
                saveAsImage: {
                  show: true
                }
              },
              right: 20
            },
            xAxis: [
              {
                type: 'category',
                data: hours,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                name: '千瓦·时',
                type: 'value'
              }
            ],
            series: {
              name: '充电时间段分析',
              type: 'line',
              data: data.value
            }
          }
          that.ChargeTimeChart.setOption(n)
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 时间段统计分析查询echarts表
    zTreeCheck () {
      var that = this
      var params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.ztreeStarttime,
        endTime: that.ztreeEndtime,
        dataId: that.dataId,
        selectType: that.selectType
      }
      this.$store
        .dispatch('TimeSlot', params)
        .then(data => {
          that.ChartTime = that.$echarts.init(
            document.getElementById('chargeTimeAction')
          )
          var n = {
            color: ['#3398DB'],
            tooltip: {
              formatter: function (params) {
                return (
                  '充电时间段分析<br/>' +
                  params.name +
                  '   :' +
                  params.value +
                  '千瓦/时'
                )
              }
            },
            grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              top: '10%',
              containLabel: true
            },
            xAxis: [
              {
                type: 'category',
                boundaryGap: false,
                data: data.name,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                name: '千瓦·时',
                type: 'value'
              }
            ],
            series: [
              {
                name: '充电时间段分析',
                type: 'line',
                data: data.value,
                itemStyle: { normal: { areaStyle: { type: 'default' } } }
              }
            ]
          }
          that.ChartTime.setOption(n)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-card-body {
  position: relative;
}
.titleFlag {
  top: 24px;
}
</style>
