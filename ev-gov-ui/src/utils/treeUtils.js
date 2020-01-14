// 获取父级节点KEY
export function getParentKey (key, tree) {
  let parentKey
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parentKey = node.key
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children)
      }
    }
  }
  return parentKey
}

// 获取父级节点Node
export function getParentNode (key, tree) {
  let parent
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i]
    if (node.children) {
      if (node.children.some(item => item.key === key)) {
        parent = node
      } else if (getParentNode(key, node.children)) {
        parent = getParentNode(key, node.children)
      }
    }
  }
  return parent
}

// 递归查询组织机构树某个节点的所有父节点
export function getParentIdList (orgData, id) {
  var temp = []
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item.id === id) {
        temp.push(item.id)
        forFn(orgData, item.parentId)
        break
      } else {
        if (item.children) {
          forFn(item.children, id)
        }
      }
    }
  }
  forFn(orgData, id)
  return temp
}

// 递归过滤树为Array
export function generateList (data) {
  var temp = []
  var forFn = function (data) {
    for (let i = 0; i < data.length; i++) {
      const node = data[i]
      const key = node.key
      if (node.children) {
        temp.push(Object.assign(node, { key, title: node.title, isLeaf: false }))
      } else {
        temp.push(Object.assign(node, { key, title: node.title, isLeaf: true }))
      }
      if (node.children) {
        forFn(node.children, node.key)
      }
    }
  }
  forFn(data)
  return temp
}

// 递归查询组织机构树某个节点的所有父节点
export function familyTree (orgData, id) {
  var temp = []
  var forFn = function (arr, id) {
    for (var i = 0; i < arr.length; i++) {
      var item = arr[i]
      if (item.id === id) {
        temp.push(item)
        forFn(orgData, item.meta.parentId)
        break
      } else {
        if (item.children) {
          forFn(item.children, id)
        }
      }
    }
  }
  forFn(orgData, id)
  return temp
}

// 递归组织机构数结构
export function familyTreeHandler (orgData) {
  const forFn = function (orgData) {
    for (let i = 0; i < orgData.length; i++) {
      const item = orgData[i]
      item.title = item.name
      item.key = item.id
      item.scopedSlots = { title: 'title', icon: 'icon' }
      if (item.children) {
        forFn(item.children)
      }
    }
  }
  forFn(orgData)
  return orgData
}
