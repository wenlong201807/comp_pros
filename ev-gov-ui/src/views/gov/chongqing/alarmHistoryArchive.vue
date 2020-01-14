<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>历史报警信息
        </span>
      </template>
      <template slot="extra">
        <a-range-picker @change="onChange" :defaultValue="defaultValue" style="margin-right:8px;" size="small"
                        slot="extra" :allowClear="false" />
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['vehicleNo','vin','company','alarmType','alarmLevel','alarmDetail','startTime','endTime']">
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
  data () {
    return {
      // 表格Loading
      tableLoading: false,
      // 过滤条件
      searchParams: {
        vehicleNo: null,
        vin: null,
        company: null,
        alarmType: null,
        alarmLevel: null
      },
      searchInput: null,
      // 表格数据
      tableData: [],
      // 起止时间
      startTime: '',
      endTime: '',
      // 列
      columns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车牌号',
          dataIndex: 'vehicleNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleNo'
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
          dataIndex: 'company',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'company'
          }
        },
        {
          title: '报警类型',
          dataIndex: 'alarmType',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmType'
          }
        },
        {
          title: '报警等级',
          dataIndex: 'alarmLevel',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmLevel'
          }
        },
        {
          title: '故障说明',
          dataIndex: 'alarmDetail',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmDetail'
          }
        },
        {
          title: '开始时间',
          dataIndex: 'startTime'
        },
        {
          title: '结束时间',
          dataIndex: 'endTime'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '车牌号',
          dataIndex: 'vehicleNo',
          key: 'vehicleNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vehicleNo'
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
          key: 'company',
          dataIndex: 'company',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'company'
          }
        },
        {
          title: '报警类型',
          key: 'alarmType',
          dataIndex: 'alarmType',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmType'
          }
        },
        {
          title: '报警等级',
          key: 'alarmLevel',
          dataIndex: 'alarmLevel',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmLevel'
          }
        },
        {
          title: '故障说明',
          key: 'alarmDetail',
          dataIndex: 'alarmDetail',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'alarmDetail'
          }
        },
        {
          title: '开始时间',
          key: 'startTime',
          dataIndex: 'startTime'
        },
        {
          title: '结束时间',
          key: 'endTime',
          dataIndex: 'endTime'
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
      tableDataRn: null
    }
  },
  created () {
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
    handleSearch (confirm, col) {
      confirm()
    },
    // 改变事件
    onChange (date, dateString) {
      console.log(date, dateString)
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.handleTableChange()
    },
    // 搜索弹窗重置
    handleReset (clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    handleTableChange (pagination, filters, sorter) {
      var that = this
      this.tableLoading = true
      const data = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime,
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data[item] = `%${this.searchParams[item]}%`
        }
      })
      this.$store.dispatch('HistoryWarningListByPage', data).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
        })
      })
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
        areaCode: that.$ls.get('areaCode'),
        startTime: that.startTime,
        endTime: that.endTime
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data[item] = `%${this.searchParams[item]}%`
        }
      })
      this.$store
        .dispatch('WaringExp', data)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '历史报警信息.xls'
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
