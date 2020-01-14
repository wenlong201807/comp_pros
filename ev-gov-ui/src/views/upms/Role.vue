<template>
  <div style="margin-bottom:24px">
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px"><div class="titleFlag"></div>角色管理</span>
      </template>
      <template slot="extra">
        <a-tooltip :title="selectedKeys.length > 0 ? '新增角色' : '新增角色组'">
          <a-button v-if="!view&&(selectedRows.length === 0 || selectedRows[0].data.props.dataRef.children)" size="small" type="primary" icon="plus" @click="treeCreate"></a-button>
        </a-tooltip>
        <a-tooltip title="授权">
          <a-button v-if="!view" v-show="selectedKeys.length > 0" @click="authorizationClick" size="small" style="margin-left:8px;" icon="share-alt"></a-button>
        </a-tooltip>
        <a-popconfirm title="确认删除角色?" @confirm="treeViewDel" okText="是" cancelText="否">
          <a-tooltip title="删除角色"  :visible="treeViewDelVisible">
            <a-button v-if="!view" @mouseenter="treeViewDelVisible = true" @mouseleave="treeViewDelVisible = false" @click="treeViewDelVisible = false" v-show="selectedKeys.length > 0" size="small" style="margin-left:8px;" type="danger" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-card>
    <a-row v-if="!view" :gutter="16" style="margin-top:8px">
      <a-col :md="24" :lg="8" :xxl="7">
        <a-spin :spinning="spinning" tip="Loading...">
          <a-card :bordered="false" style="margin-bottom:12px;">
            <a-input-search style="margin-bottom: 8px;" placeholder="搜索角色" @change="onChange"/>
            <a-tooltip placement="right">
              <template slot="title">
                <a-icon type="team" /> 分组<br>
                <a-icon type="user" /> 角色<br>
              </template>
              <a-icon type="info-circle" style="position: absolute;top: 68px;right: 24px;z-index: 2;cursor: pointer"/>
            </a-tooltip>
            <a-tree @expand="onExpand" showIcon :expandedKeys="expandedKeys" :treeData="roleTreeData" defaultExpandAll :autoExpandParent="autoExpandParent" style="padding-bottom:24px;width: 100%;overflow: auto;max-height: 575px" showLine  @select="onSelect">
              <a-tooltip title="分组" slot="group">
                <a-icon type="team" style="line-height: 20px;"/>
              </a-tooltip>
              <a-tooltip title="角色" slot="role">
                <a-icon type="user" />
              </a-tooltip>
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
        <a-card :bordered="false" :title="selectedRows.length > 0 && createFlag ? '新增角色' : selectedRows.length === 0 && createFlag ? '新增角色组':'编辑'">
          <a-form :form="groupTreeForm" v-if="groupTreeFormVisible" layout="horizontal">
            <a-row>
              <a-col :span="24">
                <a-form-item label="所属应用" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-select placeholder="请选择所属应用" v-decorator="[ 'appId', {rules: [{ required: true, message: '请选择所属应用'}]} ]">
                    <a-select-option v-for="item in appIdList " :value="item.id" :key="item.id">{{ item.appName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="角色组名称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="请输入角色组名称" v-decorator="[ 'groupName' ]"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="排序" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item :wrapper-col="{ span: 24, offset: 8 }">
                  <a-button type="primary" html-type="submit" @click="treeViewSave" :loading="treeFormLoading">提交</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form :form="roleTreeForm" v-if="roleTreeFormVisible" layout="horizontal">
            <a-row>
              <a-col :span="24">
                <a-form-item label="角色组名称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input disabled placeholder="请输入角色组名称" v-decorator="[ 'groupName' ]"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}" label="是否可用">
                  <a-switch :checked="currentSeletedUseable" @change="currentSeletedUseable = !currentSeletedUseable"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="角色名称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="请输入角色名称" v-decorator="[ 'name', {rules: [{ required: true, message: `请输入角色名称`}]} ]"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="组织机构" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-cascader v-decorator="[ 'orgId' ]" :fieldNames="{ label: 'abbrName', value: 'id', children: 'children' }" placeholder="请选择组织机构" :options="options" changeOnSelect />
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="描述" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="请输入描述" v-decorator="[ 'description' ]"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item label="排序" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']"/>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item :wrapper-col="{ span: 24, offset: 8 }">
                  <a-button type="primary" html-type="submit" @click="treeViewSave" :loading="treeFormLoading">提交</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
    <a-drawer placement="right" width="350" :closable="false" @close="onClose" :visible="resourceContactVisible">
      <template slot="title">角色资源关联</template>
      <resource-tree @listenToCheckedKeys="listenToCheckedKeys" :checkedKeys="checkedKeys"></resource-tree>
      <a-col style="text-align: center">
        <a-button type="primary" v-if="saveBtn" @click="saveRelation">保存</a-button>
      </a-col>
    </a-drawer>
  </div>
</template>
<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import { getParentKey, generateList } from '@/utils/treeUtils'
import ResourceTree from './modules/ResourceTree'

export default {
  mixins: [mixin, mixinDevice],
  components: { ResourceTree },
  data () {
    return {
      // 保存按钮
      saveBtn: false,
      // 菜单关联Visible
      resourceContactVisible: false,
      // groupTree表单显影
      groupTreeFormVisible: true,
      // roleTree表单显影
      roleTreeFormVisible: false,
      // 组织机构
      options: [],
      // resourceTree选中Keys
      selectedKeys: [],
      // resourceTree选中的ROW
      selectedRows: [],
      // 树维护新增还是编辑
      createFlag: true,
      // 菜单树搜索
      searchValue: '',
      // 树视图确定表单Loading
      treeFormLoading: false,
      // resourceTreeLoading
      spinning: true,
      // 菜单树展开的节点
      expandedKeys: [],
      // 菜单树展开
      autoExpandParent: true,
      // 树视图的删除按钮tooltip控制
      treeViewDelVisible: false,
      // 视图 true-表格 false-树
      view: !true,
      // 当前选择的是否可用
      currentSeletedUseable: true,
      // 角色组Form
      groupTreeForm: this.$form.createForm(this),
      // 角色Form
      roleTreeForm: this.$form.createForm(this),
      // 应用列表
      appIdList: [],
      // 角色树
      roleTreeData: [],
      // 角色列表
      roleList: [],
      // 选择的菜单
      checkedKeys: [],
      // 准备给后台的KEY
      readyCheckedKeys: []
    }
  },
  created () {
    this.getAppList()
    this.initRole()
    this.getOrgTree()
  },
  methods: {
    // 授权按钮点击
    authorizationClick () {
      const obj = this.selectedRows[0].data.props.dataRef
      if (obj.children && obj.children.length > 0) {
        this.$message.warn('该操作将会覆盖分组下所有角色与菜单的关联关系')
      } else if (obj.children && obj.children.length === 0) {
        this.$message.error('该分组下无可授权角色')
        return
      } else {
        this.$store.dispatch('GetRoleMenu', { roleId: obj.id }).then(response => {
          this.checkedKeys = []
          const allParentId = []
          response.forEach(item => {
            this.checkedKeys.push(item.id)
            allParentId.push(item.parentId)
          })
          this.checkedKeys = this.checkedKeys.filter(item => !allParentId.includes(item))
          console.log(this.checkedKeys)
        })
      }
      this.resourceContactVisible = true
    },
    // 保存关联关系
    saveRelation () {
      const obj = this.selectedRows[0].data.props.dataRef
      const ids = []
      if (obj.children && obj.children.length === 0) {
        return
      } else if (obj.children && obj.children.length > 0) {
        obj.children.forEach(item => {
          ids.push(item.id)
        })
      } else {
        ids.push(obj.id)
      }
      const param = {
        resourceIds: this.readyCheckedKeys,
        roleId: ids
      }
      this.$store.dispatch('CreatRoleResource', param).then(res => {
        this.$message.success('保存角色资源关联成功！')
        this.saveBtn = false
        this.checkedKeys = []
        this.readyCheckedKeys = []
        this.resourceContactVisible = false
      }).catch(error => {
        this.$message.error(error.response.data.message || '关联失败')
      })
    },
    // 监听子组件
    listenToCheckedKeys (checkedKeys) {
      this.saveBtn = true
      this.readyCheckedKeys = checkedKeys
    },
    // 获取组织机构树
    getOrgTree () {
      this.$store.dispatch('GetOrgTree').then((res) => {
        this.options = (res == '' ? [] : res)
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
        forFn(this.options)
      })
    },
    // 递归查询组织机构树某个节点的所有父节点
    familyTree (roleData, id, parentName) {
      var temp = []
      var forFn = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.id === id) {
            temp.push(item)
            forFn(roleData, item[parentName])
            break
          } else {
            if (item.children) {
              forFn(item.children, id)
            }
          }
        }
      }
      forFn(roleData, id, parentName)
      return temp
    },
    // 递归树数结构处理
    familyTreeHandler (resourceData) {
      const forFn = function (resourceData) {
        for (let i = 0; i < resourceData.length; i++) {
          const item = resourceData[i]
          item.title = item.groupName || item.name
          item.key = item.id
          let icon
          if (item.children) {
            icon = 'group'
          } else {
            icon = 'role'
          }
          item.scopedSlots = { title: 'title', icon: icon }
          if (item.children) {
            forFn(item.children)
          }
        }
      }
      forFn(resourceData)
      return resourceData
    },
    // 树视图删除
    treeViewDel () {
      if (this.selectedRows[0].data.props.dataRef.children && this.selectedRows[0].data.props.dataRef.children.length > 0) {
        this.$message.error('无法删除包含角色的角色组')
      } else {
        const param = {
          ids: [this.selectedRows[0].data.props.dataRef.id]
        }
        this.spinning = true
        this.$store.dispatch(this.selectedRows[0].data.props.dataRef.children ? 'DelRoleGroup' : 'DelRole', param).then(res => {
          this.$message.success('删除成功')
          this.groupTreeForm.resetFields()
          this.roleTreeForm.resetFields()
          this.initRole()
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
      (this.groupTreeFormVisible ? this.groupTreeForm : this.roleTreeForm).validateFields((err, values) => {
        if (!err) {
          this.treeFormLoading = true
          this.spinning = true
          const param = (this.groupTreeFormVisible ? this.groupTreeForm : this.roleTreeForm).getFieldsValue()
          param.useable = this.currentSeletedUseable ? 1 : 0
          if (this.createFlag && this.selectedRows.length > 0) {
            param.orgId = param.orgId ? param.orgId[param.orgId.length - 1] : null
            param.groupId = this.selectedRows[0].data.props.id
          } else if (!this.createFlag && this.selectedRows.length > 0) {
            if (!this.selectedRows[0].data.props.dataRef.children) {
              param.orgId = param.orgId ? param.orgId[param.orgId.length - 1] : null
            }
            param.id = this.selectedRows[0].data.props.id
          }
          const url = this.createFlag && this.selectedRows.length === 0 ? 'CreateNewRoleGroup' : this.createFlag && this.selectedRows.length > 0 ? 'CreateNewRole' : this.selectedRows[0].data.props.dataRef.children ? 'EditRoleGroup' : 'EditRole'
          this.$store.dispatch(url, param).then(res => {
            this.$message.success(this.createFlag ? '新增成功' : '更新成功')
            this.treeFormLoading = false
            this.initRole()
            if (this.createFlag) {
              (this.groupTreeFormVisible ? this.groupTreeForm : this.roleTreeForm).resetFields()
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
      if (this.selectedRows[0].data.props.dataRef.children) {
        this.createFlag = true
        this.roleTreeFormVisible = true
        this.groupTreeFormVisible = false
        this.currentSeletedUseable = true
        this.roleTreeForm.resetFields()
        const groupName = this.selectedRows[0].data.props.dataRef.title
        this.$nextTick(() => {
          this.roleTreeForm.setFieldsValue({
            groupName: groupName
          })
        })
      }
    },
    // 组织机构树搜索
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.roleList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.roleTreeData)
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
    // 树节点展开事件
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 初始化角色分组数据
    initRole () {
      this.$store.dispatch('GetRoleMsg').then(response => {
        this.roleTreeData = this.familyTreeHandler(response)
        this.roleList = generateList(this.roleTreeData)
        this.spinning = false
      })
    },
    // 图标点击事件
    handleIconChange (value) {
      this.currentSelectedIcon = value
    },
    // 获取应用列表
    getAppList () {
      const data = { basic: { pageNum: '1', pageSize: '2147483647' }, params: {} }
      this.$store.dispatch('GetApp', data).then(res => {
        this.appIdList = res.list
      })
    },
    // 抽屉关闭
    onClose () {
      this.saveBtn = false
      this.checkedKeys = []
      this.resourceContactVisible = false
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
      if (selectedNodes.length > 0) {
        if (!this.selectedRows[0].data.props.dataRef.children) {
          this.roleTreeFormVisible = true
          this.groupTreeFormVisible = false
        } else {
          this.roleTreeFormVisible = false
          this.groupTreeFormVisible = true
        }
        const obj = selectedNodes[0].data.props
        if (this.roleTreeFormVisible) {
          this.currentSeletedUseable = obj.useable === 1
          const data = this.familyTree(this.roleTreeData, obj.groupId, 'groupId')
          this.group = data.length > 0 ? data : []
          const orgArray = []
          if (obj.orgId) {
            const treeArray = this.familyTree(this.options, obj.orgId, 'parentId')
            treeArray.reverse().forEach(item => {
              orgArray.push(item.id)
            })
          }
          this.$nextTick(() => {
            this.roleTreeForm.setFieldsValue({
              groupName: this.group[0].groupName,
              appId: obj.appId,
              name: obj.name,
              orgId: orgArray,
              description: obj.description,
              serialIndex: obj.serialIndex
            })
          })
        } else if (this.groupTreeFormVisible) {
          this.$nextTick(() => {
            this.groupTreeForm.setFieldsValue({
              appId: obj.appId,
              groupName: obj.groupName,
              serialIndex: obj.serialIndex
            })
          })
        }
      } else {
        this.roleTreeForm.resetFields()
        this.groupTreeForm.resetFields()
        this.roleTreeFormVisible = false
        this.groupTreeFormVisible = true
        this.currentSeletedUseable = true
      }
    }
  }
}
</script>

<style scoped>
  .ant-badge-status-dot{
    top: -4px!important;
  }
</style>
