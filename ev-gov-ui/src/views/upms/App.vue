<template>
  <div style="margin-bottom: 24px;">
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>应用管理
        </span>
      </template>
      <template slot="extra">
        <a-tooltip title="新增应用">
          <a-button
            size="small"
            style="margin-right:8px;"
            type="primary"
            icon="plus"
            @click="addFormVisible = true"
          ></a-button>
        </a-tooltip>
        <a-popconfirm title="确认删除?" @confirm="delApp" okText="是" cancelText="否">
          <a-tooltip :title="selectedRowKeys.length>1?'删除多个应用':'删除应用'">
            <a-button v-show="selectedRowKeys.length > 0" size="small" style="margin-right:8px;" type="danger" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group
              @change="onCheckBoxChange"
              :defaultValue="['appName','description','serialIndex','createTime','modifyTime','operation']"
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
      <a-table :scroll="{ x: true }" rowKey="id" :customRow="customRow" :loading="tableLoading" :pagination="pagination" @change="tableData" :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :dataSource="dataSource" :columns="columns">
        <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
          <div :key="col">
            <template v-if="record.editable">
              <a-input
                v-if="col==='appName'||col==='description'"
                style="margin: -5px 0"
                :value="text"
                @change="e => handleChange(e.target.value, record.id, col)"
              />
              <a-input-number
                v-else-if="col==='serialIndex'"
                :min="0"
                :step="0.1"
                style="margin: -5px 0"
                :defaultValue="text"
                @change="value => handleChange(value, record.id, col)"
              />
            </template>
            <span v-else-if="searchParams[col]&&!record.editable">
              <template
                v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))"
              >
                <mark
                  v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()"
                  :key="i"
                  class="highlight"
                >{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>{{ text }}</template>
          </div>
        </template>
        <template slot="operation" slot-scope="text, record">
          <div class="editable-row-operations">
            <span v-if="record.editable">
              <a @click="() => update(record.id)">保存</a>
              <a-popconfirm title="是否撤销未保存内容?" @confirm="() => cancel(record.id)">
                <a>取消</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="() => edit(record.id)">编辑</a>
            </span>
          </div>
        </template>
        <a-icon slot="filterIcon" slot-scope="filtered" type="search" :class="filtered ? 'ant-pro-active-icon' : undefined"/>
        <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" style="padding: 8px">
          <a-input v-ant-ref="c => searchInput = c" :placeholder="`搜索 ${column.title}`" v-model="searchParams[column.dataIndex]" @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])" @pressEnter="() => handleSearch(confirm, column.dataIndex)" style="width: 188px; margin-bottom: 8px; display: block;"/>
          <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small" style="width: 90px; margin-right: 8px">搜索</a-button>
          <a-button @click="() => handleReset(clearFilters,column.dataIndex)" size="small" style="width: 90px">重置</a-button>
        </div>
      </a-table>
    </a-card>
    <a-modal
      title="新增"
      :visible="addFormVisible"
      @cancel="handleCancel"
      @ok="addApp"
      :confirmLoading="addFormLoading"
    >
      <a-form :form="addForm">
        <a-form-item label="应用名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input
            placeholder="请输入应用名称"
            v-decorator="[ 'appName', {rules: [{ required: true, message: '请输入机构名称'}]} ]"
          />
        </a-form-item>
        <a-form-item label="描述" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-textarea placeholder="描述" v-decorator="[ 'description' ]" />
        </a-form-item>
        <a-form-item label="排序" :label-col="{ span: 7 }" :wrapper-col="{ span: 16 }">
          <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']" />
        </a-form-item>
      </a-form>
    </a-modal>
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
        appName: null,
        description: null,
        serialIndex: null
      },
      searchInput: null,
      // 行内编辑的字段
      inlineEditCol: ['appName', 'description', 'serialIndex'],
      // 新增Form
      addForm: this.$form.createForm(this),
      // 新增Modal控制
      addFormVisible: false,
      // 表格数据
      dataSource: null,
      // 确定表单Loading
      addFormLoading: false,
      // 表格源
      cacheData: null,
      // 表格选中KEY
      selectedRowKeys: [],
      // 列
      columns: [
        {
          title: '应用名称',
          dataIndex: 'appName',
          key: 'appName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'appName'
          },
          sorter: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'description'
          },
          sorter: true
        },
        {
          title: '排序',
          dataIndex: 'serialIndex',
          key: 'serialIndex',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'serialIndex'
          },
          sorter: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime',
          key: 'modifyTime',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 50,
          fixed: 'right',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '应用名称',
          dataIndex: 'appName',
          key: 'appName',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'appName'
          },
          sorter: true
        },
        {
          title: '描述',
          dataIndex: 'description',
          key: 'description',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'description'
          },
          sorter: true
        },
        {
          title: '排序',
          dataIndex: 'serialIndex',
          key: 'serialIndex',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'serialIndex'
          },
          sorter: true
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          key: 'createTime',
          sorter: true
        },
        {
          title: '修改时间',
          dataIndex: 'modifyTime',
          key: 'modifyTime',
          sorter: true
        },
        {
          title: '操作',
          dataIndex: 'operation',
          key: 'operation',
          width: 50,
          scopedSlots: { customRender: 'operation' }
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
      }
    }
  },
  created () {
    this.tableData()
  },
  methods: {
    // 更新保存
    update (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        delete target.editable
        this.dataSource = newData
        this.cacheData = newData.map(item => ({ ...item }))
      }
      const data = {
        id: target.id,
        appName: target.appName,
        serialIndex: target.serialIndex,
        description: target.description
      }
      this.$store
        .dispatch('EditApp', data)
        .then(res => {
          this.$message.success('保存成功')
          // 刷新表格应该是当页面没有editable = true,也就是都保存之后，再调用
          if (newData.filter(item => item.editable).length === 0) {
            this.tableData()
          }
        })
        .catch(error => {
          this.$message.error(error.response.data.message || '保存失败')
        })
    },
    // 编辑取消
    cancel (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
        delete target.editable
        this.dataSource = newData
      }
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
    // 自定义列事件
    onCheckBoxChange (value) {
      this.columns = this.finallyColumns.filter(item => {
        if (value.includes(item.key)) {
          return true
        }
        return false
      })
      console.log(this.columns)
    },
    // 点击编辑功能
    edit (key) {
      const newData = [...this.dataSource]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target.editable = true
        this.dataSource = newData
      }
    },
    // 行数据选择事件
    onSelectChange (selectedRowKeys, selectedRows) {
      this.selectedRowKeys = selectedRowKeys
    },
    // 行属性
    customRow (record, index) {
      return {
        on: {
          // 行单击事件
          click: (event) => {
            console.log(event.target.nodeName)
            // 排除点击功能键不选中行
            if (event.target.nodeName === 'DIV' || event.target.nodeName === 'TD') {
              if (this.selectedRowKeys.includes(record.id)) {
                this.selectedRowKeys = this.selectedRowKeys.filter(item => {
                  return item !== record.id
                })
              } else {
                this.selectedRowKeys.push(record.id)
              }
            }
          }
          /* // 行单击事件
          dblclick: (event) => {
            !this.selectedRowKeys.includes(record.id) && (this.selectedRowKeys.push(record.id))
            this.editFormVisible = true
          } */
        }
      }
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
          data.params.query.push({ field: item, value: `%${this.searchParams[item]}%` })
        }
      })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('GetApp', data).then(res => {
        this.dataSource = res.list
        this.pagination.total = res.total
        this.cacheData = this.dataSource.map(item => ({ ...item }))
        this.selectedRowKeys = []
        this.tableLoading = false
      })
    },
    // 新增应用
    addApp () {
      this.addForm.validateFields((err, values) => {
        if (!err) {
          this.addFormLoading = true
          const param = this.addForm.getFieldsValue()
          this.$store.dispatch('CreateNewApp', param).then(res => {
            this.$message.success('新增成功')
            this.addFormLoading = false
            this.tableData()
            this.handleCancel()
          }).catch((error) => {
            this.$message.error(error.response.data.message || '新增失败')
          })
        }
      })
    },
    // 删除应用
    delApp () {
      const param = {
        ids: [...this.selectedRowKeys]
      }
      this.$store
        .dispatch('DelApp', param)
        .then(res => {
          this.$message.success('删除成功')
          this.tableData()
        })
        .catch(error => {
          this.$message.error(error.response.data.message || '删除失败')
        })
    },
    // 弹窗关闭事件
    handleCancel () {
      this.addForm.resetFields()
      this.addFormVisible = false
    },
    // 搜索功能
    handleSearch (confirm, col) {
      confirm()
    },
    // 搜索弹窗重置
    handleReset (clearFilters, col) {
      clearFilters()
      this.searchParams[col] = ''
    }
  }
}
</script>

<style lang="less" scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
