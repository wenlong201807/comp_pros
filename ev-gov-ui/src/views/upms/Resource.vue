<template>
  <div style="margin-bottom:24px">
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px"><div class="titleFlag"></div>菜单管理</span>
      </template>
      <template slot="extra">
        <a-tooltip :title="selectedKeys.length > 0 ? '新增子菜单' : '新增根菜单'">
          <a-button v-if="!view" size="small" type="primary" icon="plus" @click="treeCreate"></a-button>
        </a-tooltip>
        <a-popconfirm title="确认删除菜单?" @confirm="treeViewDel" okText="是" cancelText="否">
          <a-tooltip title="删除菜单"  :visible="treeViewDelVisible">
            <a-button v-if="!view" @mouseenter="treeViewDelVisible = true" @mouseleave="treeViewDelVisible = false" @click="treeViewDelVisible = false" v-show="selectedKeys.length > 0" size="small" style="margin-left:8px;" type="danger" icon="delete"></a-button>
          </a-tooltip>
        </a-popconfirm>
      </template>
    </a-card>
    <a-row v-if="!view" :gutter="16" style="margin-top:8px">
      <a-col :md="24" :lg="8" :xxl="7">
        <a-spin :spinning="spinning" tip="Loading...">
          <a-card :bordered="false" style="margin-bottom:12px;">
            <a-input-search style="margin-bottom: 8px;" placeholder="搜索菜单" @change="onChange"/>
            <a-tooltip placement="right">
              <template slot="title">
                <a-icon type="tags" /> 分组<br>
                <a-icon type="file-ppt" /> 页面<br>
                <a-icon type="italic" /> 接口<br>
                <a-icon type="file-excel" /> 其他<br>
              </template>
              <a-icon type="info-circle" style="position: absolute;top: 68px;right: 24px;z-index: 2;cursor: pointer"/>
            </a-tooltip>
            <a-tree @expand="onExpand" showIcon :expandedKeys="expandedKeys" :treeData="resourceTreeData" defaultExpandAll :autoExpandParent="autoExpandParent" draggable @drop="onDrop" style="padding-bottom:24px;width: 100%;overflow: auto;max-height: 575px" showLine  @select="onSelect">
              <a-tooltip title="分组" slot="group">
                <a-icon type="tags" />
              </a-tooltip>
              <a-tooltip title="页面" slot="page">
                <a-icon type="file-ppt" />
              </a-tooltip>
              <a-tooltip title="接口" slot="interface">
                <a-icon type="italic" />
              </a-tooltip>
              <a-tooltip title="其他" slot="other">
                <a-icon type="file-excel" />
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
        <a-card :bordered="false" :title="selectedRows.length > 0 && createFlag ? '新增子菜单' : selectedRows.length === 0 && createFlag ? '新增根菜单':'编辑'">
          <a-form :form="treeForm" layout="horizontal">
            <a-row>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="所属应用" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-select placeholder="请选择所属应用" v-decorator="[ 'appId', {rules: [{ required: true, message: '请选择所属应用'}]} ]">
                    <a-select-option v-for="item in appIdList " :value="item.id" :key="item.id">{{ item.appName }}</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="父菜单名称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="/" v-decorator="[ 'parentName' ]" disabled/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}" label="菜单类型">
                  <a-radio-group buttonStyle="solid"  :options="finallyData.type" v-decorator="[ 'type', {rules: [{ required: true, message: '请选择菜单类型'}],initialValue: 0 } ]" @change="e => { currentSelectGroup = e.target.value;if(currentSelectGroup === 0){treeForm.setFieldsValue({component: 'PageView'})} else {treeForm.setFieldsValue({component: null})} }"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}" label="ICON">
                  <a-button v-if="currentSelectedIcon" shape="circle" :icon="currentSelectedIcon" v-decorator="[ 'icon' ]" style="margin-right:8px;"/>
                  <a-button-group>
                    <a-popover>
                      <template slot="content">
                        <div style="width: 480px">
                          <icon-selector v-model="currentSelectedIcon" @change="handleIconChange"></icon-selector>
                        </div>
                      </template>
                      <a-button type="primary">{{(currentSelectedIcon===null||currentSelectedIcon==='')?'选择图标':'更换图标'}}</a-button>
                    </a-popover>
                    <a-button v-if="currentSelectedIcon!==null&&currentSelectedIcon!==''" type="primary" @click="currentSelectedIcon=null">取消</a-button>
                  </a-button-group>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}" label="访问权限">
                  <a-radio-group buttonStyle="solid"  :options="finallyData.access" v-decorator="[ 'access', {rules: [{ required: true, message: '请选择访问权限'}],initialValue: 2 } ]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}" label="是否可用">
                  <a-switch :checked="currentSeletedUseable" @change="currentSeletedUseable = !currentSeletedUseable"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="请求方式" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-radio-group :disabled="currentSelectGroup!==2" buttonStyle="solid"   v-decorator="[ 'requestMethod',{ initialValue: 'POST' } ]">
                    <a-radio v-for="item in finallyData.requestMethod" v-if="!['HEAD','PATCH','OPTIONS'].includes(item.value)" :value="item.value" :key="item.value">{{ item.label }}</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label="currentSelectGroup===2?'接口名称':'菜单名称'" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input :placeholder="`请输入${currentSelectGroup===2?'接口名称':'菜单名称'}`" v-decorator="[ 'label', {rules: [{ required: true, message: `请输入${currentSelectGroup===2?'接口名称':'菜单名称'}`}]} ]">
                    <a-tooltip slot="suffix" :title="`用于${currentSelectGroup===2?'接口名称':'菜单名称'}展示`">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label="currentSelectGroup===2?'接口英文名':'菜单英文名'" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input :placeholder="`请输入${currentSelectGroup===2?'接口英文名':'菜单英文名'}`" v-decorator="[ 'enName', {rules: [{ required: true, message: `请输入${currentSelectGroup===2?'接口英文名':'菜单英文名'}`}]} ]">
                    <a-tooltip slot="suffix" :title="currentSelectGroup===2?null:`用于路由以名称形式的跳转等`">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="组件名称"  :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="请输入组件名称" :disabled="currentSelectGroup===0" v-decorator="[ 'component', { initialValue: currentSelectGroup===0?'PageView':null } ]">
                    <a-tooltip slot="suffix" title="路由中配置的组件名称">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="服务名称" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="服务名称" v-decorator="[ 'serviceName' ]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item :label="currentSelectGroup===2?'接口地址':'路由地址'" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input :placeholder="`请输入${currentSelectGroup===2?'接口地址':'路由地址'}`"  :addonBefore="parentResource.length>0?currentSelectGroup===2?null:parentResource[0].path:null" v-decorator="[ 'url', {rules: [{ required: true, message: `请输入${currentSelectGroup===2?'接口地址':'路由地址'}`}]}  ]">
                    <a-tooltip slot="suffix" title="路由访问地址">
                      <a-icon type="info-circle" style="color: rgba(0,0,0,.45)" />
                    </a-tooltip>
                  </a-input>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="描述" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input placeholder="请输入描述" v-decorator="[ 'description' ]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="排序" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-input-number :min="0" :step="0.1" v-decorator="['serialIndex']"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="12">
                <a-form-item label="自定义数据" :label-col="!this.isMobile() ?{ span: 8 } : {}" :wrapper-col="!this.isMobile() ?{ span: 14 } : {}">
                  <a-textarea :rows="2" placeholder="请输入自定义数据" v-decorator="[ 'metadata', {rules: [{ max: 256, message: '最大长度不得超过256个字符'}]} ]"/>
                </a-form-item>
              </a-col>
              <a-col :lg="24" :xxl="24">
                <a-form-item :wrapper-col="!this.isMobile() ? { span: 24, offset: 12 } : {}">
                  <a-button type="primary" html-type="submit" @click="treeViewSave" :loading="treeFormLoading">提交</a-button>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import IconSelector from '@/components/IconSelector'
