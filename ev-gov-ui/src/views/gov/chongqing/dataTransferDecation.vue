<template>
  <div>
    <a-card>
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>数据传输情况监测
        </span>
      </template>
      <template slot="extra">
        <!-- <a-tooltip title="导出表格">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="download"></a-button>
        </a-tooltip> -->

        <a-tooltip title="已处理报警信息">
          <a-button style="margin-right:8px;" size="small" type="primary" icon="alert" @click="showDialog"></a-button>
        </a-tooltip>

        <a-dropdown>
          <a-menu slot="overlay" style="padding:8px 12px;">
            <a-checkbox-group @change="onCheckBoxChange"
                              :defaultValue="['rn','brand','vin','sendtime','typename','drivermotorstatus','controllertemperature','motortemperature','inputvoltage','controllercurrent','positioningstatus','enginestate','speed','totalvoltage','totalcurrent','soc','dcdcstate','insulationresistance','voltagehighestvalue','voltageminimum','maximumtemperature','minimumtemperature','status']">
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
      <a-table rowKey="rn" :scroll="{ x: true }" bordered :columns="columns" :dataSource="tableData"
               :pagination="pagination" @change="handleTableChange" :loading="loading">
        <template slot="sstatus" slot-scope="text">
          <span v-if="text === '0'">未处理</span>
          <span v-if="text === '1'" style="color:#d9534f;">处理中...</span>
        </template>
        <template slot="operation" slot-scope="text, record">
          <template v-if="record.lamp==='正常'">
            <span>--</span>
          </template>
          <template v-else>
            <a-dropdown v-if="!record.editable">
              <a-menu slot="overlay">
                <a-menu-item key="4" @click.self="handleMenuClick(text, record,'4','人工忽略')">人工忽略</a-menu-item>
                <a-menu-item key="1" @click.self="handleMenuClick(text, record,'1','人工确认')">人工确认</a-menu-item>
                <a-menu-item key="2" @click.self="handleMenuClick(text, record,'2','邮件提示')"> 邮件提示</a-menu-item>
                <a-menu-item key="3" @click.self="handleMenuClick(text, record,'3','短信提示')">短信提示</a-menu-item>
              </a-menu>
              <a-button style="margin-left: 8px" type="primary">
                人工忽略
                <a-icon type="down" />
              </a-button>
            </a-dropdown>
            <a-button v-if="record.editable " @click.self="handleMenuClick(text, record,'','确认处理完成')">确认处理完成</a-button>
          </template>

        </template>

        <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
          <div :key="col">
            <span v-if="searchParams[col]&&!record.editable">
              <template
                v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i"
                      class="highlight">{{ fragment }}</mark>
                <template v-else>{{ fragment }}</template>
              </template>
            </span>
            <template v-else>{{ text }}</template>
          </div>
        </template>

        <template slot="lamp" slot-scope="lamp">
          <a-tag v-if="lamp==='黄灯报警'" style="background:yellow;">{{ lamp }}</a-tag>
          <a-tag v-else-if="lamp==='红灯报警'" style="background:red;">{{ lamp }}</a-tag>
          <span v-else>{{ lamp }}</span>
        </template>
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
        <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                :class="filtered ? 'ant-pro-active-icon' : undefined" />
        <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
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
      </a-table>
    </a-card>
    <a-modal title="已处理报警信息详情查看" :visible="visible2" :confirmLoading="confirmLoading" @cancel="handleCancel"
             :width="1400" :footer="null">
      <a-card>
        <template slot="extra">
          <a-tooltip title="导出表格">
            <a-button style="margin-right:8px;" size="small" type="primary" icon="download" @click="exportTable">
            </a-button>
          </a-tooltip>

        </template>
        <a-table rowKey="rn" :scroll="{ x: true }" bordered :columns="columns1" :dataSource="tableData1"
                 :pagination="pagination" @change="handleTableChange1" :loading="loading1">
          <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
            <div :key="col">
              <span v-if="searchParams[col]&&!record.editable">
                <template
                  v-for="(fragment, i) in text.toString().split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i"
                        class="highlight">{{ fragment }}</mark>
                  <template v-else>{{ fragment }}</template>
                </template>
              </span>
              <template v-else>{{ text }}</template>
            </div>
          </template>
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
          <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                  :class="filtered ? 'ant-pro-active-icon' : undefined" />
          <div slot="filterDropdown1" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
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
        </a-table>
      </a-card>

    </a-modal>
  </div>
</template>

