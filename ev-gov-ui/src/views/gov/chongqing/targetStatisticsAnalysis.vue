<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>各大类检测项合格率统计
        </span>
      </template>
      <template slot="extra">
        <!-- <a-select :defaultValue="nowYear" style="width: 120px" @change="onChange">
          <a-select-option v-for="item in yearList" :value="item" :key="item">{{ item }}</a-select-option>
        </a-select> -->
        <!-- <a-date-picker mode="year" :defaultValue="yearValue" format="YYYY" :value="yearValue" :allowClear="false"
                       :open="isopen" @openChange="handleOpenChange" @panelChange="onChange" /> -->
      </template>
      <a-row>
        <a-col id="oneDayMileage" style="width: 100%;height:350px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>协议一致性合格率
        </span>
      </template>
      <template slot="extra">

      </template>
      <a-row>
        <div id="chart1" style="width: 100%;height:350px;"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      chart1: null,
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
      isopen: false,

      flag: true,
      oneDayMileageChart: null,

      echart: {},
      yearList: [],
      nowYear: ''
    }
  },
  created () {},
  mounted () {
    this.initData()

    window.onresize = () => {
      this.oneDayMileageChart.resize()
      this.chart1.resize()
    }
  },
  methods: {
    // 初始化数据
    initData () {
      const params = []

      // const data = { areaCode: this.$ls.get('areaCode'), time: this.year }
      this.$store.dispatch('GetBar', params).then(res => {
        // console.log(res)
        // if (res) {
        this.echart.oneDayMileageData = res
        this.initoneDayMileage()
      })

      const data = {}
      this.$store.dispatch('GetPie', data).then(res => {
        this.echart.productAnalysisData = res
        this.productAnalysis()
      })
    },

    // 初始化充电设施利用率Echart
    productAnalysis () {
      this.echart.productAnalysisData.values = this.echart.productAnalysisData.values.map(
        item => {
          return {
            name: item.name,
            value: parseFloat(item.value).toFixed(2)
          }
        }
      )
      console.log(this.echart.productAnalysisData.values)
      // 基于准备好的dom，初始化echarts实例
      this.chart1 = this.$echarts.init(document.getElementById('chart1'))
      this.chart1.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: this.colors,
        legend: {
          //   orient: 'vertical',
          left: 'center',
          bottom: 2,
          data: this.echart.productAnalysisData.keys
        },
        toolbox: {
          show: true,
          feature: {
            // dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '协议一致性合格率',
            type: 'pie',
            radius: '55%',
            center: ['50%', '48%'],
            data: this.echart.productAnalysisData.values,
            label: {
              formatter: '{a} {b} : {c} ({d}%)'
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
      this.echart.oneDayMileageData.value = this.echart.oneDayMileageData.value.map(
        item => {
          return parseFloat(item).toFixed(2)
        }
      )

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
          name: '',

          type: 'value',
          axisLabel: {
            show: true,
            interval: 'auto',
            formatter: '{value}.00%'
          },
          show: true
        },
        series: [
          {
            name: '合格率',
            type: 'bar',
            barWidth: '60%',
            data: this.echart.oneDayMileageData.value,
            label: {
              normal: {
                show: true,
                formatter: function (a) {
                  // return ((parseInt(a.data) / total) * 100).toFixed(2) + '%'
                  return parseFloat(a.data).toFixed(2) + '%'
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
