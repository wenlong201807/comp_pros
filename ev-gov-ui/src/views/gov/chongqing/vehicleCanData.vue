<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>车辆CAN数据
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
              :defaultValue="['plateCode','vin','manufacturerAbbr','vehicleSeriesName','status','vehicleTypeName']">
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
    <a-card style="margin-top:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>通用报警
        </span>
      </template>
      <span slot="extra">{{carNum}}</span>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="SOC低报警:"></a-list-item-meta>
              <div>{{allCanData.A1}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="SOC过高报警:"></a-list-item-meta>
              <div>{{allCanData.A2}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池高温报警:"></a-list-item-meta>
              <div>{{allCanData.A3}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车载储能装置类型欠压报警:"></a-list-item-meta>
              <div>{{allCanData.A4}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机控制器温度报警:"></a-list-item-meta>
              <div>{{allCanData.A5}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="可充电储能系统不匹配报警:"></a-list-item-meta>
              <div>{{allCanData.A6}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车载储能装置类型过充:"></a-list-item-meta>
              <div>{{allCanData.A7}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="单体电池过压报警:"></a-list-item-meta>
              <div>{{allCanData.A8}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最高报警等级:"></a-list-item-meta>
              <div>{{allCanData.A9}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="制动系统报警:"></a-list-item-meta>
              <div>{{allCanData.A10}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="DC-DC温度报警:"></a-list-item-meta>
              <div>{{allCanData.A11}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="高压互锁状态报警:"></a-list-item-meta>
              <div>{{allCanData.A12}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池单体一致性差报警:"></a-list-item-meta>
              <div>{{allCanData.A13}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="温度差异报警:"></a-list-item-meta>
              <div>{{allCanData.A14}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="单体电池欠压报警:"></a-list-item-meta>
              <div>{{allCanData.A15}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="DC-DC状态报警:"></a-list-item-meta>
              <div>{{allCanData.A16}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车载储能装置类型过压报警:"></a-list-item-meta>
              <div>{{allCanData.A17}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="SOC跳变报警:"></a-list-item-meta>
              <div>{{allCanData.A18}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机温度报警:"></a-list-item-meta>
              <div>{{allCanData.A19}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="绝缘报警:"></a-list-item-meta>
              <div>{{allCanData.A20}}</div>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>电池类
        </span>
      </template>
      <span slot="extra">{{carNum}}</span>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="最高温度子系统号:"></a-list-item-meta>
              <div>{{allCanData.B1}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="氢系统中最高温度探针代号:"></a-list-item-meta>
              <div>{{allCanData.B2}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最高电压电池子系统号:"></a-list-item-meta>
              <div>{{allCanData.B3}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最低电压电池单体代号:"></a-list-item-meta>
              <div>{{allCanData.B4}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池总电流:"></a-list-item-meta>
              <div>{{allCanData.B5}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池总电压:"></a-list-item-meta>
              <div>{{allCanData.B6}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最低温度探针子系统代号:"></a-list-item-meta>
              <div>{{allCanData.B7}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="燃料电池温度探针总数:"></a-list-item-meta>
              <div>{{allCanData.B8}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池单体电压最高值:"></a-list-item-meta>
              <div>{{allCanData.B9}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="氢气最高浓度传感器代号:"></a-list-item-meta>
              <div>{{allCanData.B10}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="氢系统中最高温度:"></a-list-item-meta>
              <div>{{allCanData.B11}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="氢气最高压力传感器代号:"></a-list-item-meta>
              <div>{{allCanData.B12}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最低电压电池子系统号:"></a-list-item-meta>
              <div>{{allCanData.B13}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最低温度值:"></a-list-item-meta>
              <div>{{allCanData.B14}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最低温度子系统号:"></a-list-item-meta>
              <div>{{allCanData.B15}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="探针温度值:"></a-list-item-meta>
              <div>{{allCanData.B16}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池单体电压最低值:"></a-list-item-meta>
              <div>{{allCanData.B17}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="燃料电池电压:"></a-list-item-meta>
              <div>{{allCanData.B18}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="氢气最高浓度:"></a-list-item-meta>
              <div>{{allCanData.B19}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最高电压电池单体代号:"></a-list-item-meta>
              <div>{{allCanData.B20}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="氢气最高压力:"></a-list-item-meta>
              <div>{{allCanData.B21}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电池电量(SOC):"></a-list-item-meta>
              <div>{{allCanData.B22}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最高温度值:"></a-list-item-meta>
              <div>{{allCanData.B23}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="最高温度探针单体代号:"></a-list-item-meta>
              <div>{{allCanData.B24}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="燃料消耗率:"></a-list-item-meta>
              <div>{{allCanData.B25}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="绝缘电阻值:"></a-list-item-meta>
              <div>{{allCanData.B26}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="燃料电池电流:"></a-list-item-meta>
              <div>{{allCanData.B27}}</div>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>电子控制单元类
        </span>
      </template>
      <span slot="extra">{{carNum}}</span>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="累计里程:"></a-list-item-meta>
              <div>{{allCanData.C1}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="纬度:"></a-list-item-meta>
              <div>{{allCanData.C2}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="经度:"></a-list-item-meta>
              <div>{{allCanData.C3}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="档位:"></a-list-item-meta>
              <div>{{allCanData.C4}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="车辆状态:"></a-list-item-meta>
              <div>{{allCanData.C5}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="定位状态:"></a-list-item-meta>
              <div>{{allCanData.C6}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="运行模式:"></a-list-item-meta>
              <div>{{allCanData.C7}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="DC-DC状态:"></a-list-item-meta>
              <div>{{allCanData.C8}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="充电状态:"></a-list-item-meta>
              <div>{{allCanData.C9}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="方向:"></a-list-item-meta>
              <div>{{allCanData.C10}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="车速:"></a-list-item-meta>
              <div>{{allCanData.C11}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="高压DC/DC状态:"></a-list-item-meta>
              <div>{{allCanData.C12}}</div>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>电机类
        </span>
      </template>
      <span slot="extra">{{carNum}}</span>
      <a-row :gutter="24">
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="燃料消耗率:"></a-list-item-meta>
              <div>{{allCanData.D1}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机序号:"></a-list-item-meta>
              <div>{{allCanData.D2}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机个数:"></a-list-item-meta>
              <div>{{allCanData.D3}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机温度:"></a-list-item-meta>
              <div>{{allCanData.D4}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="驱动电机转矩:"></a-list-item-meta>
              <div>{{allCanData.D5}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="曲轴转速:"></a-list-item-meta>
              <div>{{allCanData.D6}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电机控制器输入电压:"></a-list-item-meta>
              <div>{{allCanData.D7}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="驱动电机转速:"></a-list-item-meta>
              <div>{{allCanData.D8}}</div>
            </a-list-item>
          </a-list>
        </a-col>
        <a-col :span="8">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="驱动电机状态:"></a-list-item-meta>
              <div>{{allCanData.D9}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="发动机状态:"></a-list-item-meta>
              <div>{{allCanData.D10}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电机母线电流:"></a-list-item-meta>
              <div>{{allCanData.D11}}</div>
            </a-list-item>
            <a-list-item>
              <a-list-item-meta description="电机控制器温度(℃):"></a-list-item-meta>
              <div>{{allCanData.D12}}</div>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-top:24px;margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>探针温度
        </span>
      </template>
      <span slot="extra">{{carNum}}</span>
      <a-row :gutter="24">
        <a-col :span="24">
          <a-list bordered>
            <a-list-item>
              <a-list-item-meta description="暂无数据"></a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 表格Loading
      tableLoading: false,
      // 过滤条件
      searchParams: {
        plateCode: null,
        vin: null
      },
      searchInput: null,
      // 表格数据
      tableData: [],
      // 列
      columns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车牌号',
          dataIndex: 'plateCode',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'plateCode'
          }
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          }
        },
        {
          title: '生产厂家',
          dataIndex: 'manufacturerAbbr'
        },
        {
          title: '品牌',
          dataIndex: 'vehicleSeriesName',
          filters: [],
          filterMultiple: false
        },
        {
          title: '车辆状态',
          dataIndex: 'status'
        },
        {
          title: '车辆型号',
          dataIndex: 'vehicleTypeName'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '车牌号',
          key: 'plateCode',
          dataIndex: 'plateCode',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'plateCode'
          }
        },
        {
          title: 'VIN',
          key: 'vin',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          }
        },
        {
          title: '生产厂家',
          key: 'manufacturerAbbr',
          dataIndex: 'manufacturerAbbr'
        },
        {
          title: '品牌',
          key: 'vehicleSeriesName',
          dataIndex: 'vehicleSeriesName'
        },
        {
          title: '车辆状态',
          key: 'status',
          dataIndex: 'status'
        },
        {
          title: '车辆型号',
          key: 'vehicleTypeName',
          dataIndex: 'vehicleTypeName'
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
      // 单选框条件
      searchRadio: {
        vehicleSeriesName: null
      },
      // 表格所有数据
      tableDataRn: null,
      // 车辆CAN数据
      allCanData: {},
      // 车牌号
      carNum: '',
      // 车辆品牌数据
      brandsData: [],
      // 导出过滤
      filtersExp: null,
      rowClick: record => ({
        // 事件
        on: {
          click: () => {
            // console.log(record, 'record')
            this.rowClickLoadingData(record)
          }
        }
      })
    }
  },
  created() {
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

    // 初始化表格数据
    this.handleTableChange()
  },
  mounted() {},
  methods: {
    // 搜索功能
    handleSearch(confirm, col) {
      confirm()
    },
    // 改变事件
    onChange(date, dateString) {},
    // 搜索弹窗重置
    handleReset(clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    // 车辆VIN详细数据
    rowClickLoadingData(rank) {
      var that = this
      that.carNum = rank.plateCode
      var params = {
        vin: rank.vin
      }
      this.$store.dispatch('VehicleGetCanData', params).then(res => {
        that.allCanData = res
      })
    },
    handleTableChange(pagination, filters, sorter) {
      var that = this
      this.filtersExp = filters
      this.tableLoading = true
      const params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        areaCode: this.$ls.get('areaCode')
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params[item] = `${this.searchParams[item]}`
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (filters != undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn == item) {
              if (filters[item][0] != undefined) {
                params[itemn] = filters[item][0]
              }
            }
          })
        }
      })
      this.$store.dispatch('VehicleGetCanList', params).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        that.rowClickLoadingData(that.tableData[0])
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
        })
      })
    },
    // 自定义列事件
    onCheckBoxChange(value) {
      this.columns = this.finallyColumns.filter(item => {
        if (value.includes(item.key)) {
          return true
        }
        return false
      })
    },
    expTable() {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params[item] = `${this.searchParams[item]}`
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (that.filtersExp != undefined) {
          Object.keys(that.filtersExp).forEach(itemn => {
            if (itemn == item) {
              if (that.filtersExp[item][0] != undefined) {
                params[itemn] = that.filtersExp[item][0]
              }
            }
          })
        }
      })
      this.$store
        .dispatch('CanListExp', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '车辆CAN数据档案.xls'
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
</style>
