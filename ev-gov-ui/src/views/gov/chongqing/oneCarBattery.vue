<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>
          车辆档案信息
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['vehicleNo','vin','manufacturerAbbr','vehicleSeriesName','vehiclePurpose','ratedVoltage','vehicleTypeName']">
              <a-row>
                <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                  <a-checkbox :value="item.dataIndex">{{
                    item.title
                  }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-menu>
          <a-button size="small">
            <a-icon type="appstore" />
          </a-button>
        </a-dropdown>
      </template>
      <a-table :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData" :loading="tableLoading"
               :pagination="pagination" @change="handleTableChange" :customRow="rowClick">
        <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :class="filtered ? 'ant-pro-active-icon' : undefined" />
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
             style="padding: 8px">
          <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                   v-model="searchParams[column.dataIndex]"
                   @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                   @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                   style="width: 188px; margin-bottom: 8px; display: block;" />
          <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                    style="width: 90px; margin-right: 8px">搜索</a-button>
          <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
          </a-button>
        </div>
      </a-table>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <span style="color: #ff7f50;">{{ carNum }}</span> - 车辆电池统计
        </span>
      </template>
      <a-date-picker slot="extra" @change="onChangeDate" :defaultValue="defaultDate" :allowClear="false"/>
      <a-row>
        <a-col :span="24">
          <a-card style="border-bottom:0px;">
            <div id="echarts-pie-chart" style="height:350px;"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card style="border-right:0px;border-bottom:0px;">
            <div id="echarts-line-chart" style="height:350px"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card style="border-bottom:1px;">
            <div id="echarts-line-chart1" style="height:350px"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card style="border-right:0px;">
            <div id="echarts-line-chart2" style="height:350px"></div>
          </a-card>
        </a-col>
        <a-col :span="12">
          <a-card>
            <div id="echarts-line-chart3" style="height:350px"></div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
      // 表格Loading
      tableLoading: false,
      // 过滤条件
      searchParams: {
        vehicleNo: null,
        vin: null
      },
      // 单选框条件
      searchRadio: {
        manufacturerAbbr: null,
        vehicleSeriesName: null
      },
      searchInput: null,
      // 表格数据
      tableData: [],
      // 列
      columns: [
        {
          title: '序号',
          key: 'rn',
          dataIndex: 'rn'
        },
        {
          title: '车牌号',
          key: 'vehicleNo',
          dataIndex: 'vehicleNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleNo'
          },
          sorter: true
        },
        {
          title: 'VIN',
          key: 'vin',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          },
          sorter: true
        },
        {
          title: '生产厂家',
          key: 'manufacturerAbbr',
          dataIndex: 'manufacturerAbbr',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '品牌',
          key: 'vehicleSeriesName',
          dataIndex: 'vehicleSeriesName',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '车辆用途',
          key: 'vehiclePurpose',
          dataIndex: 'vehiclePurpose',
          sorter: true
        },
        {
          title: '额定电压',
          key: 'ratedVoltage',
          dataIndex: 'ratedVoltage',
          sorter: true
        },
        {
          title: '车辆型号',
          key: 'vehicleTypeName',
          dataIndex: 'vehicleTypeName',
          sorter: true
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '车牌号',
          key: 'vehicleNo',
          dataIndex: 'vehicleNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleNo'
          },
          sorter: true
        },
        {
          title: 'VIN',
          key: 'vin',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          },
          sorter: true
        },
        {
          title: '生产厂家',
          key: 'manufacturerAbbr',
          dataIndex: 'manufacturerAbbr',
          sorter: true
        },
        {
          title: '品牌',
          key: 'vehicleSeriesName',
          dataIndex: 'vehicleSeriesName',
          sorter: true
        },
        {
          title: '车辆用途',
          key: 'vehiclePurpose',
          dataIndex: 'vehiclePurpose',
          sorter: true
        },
        {
          title: '额定电压',
          key: 'ratedVoltage',
          dataIndex: 'ratedVoltage',
          sorter: true
        },
        {
          title: '车辆型号',
          key: 'vehicleTypeName',
          dataIndex: 'vehicleTypeName',
          sorter: true
        }
      ],
      // 分页组件
      pagination: {
        onChange: page => {
          this.pagination.current = page
        },
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${this.pagination.total} 条`,
        current: 1
      },
      // 表格所有数据
      tableDataRn: null,
      carNum: '鲁UB0503',
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
      // 时间框
      dateTime:'',
      vehicleVin: '',
      rowClick: record => ({
        on: {
          click: () => {
            this.rowClickLoadingData(record.vehicleNo, record.vin)
          }
        }
      }),
      soc: null,
      tempHL: null,
      voltageHL: null,
      totalVoltageHL: null,
      currentHL: null,
      // 导出过滤
      filtersExp: null
    }
  },
  created () {
    // 默认时间
    this.dateTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultDate = moment(new Date(), this.dateFormat)

    // 车辆品牌下拉
    var that = this
    const params = [
      {
        field: 'areaCode',
        value: this.$ls.get('areaCode')
      }
    ]
    this.$store
      .dispatch('GroupStatisticsByBrand', params)
      .then(res => {
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex == 'vehicleSeriesName') {
            res.forEach(item => {
              arr[index].filters.push({ text: item.name, value: item.name })
            })
          }
        })
      })
      .catch(error => {})
    // 车辆生产厂家下拉
    this.$store
      .dispatch('GroupStatisticsByFactory', params)
      .then(res => {
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex == 'manufacturerAbbr') {
            res.forEach(item => {
              arr[index].filters.push({ text: item.name, value: item.name })
            })
          }
        })
      })
      .catch(error => {})

    
  },
  mounted () {
    var that = this
    // 初始化表格数据
    this.handleTableChange()
    // 假数
    // var socData = {
    //   name: ['2019-11-20'],
    //   value: [12],
    //   max: [8]
    // }
    // that.socChart(socData)
    // that.tempChart(socData)
    // that.voltage(socData)
    // that.totalVoltage(socData)
    // that.current(socData)
    window.onresize = function () {
      that.soc.resize()
      that.tempHL.resize()
      that.voltageHL.resize()
      that.totalVoltageHL.resize()
      that.currentHL.resize()
    }
  },
  methods: {
    // 初始化表格数据
    handleTableChange (pagination, filters, sorter) {
      var that = this
      this.filtersExp = filters
      this.tableLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          isQueryMileage: false
        },
        params: {
          query: [],
          order: []
        }
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.params.query.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          })
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (filters != undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn == item) {
              if (filters[item][0] != undefined) {
                data.params.query.push({
                  field: itemn,
                  value: filters[item][0]
                })
              }
            }
          })
        }
      })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('VehicleList', data).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        this.pagination.total = res.total
        this.tableLoading = false
        that.rowClickLoadingData(
          that.tableData[0].vehicleNo,
          that.tableData[0].vin
        )
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
        })
      })
    },
    // 时间改变
    onChangeDate(date, dateString) {
      var that = this
      this.dateTime = dateString
      this.rowClickLoadingData(that.carNum, that.vehicleVin)
    },
    // 表格数据切换
    rowClickLoadingData (name, vin) {
      var that = this
      this.vehicleVin = vin
      this.carNum = name
      const params = {
        data: that.dateTime,
        vin: that.vehicleVin
      }
      this.$store.dispatch('VehicleBatteryInfo', params).then(res => {
        console.log(res)
        that.current(res)
        that.totalVoltage(res)
        that.voltage(res)
        that.tempChart(res)
        that.socChart(res)
      })
    },
    // 总电流echart
    current: function (data) {
      var that = this
      that.currentHL = that.$echarts.init(
        document.getElementById('echarts-line-chart3')
      )
      var b2 = {
        title: {
          text: '总电流',
          textStyle: {
            fontSize: 14,
            color: '#676a6c'
          }
        },
        color: ['#87CEFA'],
        tooltip: {
          trigger: 'axis',
          formatter: function (param) {
            if (param[0].value) {
              return param[0].name + '<br>总电流：' + param[0].value + '安培'
            } else {
              return '暂无数据'
            }
          }
        },
        legend: { data: ['总电流'], x: 'center', y: 'bottom' },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          },
          right: 5
        },
        color: that.colors,
        grid: { left: '7%', right: '5%', top: '15%', bottom: '15%' },
        calculable: !0,
        xAxis: [
          {
            type: 'category',
            nameTextStyle: {
              color: '#000000'
            },
            boundaryGap: !1,
            data: data.name.length == 0 ? '无' : data.name
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '安培',
            nameTextStyle: {
              color: '#000000'
            },
            axisLabel: { formatter: '{value}' }
          }
        ],
        series: [
          {
            name: '总电流',
            type: 'line',
            data: data.totalcur == null ? [0] : data.totalcur,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          }
        ]
      }
      that.currentHL.setOption(b2)
    },
    // 总电压echart
    totalVoltage: function (data) {
      var that = this
      that.totalVoltageHL = that.$echarts.init(
        document.getElementById('echarts-line-chart2')
      )
      var b1 = {
        title: {
          text: '总电压',
          textStyle: {
            fontSize: 14,
            color: '#676a6c'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (param) {
            if (param[0].value) {
              return param[0].name + '<br>总电压：' + param[0].value + '伏特'
            } else {
              return '暂无数据'
            }
          }
        },
        color: that.colors,
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          },
          right: 5
        },
        legend: { data: ['总电压'], x: 'center', y: 'bottom' },
        grid: { left: '7%', right: '5%', top: '15%', bottom: '15%' },
        calculable: !0,
        xAxis: [
          {
            type: 'category',
            nameTextStyle: {
              color: '#000000'
            },
            boundaryGap: !1,
            data: data.name.length == 0 ? '无' : data.name
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '伏特',
            nameTextStyle: {
              color: '#000000'
            },
            axisLabel: { formatter: '{value}' }
          }
        ],
        series: [
          {
            name: '总电压',
            type: 'line',
            data: data.totalvol == null ? [0] : data.totalvol,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          }
        ]
      }
      that.totalVoltageHL.setOption(b1)
    },
    // 最高电压
    voltage (data) {
      var that = this
      that.voltageHL = that.$echarts.init(
        document.getElementById('echarts-line-chart1')
      )
      var b = {
        title: {
          text: '最高电压&最低电压',
          textStyle: {
            fontSize: 14,
            color: '#676a6c'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (param) {
            if (param[0].value) {
              return (
                param[0].name +
                '<br>最高电压：' +
                param[0].value +
                '伏特<br>最低电压：' +
                param[1].value +
                '伏特'
              )
            } else {
              return '暂无数据'
            }
          }
        },
        legend: { data: ['最高电压', '最低电压'], x: 'center', y: 'bottom' },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          },
          right: 5
        },
        color: that.colors,
        grid: { left: '7%', right: '5%', top: '15%', bottom: '15%' },
        calculable: !0,
        xAxis: [
          {
            type: 'category',
            nameTextStyle: {
              color: '#000000'
            },
            boundaryGap: !1,
            data: data.name.length == 0 ? '无' : data.name
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '伏特',
            nameTextStyle: {
              color: '#000000'
            },
            axisLabel: { formatter: '{value}' }
          }
        ],
        series: [
          {
            name: '最高电压',
            type: 'line',
            data: data.volmax == null ? [0] : data.volmax,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          },
          {
            name: '最低电压',
            type: 'line',
            data: data.volmin == null ? [0] : data.volmin,
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          }
        ]
      }
      that.voltageHL.setOption(b)
    },
    // 最高最低温度
    tempChart: function (data) {
      var that = this
      that.tempHL = that.$echarts.init(
        document.getElementById('echarts-line-chart')
      )
      var a = {
        color: that.colors,
        title: {
          text: '最高温度&最低温度',
          textStyle: {
            fontSize: 14,
            color: '#676a6c'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (param) {
            if (param[0].value) {
              return (
                param[0].name +
                '<br>最高温度：' +
                param[0].value +
                '摄氏度<br>最低温度：' +
                param[1].value +
                '摄氏度'
              )
            } else {
              return '暂无数据'
            }
          }
        },
        legend: { data: ['最高温度', '最低温度'], x: 'center', y: 'bottom' },
        toolbox: {
          show: true,
          right: 5,
          feature: {
            saveAsImage: { show: true }
          }
        },
        grid: { left: '7%', right: '5%', top: '15%', bottom: '15%' },
        calculable: !0,
        xAxis: [
          {
            type: 'category',
            nameTextStyle: {
              color: '#000000'
            },
            boundaryGap: !1,
            data: data.name.length == 0 ? '无' : data.name // ["12-05","12-05","12-05","12-05","12-05","12-05","12-05"]
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '摄氏度',
            nameTextStyle: {
              color: '#000000'
            },
            axisLabel: { formatter: '{value}' }
          }
        ],
        series: [
          {
            name: '最高温度',
            type: 'line',
            data: data.tempmax == null ? [0] : data.tempmax, // [11,11,15,13,12,13,10]
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          },
          {
            name: '最低温度',
            type: 'line',
            data: data.tempmin == null ? [0] : data.tempmin, // [1,-2,2,5,3,2,0]
            markPoint: {
              data: [
                { type: 'max', name: '最大值' },
                { type: 'min', name: '最小值' }
              ]
            },
            markLine: { data: [{ type: 'average', name: '平均值' }] }
          }
        ]
      }
      that.tempHL.setOption(a)
    },
    // SOC chart
    socChart (data) {
      var that = this
      that.soc = that.$echarts.init(
        document.getElementById('echarts-pie-chart')
      )
      var n = {
        color: that.colors,
        title: {
          text: 'SOC充电分析',
          textStyle: {
            color: '#676a6c',
            fontSize: 14
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (param) {
            if (param[0].value) {
              return param[0].name + '<br>电量：' + param[0].value + '%'
            } else {
              return '暂无数据'
            }
          }
        },
        legend: {
          data: ['SOC(电量)'],
          color: '#333',
          y: 'bottom',
          x: 'center'
        },
        toolbox: {
          show: true,
          right: 5,
          feature: {
            saveAsImage: { show: true }
          }
        },
        grid: { left: '7%', right: '5%', top: '15%', bottom: '15%' },
        calculable: !0,
        xAxis: [
          {
            type: 'category',
            nameTextStyle: {
              color: '#000000'
            },
            boundaryGap: false,
            data: data.name.length == 0 ? '无' : data.name,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '%',
            nameTextStyle: {
              color: '#000000'
            },
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '电量',
            type: 'line',
            data: data.soc
          }
        ]
      }
      that.soc.setOption(n)
    },
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    // 搜索弹窗重置
    handleReset (clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    // 自定义列事件
    onCheckBoxChange (value) {
      this.columns = this.finallyColumns.filter(item => {
        if (value.includes(item.key)) {
          return true
        }
        return false
      })
    },
    expTable () {
      var that = this
      const data = {
        basic: {
          isQueryMileage: false
        },
        params: [
          {
            field: 'areaCode',
            value: this.$ls.get('areaCode')
          }
        ]
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.params.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          })
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (that.filtersExp != undefined) {
          Object.keys(that.filtersExp).forEach(itemn => {
            if (itemn == item) {
              if (that.filtersExp[item][0] != undefined) {
                data.params.push({
                  field: itemn,
                  value: that.filtersExp[item][0]
                })
              }
            }
          })
        }
      })
      this.$store
        .dispatch('VehicleExp', data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '车辆电池信息.xls'
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang="less" scoped></style>
