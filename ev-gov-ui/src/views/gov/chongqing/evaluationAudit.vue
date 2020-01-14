<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>充电站评价审核
        </span>
      </template>
      <template slot="extra">

        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['rn','stationid','phonenum','evaluationcontent','evaluationgrade','environmentgrade','pricegrade','servicegrade','evaluationpic1','evaluationpic2','evaluationpic3','evaluationpic4','evaluationpic5','evaluationtime','supportnum','opposenum','evaluationstatus','tags','option']">
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

          <a-button v-if="record.evaluationpic1===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic1')">查看</a-button>

        </template>
        <template slot="lookBtn2" slot-scope="text, record">

          <a-button v-if="record.evaluationpic2===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic2')">查看</a-button>
        </template>
        <template slot="lookBtn3" slot-scope="text, record">

          <a-button v-if="record.evaluationpic3===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic3')">查看</a-button>
        </template>
        <template slot="lookBtn4" slot-scope="text, record">

          <a-button v-if="record.evaluationpic4===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic4')">查看</a-button>
        </template>
        <template slot="lookBtn5" slot-scope="text, record">

          <a-button v-if="record.evaluationpic5===null" type="primary" disabled>查看</a-button>
          <a-button v-else type="primary" @click="showImg(record,'pic5')">查看</a-button>
        </template>
        <template slot="option" slot-scope="text, record">

          <a-button v-if=" record.evaluationstatus==='待审核'" type="primary" @click="toExamine(record)">审核</a-button>
          <a-button v-else type="primary" disabled>已审核</a-button>
        </template>
        <template slot="tags" slot-scope="text, record">

          <span v-if="text===0">未删除</span>
          <span v-if="text===1">删除</span>
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
          title: '充电站ID',
          key: 'stationid',
          dataIndex: 'stationid'
        },

        {
          title: '联系电话',
          key: 'phonenum',
          dataIndex: 'phonenum'
        },

        {
          title: '评价内容',
          key: 'evaluationcontent',
          dataIndex: 'evaluationcontent'
        },
        {
          title: '评价等级',
          key: 'evaluationgrade',
          dataIndex: 'evaluationgrade'
        },
        {
          title: '环境等级',
          key: 'environmentgrade',
          dataIndex: 'environmentgrade'
        },
        {
          title: '价格等级',
          key: 'pricegrade',
          dataIndex: 'pricegrade'
        },
        {
          title: '服务等级',
          key: 'servicegrade',
          dataIndex: 'servicegrade'
        },
        {
          title: '图片',
          key: 'evaluationpic1',
          dataIndex: 'evaluationpic1',
          scopedSlots: { customRender: 'lookBtn1' }
        },

        {
          title: '图片',
          key: 'evaluationpic2',
          dataIndex: 'evaluationpic2',
          scopedSlots: { customRender: 'lookBtn2' }
        },
        {
          title: '图片',
          key: 'evaluationpic3',
          dataIndex: 'evaluationpic3',
          scopedSlots: { customRender: 'lookBtn3' }
        },
        {
          title: '图片',
          key: 'evaluationpic4',
          dataIndex: 'evaluationpic4',
          scopedSlots: { customRender: 'lookBtn4' }
        },
        {
          title: '图片',
          key: 'evaluationpic5',
          dataIndex: 'evaluationpic5',
          scopedSlots: { customRender: 'lookBtn5' }
        },
        {
          title: '评价时间',
          key: 'evaluationtime',
          dataIndex: 'evaluationtime'
        },
        {
          title: '点赞数',
          key: 'supportnum',
          dataIndex: 'supportnum'
        },
        {
          title: '反对数',
          key: 'opposenum',
          dataIndex: 'opposenum'
        },
        {
          title: '评价状态',
          key: 'evaluationstatus',
          dataIndex: 'evaluationstatus'
        },
        {
          title: '标记',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '操作',
          key: 'option',
          dataIndex: 'option',
          fixed: 'right',
          scopedSlots: { customRender: 'option' }
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
          title: '充电站ID',
          key: 'stationid',
          dataIndex: 'stationid'
        },

        {
          title: '联系电话',
          key: 'phonenum',
          dataIndex: 'phonenum'
        },

        {
          title: '评价内容',
          key: 'evaluationcontent',
          dataIndex: 'evaluationcontent'
        },
        {
          title: '评价等级',
          key: 'evaluationgrade',
          dataIndex: 'evaluationgrade'
        },
        {
          title: '环境等级',
          key: 'environmentgrade',
          dataIndex: 'environmentgrade'
        },
        {
          title: '价格等级',
          key: 'pricegrade',
          dataIndex: 'pricegrade'
        },
        {
          title: '服务等级',
          key: 'servicegrade',
          dataIndex: 'servicegrade'
        },
        {
          title: '图片',
          key: 'evaluationpic1',
          dataIndex: 'evaluationpic1',
          scopedSlots: { customRender: 'lookBtn1' }
        },

        {
          title: '图片',
          key: 'evaluationpic2',
          dataIndex: 'evaluationpic2',
          scopedSlots: { customRender: 'lookBtn2' }
        },
        {
          title: '图片',
          key: 'evaluationpic3',
          dataIndex: 'evaluationpic3',
          scopedSlots: { customRender: 'lookBtn3' }
        },
        {
          title: '图片',
          key: 'evaluationpic4',
          dataIndex: 'evaluationpic4',
          scopedSlots: { customRender: 'lookBtn4' }
        },
        {
          title: '图片',
          key: 'evaluationpic5',
          dataIndex: 'evaluationpic5',
          scopedSlots: { customRender: 'lookBtn5' }
        },
        {
          title: '评价时间',
          key: 'evaluationtime',
          dataIndex: 'evaluationtime'
        },
        {
          title: '点赞数',
          key: 'supportnum',
          dataIndex: 'supportnum'
        },
        {
          title: '反对数',
          key: 'opposenum',
          dataIndex: 'opposenum'
        },
        {
          title: '评价状态',
          key: 'evaluationstatus',
          dataIndex: 'evaluationstatus'
        },
        {
          title: '标记',
          key: 'tags',
          dataIndex: 'tags',
          scopedSlots: { customRender: 'tags' }
        },
        {
          title: '操作',
          key: 'option',
          dataIndex: 'option',
          fixed: 'right',
          scopedSlots: { customRender: 'option' }
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
    toExamine (record) {
      var that = this
      this.$confirm({
        title: '是否通过审核?',
        okText: '通过',
        cancelText: '未通过',

        onOk () {
          that.toExamineOk(record)
        },
        onCancel () {
          that.toExamineCancel(record)
        },
        class: 'test'
      })
    },
    toExamineOk (record) {
      const data = {
        basic: {},
        params: {
          query: [],
          order: []
        }
      }
      delete record.evaluationpic1
      delete record.evaluationpic2
      delete record.evaluationpic3
      delete record.evaluationpic4
      delete record.evaluationpic5
      record.status = '通过'
      data.basic = record
      this.$store.dispatch('ApprovalProcess', data).then(res => {
        this.$message.success('审核通过')
        this.handleTableChange()
      })
    },
    toExamineCancel (record) {
      const data = {
        basic: {},
        params: {
          query: [],
          order: []
        }
      }
      delete record.evaluationpic1
      delete record.evaluationpic2
      delete record.evaluationpic3
      delete record.evaluationpic4
      delete record.evaluationpic5
      record.status = '未通过'
      data.basic = record

      this.$store.dispatch('ApprovalProcess', data).then(res => {
        this.$message.success('审核不通过')
        this.handleTableChange()
      })
    },
    showImg (record, img) {
      this.imgUrl = ''
      if (img === 'pic1') {
        this.imgUrl = record.evaluationpic1
      } else if (img === 'pic2') {
        this.imgUrl = record.evaluationpic2
      } else if (img === 'pic3') {
        this.imgUrl = record.evaluationpic3
      } else if (img === 'pic4') {
        this.imgUrl = record.evaluationpic4
      } else if (img === 'pic5') {
        this.imgUrl = record.evaluationpic5
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
      this.$store.dispatch('EvaluationInfoListByPage', data).then(res => {
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
