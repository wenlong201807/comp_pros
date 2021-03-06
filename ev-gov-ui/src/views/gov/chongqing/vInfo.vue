<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>车辆档案信息
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
              :defaultValue="['vehicleNo','vin','manufacturerAbbr','vehicleSeriesName','vehiclePurpose','ratedVoltage','vehicleTypeName']"
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
  data() {
    return {
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
      // 表格数据
      tableData: [],
      // 列
      columns: [
        {
          title: "序号",
          key: "rn",
          dataIndex: "rn"
        },
        {
          title: "车牌号",
          key: "vehicleNo",
          dataIndex: "vehicleNo",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "vehicleNo"
          },
          sorter: true
        },
        {
          title: "VIN",
          key: "vin",
          dataIndex: "vin",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "vin"
          },
          sorter: true
        },
        {
          title: "生产厂家",
          key: "manufacturerAbbr",
          dataIndex: "manufacturerAbbr",
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: "品牌",
          key: "vehicleSeriesName",
          dataIndex: "vehicleSeriesName",
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: "车辆用途",
          key: "vehiclePurpose",
          dataIndex: "vehiclePurpose",
          sorter: true
        },
        {
          title: "额定电压",
          key: "ratedVoltage",
          dataIndex: "ratedVoltage",
          sorter: true
        },
        {
          title: "车辆型号",
          key: "vehicleTypeName",
          dataIndex: "vehicleTypeName",
          sorter: true
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: "车牌号",
          key: "vehicleNo",
          dataIndex: "vehicleNo",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "vehicleNo"
          },
          sorter: true
        },
        {
          title: "VIN",
          key: "vin",
          dataIndex: "vin",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "vin"
          },
          sorter: true
        },
        {
          title: "生产厂家",
          key: "manufacturerAbbr",
          dataIndex: "manufacturerAbbr",
          sorter: true
        },
        {
          title: "品牌",
          key: "vehicleSeriesName",
          dataIndex: "vehicleSeriesName",
          sorter: true
        },
        {
          title: "车辆用途",
          key: "vehiclePurpose",
          dataIndex: "vehiclePurpose",
          sorter: true
        },
        {
          title: "额定电压",
          key: "ratedVoltage",
          dataIndex: "ratedVoltage",
          sorter: true
        },
        {
          title: "车辆型号",
          key: "vehicleTypeName",
          dataIndex: "vehicleTypeName",
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
      // 导出过滤
      filtersExp: null
    }
  },
  created() {
    // 车辆品牌下拉
    var that = this;
    const params = [
      {
        field: "areaCode",
        value: this.$ls.get('areaCode')
      }
    ];
    this.$store
      .dispatch("GroupStatisticsByBrand", params)
      .then(res => {
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex == "vehicleSeriesName") {
            res.forEach(item => {
              arr[index].filters.push({ text: item.name, value: item.name });
            });
          }
        });
      })
      .catch(error => {});
    // 车辆生产厂家下拉
    this.$store
      .dispatch("GroupStatisticsByFactory", params)
      .then(res => {
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex == "manufacturerAbbr") {
            res.forEach(item => {
              arr[index].filters.push({ text: item.name, value: item.name });
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
    handleSearch(confirm, col) {
      confirm()
    },
    // 搜索弹窗重置
    handleReset(clearFilters, col) {
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
          pageSize: this.pagination.pageSize,
          isQueryMileage: false
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
      this.$store.dispatch("VehicleList", data).then(res => {
        this.tableDataRn = res;
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.tableLoading = false;
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index;
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
    expTable(){
      var that = this;
      const data = {
        basic: {
          isQueryMileage: false
        },
        params: [
          {
            field: "areaCode",
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
      this.$store.dispatch("VehicleExp", data).then(res => {
        const blob = new Blob([res],{type:'application/vnd.ms-excel'})
        let fileName = '车辆档案信息.xls'
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