<script>
export default {
  data () {
    return {
      brand1: '',
      transferStatus: '',
      loading: false,
      loading1: false,
      filters: null,
      brand: '',
      handleType: '',
      lamp: '',

      // 单选框条件
      searchRadio: {
        brand: null,
        lamp: null,
        sstatus: null,
        handleType: null
      },
      typeData: [],
      tableData1: [],
      lightData: [],
      confirmLoading: false,
      visible2: false,
      // 表格Loading
      tableLoading: false,

      // 过滤条件
      searchParams: {
        stationName: null
      },
      searchInput: null,
      // 行内编辑的字段
      inlineEditCol: ['stationName'],

      tableData: [],

      // 列
      columns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据传输状态',
          dataIndex: 'lamp',
          scopedSlots: {
            customRender: 'lamp'
          },
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据时间',
          dataIndex: 'refreshTime'
        },
        {
          title: '在线车辆数',
          dataIndex: 'onlineVehicle'
          // scopedSlots: {
          //   filterDropdown: 'filterDropdown',
          //   filterIcon: 'filterIcon',
          //   customRender: 'brandName'
          // }
        },
        // {
        //   title: '车辆最后报警时间',
        //   dataIndex: 'lastalarmtime'
        // },
        {
          title: '处理状态',
          dataIndex: 'sstatus',
          scopedSlots: { customRender: 'sstatus' }
        },
        {
          title: '处理操作',
          dataIndex: 'handleType',

          scopedSlots: { customRender: 'operation' }
        }
      ],
      // 列
      columns1: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据传输状态',
          dataIndex: 'lamp',
          scopedSlots: {
            customRender: 'lamp'
          },
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据时间',
          dataIndex: 'refreshTime'
        },
        {
          title: '在线车辆数',
          dataIndex: 'onlineVehicle'
        },

        {
          title: '处理类型',
          dataIndex: 'handleType',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '处理时间',
          dataIndex: 'handleTime'
        },
        {
          title: '处理人',
          dataIndex: 'handle'
        }
      ],
      // 列内容常量
      finallyColumns: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车企',
          dataIndex: 'brand',
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据传输状态',
          dataIndex: 'lamp',
          scopedSlots: {
            customRender: 'lamp'
          },
          filters: [],
          filterMultiple: false,
          sorter: true
        },
        {
          title: '数据时间',
          dataIndex: 'refreshTime'
        },
        {
          title: '在线车辆数',
          dataIndex: 'onlineVehicle'
        },

        {
          title: '处理状态',
          dataIndex: 'sstatus',
          scopedSlots: { customRender: 'sstatus' }
        },
        {
          title: '处理操作',
          dataIndex: 'handleType',

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
    var that = this
    // 车企下拉
    const areaParams = [
      {
        field: 'areaCode',
        value: this.$ls.get('areaCode')
      }
    ]
    this.$store.dispatch('GroupStatisticsByFactory', areaParams).then(res => {
      that.carData = res
      that.columns.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'brand') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item.name,
              value: item.name
            })
          })
        }
      })
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'brand') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item.name,
              value: item.name
            })
          })
        }
      })
    })
    // 数据传输情况监测
    this.$store.dispatch('AlarmTypeList').then(res => {
      that.lightData = res
      that.columns.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'lamp') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
      // 数据传输状态
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'lamp') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
    })
    // 处理类型
    this.$store.dispatch('HandleTypeList').then(res => {
      that.typeData = res
      that.columns1.forEach((item, index, arr) => {
        if (arr[index].dataIndex === 'handleType') {
          res.forEach(item => {
            arr[index].filters.push({
              text: item,
              value: item
            })
          })
        }
      })
    })
    this.handleTableChange()
    this.handleTableChange1()
  },
  methods: {
    handleMenuClick (text, record, value, state) {
      var that = this

      if (value === '1') {
        this.$confirm({
          title: '是否进行人工确认？',

          onOk () {
            that.nowState = '人工确认'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '2') {
        this.$confirm({
          title: '是否进行邮件提示？',

          onOk () {
            that.nowState = '邮件提示'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '3') {
        this.$confirm({
          title: '是否进行短信提示？',

          onOk () {
            that.nowState = '短信提示'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      } else if (value === '4') {
        this.$confirm({
          title: '是否进行人工忽略？',

          onOk () {
            that.nowState = '人工忽略'
            that.changeBtn(record.vin, record, state)
          },
          onCancel () {
            that.nowState = ''
          },
          class: 'test'
        })
      }
      if (state === '确认处理完成') {
        that.nowState = ''
        const Params = {
          vin: record.vin
        }

        this.$store.dispatch('ConfirmOperator', Params).then(res => {
          this.$message.success('操作成功！')
          // this.handleTableChange()
          const newData1 = [...this.tableData]

          const target1 = newData1.filter(item => Params.vin === item.vin)[0]
          if (target1) {
            target1.editable = false
            target1.sstatus = '0'
            this.tableData = newData1
          }
        })
      }
    },

    changeBtn (key, record, state) {
      const newData = [...this.tableData]

      const target = newData.filter(item => key === item.id)[0]

      if (target && state != '人工忽略') {
        target.editable = true
        target.sstatus = '1'
        this.tableData = newData
      } else if (target && state === '人工忽略') {
        target.sstatus = '1'
        this.tableData = newData
      }

      const Params = {
        organName: record.brand,
        handleType: state,
        userName: this.$store.state.user.info.username,
        lamp: record.lamp
      }

      this.$store.dispatch('HeandleDateTransfetStatus', Params).then(res => {
        // this.$message.warning('正在处理中！')
        this.handleTableChange()
        // if (state === '人工忽略') {
        //   this.handleTableChange()
        // }
      })
    },
    postExcelFile (params, url) {
      // params是post请求需要的参数，url是请求url地址
      var form = document.createElement('form')
      form.style.display = 'none'
      form.action = url
      form.method = 'post'
      document.body.appendChild(form)
      // 动态创建input并给value赋值
      for (var key in params) {
        var input = document.createElement('input')
        input.type = 'hidden'
        input.name = key
        input.value = params[key]
        form.appendChild(input)
      }

      form.submit()
      form.remove()
    },
    // exportTable () {
    //   console.log('导出表格')
    //   var that = this
    //   const url =
    //     window.gurl.SERVICE_CONTEXT_PATH +
    //     'vehicle/export/dataTransferHandleList'
    //   this.postExcelFile(
    //     { brand: that.brand, handleType: that.handleType, lamp: that.lamp },
    //     url
    //   )
    // },
    exportTable () {
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
      Object.keys(this.searchRadio).forEach(item => {
        if (this.filters != undefined) {
          Object.keys(this.filters).forEach(itemn => {
            if (itemn == item) {
              if (this.filters[item][0] != undefined) {
                params.push({
                  field: itemn,
                  value: `%${this.filters[item][0]}%`
                })
              }
            }
          })
        }
      })
      this.$store
        .dispatch('DataTransferHandleList', params)
        .then(res => {
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const fileName = ' 已处理报警信息详情档案.xls'
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
    },
    handleTableChange (pagination, filters, sorter) {
      if (filters) {
        if (filters.hasOwnProperty('brand')) {
          this.brand1 = filters.brand[0]
        }

        if (filters.hasOwnProperty('lamp')) {
          this.transferStatus = filters.lamp[0]
        }
      }
      this.loading = true
      var that = this
      this.tableLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          areaCode: this.$ls.get('areaCode'),
          brand: this.brand1,
          transferStatus: this.transferStatus
        },
        params: {
          query: [],
          order: []
        }
      }
      // Object.keys(this.searchParams).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic.push({
      //             field: item,
      //             value: filters[item][0]
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
      // Object.keys(this.searchRadio).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic.push({
      //             field: itemn,
      //             value: filters[item][0]
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('GetVehicleData', data).then(res => {
        this.tableData = res.list
        this.initData()
        this.pagination.total = res.total

        this.loading = false
      })
    },
    handleTableChange1 (pagination, filters, sorter) {
      this.loading1 = true
      this.filters = filters
      if (filters) {
        if (filters.hasOwnProperty('brand')) {
          this.brand = filters.brand[0]
        }
        if (filters.hasOwnProperty('handleType')) {
          this.handleType = filters.handleType[0]
        }
        if (filters.hasOwnProperty('lamp')) {
          this.lamp = filters.lamp[0]
        }
      }

      var that = this
      this.tableLoading = true
      const data = {
        basic: {
          pageNum: this.pagination.current,
          pageSize: this.pagination.pageSize,
          areaCode: this.$ls.get('areaCode'),
          brand: this.brand,
          handleType: this.handleType,
          lamp: this.lamp
        },
        params: {
          query: [],
          order: []
        }
      }
      // Object.keys(this.searchParams).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic.push({
      //             field: item,
      //             value: filters[item][0]
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
      // Object.keys(this.searchRadio).forEach(item => {
      //   if (filters != undefined) {
      //     Object.keys(filters).forEach(itemn => {
      //       if (itemn === item) {
      //         if (filters[item][0] != undefined) {
      //           data.basic.push({
      //             field: itemn,
      //             value: filters[item][0]
      //           })
      //         }
      //       }
      //     })
      //   }
      // })
      if (sorter) {
        data.params.order.push({
          field: sorter.field,
          value: sorter.order === 'ascend'
        })
      }
      this.$store.dispatch('HandleMassageList', data).then(res => {
        this.tableData1 = res.list
        this.initData()
        this.pagination.total = res.total
        this.loading1 = false
      })
    },
    handleCancel () {
      this.visible2 = false
    },
    showDialog () {
      var that = this
      this.handleTableChange1()
      this.visible2 = true
    },
    initData () {
      this.tableData.forEach((item, index) => {
        item.rn = index + 1
      })
      this.tableData1.forEach((item, index) => {
        item.rn = index + 1
      })
      // console.log(this.tableData)
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
