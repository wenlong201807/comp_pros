<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电桩档案
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['equipmentid','stationName','areaCode','manufacturername','powerinf','productiondate','equipmenttype']">
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
export default {
  data () {
    return {
      // 表格Loading
      tableLoading: false,
      // 过滤条件
      searchParams: {
        stationName: null
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
          title: '设备编码',
          key: 'equipmentid',
          sorter: true,
          dataIndex: 'equipmentid'
        },
        {
          title: '充电站名称',
          key: 'stationName',
          sorter: true,
          dataIndex: 'stationName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationName'
          }
        },
        {
          title: '所属地区',
          key: 'areaCode',
          sorter: true,
          dataIndex: 'areaCode',
          filters: [],
          filterMultiple: false
        },
        {
          title: '设备运营商',
          key: 'manufacturername',
          sorter: true,
          dataIndex: 'manufacturername',
          filters: [],
          filterMultiple: false
        },
        {
          title: '额定功率',
          key: 'powerinf',
          sorter: true,
          dataIndex: 'powerinf'
        },
        {
          title: '设备生产日期',
          key: 'productiondate',
          sorter: true,
          dataIndex: 'productiondate'
        },
        {
          title: '设备类型',
          key: 'equipmenttype',
          sorter: true,
          dataIndex: 'equipmenttype',
          filters: [],
          filterMultiple: false
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '设备编码',
          key: 'equipmentid',
          sorter: true,
          dataIndex: 'equipmentid'
        },
        {
          title: '充电站名称',
          key: 'stationName',
          sorter: true,
          dataIndex: 'stationName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationName'
          }
        },
        {
          title: '所属地区',
          key: 'areaCode',
          sorter: true,
          dataIndex: 'areaCode'
        },
        {
          title: '设备运营商',
          key: 'manufacturername',
          sorter: true,
          dataIndex: 'manufacturername'
        },
        {
          title: '额定功率',
          key: 'powerinf',
          sorter: true,
          dataIndex: 'powerinf'
        },
        {
          title: '设备生产日期',
          key: 'productiondate',
          sorter: true,
          dataIndex: 'productiondate'
        },
        {
          title: '设备类型',
          key: 'equipmenttype',
          sorter: true,
          dataIndex: 'equipmenttype'
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
        areaCode: null,
        manufacturername: null,
        equipmenttype: null
      },
      // 表格所有数据
      tableDataRn: null,
      // 地区数据
      areaData: [],
      // 设备运营商下拉数据
      manufacturerData: [],
      // 设备类型数据
      stakeTypeData: [],
      // 导出过滤
      filtersExp: null
    }
  },
  created () {
    var that = this
    // 地区下拉
    const areaParams = {
      areaCode: this.$ls.get('areaCode')
    }
    this.$store
      .dispatch('ListAdministrativeOfArea', areaParams)
      .then(res => {
        that.areaData = res
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex === 'areaCode') {
            res.forEach(item => {
              arr[index].filters.push({
                text: item.areaName,
                value: item.areaCode
              })
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
    // 设备生产商下拉
    const manufacturerParams = {
      basic: {
        pageNum: 1,
        pageSize: 100
      },
      params: [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
    }
    this.$store
      .dispatch('ListStakeProduceOperatorByPage', manufacturerParams)
      .then(res => {
        that.manufacturerData = res.list
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex === 'manufacturername') {
            that.manufacturerData.forEach(item => {
              arr[index].filters.push({
                text: item.merchantName,
                value: item.merchantName
              })
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
    // 设备类型
    const stakeTypeParams = [
      {
        field: 'type',
        value: '设备类型'
      }
    ]
    this.$store
      .dispatch('Listcodeandname', stakeTypeParams)
      .then(res => {
        that.stakeTypeData = res.list
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex === 'equipmenttype') {
            that.stakeTypeData.forEach(item => {
              arr[index].filters.push({ text: item.name, value: item.code })
            })
          }
        })
      })
      .catch(error => {
        console.log(error)
      })
    // 初始化表格数据
    this.handleTableChange()
  },
  methods: {
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    // 搜索弹窗重置
    handleReset (clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    handleTableChange (pagination, filters, sorter) {
      var that = this
      this.filtersExp = filters
      this.tableLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
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
        if (filters !== undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn === item) {
              if (filters[item][0] !== undefined) {
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
      this.$store.dispatch('StakeListByPage', data).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
          that.areaData.forEach(itemn => {
            if (item.areaCode === itemn.areaCode) {
              item.areaCode = itemn.areaName
            }
          })
          that.manufacturerData.forEach(itemope => {
            if (itemope != null) {
              if (item.manufacturername === itemope.merchantName) {
                item.manufacturername = itemope.merchantName
              }
            }
          })
          that.stakeTypeData.forEach(itemtype => {
            if (itemtype != null) {
              if (item.equipmenttype === Number(itemtype.code)) {
                item.equipmenttype = itemtype.name
              }
            }
          })
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
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params.push({
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
                params.push({
                  field: itemn,
                  value: that.filtersExp[item][0]
                })
              }
            }
          })
        }
      })
      this.$store
        .dispatch('StakeExp', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '充电桩档案.xls'
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
