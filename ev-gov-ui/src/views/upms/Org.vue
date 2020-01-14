<template>
  <div style="margin-bottom: 24px;">
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px"><div class="titleFlag"></div>组织机构管理</span>
      </template>
      <template slot="extra">
        <a-tooltip :title="selectedKeys.length > 0 ? '新增子组织机构' : '新增根组织机构'">
          <a-button v-if="!view" size="small" type="primary" icon="plus" @click="treeCreate"/>
        </a-tooltip>
        <a-popconfirm title="确认删除组织机构?" @confirm="treeViewDel" okText="是" cancelText="否">
          <a-icon slot="icon" type="question-circle-o" style="color: red" />
          <a-tooltip title="删除组织机构" :visible="treeViewDelVisible">
            <a-button v-if="!view" v-show="selectedKeys.length > 0" @mouseenter="treeViewDelVisible = true" @mouseleave="treeViewDelVisible = false" @click="treeViewDelVisible = false" size="small" type="danger" icon="delete" style="margin-left:8px;"/>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-card>
    <a-row v-if="!view" :gutter="16" style="margin-top:8px">
      <a-col :md="24" :lg="8" :xxl="7">
        <a-spin :spinning="spinning" tip="Loading...">
          <a-card :bordered="false" style="margin-bottom:24px;">
            <a-input-search style="margin-bottom: 8px;" placeholder="搜索组织机构" @change="onChange"/>
            <a-tree @expand="onExpand" :expandedKeys="expandedKeys" :treeData="orgTreeData" defaultExpandAll :autoExpandParent="autoExpandParent" draggable @drop="onDrop" style="padding-bottom:24px;width: 100%;overflow: auto;max-height: 575px" showLine  @select="onSelect">
              <template slot="title" slot-scope="{title}">
                <span v-if="title.indexOf(searchValue) > -1">
                  {{ title.substr(0, title.indexOf(searchValue)) }}
                  <span class="font-color">{{ searchValue }}</span>
                  {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
                </span>
                <span v-else>{{ title }}</span>
              </template>
            </a-tree>
          </a-card>
        </a-spin>
      </a-col>
      <a-col :md="24" :lg="16" :xxl="17">
        <a-card :bordered="false" :title="selectedRows.length > 0 && createFlag ? '新增子组织机构' : selectedRows.length === 0 && createFlag ? '新增根组织机构':'编辑'">
          <a-form :form="treeForm" layout="horizontal">
            <a-form-item label="父级机构名称" :label-col="!this.isMobile() ? { span: 8 } : {}" :wrapper-col="!this.isMobile() ? { span: 14 } : {}">
              <a-input placeholder="/" disabled v-decorator="[ 'parentName', {initialValue: parentOrg?parentOrg.title:null} ]"/>
            </a-form-item>
            <a-form-item label="机构名称" :label-col="!this.isMobile() ? { span: 8 } : {}" :wrapper-col="!this.isMobile() ? { span: 14 } : {}">
              <a-input placeholder="请输入机构名称" v-decorator="[ 'name', {rules: [{ required: true, message: '请输入机构名称'}]} ]"/>
            </a-form-item>
            <a-form-item label="机构类型" :label-col="!this.isMobile() ? { span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
              <a-radio-group v-decorator="[ 'type', {rules: [{ required: true, message: '请选择机构类型'}], initialValue: '2'} ]">
                <a-radio :value="'1'">分公司</a-radio>
                <a-radio :value="'2'">部门</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="机构简称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
              <a-input  placeholder="请输入机构简称" v-decorator="[ 'abbrName', {rules: [{ required: true, message: '请输入机构简称'}]} ]"/>
            </a-form-item>
            <a-form-item label="排序" :label-col="!this.isMobile() ? { span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
              <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex', {rules: [{ required: true, message: '请输入排序'}]} ]"/>
            </a-form-item>
            <a-form-item :wrapper-col="!this.isMobile() ? { span: 24, offset: 8 } : {}">
              <a-button type="primary" html-type="submit" @click="treeViewSave" :loading="treeFormLoading">提交</a-button>
            </a-form-item>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import { getParentKey, getParentNode, generateList, familyTreeHandler } from '@/utils/treeUtils'

export default {
  mixins: [mixin, mixinDevice],
  data () {
    return {
      // 父级组织机构
      parentOrg: null,
      // 树视图的删除按钮tooltip控制
      treeViewDelVisible: false,
      // orgTreeLoading
      spinning: true,
      // 视图 true-表格 false-树
      view: !true,
      // 组织机构树
      orgTreeData: [],
      // 组织机构树搜索
      searchValue: '',
      // 组织机构树展开
      autoExpandParent: true,
      // 组织机构树展开的节点
      expandedKeys: [],
      // 组织机构List
      orgList: [],
      // treeForm
      treeForm: this.$form.createForm(this),
      // 树视图确定表单Loading
      treeFormLoading: false,
      // orgTree选中Keys
      selectedKeys: [],
      // orgTree选中的ROW
      selectedRows: [],
      // 新增还是更新标识
      createFlag: true
    }
  },
  created () {
    this.getOrgTree()
  },
  methods: {
    // 树视图删除
    treeViewDel () {
      if (this.selectedRows[0].data.props.dataRef.children && this.selectedRows[0].data.props.dataRef.children.length > 0) {
        this.$message.error('无法删除包含子节点的组织机构')
      } else {
        const param = {
          ids: [this.selectedRows[0].data.props.dataRef.id]
        }
        this.spinning = true
        this.$store.dispatch('DelOrg', param).then(res => {
          this.$message.success('删除成功')
          this.getOrgTree()
          this.treeForm.resetFields()
          this.selectedKeys = []
          this.selectedRows = []
          this.createFlag = true
        }).catch((error) => {
          this.$message.error(error.response.data.message || '删除失败')
        })
      }
    },
    // 树视图新增
    treeViewSave () {
      // true是新增 false是更新
      this.treeForm.validateFields((err, values) => {
        if (!err) {
          this.treeFormLoading = true
          this.spinning = true
          const param = this.treeForm.getFieldsValue()
          if (this.createFlag && this.selectedRows.length > 0) {
            param.parentId = this.selectedRows[0].data.props.id
          } else if (!this.createFlag && this.selectedRows.length > 0) {
            param.id = this.selectedRows[0].data.props.id
          }
          this.$store.dispatch(this.createFlag ? 'CreateNewOrg' : 'EditOrg', param).then(res => {
            this.$message.success(this.createFlag ? '新增成功' : '更新成功')
            this.treeFormLoading = false
            this.getOrgTree()
            if (this.createFlag) {
              this.treeForm.resetFields()
            }
          }).catch((error) => {
            this.treeFormLoading = false
            this.$message.error(error.response.data.message || this.createFlag ? '新增失败' : '更新失败')
          })
        }
      })
    },
    // 树视图新增按钮
    treeCreate () {
      this.createFlag = true
      if (this.selectedKeys.length > 0) {
        const form = this.treeForm.getFieldsValue()
        this.treeForm.setFieldsValue({
          abbrName: null,
          name: null,
          type: '2',
          parentName: form.parentName === '/' ? '/' + form.name : form.parentName + '/' + form.name
        })
      }
    },
    // 树节点展开事件
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 组织机构树搜索
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.orgList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            console.log(getParentKey(item.key, this.orgTreeData))
            return getParentKey(item.key, this.orgTreeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    },
    // 树节点选择
    onSelect (selectedKeys, { selectedNodes, node, event }) {
      this.selectedKeys = selectedKeys
      this.selectedRows = selectedNodes
      if (this.selectedKeys.length > 0) {
        this.createFlag = false
      } else {
        this.createFlag = true
      }
      const selectRow = []
      if (selectedNodes.length > 0) {
        selectRow.push(selectedNodes[0].data.props)
        for (;;) {
          if (getParentNode(selectRow[0].id, this.orgTreeData)) {
            selectRow.unshift(getParentNode(selectRow[0].id, this.orgTreeData))
          } else {
            break
          }
        }
      }
      let parentName = ''
      selectRow.pop()
      selectRow.forEach(item => {
        parentName = `${parentName}/${item.abbrName}`
      })
      if (selectedNodes.length > 0) {
        this.treeForm.setFieldsValue({
          abbrName: selectedNodes[0].data.props.abbrName,
          name: selectedNodes[0].data.props.name,
          type: selectedNodes[0].data.props.type,
          serialIndex: selectedNodes[0].data.props.serialIndex,
          parentName: selectRow.length > 0 ? parentName : '/'
        })
      } else {
        this.treeForm.resetFields()
      }
    },
    // 拖拽完成
    onDrop (info) {
      this.spinning = true
      const dropKey = info.node._props.eventKey
      const dragKey = info.dragNode._props.eventKey
      const dropPos = info.node._props.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const data = [...this.orgTreeData]
      const loop = (data, key, callback) => {
        data.forEach((item, index, arr) => {
          if (item.key === key) {
            return callback(item, index, arr)
          }
          if (item.children) {
            return loop(item.children, key, callback)
          }
        })
      }
      // Find dragObject
      let dragObj
      loop(data, dragKey, (item, index, arr) => {
        arr.splice(index, 1)
        dragObj = item
      })
      if (!info.dropToGap) {
        // 放中间
        loop(data, dropKey, item => {
          let serialIndex = 0
          if (item.children && item.children.length > 0) {
            serialIndex = item.children[item.children.length - 1].serialIndex
          }
          this.$store.dispatch('EditOrg', { id: dragObj.id, parentId: item.id, serialIndex: serialIndex + 1 }).then(res => {
            this.expandedKeys = [dragObj.id, item.id, ...this.expandedKeys]
            this.getOrgTree()
          })
        })
      } else if ((info.node._props.children || []).length > 0 && info.node._props.expanded && dropPosition === 1) {
        loop(data, dropKey, item => {
          let serialIndex = 0
          if (item.children.length > 0) {
            serialIndex = item.children[item.children.length - 1].serialIndex
          }
          this.$store.dispatch('EditOrg', { id: dragObj.id, parentId: item.id, serialIndex: serialIndex - 1 }).then(res => {
            this.getOrgTree()
          })
        })
      } else {
        let ar
        let i
        loop(data, dropKey, (item, index, arr) => {
          ar = arr
          i = index
        })
        let serialIndex = 0
        if (dropPosition === -1) {
          if (i === 0) {
            serialIndex = ar[i].serialIndex - 0.1
          } else {
            serialIndex = ar[i].serialIndex - (ar[i].serialIndex - ar[i - 1].serialIndex) / 2
          }
          this.$store.dispatch('EditOrg', { id: dragObj.id, parentId: ar[i].parentId, serialIndex: serialIndex }).then(res => {
            this.getOrgTree()
          })
        } else {
          if (i === ar.length - 1) {
            serialIndex = ar[i].serialIndex + 0.1
          } else {
            serialIndex = ar[i].serialIndex + (ar[i + 1].serialIndex - ar[i].serialIndex) / 2
          }
          this.$store.dispatch('EditOrg', { id: dragObj.id, parentId: ar[i].parentId, serialIndex: serialIndex }).then(res => {
            this.getOrgTree()
          })
        }
      }
    },
    // 获取组织机构树
    getOrgTree () {
      this.$store.dispatch('GetOrgTree').then((res) => {
        this.orgTreeData = familyTreeHandler(res)
        var forFn = function (data) {
          for (let i = 0; i < data.length; i++) {
            const node = data[i]
            if (node.children.length === 0) {
              delete node.children
            } else {
              forFn(node.children, node.key)
            }
          }
        }
        forFn(this.orgTreeData)
        this.orgList = generateList(this.orgTreeData)
        this.spinning = false
      })
    }
  }
}
</script>

<style lang="less" scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
