<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电站质量管理
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
      </template>
      <a-tabs defaultActiveKey="1" @change="tabsChange">
        <a-tab-pane tab="缺失运营商的充电站" key="1"></a-tab-pane>
        <a-tab-pane tab="地区编码错误的充电站" key="2"></a-tab-pane>
        <a-tab-pane tab="缺失充电桩的充电站" key="3"></a-tab-pane>
      </a-tabs>
      <a-table :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData" :pagination="pagination" :loading="tableLoading" @change="handleTableChange">
        <a-icon slot="filterIcon" slot-scope="filtered" type="search" :class="filtered ? 'ant-pro-active-icon' : undefined"/>
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" style="padding: 8px">
          <a-input
            v-ant-ref="c => searchInput = c"
            :placeholder="`搜索 ${column.title}`"
            v-model="searchParams[column.dataIndex]"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(confirm, column.dataIndex)"
            style="width: 188px; margin-bottom: 8px; display: block;"
          />
          <a-button
            type="primary"
            @click="() => handleSearch(confirm, column.dataIndex)"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
          >搜索</a-button>
          <a-button
            @click="() => handleReset(clearFilters,column.dataIndex)"
            size="small"
            style="width: 90px"
          >重置</a-button>
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
          key: 'rn',
          dataIndex: 'rn'
        },
        {
          title: '充电站名称',
          dataIndex: 'stationname',
          key: 'stationname',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationname'
          }
        },
        {
          title: '充电站地址',
          key: 'address',
          dataIndex: 'address'
        },
        {
          title: '所属地区',
          dataIndex: 'areaCode',
          key: 'areaCode'
        },
        {
          title: '所属运营商',
          key: 'operatorid',
          dataIndex: 'operatorid'
        },
        {
          title: '充电站类型',
          key: 'stationtype',
          dataIndex: 'stationtype'
        },
        {
          title: '站点状态',
          key: 'stationstatus',
          dataIndex: 'stationstatus'
        },
        {
          title: '站点电话',
          key: 'stationtel',
          dataIndex: 'stationtel'
        },
        {
          title: '建设场所',
          key: 'construction',
          dataIndex: 'construction'
        },
        {
          title: '经度',
          key: 'stationlng',
          dataIndex: 'stationlng'
        },
        {
          title: '纬度',
          key: 'stationlat',
          dataIndex: 'stationlat'
        }
      ],
      // 地区数据
      areaData: [],
      // 所属运营商下拉数据
      operatorData: [],
      // 充电站类型数据
      stationTypeData: [],
      // 站点状态数据
      stationStatusData: [],
      // 建设场所数据
      stationConstructionData: [],
      // 导出过滤
      filtersExp: null,
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
    var that = this;
    // 地区下拉
    const areaParams = {
      areaCode: this.$ls.get('areaCode')
    }
    this.$store
      .dispatch("ListAdministrativeOfArea", areaParams)
      .then(res => {
        that.areaData = res;
      })
      .catch(error => {});
    // 所属运营商下拉
    const operatorParams = {
      basic: {
        pageNum: 1,
        pageSize: 100,
      },
      params: [{
        field: "areaCode",
        value: this.$ls.get('areaCode')
      }]
    }
    this.$store
      .dispatch("ListStakeOperatorByPage", operatorParams)
      .then(res => {
        that.operatorData = res.list;
      })
      .catch(error => {});
    // 充电站类型
    const stationTypeParams = [
      {
        field: "type",
        value: "站点类型"
      }
    ]
    this.$store
      .dispatch("Listcodeandname", stationTypeParams)
      .then(res => {
        that.stationTypeData = res.list;
      })
      .catch(error => {});
    // 站点状态
    const stationStatusParams = [
      {
        field: "type",
        value: "站点状态"
      }
    ]
    this.$store
      .dispatch("Listcodeandname", stationStatusParams)
      .then(res => {
        that.stationStatusData = res.list;
      })
      .catch(error => {});
    // 建设场所
    const stationConstructionParams = [
      {
        field: "type",
        value: "建设场所"
      }
    ]
    this.$store
      .dispatch("Listcodeandname", stationConstructionParams)
      .then(res => {
        that.stationConstructionData = res.list;
      })
      .catch(error => {});
    // 初始化表格数据
    this.handleTableChange();
  },
  mounted () {

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
    handleTableChange(pagination, filters, sorter) {
      var that = this;
      this.filtersExp = filters
      this.tableLoading = true;
      const data = {
        areaCode: this.$ls.get('areaCode'),
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      };
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.stationName = `${this.searchParams[item]}`
        }
      });
      if(that.flag == '1'){
        this.$store.dispatch("StationMissingMerchant", data).then(res => {
          this.tableDataRn = res;
          this.tableData = res.list;
          this.pagination.total = res.total;
          this.tableLoading = false;
          this.tableData.forEach((item, index) => {
            item.rn = that.tableDataRn.startRow + index;
            that.areaData.forEach(itemn => {
              if(item.areaCode == itemn.areaCode){
                item.areaCode = itemn.areaName
              }
            })
            that.operatorData.forEach(itemope => {
              if(itemope != null){
                if(item.operatorid == itemope.merchantNo){
                  item.operatorid = itemope.merchantAbbr
                }
              }
            })
            that.stationTypeData.forEach(itemtype => {
              if(itemtype != null){
                if(item.stationtype == itemtype.code){
                  item.stationtype = itemtype.name
                }
              }
            })
            that.stationStatusData.forEach(itemstatus => {
              if(itemstatus != null){
                if(item.stationstatus == itemstatus.code){
                  item.stationstatus = itemstatus.name
                }
              }
            })
            that.stationConstructionData.forEach(itemcon => {
              if(itemcon != null){
                if(item.construction == itemcon.code){
                  item.construction = itemcon.name
                }
              }
            })
          });
        });
      }else if(that.flag == '2'){
        this.$store.dispatch("StationHasErrorAreaCode", data).then(res => {
          this.tableDataRn = res;
          this.tableData = res.list;
          this.pagination.total = res.total;
          this.tableLoading = false;
          this.tableData.forEach((item, index) => {
            item.rn = that.tableDataRn.startRow + index;
            that.areaData.forEach(itemn => {
              if(item.areaCode == itemn.areaCode){
                item.areaCode = itemn.areaName
              }
            })
            that.operatorData.forEach(itemope => {
              if(itemope != null){
                if(item.operatorid == itemope.merchantNo){
                  item.operatorid = itemope.merchantAbbr
                }
              }
            })
            that.stationTypeData.forEach(itemtype => {
              if(itemtype != null){
                if(item.stationtype == itemtype.code){
                  item.stationtype = itemtype.name
                }
              }
            })
            that.stationStatusData.forEach(itemstatus => {
              if(itemstatus != null){
                if(item.stationstatus == itemstatus.code){
                  item.stationstatus = itemstatus.name
                }
              }
            })
            that.stationConstructionData.forEach(itemcon => {
              if(itemcon != null){
                if(item.construction == itemcon.code){
                  item.construction = itemcon.name
                }
              }
            })
          });
        });
      }else if(that.flag == '3'){
        this.$store.dispatch("StationNoStakeList", data).then(res => {
          this.tableDataRn = res;
          this.tableData = res.list;
          this.pagination.total = res.total;
          this.tableLoading = false;
          this.tableData.forEach((item, index) => {
            item.rn = that.tableDataRn.startRow + index;
            that.areaData.forEach(itemn => {
              if(item.areaCode == itemn.areaCode){
                item.areaCode = itemn.areaName
              }
            })
            that.operatorData.forEach(itemope => {
              if(itemope != null){
                if(item.operatorid == itemope.merchantNo){
                  item.operatorid = itemope.merchantAbbr
                }
              }
            })
            that.stationTypeData.forEach(itemtype => {
              if(itemtype != null){
                if(item.stationtype == itemtype.code){
                  item.stationtype = itemtype.name
                }
              }
            })
            that.stationStatusData.forEach(itemstatus => {
              if(itemstatus != null){
                if(item.stationstatus == itemstatus.code){
                  item.stationstatus = itemstatus.name
                }
              }
            })
            that.stationConstructionData.forEach(itemcon => {
              if(itemcon != null){
                if(item.construction == itemcon.code){
                  item.construction = itemcon.name
                }
              }
            })
          });
        });
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
    // 导出功能
    expTable(){
      var that = this;
      const params = {
          areaCode: this.$ls.get('areaCode')
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params.stationName = `${this.searchParams[item]}`
        }
      });
      if(that.flag == '1'){
        this.$store.dispatch("StationMissingMerchantExp", params).then(res => {
          const blob = new Blob([res],{type:'application/vnd.ms-excel'})
          let fileName = '缺失运营商的充电站.xls'
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link);
        }).catch(error => {
          console.log(error)
        });
      }else if(that.flag == '2'){
        this.$store.dispatch("StationHasErrorAreaCodeExp", params).then(res => {
          const blob = new Blob([res],{type:'application/vnd.ms-excel'})
          let fileName = '地区编码错误的充电站.xls'
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link);
        }).catch(error => {
          console.log(error)
        });
      }else if(that.flag == '3'){
        this.$store.dispatch("StationNoStakeListExp", params).then(res => {
          const blob = new Blob([res],{type:'application/vnd.ms-excel'})
          let fileName = '缺失充电桩的充电站.xls'
          const link = document.createElement('a')
          link.download = fileName
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          document.body.appendChild(link)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link);
        }).catch(error => {
          console.log(error)
        });
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
