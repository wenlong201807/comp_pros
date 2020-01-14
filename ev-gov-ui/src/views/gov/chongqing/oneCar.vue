<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>单车详细数据
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
                  <a-checkbox :value="item.dataIndex">{{ item.title }}</a-checkbox>
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
          <a-input v-ant-ref="c => searchInput = c" :placeholder="`搜索 ${column.title}`"
                   v-model="searchParams[column.dataIndex]"
                   @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                   @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                   style="width: 188px; margin-bottom: 8px; display: block;" />

          <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                    style="width: 90px; margin-right: 8px">搜索</a-button>
          <a-button @click="() => handleReset(clearFilters,column.dataIndex)" size="small" style="width: 90px">重置
          </a-button>
        </div>
      </a-table>
    </a-card>
    <a-row :gutter="24" style="margin-top:24px;margin-bottom:24px;">
      <a-col :span="8">
        <a-card>
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag"></div>车辆详情
            </span>
          </template>
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="车牌号:"></a-list-item-meta>
              <div>{{ vehicleData.vehicleNo }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="VIN码:"></a-list-item-meta>
              <div>{{ vehicleData.vin }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="引擎编号:"></a-list-item-meta>
              <div>{{ vehicleData.engineNo }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车机编号:"></a-list-item-meta>
              <div>{{ vehicleData.tboxId }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车系名称:"></a-list-item-meta>
              <div>{{ vehicleData.vehicleSeriesName }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车型名称:"></a-list-item-meta>
              <div>{{ vehicleData.vehicleTypeName }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="生产厂家:"></a-list-item-meta>
              <div>{{ vehicleData.manufacturerAbbr }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="额定电流:"></a-list-item-meta>
              <div>{{ vehicleData.ratedCurrent }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="额定电压:"></a-list-item-meta>
              <div>{{ vehicleData.ratedVoltage }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="额定功率:"></a-list-item-meta>
              <div>{{ vehicleData.ratedPower }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池容量:"></a-list-item-meta>
              <div>{{ vehicleData.batteryCapacity }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车辆类型:"></a-list-item-meta>
              <div>{{ vehicleData.powerResource }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车辆类别:"></a-list-item-meta>
              <div>{{ vehicleData.vehicleCatagory }}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车辆用途:"></a-list-item-meta>
              <div>{{ vehicleData.vehiclePurpose }}</div>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag"></div>实时里程
            </span>
          </template>
          <a-statistic title="累计行驶里程（千米）" :value="vehicleBatteryData.todayRunMileage"
                       class="battery-data ant-pro-tsc-highlight" style="margin-bottom:0px;">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
          <div id="vehicleSpeed"></div>
          <a-statistic title="今日行驶时长（小时）" :value="vehicleBatteryData.todayRunHours"
                       class="battery-data ant-pro-tsc-highlight" style="margin-bottom:4px;">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
      <a-col :span="8">
        <a-card>
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag"></div>电池状态
            </span>
          </template>
          <a-statistic title="最高温度（摄氏度）" :value="vehicleBatteryData.maxTemp" class="battery-data ant-pro-tsc-highlight">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
          <a-statistic title="最低温度（摄氏度）" :value="vehicleBatteryData.minTemp" class="battery-data ant-pro-tsc-highlight">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
          <a-statistic title="最高电压（伏特）" :value="vehicleBatteryData.maxVoltage"
                       class="battery-data ant-pro-tsc-highlight">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
          <a-statistic title="最低电压（伏特）" :value="vehicleBatteryData.minVoltage"
                       class="battery-data ant-pro-tsc-highlight" style="margin-bottom:4px;">
            <template slot="prefix">
              <a-icon type="bar-chart" class="battery-icon" style="color:#ffffff" />
            </template>
          </a-statistic>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      themeColor: null,
      // 车速图表
      speedEchart: null,
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
      // 车辆详情数据
      vehicleData: {
        vehicleNo: '',
        vin: '',
        engineNo: '',
        tboxId: '',
        vehicleSeriesName: '',
        vehicleTypeName: '',
        manufacturerAbbr: '',
        ratedCurrent: '',
        ratedVoltage: '',
        ratedPower: '',
        batteryCapacity: '',
        powerResource: '',
        vehicleCatagory: '',
        vehiclePurpose: ''
      },
      vehicleBatteryData: {
        minTemp: '',
        maxTemp: '',
        minVoltage: '',
        maxVoltage: '',
        todayRunMileage: '',
        todayRunHours: '',
        speed: ''
      },
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
      vehicleVin: '',
      // 导出过滤
      filtersExp: null,
      rowClick: record => ({
        // 事件
        on: {
          click: () => {
            this.vehicleLoadingDate(record)
            this.vehicleLoading(record.vin)
          }
        }
      })
    }
  },
  computed: {
    themeColorData () {
      return this.$store.state.app.color
    }
  },
  watch: {
    themeColorData (val) {
      this.themeColor = val
    }
  },
  created () {
    // 车辆品牌下拉
    var that = this
    this.themeColor = this.$store.state.app.color
    console.log(this.themeColor)
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
          if (arr[index].dataIndex === 'vehicleSeriesName') {
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
  mounted () {
    var that = this
    // this.initChart();
    // window.onresize = () => {
    //   that.speedEchart.resize();
    // };
  },
  methods: {
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    // 改变事件
    onChange (date, dateString) {},
    // 车辆详情数据
    vehicleLoadingDate (rank) {
      this.vehicleData = rank
    },
    vehicleLoading (vin) {
      var that = this
      const params = {
        vin: vin
      }
      this.$store.dispatch('VehicleDetailData', params).then(res => {
        that.vehicleBatteryData = res
        that.initChart(that.vehicleBatteryData.speed)
      })
    },
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
        that.vehicleLoadingDate(that.tableData[0])
        that.vehicleLoading(that.tableData[0].vin)
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
        })
      })
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
    initChart (speed) {
      var that = this
      this.speedEchart = this.$echarts.init(
        document.getElementById('vehicleSpeed')
      )
      this.speedEchart.setOption({
        tooltip: {
          formatter: function (param) {
            return '时速：' + param.value[0] + '千米/小时'
          }
        },
        toolbox: {
          show: true,
          feature: {
            saveAsImage: { show: true }
          }
        },
        series: [
          {
            name: '时速',
            type: 'gauge',
            detail: { formatter: '{value}' },
            data: [{ value: speed, name: '时速\n（千米/小时）' }]
          }
        ]
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
.battery-data {
  text-align: right;
  display: inline-block;
  position: relative;
  width: 100%;
  height: 100px;
  padding: 12px 24px 12px 120px;
  // background: yellowgreen;
  border-radius: 10px;
  margin-bottom: 85px;
  color: #ffffff;
}
.battery-title {
  font-size: 18px;
  // font-weight: bold;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
}
.battery-icon {
  font-size: 80px;
  position: absolute;
  bottom: 10px;
  left: 60px;
}
#vehicleSpeed {
  height: 456px;
  width: 100%;
  padding: 20px 0px;
}
</style>
