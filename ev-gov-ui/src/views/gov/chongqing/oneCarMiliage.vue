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
                              :defaultValue="['vehicleNo','vin','manufacturerAbbr','vehicleSeriesName','vehiclePurpose','ratedVoltage','vehicleTypeName','totalMileage']">
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
      <a-range-picker slot="extra" @change="onChange" :defaultValue="defaultValue" :allowClear="false" />
      <a-row>
        <a-col :span="24">
          <a-card>
            <div id="echarts-bar-chart" style="height:350px"></div>
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
      // 起止时间
      startTime: '',
      endTime: '',
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
        },
        {
          title: '行驶里程',
          key: 'totalMileage',
          dataIndex: 'totalMileage',
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
        },
        {
          title: '行驶里程',
          key: 'totalMileage',
          dataIndex: 'totalMileage',
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
      carNum: '',
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
      mileageChart: null,
      vehicleVin: '',
      mileageChartData: null,
      // 导出过滤
      filtersExp: null,
      rowClick: record => ({
        // 事件
        on: {
          click: () => {
            this.rowClickLoadingData(record.vehicleNo, record.vin)
          }
        }
      })
    }
  },
  created () {
    // 起止时间
    this.startTime = moment(new Date())
      .subtract(30, 'days')
      .format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(30, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
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

    // 初始化表格数据
    this.handleTableChange()
  },
  mounted () {},
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
          isQueryMileage: true
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
    // 改变事件
    onChange (date, dateString) {
      var that = this
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.rowClickLoadingData(that.carNum, that.vehicleVin)
    },
    rowClickLoadingData (name, vin) {
      var that = this
      this.vehicleVin = vin
      this.carNum = name
      const params = {
        startDate: that.startTime,
        endDate: that.endTime,
        vin: that.vehicleVin
      }
      this.$store.dispatch('MileageCurve', params).then(res => {
        that.mileageChartData = res
        that.set30MileageChart(that.mileageChartData)
      })
    },
    set30MileageChart (obj) {
      var that = this
      // 设置行驶里程
      that.mileageChart = that.$echarts.init(
        document.getElementById('echarts-bar-chart')
      )
      var n = {
        title: {
          text: '行驶里程统计',
          left: '20',
          textStyle: {
            fontSize: 14,
            color: '#676a6c'
          }
        },
        color: that.colors,
        tooltip: { trigger: 'axis', formatter: '{a}<br>{b}：{c}千米' },
        legend: { data: ['里程统计'], color: '#333', y: '92%', x: 'center' },
        toolbox: {
          show: true,
          right: 5,
          feature: {
            saveAsImage: { show: true }
          }
        },
        grid: { left: '5%', right: '7%', top: '15%', bottom: '25%' },
        calculable: !0,
        dataZoom: [
          {
            type: 'slider',
            show: true,
            height: 30, // 组件高度
            left: '5%', // 左边的距离
            right: '7%', // 右边的距离
            bottom: '8%', // 右边的距离
            handleColor: '#ddd', // h滑动图标的颜色
            handleStyle: {
              borderColor: '#cacaca',
              borderWidth: '1',
              shadowBlur: 2,
              background: '#ddd',
              shadowColor: '#ddd'
            }
          }
        ],
        xAxis: [
          {
            type: 'category',
            data: obj.name,
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '千米',
            axisLabel: {
              formatter: '{value}'
            }
          }
        ],
        series: [
          {
            name: '里程统计',
            type: 'bar',
            data: obj.value
          }
        ]
      }
      that.mileageChart.setOption(n)
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
          isQueryMileage: true
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
          const fileName = '车辆档案信息.xls'
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

<style lang="less" scoped>
.clickRowStyl {
  background-color: #23c;
}
.ant-table-tbody > .clickRowStyl:hover > td {
  background-color: #23c23c;
}
</style>
