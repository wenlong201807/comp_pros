<template>
  <div>
    <a-table rowKey="id" :dataSource="dataSource" :pagination="false" :columns="columns" @change="tableChange">
      <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }" class="custom-filter-dropdown">
        <a-input v-if="column.dataIndex!=='loginStatus'" v-ant-ref="c => searchInput = c" :placeholder="`请输入${column.title}`" v-model="searchText[column.dataIndex]" style="width: 188px; margin-bottom: 8px; display: block;"></a-input>
        <div v-else-if="column.dataIndex==='loginStatus'">
          <a-radio-group v-model="searchText.loginStatus" style="width: 188px;">
            <a-col :span="12" style="padding-left:0px;margin-bottom:8px;"><a-radio value="0"><a-tag color="red">登陆失败</a-tag></a-radio></a-col>
            <a-col :span="12" style="padding-left:0px;margin-bottom:8px;"><a-radio value="1"><a-tag color="green">登陆成功</a-tag></a-radio></a-col>
            <a-col :span="12" style="padding-left:0px;margin-bottom:4px;"><a-radio value="2"><a-tag color="orange">退出登陆</a-tag></a-radio></a-col>
          </a-radio-group>
        </div>
        <div style="text-align: center">
          <a-button type="primary" @click="() => searchResult(selectedKeys, confirm)" icon="search" size="small" style="width: 90px; margin-right: 8px">搜索</a-button>
          <a-button @click="() => handleReset(clearFilters,column)" size="small" style="width: 90px">重置</a-button>
        </div>
      </div>
      <span slot="loginStatus" slot-scope="text">
        <a-tag color="red" v-if="text===0">登陆失败</a-tag>
        <a-tag color="green" v-if="text===1">登陆成功</a-tag>
        <a-tag color="orange" v-if="text===2">退出登陆</a-tag>
      </span>
      <a-icon slot="loginUserNameFilterIcon" type="search" :class="searchText.loginUsername?'ant-pro-active-icon':undefined"></a-icon>
      <a-icon slot="addFilterIcon" type="search" :class="searchText.filterUrl?'ant-pro-active-icon':undefined"></a-icon>
      <a-icon slot="timeFilterIcon" type="search" :class="searchText.createTime?'ant-pro-active-icon':undefined"></a-icon>
      <a-icon slot="ipFilterIcon" type="search" :class="searchText.loginIp?'ant-pro-active-icon':undefined"></a-icon>
      <a-icon slot="loginStatusFilterIcon" type="search" :class="searchText.loginStatus?'ant-pro-active-icon':undefined"></a-icon>
      <template slot="customRender" slot-scope="text">
        <span v-if="searchText.loginUsername">
          <template v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchText.loginUsername})|(?=${searchText.loginUsername})`, 'i'))">
            <mark v-if="fragment === searchText.loginUsername" :key="i" class="ant-pro-highlight">{{ fragment }}</mark>
            <template v-else>{{ fragment }}</template>
          </template>
        </span>
        <template v-else>{{ text }}</template>
      </template>
    </a-table>
    <a-pagination hideOnSinglePage @change="changeCurrent" :pageSizeOptions="['10', '20', '50']" :showSizeChanger="true" :current="pageParam.current" style="margin-top: 12px;text-align: end" :total="pageParam.total"></a-pagination>
  </div>
</template>
<script>

export default {
  data () {
    return {
      pageParam: {
        total: 0,
        current: 1,
        pageSize: 10
      },
      searchText: {
        loginUsername: '',
        loginIp: '',
        filterUrl: '',
        createTime: '',
        loginStatus: ''
      },
      tableSort: {},
      columns: [{
        title: '登陆用户名',
        dataIndex: 'loginUsername',
        key: 'loginUsername',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'loginUserNameFilterIcon',
          customRender: 'customRender'
        }
      }, {
        title: '登陆状态',
        dataIndex: 'loginStatus',
        key: 'loginStatus',
        scopedSlots: {
          customRender: 'loginStatus',
          filterIcon: 'loginStatusFilterIcon',
          filterDropdown: 'filterDropdown'
        }
      }, {
        title: '登陆IP',
        dataIndex: 'loginIp',
        key: 'loginIp',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'ipFilterIcon'
        }
      }, {
        title: '访问地址',
        dataIndex: 'filterUrl',
        key: 'filterUrl',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'addFilterIcon'
        }
      }, {
        title: '登录时间',
        dataIndex: 'createTime',
        key: 'createTime',
        scopedSlots: {
          filterDropdown: 'filterDropdown',
          filterIcon: 'timeFilterIcon'
        },
        sorter: true
      }],
      dataSource: []
    }
  },
  mounted () {
    this.tableData()
  },
  methods: {
    // 排序
    tableChange (pagination, filters, sorter) {
      this.tableSort = sorter
      this.tableData()
    },
    // 筛选重置
    handleReset (filter, val) {
      filter()
      this.searchText[val.key] = ''
      this.tableData()
    },
    // 查询表格
    searchResult (selectdKeys, confirm) {
      confirm()
      this.tableData()
    },
    tableData () {
      const data = {
        basic: {
          pageNum: this.pageParam.current,
          pageSize: this.pageParam.pageSize
        },
        params: {}
      }
      Object.keys(this.searchText).forEach(item => {
        if (this.searchText[item] !== '') {
          data.params[item] = '%' + this.searchText[item] + '%'
        }
      })
      if (Object.keys(this.tableSort).length !== 0) {
        data.params.orderJson = JSON.stringify([{ 'createTime': this.tableSort.order === 'ascend' ? 'asc' : 'desc' }])
      }
      this.$store.dispatch('GetLoginLog', data).then(res => {
        this.dataSource = res.list
        this.pageParam.total = res.total
      })
    },
    changeCurrent (page, pageSize) {
      this.pageParam.current = page
      this.pageParam.pageSize = pageSize
      this.tableData()
    }
  }
}
</script>

<style scoped>
  .custom-filter-dropdown {
    padding: 8px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 2px 8px rgba(0, 0, 0, .15);
  }
</style>