import { mixin, mixinDevice } from '@/utils/mixin'
import { getParentKey, getParentNode, generateList, familyTree } from '@/utils/treeUtils'

export default {
  components: { IconSelector },
  mixins: [mixin, mixinDevice],
  data () {
    return {
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
      // 父级菜单
      parentResource: [],
      // 当前选择的菜单分组
      currentSelectGroup: 0,
      // 当前选择的ICON
      currentSelectedIcon: null,
      // 当前选择的是否可用
      currentSeletedUseable: true,
      // 树视图Form
      treeForm: this.$form.createForm(this),
      // 一些固定数据
      finallyData: {
        access: [{ value: 1, label: '登录可见', color: 'green' }, { value: 2, label: '需要权限', color: 'orange' }],
        type: [{ value: 0, label: '分组', color: 'green' }, { value: 1, label: '页面', color: 'blue' }, { value: 2, label: '接口', color: 'orange' }, { value: 3, label: '其他', color: 'red' }],
        requestMethod: [{ value: 'GET', color: '#61AFFE', label: 'GET' }, { value: 'HEAD', color: '#9012FE', label: 'HEAD' }, { value: 'POST', color: '#49CC90', label: 'POST' }, { value: 'PUT', color: '#FCA130', label: 'PUT' }, { value: 'DELETE', color: '#F93E3E', label: 'DELETE' }, { value: 'OPTIONS', color: '#0D5AA7', label: 'OPTIONS' }, { value: 'PATCH', color: '#50E3C2', label: 'PATCH' }],
        useable: [{ value: 0, status: 'error', label: '禁用' }, { value: 1, status: 'success', label: '正常' }]
      },
      // 应用列表
      appIdList: [],
      // 菜单树
      resourceTreeData: [],
      // 菜单列表
      resourceList: [],
      // 编辑ID
      editId: null
    }
  },
  created () {
    this.getAppList()
    this.initResource()
  },
  methods: {
    // 递归树数结构处理
    familyTreeHandler (resourceData) {
      const forFn = function (resourceData) {
        for (let i = 0; i < resourceData.length; i++) {
          const item = resourceData[i]
          item.title = item.meta.title
          item.key = item.id
          let icon
          if (item.meta.type === 0) {
            icon = 'group'
          } else if (item.meta.type === 1) {
            icon = 'page'
          } else if (item.meta.type === 2) {
            icon = 'interface'
          } else {
            icon = 'other'
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
        this.$message.error('无法删除包含子菜单的菜单')
      } else {
        const param = {
          ids: [this.selectedRows[0].data.props.dataRef.id]
        }
        this.spinning = true
        this.$store.dispatch('DelResource', param).then(res => {
          this.$message.success('删除成功')
          this.initResource()
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
          param.icon = this.currentSelectedIcon === null ? '' : this.currentSelectedIcon
          param.type = this.currentSelectGroup
          param.useable = this.currentSeletedUseable ? 1 : 0
          if (this.createFlag && this.selectedRows.length > 0) {
            param.parentId = this.selectedRows[0].data.props.id
          } else if (!this.createFlag && this.selectedRows.length > 0) {
            param.id = this.selectedRows[0].data.props.id
          } else if (this.selectedRows.length === 0) {
            param.parentId = 0
          }
          if (param.type !== 2) {
            param.requestMethod = null
          }
          this.$store.dispatch(this.createFlag ? 'CreateNewMenu' : 'EditResource', param).then(res => {
            this.$message.success(this.createFlag ? '新增成功' : '更新成功')
            this.treeFormLoading = false
            this.initResource()
            if (this.createFlag) {
              this.treeForm.resetFields()
              this.currentSelectGroup = 1
              this.treeForm.setFieldsValue({
                type: 1,
                component: null,
                appId: this.selectedRows[0].data.props.meta.appId,
                parentName: '/' + this.selectedRows[0].data.props.meta.title
              })
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
      this.currentSelectedIcon = null
      this.currentSeletedUseable = true
      if (this.selectedKeys.length > 0) {
        this.treeForm.resetFields()
        this.currentSelectGroup = 1
        this.treeForm.setFieldsValue({
          type: 1,
          component: null,
          appId: this.selectedRows[0].data.props.meta.appId,
          parentName: '/' + this.selectedRows[0].data.props.meta.title
        })
      }
    },
    // 组织机构树搜索
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.resourceList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, this.resourceTreeData)
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
    // 拖拽完成
    onDrop (info) {
      this.spinning = true
      const dropKey = info.node._props.eventKey
      const dragKey = info.dragNode._props.eventKey
      const dropPos = info.node._props.pos.split('-')
      const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1])
      const data = [...this.resourceTreeData]
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
            serialIndex = item.children[item.children.length - 1].meta.serialIndex
          }
          this.$store.dispatch('EditResource', { id: dragObj.id, parentId: item.id, serialIndex: serialIndex + 1 }).then(res => {
            this.expandedKeys = [dragObj.id, item.id, ...this.expandedKeys]
            this.initResource()
          })
        })
      } else if ((info.node._props.children || []).length > 0 && info.node._props.expanded && dropPosition === 1) {
        loop(data, dropKey, item => {
          let serialIndex = 0
          if (item.children && item.children.length > 0) {
            serialIndex = item.children[item.children.length - 1].serialIndex
          }
          this.$store.dispatch('EditResource', { id: dragObj.id, parentId: item.id, serialIndex: serialIndex - 1 }).then(res => {
            this.initResource()
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
            serialIndex = ar[i].meta.serialIndex - 0.1
          } else {
            serialIndex = ar[i].meta.serialIndex - (ar[i].meta.serialIndex - ar[i - 1].meta.serialIndex) / 2
          }
          this.$store.dispatch('EditResource', { id: dragObj.id, parentId: ar[i].meta.parentId, serialIndex: serialIndex }).then(res => {
            this.initResource()
          })
        } else {
          if (i === ar.length - 1) {
            serialIndex = ar[i].meta.serialIndex + 0.1
          } else {
            serialIndex = ar[i].meta.serialIndex + (ar[i + 1].meta.serialIndex - ar[i].meta.serialIndex) / 2
          }
          this.$store.dispatch('EditResource', { id: dragObj.id, parentId: ar[i].meta.parentId, serialIndex: serialIndex }).then(res => {
            this.initResource()
          })
        }
      }
    },
    // 树节点展开事件
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 初始化菜单数据
    initResource () {
      this.$store.dispatch('GetAllMenuTree').then(response => {
        this.resourceTreeData = this.familyTreeHandler(response)
        var forFn = function (data) {
          for (let i = 0; i < data.length; i++) {
            const node = data[i]
            if(typeof node === Array){
              if (node.children.length === undefined || node.children.length === null || node.children.length === 0) {
                delete node.children
              } else {
                forFn(node.children, node.key)
              }
            }
          }
        }
        forFn(this.resourceTreeData)
        this.resourceList = generateList(this.resourceTreeData)
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
          if (getParentNode(selectRow[0].id, this.resourceTreeData)) {
            selectRow.unshift(getParentNode(selectRow[0].id, this.resourceTreeData))
          } else {
            break
          }
        }
      }
      let parentName = ''
      selectRow.pop()
      selectRow.forEach(item => {
        parentName = `${parentName}/${item.title}`
      })
      if (selectedNodes.length > 0) {
        const obj = selectedNodes[0].data.props
        const data = familyTree(this.resourceTreeData, obj.parentId)
        this.parentResource = data.length > 0 ? data : []
        this.editId = obj.id
        this.currentSelectGroup = obj.meta.type
        this.currentSelectedIcon = obj.meta.icon
        this.currentSeletedUseable = obj.meta.useable === 1
        this.treeForm.setFieldsValue({
          parentName: selectRow.length > 0 ? parentName : '/',
          type: obj.meta.type,
          access: obj.meta.access,
          appId: obj.meta.appId,
          component: obj.component,
          description: obj.meta.description,
          enName: obj.name,
          label: obj.meta.title,
          metadata: obj.meta.metadata,
          requestMethod: obj.meta.requestMethod,
          serviceName: obj.meta.serviceName,
          serialIndex: obj.meta.serialIndex,
          url: obj.path ? obj.path.replace(this.parentResource.length > 0 ? this.parentResource[0].path : '', '') : obj.path
        })
      } else {
        this.treeForm.resetFields()
        this.currentSelectGroup = 0
        this.currentSeletedUseable = true
        this.treeForm.setFieldsValue({ type: -1 })
        this.treeForm.setFieldsValue({ type: 0 })
        this.currentSelectedIcon = null
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
