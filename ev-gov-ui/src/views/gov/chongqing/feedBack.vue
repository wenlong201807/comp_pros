<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>意见反馈展示
        </span>
      </template>
      <template slot="extra">

        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['rn','usrid','stationid','feedbacktype','phonenum','pic1','pic2','pic3','pic4','pic5','createtime']">
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
      <a-table rowKey="feedbackId" :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData"
               :loading="tableLoading" :pagination="pagination" @change="handleTableChange">
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
        <template slot="lookBtn1" slot-scope="text, record">

          <a-button v-if="record.pic1===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic1')">查看</a-button>

        </template>
        <template slot="lookBtn2" slot-scope="text, record">

          <a-button v-if="record.pic2===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic2')">查看</a-button>
        </template>
        <template slot="lookBtn3" slot-scope="text, record">

          <a-button v-if="record.pic3===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic3')">查看</a-button>
        </template>
        <template slot="lookBtn4" slot-scope="text, record">

          <a-button v-if="record.pic4===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic4')">查看</a-button>
        </template>
        <template slot="lookBtn5" slot-scope="text, record">

          <a-button v-if="record.pic5===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic5')">查看</a-button>
        </template>
      </a-table>
    </a-card>
    <a-modal title="图片" :width="800" :visible="visible" :confirmLoading="confirmLoading" @ok="handleSubmit"
             @cancel="handleCancel" :footer="null">
      <a-row>
        <img :src="imgUrl" style="width:100%">
      </a-row>

    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      imgUrl: '',
      confirmLoading: false,
      visible: false,
      selectedRowKeys: [],
      selectedRows: [],
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
          title: '用户ID',
          key: 'usrid',
          dataIndex: 'usrid'
        },
        {
          title: '充电站ID',
          key: 'stationid',
          dataIndex: 'stationid'
        },
        {
          title: '反馈信息类型',
          key: 'feedbacktype',
          dataIndex: 'feedbacktype'
        },
        {
          title: '联系电话',
          key: 'phonenum',
          dataIndex: 'phonenum'
        },
        {
          title: '图片',
          key: 'pic1',
          dataIndex: 'pic1',
          scopedSlots: { customRender: 'lookBtn1' }
        },
        {
          title: '图片',
          key: 'pic2',
          dataIndex: 'pic2',
          scopedSlots: { customRender: 'lookBtn2' }
        },
        {
          title: '图片',
          key: 'pic3',
          dataIndex: 'pic3',
          scopedSlots: { customRender: 'lookBtn3' }
        },
        {
          title: '图片',
          key: 'pic4',
          dataIndex: 'pic4',
          scopedSlots: { customRender: 'lookBtn4' }
        },
        {
          title: '图片',
          key: 'pic5',
          dataIndex: 'pic5',
          scopedSlots: { customRender: 'lookBtn5' }
        },
        {
          title: '创建日期',
          key: 'createtime',
          dataIndex: 'createtime'
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
          title: '用户ID',
          key: 'usrid',
          dataIndex: 'usrid'
        },
        {
          title: '充电站ID',
          key: 'stationid',
          dataIndex: 'stationid'
        },
        {
          title: '反馈信息类型',
          key: 'feedbacktype',
          dataIndex: 'feedbacktype'
        },
        {
          title: '联系电话',
          key: 'phonenum',
          dataIndex: 'phonenum'
        },
        {
          title: '图片',
          key: 'pic1',
          dataIndex: 'pic1',
          scopedSlots: { customRender: 'lookBtn1' }
        },
        {
          title: '图片',
          key: 'pic2',
          dataIndex: 'pic2',
          scopedSlots: { customRender: 'lookBtn2' }
        },
        {
          title: '图片',
          key: 'pic3',
          dataIndex: 'pic3',
          scopedSlots: { customRender: 'lookBtn3' }
        },
        {
          title: '图片',
          key: 'pic4',
          dataIndex: 'pic4',
          scopedSlots: { customRender: 'lookBtn4' }
        },
        {
          title: '图片',
          key: 'pic5',
          dataIndex: 'pic5',
          scopedSlots: { customRender: 'lookBtn5' }
        },
        {
          title: '创建日期',
          key: 'createtime',
          dataIndex: 'createtime'
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
    this.handleTableChange()
  },
  methods: {
    showImg (record, img) {
      this.imgUrl = ''
      if (img === 'pic1') {
        this.imgUrl = record.pic1
      } else if (img === 'pic2') {
        this.imgUrl = record.pic2
      } else if (img === 'pic3') {
        this.imgUrl = record.pic3
      } else if (img === 'pic4') {
        this.imgUrl = record.pic4
      } else if (img === 'pic5') {
        this.imgUrl = record.pic5
      }
      this.visible = true
    },
    handleSubmit () {},
    handleCancel () {
      this.visible = false
    },
    addFeedBack () {
      this.visible = true
    },
    editFeedBack () {},
    delFeedBack () {},
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
              if (this.selectedRowKeys.includes(record.feedbackId)) {
                this.selectedRowKeys = this.selectedRowKeys.filter(item => {
                  return item !== record.feedbackId
                })
              } else {
                this.selectedRowKeys.push(record.feedbackId)
              }
            }
          },
          // 行单击事件
          dblclick: event => {
            this.editFormVisible = true
            this.selectedRowKeys = [record.feedbackId]
            this.editResource()
          }
        }
      }
    },
    onSelectChange (selectedRowKeys, selectedRows) {
      // console.log('selectedRowKeys' + selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      // console.log('selectedRows' + JSON.stringify(selectedRows))
      this.selectedRows = selectedRows
    },
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    handleTableChange (pagination, filters, sorter) {
      var that = this
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
      this.$store.dispatch('ListByPage', data).then(res => {
        this.tableDataRn = res
        this.tableData = res.list
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
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
      this.$store
        .dispatch('StakeOperatorExp', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = '运营商档案.xls'
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
