<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电站运营情况展示
        </span>
      </template>
      <template slot="extra">
        <a-range-picker @change="onChange" :defaultValue="defaultValue" style="margin-right:8px;" size="small" />
        <a-tooltip title="导出表格">
          <a-button @click="expTable" style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group
              @change="onCheckBoxChange"
              :defaultValue="['stationName','address','areaCode','ele','times','startTime']"
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
import moment from 'moment'
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
      // 起止时间
      startTime: '',
      endTime: '',
      // 列
      columns: [
        {
          title: '序号',
          key: 'rn',
          dataIndex: 'rn'
        },
        {
          title: '充电站名称',
          dataIndex: 'stationName',
          key: 'stationName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationName'
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
          key: 'areaCode',
          filters: [],
          filterMultiple: false
        },
        {
          title: '充电电量（千瓦时）',
          key: 'ele',
          dataIndex: 'ele'
        },
        {
          title: '充电次数',
          key: 'times',
          dataIndex: 'times'
        },
        {
          title: '时间',
          key: 'startTime',
          dataIndex: 'startTime'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '充电站名称',
          dataIndex: 'stationName',
          key: 'stationName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'stationName'
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
          title: '充电电量',
          key: 'ele',
          dataIndex: 'ele'
        },
        {
          title: '充电次数',
          key: 'times',
          dataIndex: 'times'
        },
        {
          title: '时间',
          key: 'startTime',
          dataIndex: 'startTime'
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
        areaCode: null
      },
      // 表格所有数据
      tableDataRn: null,
      // 地区数据
      areaData: [],
      // 导出过滤
      filtersExp: null
    }
  },
  created () {
    var that = this;
    // 起止时间
    this.startTime = moment(new Date())
      .subtract(3, 'days')
      .format('YYYY-MM-DD')
    this.endTime = moment(new Date()).format('YYYY-MM-DD')
    this.defaultValue = [
      moment(moment(new Date()).subtract(3, 'days'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ];
    // 地区下拉
    const areaParams = {
      areaCode: this.$ls.get('areaCode')
    }
    this.$store
      .dispatch("ListAdministrativeOfArea", areaParams)
      .then(res => {
        that.areaData = res;
        that.columns.forEach((item, index, arr) => {
          if (arr[index].dataIndex == "areaCode") {
            res.forEach(item => {
              arr[index].filters.push({ text: item.areaName, value: item.areaCode });
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
    // 改变事件
    onChange (date, dateString) {
      console.log(date, dateString);
      this.startTime = dateString[0]
      this.endTime = dateString[1]
      this.handleTableChange()
    },
    handleTableChange(pagination, filters, sorter) {
      var that = this;
      this.filtersExp = filters
      this.tableLoading = true;
      const data = {
        areaCode: this.$ls.get('areaCode'),
        merchantNo: this.$ls.get('merchantNo'),
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        startTime: this.startTime,
        endTime: this.endTime
      };
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          data[item] = `%${this.searchParams[item]}%`
        }
      })
      Object.keys(this.searchRadio).forEach(item => {
        if (filters !== undefined) {
          Object.keys(filters).forEach(itemn => {
            if (itemn === item) {
              if (filters[item][0] !== undefined) {
                data[itemn] = filters[item][0]
              }
            }
          })
        }
      })
      this.$store.dispatch("OpeStationRunInfo", data).then(res => {
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
      const params = {
        areaCode: this.$ls.get('areaCode'),
        merchantNo: this.$ls.get('merchantNo'),
        startTime: this.startTime,
        endTime: this.endTime
      }
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params[item]= `${this.searchParams[item]}`
        }
      });
      Object.keys(this.searchRadio).forEach(item => {
        if (that.filtersExp != undefined) {
          Object.keys(that.filtersExp).forEach(itemn => {
            if (itemn == item) {
              if (that.filtersExp[item][0] != undefined) {
                params[itemn] = that.filtersExp[item][0]
              }
            }
          });
        }
      });
      this.$store.dispatch("OpeStationRunInfoExp", params).then(res => {
        const blob = new Blob([res],{type:'application/vnd.ms-excel'})
        let fileName = '充电站运营情况.xls'
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
