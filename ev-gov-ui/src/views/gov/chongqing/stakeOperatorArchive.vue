<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>运营商档案
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
              :defaultValue="['merchantNo','merchantName','merchantAbbr','merchantAdd','contactor','contactInf']"
            >
              <a-row>
                <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                  <a-checkbox
                    v-if="item.dataIndex !=='operation'"
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
        merchantNo: null,
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
          dataIndex: 'merchantNo',
          sorter: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'merchantNo'
          }
        },
        {
          title: '运营商名称',
          key: 'merchantName',
          dataIndex: 'merchantName',
          sorter: true,
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'merchantName'
          }
        },
        {
          title: '运营商简称',
          sorter: true,
          key: 'merchantAbbr',
          dataIndex: 'merchantAbbr'
        },
        {
          title: '地址',
          key: 'merchantAdd',
          sorter: true,
          dataIndex: 'merchantAdd'
        },
        {
          title: '联系人',
          key: 'contactor',
          sorter: true,
          dataIndex: 'contactor'
        },
        {
          title: '联系电话',
          key: 'contactInf',
          sorter: true,
          dataIndex: 'contactInf'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '运营商编号',
          dataIndex: 'merchantNo',
          sorter: true,
          key: 'merchantNo',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'merchantNo'
          }
        },
        {
          title: '运营商名称',
          dataIndex: 'merchantName',
          sorter: true,
          key: 'merchantName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'merchantName'
          }
        },
        {
          title: '运营商简称',
          dataIndex: 'merchantAbbr',
          sorter: true,
          key: 'merchantAbbr'
        },
        {
          title: '地址',
          key: 'merchantAdd',
          sorter: true,
          dataIndex: 'merchantAdd'
        },
        {
          title: '联系人',
          key: 'contactor',
          sorter: true,
          dataIndex: 'contactor'
        },
        {
          title: '联系电话',
          key: 'contactInf',
          sorter: true,
          dataIndex: 'contactInf'
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
    // 初始化表格数据
    this.handleTableChange();
  },
  methods: {
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    handleTableChange(pagination, filters, sorter) {
      var that = this;
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
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === "ascend"
        });
      }
      this.$store.dispatch("OperatorListByPage", data).then(res => {
        this.tableDataRn = res;
        this.tableData = res.list;
        this.pagination.total = res.total;
        this.tableLoading = false;
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index;
        });
      });
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
      this.$store.dispatch("StakeOperatorExp", params).then(res => {
        const blob = new Blob([res],{type:'application/vnd.ms-excel'})
        let fileName = '运营商档案.xls'
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
