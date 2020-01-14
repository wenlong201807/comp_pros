<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>地区日充电量趋势
        </span>
      </template>
      <template slot="extra">
        <a-range-picker @change="onChange" :defaultValue="defaultValue" :format="dateFormat" :allowClear="false"
                        style="margin-right: 24px" />

        <a @click="allSelect">{{ flag?'图例全选':'取消全选' }}</a>
      </template>
      <a-row>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="总充电量 (万千瓦·时)" :value="sumElectricity" />
        </a-col>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="日最大充电量 (千瓦·时)" :value="maxElectricity" />
        </a-col>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="日最小充电量 (千瓦·时)" :value="minElectricity" />
        </a-col>
      </a-row>
      <a-row>
        <a-col id="charge" style="width: 100%;height:460px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>地区日充电次数趋势
        </span>
      </template>
      <a-row>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="总充电量 (万千瓦·时)" :value="sumElectricity" />
        </a-col>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="日最大充电量 (千瓦·时)" :value="maxElectricity" />
        </a-col>
        <a-col :md="8" :sm="24" class="statisticData">
          <a-statistic title="日最小充电量 (千瓦·时)" :value="minElectricity" />
        </a-col>
      </a-row>
      <a-row>
        <div id="chargeTimes" style="width: 100%;height:460px;"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      merchantNo: null,
      areaCode: null,
      sTime: '',
      eTime: '',
      flag: false,
      dateFormat: 'YYYY-MM-DD',
      chargeChart: null,
      chargeTimesChart: null,
      maxChargeTimes: 0,
      maxElectricity: 0,
      maxServiceTime: 0,
      minChargeTimes: 0,
      minElectricity: 0,
      minServiceTime: 0,
      sumChargeTimes: 0,
      sumElectricity: 0,
      sumServiceTime: 0,
      selectArr: null,
      selectArr2: null,
      option1: null,
      option2: null,
      echart: {
        data: [],
        x: [],
        chargeData: [],
        chargeTimes: []
      },
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
      ]
    }
  },
  created () {
    this.merchantNo = this.$ls.get('merchantNo')

    this.areaCode = this.$ls.get('areaCode')
    this.sTime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.eTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(30, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
  },
  mounted () {
    this.initData()
    // this.initCharge()
    // this.initChargeTimes()
    this.initAreaData()
    window.onresize = () => {
      this.chargeChart.resize()
      this.chargeTimesChart.resize()
    }
  },
  methods: {
    moment,
    allSelect () {
      var that = this
      var val
      if (that.flag) {
        that.flag = false
        val = true
      } else {
        that.flag = true
        val = false
      }
      var obj = {}
      var obj2 = {}
      for (var key in that.selectArr) {
        obj[that.selectArr[key]] = val
      }
      that.option1.legend.selected = obj
      that.chargeTimesChart.setOption(that.option1)

      for (var key1 in that.selectArr2) {
        obj2[that.selectArr2[key1]] = val
      }
      that.option2.legend.selected = obj2
      that.chargeChart.setOption(that.option2)
    },
    // 初始化数据
    initData () {
      const params = {
        areaCode: this.areaCode,
        operatorId: this.merchantNo,
        period: '3',
        sTime: this.sTime,
        eTime: this.eTime
      }
      this.$store.dispatch('StakeDataByAreaTime1', params).then(res => {
        this.echart.data = res

        this.echart.xAxis = [...this.echart.data.keys]
        delete this.echart.data.keys
        this.echart.chargeData = []
        this.echart.chargeTimes = []
        Object.keys(this.echart.data).forEach(item => {
          console.log(item)
          this.echart.chargeData.push({
            name: item,
            type: 'line',
            data: this.echart.data[item][0].charges
          })
          this.echart.chargeTimes.push({
            name: item,
            type: 'line',
            data: this.echart.data[item][1].counts
          })
        })
        this.initCharge(res)
        this.initChargeTimes()
      })
    },
    // 初始化地区数据
    initAreaData () {
      const params = {
        areaCode: this.areaCode,
        operatorId: this.merchantNo,
        period: '3',
        sTime: this.sTime,
        eTime: this.eTime
      }
      this.$store.dispatch('QueryAreaDataMax1', params).then(res => {
        this.maxChargeTimes = res.MAX_CHARGE_TIMES
        this.maxElectricity = res.MAX_ELECTRICITY
        this.maxServiceTime = res.MAX_SERVICE_TIME
        this.minChargeTimes = res.MIN_CHARGE_TIMES
        this.minElectricity = res.MIN_ELECTRICITY
        this.minServiceTime = res.MIN_SERVICE_TIME
        this.sumChargeTimes = res.SUM_CHARGE_TIMES
        this.sumElectricity = res.SUM_ELECTRICITY
        this.sumServiceTime = res.SUM_SERVICE_TIME
      })
    },
    // 改变事件
    onChange (date, dateString) {
      this.sTime = dateString[0]
      this.eTime = dateString[1]
      this.initData()
      this.initAreaData()
    },
    // 初始化充电次数Echart
    initChargeTimes () {
      var that = this
      // 基于准备好的dom，初始化echarts实例
      this.chargeTimesChart = this.$echarts.init(
        document.getElementById('chargeTimes')
      )
      // 绘制图表
      that.option1 = {
        color: this.colors,
        xAxis: {
          type: 'category',
          data: this.echart.xAxis
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
        legend: {
          top: 380,
          bottom: 0,
          data: Object.keys(this.echart.data)
        },
        yAxis: {
          name: '次'
        },
        grid: { top: 10, bottom: 148 },
        series: this.echart.chargeTimes
      }
      this.chargeTimesChart.setOption(that.option1)
      that.selectArr = that.chargeTimesChart.getOption().legend[0].data
    },
    // 初始化地区日充电量趋势Echart
    initCharge (data) {
      var that = this
      // eslint-disable-next-line no-redeclare
      var data = data
      // 基于准备好的dom，初始化echarts实例
      this.chargeChart = this.$echarts.init(document.getElementById('charge'))
      // 绘制图表
      that.option2 = {
        color: this.colors,
        xAxis: {
          type: 'category',
          data: this.echart.xAxis
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
        legend: {
          top: 380,
          bottom: 0,
          data: Object.keys(this.echart.data)
        },
        yAxis: {
          name: '次'
        },
        grid: { top: 10, bottom: 148 },
        series: this.echart.chargeData
      }
      this.chargeChart.setOption(that.option2)
      that.selectArr2 = that.chargeChart.getOption().legend[0].data
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
