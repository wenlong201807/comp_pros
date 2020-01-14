<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>运营商质量管理
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
      </template>
      <a-tabs defaultActiveKey="1">
        <a-tab-pane tab="缺失充电站的运营商" key="1"></a-tab-pane>
      </a-tabs>
      <a-table :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData" :loading="tableLoading"
               :pagination="false" @change="handleTableChange">
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
        merchantName: null
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
          title: '运营商编号',
          key: 'merchantNo',
          dataIndex: 'merchantNo'
        },
        {
          title: '运营商名称',
          key: 'merchantName',
          dataIndex: 'merchantName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'merchantName'
          }
        },
        {
          title: '运营商简称',
          key: 'merchantAbbr',
          dataIndex: 'merchantAbbr'
        },
        {
          title: '地址',
          key: 'merchantAdd',
          dataIndex: 'merchantAdd'
        },
        {
          title: '联系人',
          key: 'contactor',
          dataIndex: 'contactor'
        },
        {
          title: '联系电话',
          key: 'contactInf',
          dataIndex: 'contactInf'
        }
      ]
    }
  },
  created () {
    // 初始化表格数据
    this.handleTableChange()
  },
  methods: {
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    handleTableChange (pagination, filters, sorter) {
      var that = this
      this.tableLoading = true
      const data = {
        areaCode: this.$ls.get('areaCode')
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.merchantName = `${this.searchParams[item]}`
        }
      })
      this.$store.dispatch('MerchantMissingStation', data).then(res => {
        this.tableData = res
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = index + 1
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
    expTable () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params[item] = `${this.searchParams[item]}`
        }
      })
      this.$store
        .dispatch('MerchantMissingStationExp', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '缺失站的运营商.xls'
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
