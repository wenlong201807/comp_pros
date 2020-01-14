<template>
  <div>
    <a-row>
      <!-- <a-col class="aColCss" style="width: calc(50% - 12px); display: inline-block; margin-right: 24px;"> -->
      <a-card style="margin-bottom:24px; width: calc(50% - 12px); display: inline-block; margin-right: 24px;">
        <template slot="title">
          <span style="margin-left: 20px">
            <div class="titleFlag" style="top:20px"></div>
            车辆生产厂家市场竞争分析
          </span>
        </template>
        <a-row>
          <div id="chart1" style="width: 100%;height:700px;"></div>
        </a-row>
      </a-card>
      <!-- </a-col> -->
      <!-- <a-col class="aColCss" style="width: calc(50% - 12px); display: inline-block;"> -->
      <a-card style="margin-bottom:24px;width: calc(50% - 12px); display: inline-block;">
        <template slot="title">
          <span style="margin-left: 20px">
            <div class="titleFlag" style="top:20px"></div>
            车辆品牌市场竞争分析
          </span>
        </template>
        <a-row>
          <div id="chart2" style="width: 100%;height:700px;"></div>
        </a-row>
      </a-card>
      <!-- </a-col> -->
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      chart1: null,
      chart2: null,
      //   areaCode: userInfo.areaCode,
      echart: {}
    }
  },
  mounted() {
    this.initData()
  },
  methods: {
    // 初始化数据
    initData() {
      const data = { areaCode: this.$ls.get('areaCode') }
      this.$store.dispatch('FactoryAnalysis', data).then(res => {
        this.echart.productAnalysisData = res
        this.productAnalysis()
      })
      this.$store.dispatch('BrandAnalysis', data).then(res => {
        console.log(res)
        this.echart.brandAnalysisData = res
        this.brandAnalysis()
      })

      // this.echart.productAnalysisData = {
      //   keys: [
      //     '长安',
      //     '力帆乘用车',
      //     '奇瑞',
      //     '瑞驰',
      //     '力帆汽车',
      //     '知豆',
      //     '众泰',
      //     '北汽新能源',
      //     '金龙联合（苏州）',
      //     '鑫源',
      //     '宇通',
      //     '比亚迪',
      //     '蔚来',
      //     '恒通',
      //     '东风',
      //     '长城',
      //     '上汽',
      //     '中植',
      //     '通家',
      //     '威马',
      //     '金龙',
      //     '中通',
      //     '盛时达',
      //     '五菱',
      //     '舒驰',
      //     '广汽',
      //     '金龙旅行车',
      //     '潍柴',
      //     '北汽福田',
      //     '丰田',
      //     '宝马',
      //     '福特',
      //     '北汽银翔',
      //     '广汽（杭州）',
      //     '申龙'
      //   ],
      //   values: [
      //     { name: '长安', value: 23631.0 },
      //     { name: '力帆乘用车', value: 9119.0 },
      //     { name: '奇瑞', value: 2479.0 },
      //     { name: '瑞驰', value: 2322.0 },
      //     { name: '力帆汽车', value: 2188.0 },
      //     { name: '知豆', value: 1317.0 },
      //     { name: '众泰', value: 1180.0 },
      //     { name: '北汽新能源', value: 967.0 },
      //     { name: '金龙联合（苏州）', value: 661.0 },
      //     { name: '鑫源', value: 605.0 },
      //     { name: '宇通', value: 419.0 },
      //     { name: '比亚迪', value: 395.0 },
      //     { name: '蔚来', value: 201.0 },
      //     { name: '恒通', value: 166.0 },
      //     { name: '东风', value: 150.0 },
      //     { name: '长城', value: 144.0 },
      //     { name: '上汽', value: 140.0 },
      //     { name: '中植', value: 132.0 },
      //     { name: '通家', value: 100.0 },
      //     { name: '威马', value: 99.0 },
      //     { name: '金龙', value: 72.0 },
      //     { name: '中通', value: 63.0 },
      //     { name: '盛时达', value: 54.0 },
      //     { name: '五菱', value: 53.0 },
      //     { name: '舒驰', value: 50.0 },
      //     { name: '广汽', value: 47.0 },
      //     { name: '金龙旅行车', value: 45.0 },
      //     { name: '潍柴', value: 37.0 },
      //     { name: '北汽福田', value: 33.0 },
      //     { name: '丰田', value: 25.0 },
      //     { name: '宝马', value: 23.0 },
      //     { name: '福特', value: 11.0 },
      //     { name: '北汽银翔', value: 10.0 },
      //     { name: '广汽（杭州）', value: 7.0 },
      //     { name: '申龙', value: 4.0 }
      //   ]
      // }
      // this.echart.brandAnalysisData = {
      //   keys: [
      //     'EADO',
      //     '力帆乘用车',
      //     '长安汽车',
      //     '瑞驰',
      //     '力帆汽车',
      //     '奇瑞牌',
      //     '知豆',
      //     '北汽新能源',
      //     'E系列',
      //     '海格',
      //     '华晨鑫源',
      //     '宇通',
      //     '比亚迪',
      //     '云系列',
      //     'SQR7000BEVJ00',
      //     '蔚来',
      //     '恒通客车',
      //     '东风',
      //     '长城',
      //     '荣威',
      //     'SQR7000BEVJ72',
      //     '中植',
      //     '通家福牌',
      //     'EX5',
      //     '金龙',
      //     '中通牌',
      //     '芝麻',
      //     '盛时达',
      //     '传祺（Trum pchi）牌',
      //     '宝骏',
      //     '舒驰',
      //     '金龙旅行车',
      //     '737EV',
      //     '欧辉客车',
      //     'X1',
      //     'ix4',
      //     '福特',
      //     '雷凌',
      //     '北汽银翔',
      //     '申龙'
      //   ],
      //   values: [
      //     { name: 'EADO', value: 17387 },
      //     { name: '力帆乘用车', value: 9119 },
      //     { name: '长安汽车', value: 6243 },
      //     { name: '瑞驰', value: 2322 },
      //     { name: '力帆汽车', value: 2188 },
      //     { name: '奇瑞牌', value: 2080 },
      //     { name: '知豆', value: 1317 },
      //     { name: '北汽新能源', value: 967 },
      //     { name: 'E系列', value: 747 },
      //     { name: '海格', value: 661 },
      //     { name: '华晨鑫源', value: 605 },
      //     { name: '宇通', value: 419 },
      //     { name: '比亚迪', value: 395 },
      //     { name: '云系列', value: 371 },
      //     { name: 'SQR7000BEVJ00', value: 260 },
      //     { name: '蔚来', value: 201 },
      //     { name: '恒通客车', value: 166 },
      //     { name: '东风', value: 150 },
      //     { name: '长城', value: 144 },
      //     { name: '荣威', value: 140 },
      //     { name: 'SQR7000BEVJ72', value: 139 },
      //     { name: '中植', value: 132 },
      //     { name: '通家福牌', value: 100 },
      //     { name: 'EX5', value: 99 },
      //     { name: '金龙', value: 72 },
      //     { name: '中通牌', value: 63 },
      //     { name: '芝麻', value: 60 },
      //     { name: '盛时达', value: 54 },
      //     { name: '传祺（Trum pchi）牌', value: 54 },
      //     { name: '宝骏', value: 53 },
      //     { name: '舒驰', value: 50 },
      //     { name: '金龙旅行车', value: 45 },
      //     { name: '737EV', value: 37 },
      //     { name: '欧辉客车', value: 33 },
      //     { name: 'X1', value: 23 },
      //     { name: 'ix4', value: 14 },
      //     { name: '福特', value: 11 },
      //     { name: '雷凌', value: 11 },
      //     { name: '北汽银翔', value: 10 },
      //     { name: '申龙', value: 4 }
      //   ]
      // }
    },
    productAnalysis() {
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
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '生产厂家',
            type: 'pie',
            radius: '55%',
            center: ['50%', '48%'],
            data: this.echart.productAnalysisData.values
          }
        ]
      })
    },
    brandAnalysis() {
      // 基于准备好的dom，初始化echarts实例
      this.chart2 = this.$echarts.init(document.getElementById('chart2'))
      this.chart2.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: this.colors,
        legend: {
          left: 'center',
          bottom: 2,
          data: this.echart.brandAnalysisData.keys
        },
        toolbox: {
          show: true,
          feature: {
            dataView: { show: true, readOnly: false },
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '车辆品牌',
            type: 'pie',
            radius: '55%',
            center: ['50%', '48%'],
            data: this.echart.brandAnalysisData.values
          }
        ]
      })
    }
  }
}
</script>

<style>
.titleFlag {
  top: 24px;
}
</style>
