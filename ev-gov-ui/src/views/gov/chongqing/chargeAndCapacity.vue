<template>
  <div>
    <a-card style="margin-bottom:24px">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电设施利用率
        </span>
      </template>
      <template slot="extra">
        <a-range-picker @change="onChange" :allowClear="false" :defaultValue="defaultValue" />
      </template>
      <a-row>
        <a-col id="use" style="width: 100%;height:350px;"></a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电设施利用率分析
        </span>
      </template>
      <template slot="extra">
        <!-- <a-cascader :fieldNames="{ label: 'name', value: 'id', children: 'children' }" :options="options"
                    @change="onChange" placeholder="请选择" style="margin-right: 24px;" /> -->
        <span style="margin-right:20px;">{{ areaName }}</span>
        <a-button type="primary" @click="showModal" style="margin-right:20px;">点击选择</a-button>
        <a-modal title="请选择需要查询的数据" v-model="visible" @ok="handleOk">
          <div style="height: 400px;overflow-y: scroll;">
            <a-tree :treeData="treeData" @select="this.onSelect" />
          </div>
        </a-modal>
        <a-range-picker @change="onChange1" :defaultValue="defaultValue" :allowClear="false"
                        style="margin-right:20px;" />
        <a-button type="primary" @click="searchZtree">查询</a-button>
      </template>
      <a-row>
        <div id="useAnalysis" style="width: 100%;height:350px;"></div>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      treeData: [],
      visible: false,
      startTime: '',
      startTime1: '',
      defaultValue: [],
      dateFormat: 'YYYY-MM-DD',
      endTime: '',
      endTime1: '',
      flag: true,
      areaName: '地区：重庆市',
      selectType: '',
      dataId: '',
      useChart: null,
      options: [],
      useAnalysisChart: null,
      echart: {
        useData: [],
        useAnalysisData: []
      }
    }
  },
  created () {
    this.startTime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    this.startTime1 = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.endTime1 = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(30, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
    var that = this
    const params1 = {
      areaCode: that.$ls.get('areaCode')
    }
    this.$store.dispatch('QueryAreaStationStakeTree', params1).then(res => {
      this.treeData = res
    })
    this.selectType = 2
    this.dataId = that.$ls.get('areaCode')
  },
  mounted () {
    this.initUse()
    this.initUseAnalysis()
    window.onresize = () => {
      this.useChart.resize()
      this.useAnalysisChart.resize()
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
    searchZtree () {
      this.initUseAnalysis()
    },
    // 打开弹出框
    showModal () {
      this.visible = true
    },
    // 关闭弹出框
    handleOk (e) {
      this.visible = false
    },
    onChange (date, dateString) {
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.initUse()
    },
    onChange1 (date, dateString) {
      this.startTime1 = dateString[0]
      this.endTime1 = dateString[1]
    },
    // 初始化充电设施利用率Echart
    initUseAnalysis () {
      var that = this
      that.useAnalysisChart = this.$echarts.init(
        document.getElementById('useAnalysis')
      )
      const params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.startTime1,
        endTime: that.endTime1,
        selectType: that.selectType,
        param: '',
        dataId: that.dataId
      }
      this.$store.dispatch('QueryChargeUtilizationRatio', params).then(res => {
        that.echart.useAnalysisData = res
        // 绘制图表
        that.useAnalysisChart.setOption({
          color: ['#3398DB'],
          xAxis: {
            type: 'category',
            data: that.echart.useAnalysisData.name
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
            name: '%'
          },
          series: [
            {
              name: '充电设施利用率',
              type: 'bar',
              barWidth: '60%',
              data: that.echart.useAnalysisData.value
            }
          ]
        })
      })
    },
    // 初始化充电设施利用率趋势Echart
    initUse () {
      var that = this
      that.useChart = this.$echarts.init(document.getElementById('use'))
      const params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime,
        selectType: '',
        param: '',
        dataId: ''
      }
      this.$store.dispatch('QueryChargeUtilizationRatio', params).then(res => {
        that.echart.useData = res
        that.useChart.setOption({
          color: ['#3398DB'],
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          xAxis: {
            type: 'category',
            data: that.echart.useData.name
          },
          toolbox: {
            right: 24,
            feature: {
              saveAsImage: {}
            }
          },
          yAxis: {
            name: '%'
          },
          series: [
            {
              name: '充电设施利用率',
              type: 'bar',
              barWidth: '60%',
              data: that.echart.useData.value
            }
          ]
        })
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
