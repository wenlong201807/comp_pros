<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电站档案
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group
              @change="onCheckBoxChange"
              :defaultValue="['stationname','address','areaCode','operatorid','stationtype','stationstatus','stationtel','construction','stationlng','stationlat']"
            >
              <a-row>
                <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                  <a-checkbox
                    :value="item.dataIndex"
                  >{{ item.title }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-menu>
          <a-button size="small">
            <a-icon type="appstore" />
          </a-button>
        </a-dropdown>
      </template>
      <a-table
        :scroll="{ x: true }"
        bordered
        :columns="columns"
        :dataSource="tableData"
        :loading="tableLoading"
        :pagination="pagination"
        @change="handleTableChange"
      >
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :class="filtered ? 'ant-pro-active-icon' : undefined"
        />
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
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
        stationname: null
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
          sorter: true,
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
          sorter: true,
          dataIndex: 'address'
        },
        {
          title: '所属地区',
          dataIndex: 'areaCode',
          key: 'areaCode',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '所属运营商',
          key: 'operatorid',
          dataIndex: 'operatorid',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '充电站类型',
          key: 'stationtype',
          dataIndex: 'stationtype',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '站点状态',
          key: 'stationstatus',
          dataIndex: 'stationstatus',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '站点电话',
          key: 'stationtel',
          sorter: true,
          dataIndex: 'stationtel'
        },
        {
          title: '建设场所',
          key: 'construction',
          dataIndex: 'construction',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '经度',
          key: 'stationlng',
          sorter: true,
          dataIndex: 'stationlng'
        },
        {
          title: '纬度',
          key: 'stationlat',
          sorter: true,
          dataIndex: 'stationlat'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '充电站名称',
          key: 'stationname',
          dataIndex: 'stationname',
          sorter: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationname'
          }
        },
        {
          title: '充电站地址',
          sorter: true,
          key: 'address',
          dataIndex: 'address'
        },
        {
          title: '所属地区',
          key: 'areaCode',
          sorter: true,
          dataIndex: 'areaCode'
        },
        {
          title: '所属运营商',
          key: 'operatorid',
          sorter: true,
          dataIndex: 'operatorid'
        },
        {
          title: '充电站类型',
          key: 'stationtype',
          sorter: true,
          dataIndex: 'stationtype'
        },
        {
          title: '站点状态',
          key: 'stationstatus',
          sorter: true,
          dataIndex: 'stationstatus'
        },
        {
          title: '站点电话',
          sorter: true,
          key: 'stationtel',
          dataIndex: 'stationtel'
        },
        {
          title: '建设场所',
          sorter: true,
          key: 'construction',
          dataIndex: 'construction'
        },
        {
          title: '经度',
          sorter: true,
          key: 'stationlng',
          dataIndex: 'stationlng'
        },
        {
          title: '纬度',
          key: 'stationlat',
          sorter: true,
          dataIndex: 'stationlat'
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
        operatorid: null,
        stationtype: null,
        stationstatus: null,
        construction: null
      },
      // 表格所有数据
      tableDataRn: null,
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
      filtersExp: null
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
        that.columns.forEach((itemn, index, arr) => {
          if (itemn.dataIndex == "areaCode") {
            that.areaData.forEach(item => {
              itemn.filters.push({ text: item.areaName, value: item.areaCode });
            });
          }
        });
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
        that.columns.forEach((itemn, index, arr) => {
          if (itemn.dataIndex == "operatorid") {
            res.list.forEach(item => {
              itemn.filters.push({ text: item.merchantName, value: item.merchantNo });
            });
          }
        });
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
        that.columns.forEach((itemn, index, arr) => {
          if (itemn.dataIndex == "stationtype") {
            that.stationTypeData.forEach(item => {
              itemn.filters.push({ text: item.name, value: item.code });
            });
          }
        });
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
        that.columns.forEach((itemn, index, arr) => {
          if (itemn.dataIndex == "stationstatus") {
            that.stationStatusData.forEach(item => {
              itemn.filters.push({ text: item.name, value: item.code });
            });
          }
        });
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
        that.columns.forEach((itemn, index, arr) => {
          if (itemn.dataIndex == "construction") {
            that.stationConstructionData.forEach(item => {
              itemn.filters.push({ text: item.name, value: item.code });
            });
          }
        });
      })
      .catch(error => {});
    // 初始化表格数据
    this.handleTableChange();
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
    handleTableChange(pagination, filters, sorter) {
      var that = this;
      this.filtersExp = filters
      this.tableLoading = true;
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize
        },
        params: {
          query: [],
          order: []
        }
      };
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data.params.query.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          });
        }
      });
      Object.keys(this.searchRadio).forEach(item => {
        if (filters != undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn == item) {
              if (filters[item][0] != undefined) {
                data.params.query.push({
                  field: itemn,
                  value: filters[item][0]
                });
              }
            }
          });
        }
      });
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === "ascend"
        });
      }
      this.$store.dispatch("StationListByPage", data).then(res => {
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
                item.operatorid = itemope.merchantName
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
      const params = [
        {
          field: "areaCode",
          value: this.$ls.get('areaCode')
        }
      ]
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          });
        }
      });
      Object.keys(this.searchRadio).forEach(item => {
        if (that.filtersExp != undefined) {
          Object.keys(that.filtersExp).forEach(itemn => {
            if (itemn == item) {
              if (that.filtersExp[item][0] != undefined) {
                params.push({
                  field: itemn,
                  value: that.filtersExp[item][0]
                });
              }
            }
          });
        }
      });
      debugger
      this.$store.dispatch("StationExp", params).then(res => {
        debugger
        const blob = new Blob([res],{type:'application/vnd.ms-excel'})
        let fileName = '充电站档案.xls'
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
</script>

<style lang="less" scoped>
</style>
