<template>
  <div style="margin-bottom: 24px;">
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>测试数据统计表
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="导出表格">
          <a-button @click="exportTable" style="margin-right:8px;" size="small" type="primary" icon="download">
          </a-button>
        </a-tooltip>
        <a-tooltip title="计算">
          <a-button @click="calculatorTable" style="margin-right:8px;" size="small" type="primary" icon="calculator">
          </a-button>
        </a-tooltip>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['rn','testCategory','testItem','number','qualified','disqualification','qualificationRate','operation']">
              <a-row>
                <a-col v-for="item in finallyColumns" :key="item.dataIndex">
                  <a-checkbox v-if="item.dataIndex !=='operation'" :value="item.dataIndex">{{ item.title }}</a-checkbox>
                </a-col>
              </a-row>
            </a-checkbox-group>
          </a-menu>
          <a-button size="small">
            <a-icon type="appstore" />
          </a-button>
        </a-dropdown>
      </template>
      <a-table :scroll="{ x: true }" rowKey="id" bordered :customRow="customRow" :loading="tableLoading"
               :pagination="pagination" @change="tableData" :dataSource="dataSource" :columns="columns">
        <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
          <div :key="col">
            <template v-if="record.editable">
              <a-input v-if="col==='appName'||col==='description'" style="margin: -5px 0" :value="text"
                       @change="e => handleChange(e.target.value, record.id, col)" />
              <a-input-number v-else-if="col==='serialIndex'" :min="0" :step="0.1" style="margin: -5px 0"
                              :defaultValue="text" @change="value => handleChange(value, record.id, col)" />
            </template>
            <span v-else-if="searchParams[col]&&!record.editable">
              <template
                v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i"
                      class="highlight">{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="action" slot-scope="text,record">
          <a v-if="record.id===29 || record.id===39 ||record.id===40" href="javascript:;" class="ant-dropdown-link"
             @click="openModal(record)">查看</a>
          <a v-else href="javascript:;" class="ant-dropdown-link" style="color:#ccc" @click="showMessage()">查看</a>
        </template>
        <template slot="qualificationRate" slot-scope="text">
          <span>{{ text }}%</span>
        </template>

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
    <a-modal width="90%" title="查看" :visible="visibleModal1" @ok="handleOk" :footer="null" @cancel="handleCancel">
      <a-table v-if="dataSource1" :scroll="{ x: true }" rowKey="rn" bordered :loading="tableLoading1"
               @change="tableData1" :dataSource="dataSource1" :columns="columns1">
      </a-table>
    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 表格Loading
      tableLoading: false,
      // 分页组件
      // 过滤条件
      searchParams: {
        appName: null,
        description: null,
        serialIndex: null
      },
      // 表格数据
      dataSource: null,
      // 表格源
      cacheData: null,
      // 表格选中KEY
      selectedRowKeys: [],
      // 列
      columns: [
        {
          title: '序号',
          key: 'rn',
          dataIndex: 'rn'
        },
        {
          title: '检测类别',
          dataIndex: 'testCategory',
          key: 'testCategory',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'testCategory'
          },
          sorter: true
        },
        {
          title: '检测项目',
          dataIndex: 'testItem',
          key: 'testItem',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'testItem'
          },
          sorter: true
        },
        {
          title: '数量',
          dataIndex: 'number',
          key: 'number',
          sorter: true
        },
        {
          title: '合格',
          dataIndex: 'qualified',
          key: 'qualified',
          sorter: true
        },
        {
          title: '不合格',
          dataIndex: 'disqualification',
          key: 'disqualification',
          sorter: true
        },
        {
          title: '合格率',
          dataIndex: 'qualificationRate',
          key: 'qualificationRate',
          sorter: true,
          scopedSlots: { customRender: 'qualificationRate' }
        },
        {
          title: '操作',
          key: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '序号',
          key: 'rn',
          dataIndex: 'rn'
        },
        {
          title: '检测类别',
          dataIndex: 'testCategory',
          key: 'testCategory',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'testCategory'
          },
          sorter: true
        },
        {
          title: '检测项目',
          dataIndex: 'testItem',
          key: 'testItem',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'testItem'
          },
          sorter: true
        },
        {
          title: '数量',
          dataIndex: 'number',
          key: 'number',
          sorter: true
        },
        {
          title: '合格',
          dataIndex: 'qualified',
          key: 'qualified',
          sorter: true
        },
        {
          title: '不合格',
          dataIndex: 'disqualification',
          key: 'disqualification',
          sorter: true
        },
        {
          title: '合格率',
          dataIndex: 'qualificationRate',
          key: 'qualificationRate',
          sorter: true,
          scopedSlots: { customRender: 'qualificationRate' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 行内编辑的字段
      inlineEditCol: ['appName', 'description', 'serialIndex'],
      pagination: {
        onChange: page => {
          this.pagination.current = page
        },
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${this.pagination.total} 条`,
        current: 1
      },
      pagination1: {
        onChange: page => {
          this.pagination1.current = page
        },
        pageSize: 10,
        total: 0,
        showTotal: total => `共 ${this.pagination1.total} 条`,
        current: 1
      },
      visibleModal1: false,
      // 表格Loading
      tableLoading1: false,
      // 表格数据
      dataSource1: null,
      // 列
      columns1: [],

      paramId: 0
    }
  },
  created () {
    this.tableData()
  },
  mounted () {},
  methods: {
    calculatorTable () {
      var data = {}
      this.tableLoading = true
      this.$store.dispatch('Start', data).then(res => {
        this.tableData()
        this.$message.success('计算成功')
      })
    },
    exportTable () {
      const params = []
      Object.keys(this.searchParams).forEach(item => {
        if (this.searchParams[item]) {
          params.push({
            field: item,
            value: `%${this.searchParams[item]}%`
          })
        }
      })

      this.$store
        .dispatch('GetTestDataListExport', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = ' 测试数据统计表.xls'
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
    },
    showMessage () {
      this.$message.warning('当前页面正在研发中')
    },
    // 加载表格数据
    tableData (pagination, filters, sorter) {
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
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('getTestDataList0', data).then(res => {
        this.dataSource = res.list
        this.pagination.total = res.total
        this.cacheData = this.dataSource.map(item => ({ ...item }))
        this.selectedRowKeys = []
        this.dataSource.forEach((item, index) => {
          item.rn = 1 + index
        })
        this.tableLoading = false
      })
    },
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    // 搜索弹窗重置
    handleReset (clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    },
    // 行属性
    customRow (record, index) {
      return {
        on: {
          // 行单击事件
          click: event => {
            // 排除点击功能键不选中行
            if (
              event.target.nodeName === 'DIV' ||
              event.target.nodeName === 'TD'
            ) {
              if (this.selectedRowKeys.includes(record.id)) {
                this.selectedRowKeys = this.selectedRowKeys.filter(item => {
                  return item !== record.id
                })
              } else {
                this.selectedRowKeys.push(record.id)
              }
            }
          }
        }
      }
    },
    // 行数据选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
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
    // 表格内编辑内容改变事件
    handleChange (value, key, column) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target[column] = value
        this.dataSource = newData
      }
    },

    // 打开弹框事件
    openModal (record) {
      this.paramId = record.id
      this.tableData1()
      this.visibleModal1 = true
    },
    handleOk (e) {
      this.visibleModal1 = false
    },
    handleCancel (e) {
      this.visibleModal1 = false
    },
    // 加载表格数据
    tableData1 (pagination, filters, sorter) {
      var number = 0
      if (this.paramId >= 1 && this.paramId <= 25) {
        number = 1
      } else if (this.paramId >= 26 && this.paramId <= 35) {
        number = 2
      } else if (this.paramId === 36) {
        number = 3
      } else if (this.paramId === 37) {
        number = 4
      } else if (this.paramId === 38) {
        number = 5
      } else if (this.paramId === 39) {
        number = 6
      } else if (this.paramId === 40) {
        number = 7
      } else if (this.paramId >= 41 && this.paramId <= 65) {
        number = 8
      } else if (this.paramId >= 66 && this.paramId <= 80) {
        number = 9
      } else if (this.paramId === 81) {
        number = 10
      } else if (this.paramId === 82) {
        number = 11
      } else if (this.paramId === 83) {
        number = 12
      } else if (this.paramId === 84) {
        number = 13
      } else if (this.paramId >= 85 && this.paramId <= 86) {
        number = 14
      }
      this.tableLoading1 = true
      const data = {
        basic: {
          pageNum: this.pagination1.current,
          pageSize: this.pagination1.pageSize,
          id: this.paramId
        },
        params: {
          query: [],
          order: []
        }
      }
      // Object.keys(this.searchParams).forEach(item => {
      //   if (this.searchParams[item]) {
      //     data.params.query.push({
      //       field: item,
      //       value: `%${this.searchParams[item]}%`
      //     })
      //   }
      // })
      // if (sorter) {
      //   data.params.order.push({
      //     field: sorter.field,
      //     value: sorter.order === 'ascend'
      //   })
      // }
      this.$store.dispatch(`getTestDataList${number}`, data).then(res => {
        this.columns1 = []
        res.headCN.forEach(item => {
          var obj = { title: item, dataIndex: '', key: '' }

          this.columns1.push(obj)
        })
        res.headUS.forEach((item, index) => {
          this.columns1[index].dataIndex = item
          this.columns1[index].key = item
        })
        this.columns1.unshift({
          title: '序号',
          key: 'rn',
          dataIndex: 'rn'
        })
        if (!res.list) {
          this.tableLoading1 = false
          return
        }
        this.dataSource1 = res.list
        this.pagination1.total = res.total
        this.cacheData1 = this.dataSource.map(item => ({ ...item }))
        // this.selectedRowKeys = []
        this.dataSource1.forEach((item, index) => {
          item.rn = 1 + index
        })
        this.tableLoading1 = false
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
