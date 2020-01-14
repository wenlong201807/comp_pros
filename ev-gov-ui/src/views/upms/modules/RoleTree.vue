<template>
  <div>
    <a-input-search style="margin-bottom: 8px" placeholder="搜索角色" @change="onChange" />
    <a-tree :selectable="false" v-model="checkedKeys" showLine defaultExpandAll checkable @expand="onExpand" :expandedKeys="expandedKeys" :autoExpandParent="autoExpandParent" :treeData="roleTreeData" @check="onCheck">
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
export default {
  data () {
    return {
      expandedKeys: [],
      searchValue: '',
      checkedKeys: [],
      autoExpandParent: true,
      roleTreeData: [],
      roleList: []
    }
  },
  props: {
    roles: {
      type: Array,
      // 对象或数组默认值必须从一个工厂函数获取
      default: () => []
    }
  },
  created () {
    this.$store.dispatch('GetRoleTree').then(response => {
      this.roleTreeData = response
      this.roleTreeData.forEach(fItem => {
        fItem.scopedSlots = { title: 'title' }
        if (fItem.children) {
          fItem.children.forEach(sItem => {
            sItem.scopedSlots = { title: 'title' }
            if (sItem.children) {
              sItem.children.forEach(tItem => {
                tItem.scopedSlots = { title: 'title' }
              })
            }
          })
        }
      })
      this.generateList(this.roleTreeData)
      this.$watch('roles', {
        handler () {
          const checkedKeys = []
          this.roles.forEach(item => {
            checkedKeys.push(item.id)
          })
          this.checkedKeys = checkedKeys
        },
        immediate: true
      })
    })
  },
  methods: {
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
    generateList (data) {
      for (let i = 0; i < data.length; i++) {
        const node = data[i]
        const key = node.key
        if (node.children) {
          this.roleList.push({ key, title: node.title, isLeaf: false })
        } else {
          this.roleList.push({ key, title: node.title, isLeaf: true })
        }
        if (node.children) {
          this.generateList(node.children, node.key)
        }
      }
    },
    onCheck (checkedKeys, info) {
      this.$emit('listenToRole', [])
      const selectRoles = []
      this.roleList.forEach(item => {
        if (checkedKeys.includes(item.key) && item.isLeaf) {
          selectRoles.push({ name: item.title, id: item.key })
        }
      })
      this.$emit('listenToRole', selectRoles)
    },
    onExpand (expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },
    onChange (e) {
      const value = e.target.value
      const expandedKeys = this.roleList
        .map(item => {
          if (item.title.indexOf(value) > -1) {
            return this.getParentKey(item.key, this.roleTreeData)
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
