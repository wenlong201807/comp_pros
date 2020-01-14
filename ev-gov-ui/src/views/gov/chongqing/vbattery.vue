<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>电池实时信息
        </span>
      </template>
      <template slot="extra">
        <a-range-picker @change="onChange" :defaultValue="defaultValue" style="margin-right:8px;" size="small" :allowClear="false"/>
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
              :defaultValue="['vehicleno','datatime','vin','status','soc','totalvoltage','totalcurrent','mintemp','maxtemp','minvoltage','maxvoltage']">
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
        :pagination="pagination" @change="handleTableChange">
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
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data() {
    return {
      // 表格Loading
      tableLoading: false,
      // 过滤条件
      searchParams: {
        vehicleno: null,
        vin: null
      },
      // 单选框条件
      searchRadio: {
        status: null
      },
      searchInput: null,
      // 起止时间
      startTime: '',
      endTime: '',
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
          dataIndex: 'vehicleno',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleno'
          }
        },
        {
          title: '时间',
          dataIndex: 'datatime'
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
          title: '充电状态',
          dataIndex: 'status',
          filterMultiple: false,
          filters: [
            {
              text: '全部状态',
              value: ''
            },
            {
              text: '充电',
              value: '0'
            },
            {
              text: '未充电',
              value: '1'
            }
          ]
        },
        {
          title: '电池充电比例',
          dataIndex: 'soc'
        },
        {
          title: '总电压',
          dataIndex: 'totalvoltage'
        },
        {
          title: '总电流',
          dataIndex: 'totalcurrent'
        },
        {
          title: '最低温度',
          dataIndex: 'mintemp'
        },
        {
          title: '最高温度',
          dataIndex: 'maxtemp'
        },
        {
          title: '最低电压',
          dataIndex: 'minvoltage'
        },
        {
          title: '最高电压',
          dataIndex: 'maxvoltage'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '车牌号',
          key: 'vehicleno',
          dataIndex: 'vehicleno',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleno'
          }
        },
        {
          title: '时间',
          key: 'datatime',
          dataIndex: 'datatime'
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
          title: '充电状态',
          key: 'status',
          dataIndex: 'status'
        },
        {
          title: '电池充电比例',
          key: 'soc',
          dataIndex: 'soc'
        },
        {
          title: '总电压',
          key: 'totalvoltage',
          dataIndex: 'totalvoltage'
        },
        {
          title: '总电流',
          key: 'totalcurrent',
          dataIndex: 'totalcurrent'
        },
        {
          title: '最低温度',
          key: 'mintemp',
          dataIndex: 'mintemp'
        },
        {
          title: '最高温度',
          key: 'maxtemp',
          dataIndex: 'maxtemp'
        },
        {
          title: '最低电压',
          key: 'minvoltage',
          dataIndex: 'minvoltage'
        },
        {
          title: '最高电压',
          key: 'maxvoltage',
          dataIndex: 'maxvoltage'
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
      // 导出过滤
      filtersExp: null,
      // 状态数组
      statusData: [
        {
          text: '全部状态',
          value: ''
        },
        {
          text: '充电',
          value: '0'
        },
        {
          text: '未充电',
          value: '1'
        }
      ]
    }
  },
  created() {
    // 起止时间
    this.startTime = moment(new Date())
      .subtract(3, 'days')
      .format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(3, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]

    // 初始化表格数据
    this.handleTableChange()
  },
  methods: {
    // 搜索功能
    handleSearch(confirm, col) {
      confirm()
    },
    // 改变事件
    onChange(date, dateString) {
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.handleTableChange()
    },
    // 搜索弹窗重置
    handleReset(clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    handleTableChange(pagination, filters, sorter) {
      var that = this
      this.filtersExp = filters
      this.tableLoading = true
      const data = {
        areaCode: this.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data[item] = `${this.searchParams[item]}`
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (filters != undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn == item) {
              if (filters[item][0] != undefined) {
                data[itemn] = filters[item][0]
              }
            }
          })
        }
      })
      this.$store.dispatch('BatteryListByPage', data).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
          that.statusData.forEach(itemn => {
            if (item.value === itemn.status) {
              item.status = itemn.text
            }
          })
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
      const data = {
        areaCode: this.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data[item] = `${this.searchParams[item]}`
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (that.filtersExp != undefined) {
          Object.keys(that.filtersExp).forEach(itemn => {
            if (itemn == item) {
              if (that.filtersExp[item][0] != undefined) {
                data[itemn] = that.filtersExp[item][0]
              }
            }
          })
        }
      })
      this.$store
        .dispatch('VehicleBatteryExp', data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          let fileName = '电池实时信息.xls'
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
