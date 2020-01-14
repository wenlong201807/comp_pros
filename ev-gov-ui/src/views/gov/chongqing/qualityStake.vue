<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电桩质量管理
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
      </template>
      <a-tabs defaultActiveKey="1" @change="tabsChange">
        <a-tab-pane tab="缺失充电站的充电桩" key="1"></a-tab-pane>
        <a-tab-pane tab="缺失充电枪的充电桩" key="2"></a-tab-pane>
      </a-tabs>
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
        equipmentName: null
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
          dataIndex: 'equipmentid'
        },
        {
          title: '充电桩名称',
          key: 'equipmentname',
          dataIndex: 'equipmentname'
        },
        {
          title: '充电站名称',
          key: 'stationName',
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
          dataIndex: 'areaCode',
        },
        {
          title: '设备运营商',
          key: 'manufacturername',
          dataIndex: 'manufacturername',
        },
        {
          title: '额定功率',
          key: 'powerinf',
          dataIndex: 'powerinf'
        },
        {
          title: '设备生产日期',
          key: 'productiondate',
          dataIndex: 'productiondate'
        },
        {
          title: '设备类型',
          key: 'equipmenttype',
          dataIndex: 'equipmenttype',
        }
      ],
      // 地区数据
      areaData: [],
      // 设备运营商下拉数据
      manufacturerData: [],
      // 设备类型数据
      stakeTypeData: [],
      flag: '1',
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
    var that = this
    // 地区下拉
    const areaParams = {
      areaCode: this.$ls.get('areaCode')
    }
    this.$store
      .dispatch('ListAdministrativeOfArea', areaParams)
      .then(res => {
        that.areaData = res
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
    tabsChange(rank){
      this.flag = rank
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          this.searchParams[item] = null
        }
      });
      this.pagination.current = 1
      this.pagination.pageSize = 10
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
        areaCode: this.$ls.get('areaCode'),
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.equipmentName = `${this.searchParams[item]}`
        }
      });
      if(that.flag == '1'){
        this.$store.dispatch('StakeNoStationList', data).then(res => {
          this.tableDataRn = res;
          this.tableData = res.list;
          this.pagination.total = res.total;
          this.tableLoading = false;
          this.tableData.forEach((item, index) => {
            item.rn = that.tableDataRn.startRow + index;
            that.areaData.forEach(itemn => {
              if (item.areaCode === itemn.areaCode) {
                item.areaCode = itemn.areaName
              }
            })
            that.manufacturerData.forEach(itemope => {
              if (itemope != null) {
                if (item.manufacturername === itemope.merchantNo) {
                  item.manufacturername = itemope.merchantAbbr
                }
              }
            })
            that.stakeTypeData.forEach(itemtype => {
              if (itemtype != null) {
                if (item.equipmenttype === itemtype.code) {
                  item.equipmenttype = itemtype.name
                }
              }
            })
          })
        })
      }else if(that.flag == '2'){
        this.$store.dispatch('StakeNoGunList', data).then(res => {
          this.tableDataRn = res;
          this.tableData = res.list;
          this.pagination.total = res.total;
          this.tableLoading = false;
          this.tableData.forEach((item, index) => {
            item.rn = that.tableDataRn.startRow + index;
            that.areaData.forEach(itemn => {
              if (item.areaCode === itemn.areaCode) {
                item.areaCode = itemn.areaName
              }
            })
            that.manufacturerData.forEach(itemope => {
              if (itemope != null) {
                if (item.manufacturername === itemope.merchantNo) {
                  item.manufacturername = itemope.merchantAbbr
                }
              }
            })
            that.stakeTypeData.forEach(itemtype => {
              if (itemtype != null) {
                if (item.equipmenttype === itemtype.code) {
                  item.equipmenttype = itemtype.name
                }
              }
            })
          })
        })
      }
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
          params.equipmentName = `${this.searchParams[item]}`
        }
      });
      if(that.flag == '1'){
        this.$store
          .dispatch('StakeNoStationListExp', params)
          .then(res => {
            const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
            const fileName = '缺失充电站的充电桩.xls'
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
      }else if(that.flag == '2'){
        this.$store
          .dispatch('StakeNoGunListExp', params)
          .then(res => {
            const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
            const fileName = '缺失充电枪的充电桩.xls'
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
}
</script>

<style lang="less" scoped>
</style>
