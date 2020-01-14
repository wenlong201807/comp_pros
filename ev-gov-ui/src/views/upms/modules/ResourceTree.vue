<template>
  <div>
    <a-input-search style="margin-bottom: 8px;" placeholder="搜索菜单" @change="onChange"/>
    <a-tooltip placement="right">
      <template slot="title">
        <a-icon type="tags" /> 分组<br>
        <a-icon type="file-ppt" /> 页面<br>
        <a-icon type="italic" /> 接口<br>
        <a-icon type="file-excel" /> 其他<br>
      </template>
      <a-icon type="info-circle" style="position: absolute;top: 126px;right: 24px;z-index: 2;cursor: pointer"/>
    </a-tooltip>
    <a-tree checkable @check="onCheck" v-model="resourceCheck" @expand="onExpand" showIcon :expandedKeys="expandedKeys" :treeData="resourceTreeData" defaultExpandAll :autoExpandParent="autoExpandParent" style="padding-bottom:24px;width: 100%;overflow: auto;" showLine @select="onSelect">
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
  </div>
</template>

<script>
import { generateList } from '@/utils/treeUtils'

export default {
  data () {
    return {
      spinning: true,
      expandedKeys: [],
      searchValue: '',
      selectedKeys: [],
      autoExpandParent: true,
      resourceList: [],
      resourceTreeData: [],
      resourceCheck: [],
      resourceCheckHandleData: []
    }
  },
  created () {
    this.initResource()
  },
  props: {
    checkedKeys: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => {}
    },
  },
  watch: {
    checkedKeys (val) {
      this.resourceCheck = val
    }
  },
  methods: {
    // 选择事件
    onCheck (val) {
      this.resourceCheck = val
      const array = []
      val.forEach(item => {
        this.familyTree(this.resourceTreeData, item).forEach(item => {
          if (!val.includes(item.id) && !array.includes(item.id)) {
            array.push(item.id)
          }
        })
      })
      this.resourceCheckHandleData = [...val, ...array]
      this.$emit('listenToCheckedKeys', this.resourceCheckHandleData)
    },
    // 获取所有父级
    familyTree (resourceTree, id) {
      var temp = []
      var forFn = function (arr, id) {
        for (var i = 0; i < arr.length; i++) {
          var item = arr[i]
          if (item.id === id) {
            temp.push(item)
            forFn(resourceTree, item.meta.parentId)
            break
          } else {
            if (item.children) {
              forFn(item.children, id)
            }
          }
        }
      }
      forFn(resourceTree, id)
      return temp
    },
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
    // 初始化数据
    initResource () {
      this.$store.dispatch('GetAllMenuTree').then(response => {
        this.resourceTreeData = this.familyTreeHandler(response)
        var forFn = function (data) {
          for (let i = 0; i < data.length; i++) {
            const node = data[i]
            if (node.children === null || node.children.length === 0) {
              delete node.children
            } else {
              forFn(node.children, node.key)
            }
          }
        }
        forFn(this.resourceTreeData)
        this.resourceList = generateList(this.resourceTreeData)
        this.spinning = false
        this.resourceCheck = this.checkedKeys
      })
    },
    // 获取父级节点KEY
    getParentKey (key, tree) {
      let parentKey
      for (let i = 0; i < tree.length; i++) {
        const node = tree[i]
        if (node.children) {
          if (node.children.some(item => item.key === key)) {
            parentKey = node.key
          } else if (this.getParentKey(key, node.children)) {
            parentKey = this.getParentKey(key, node.children)
          }
        }
      }
      return parentKey
    },
    // 树节点点击事件
    onSelect (selectedKeys) {
      this.selectedKeys = selectedKeys
    },
    // 树节点展开事件
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    // 搜索框改变事件
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.resourceList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, this.resourceTreeData)
          }
          return null
        })
        .filter((item, i, self) => item && self.indexOf(item) === i)
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true
      })
    }
  }
}
</script>

<style scoped>

</style>
