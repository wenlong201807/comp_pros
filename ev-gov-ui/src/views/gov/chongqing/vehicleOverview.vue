<template>
  <div>
    <a-card style="margin-bottom:24px;">
      <a-row>
        <a-col :span="4" :offset="2">
          <img src="/imageUrl/publicImg/CarIcon2.png" style="height:87px;float:right;padding-right:24px;" alt="">
        </a-col>
        <a-col :span="4">
          <a-statistic :value="vNum" valueStyle="font-weight:bold;font-size:36px;">
            <template slot="title">
              <span class="statisticData-title">已接入车辆 (辆)</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :span="4" :offset="4">
          <img src="/imageUrl/publicImg/Co2Icon.png" style="height:87px;float:right;padding-right:24px;" alt="">
        </a-col>
        <a-col :span="4">
          <a-statistic :value="co2" valueStyle="font-weight:bold;font-size:36px;">
            <template slot="title">
              <span class="statisticData-title">二氧化碳减排量 (万吨)</span>
            </template>
          </a-statistic>
        </a-col>
        <!-- <a-col :md="11" :sm="24" class="statisticData">
          <a-statistic :value="vNum" valueStyle="font-weight:bold;font-size:36px;">
            <template slot="prefix">
              <a-icon type="car" class="statisticData-icon" theme="twoTone" />
            </template>
            <template slot="title">
              <span class="statisticData-title">已接入车辆 (辆)</span>
            </template>
          </a-statistic>
        </a-col>
        <a-col :sm="24" :md="0" style="height:24px"></a-col>
        <a-col :md="11" :sm="24" class="statisticData">
          <a-statistic :value="co2" valueStyle="font-weight:bold;font-size:36px;">
            <template slot="prefix">
              <a-icon type="like" class="statisticData-icon" theme="twoTone" />
            </template>
            <template slot="title">
              <span class="statisticData-title">二氧化碳减排量 (万吨)</span>
            </template>
          </a-statistic>
        </a-col> -->
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>车辆数量汇总
        </span>
      </template>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24" :xxl="6" @click="showDialog('行驶车辆')">
          <a-card hoverable :bordered="false"
                  :style="{background: `url('/imageUrl/index_2_10.png')  no-repeat right bottom`,backgroundColor: '#ec6f5a', borderRadius: '10px'}">
            <a-statistic :value="runNum" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">行驶车辆（辆）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6" @click="showDialog('充电车辆')">
          <a-card hoverable :bordered="false"
                  :style="{background: `url('/imageUrl/index_06.png')  no-repeat right bottom`,backgroundColor: '#4cef74', borderRadius: '10px'}">
            <a-statistic :value="chargeNum" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">充电车辆（辆）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="24" :sm="0" :xxl="0" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6" @click="showDialog('离线车辆')">
          <a-card hoverable :bordered="false"
                  :style="{background: `url('/imageUrl/index_03.png')  no-repeat right bottom`,backgroundColor: '#f7c65f', borderRadius: '10px'}">
            <a-statistic :value="unlineNum" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">离线车辆（辆）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6" @click="showDialog('未激活车辆')">
          <a-card hoverable :bordered="false"
                  :style="{background: `url('/imageUrl/index_2_08.png')  no-repeat right bottom`,backgroundColor: '#55badf', borderRadius: '10px'}">
            <a-statistic :value="unActivationNum" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">未激活车辆（辆）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>车辆运行情况
        </span>
      </template>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24" :xxl="6">
          <a-card hoverable :bordered="false" :style="{backgroundColor: '#a992e2', borderRadius: '10px'}">
            <a-statistic :value="totalMileage" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">累计行驶里程（万公里）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6">
          <a-card hoverable :bordered="false" :style="{backgroundColor: '#55badf', borderRadius: '10px'}">
            <a-statistic :value="totalTime" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">累计行驶时间（万小时）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="24" :sm="0" :xxl="0" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6">
          <a-card hoverable :bordered="false" :style="{backgroundColor: '#ec6f5a', borderRadius: '10px'}">
            <a-statistic :value="totalElectricity" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">累计用电量（万千瓦·时）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
        <a-col :md="0" :sm="24" style="height:24px;"></a-col>
        <a-col :md="12" :sm="24" :xxl="6">
          <a-card hoverable :bordered="false" :style="{backgroundColor: '#f7c65f', borderRadius: '10px'}">
            <a-statistic :value="co2" style="margin-right: 50px"
                         valueStyle="font-weight:bold;font-size:24px;color:white">
              <template slot="title">
                <span class="statisticData-title" style="color: white;">累计减少碳排放（万吨）</span>
              </template>
            </a-statistic>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card style="margin-bottom:24px;">
      <template slot="title">
        <span style="margin-left: 12px">
          <div class="titleFlag"></div>车辆概况
        </span>
      </template>
      <a-row :gutter="24">
        <a-col :md="12" :sm="24" style="margin-bottom:24px;">
          <a-card>
            <div id="brandEchart" style="width: 100%;height:350px;"></div>
          </a-card>
        </a-col>
        <a-col :md="12" :sm="24" style="margin-bottom:24px;">
          <a-card>
            <div id="typeEchart" style="width: 100%;height:350px;"></div>
          </a-card>
        </a-col>
        <a-col :md="12" :sm="24" style="margin-bottom:24px;">
          <a-card>
            <div id="enduranceEchart" style="width: 100%;height:350px;"></div>
          </a-card>
        </a-col>
        <a-col :md="12" :sm="24">
          <a-card>
            <div id="purposeEchart" style="width: 100%;height:350px;"></div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-row :gutter="24">
      <a-col :md="24" :xxl="12">
        <a-card style="margin-bottom:24px;">
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag" style="top:24px;"></div>车辆月增长情况
            </span>
          </template>
          <template slot="extra">
            <a-range-picker @panelChange="onChange" :format="dateFormat" :mode="mode" :value="defaultValue"
                            :allowClear="false" />
          </template>
          <div id="monthEchart" style="width: 100%;height:350px;"></div>
        </a-card>
      </a-col>
      <a-col :md="24" :xxl="12">
        <a-card style="margin-bottom:24px;">
          <template slot="title">
            <span style="margin-left: 12px">
              <div class="titleFlag" style="top:24px;"></div>车辆年增长情况
            </span>
          </template>
          <template slot="extra">
            <a-range-picker @panelChange="onChange1" :format="dateFormat1" :mode="mode1" :value="defaultValue1"
                            :allowClear="false" />
          </template>
          <div id="yearEchart" style="width: 100%;height:350px;"></div>
        </a-card>
      </a-col>
    </a-row>
    <a-modal title="Title" :visible="visible" @cancel="visible = false" @ok="visible = false">11111</a-modal>
    <a-modal title="车辆状态查询" :visible="visible2" @cancel="handleCancel" :confirmLoading="confirmLoading" :width="1400"
             :footer="null">

      <a-card>
        <template slot="title">

          <a-row>
            <a-col>
              <span>厂家：</span>
              <a-select defaultValue="全部" style="width: 120px" @change="handleChangeCC">
                <a-select-option v-for="(item) in SHengCCJ" :value="item.value" :key="item.value">{{ item.text }}
                </a-select-option>

              </a-select>
              <span style="margin-left:10px;">车辆状态：</span>
              <a-select :defaultValue="carState" v-model="carState" placeholder="" style="width: 120px"
                        @change="handleChangeCarState">
                <a-select-option value="行驶">行驶</a-select-option>
                <!-- <a-select-option value="在线">在线</a-select-option> -->
                <a-select-option value="充电">充电</a-select-option>
                <a-select-option value="离线">离线</a-select-option>
                <a-select-option value="未激活">未激活</a-select-option>
              </a-select>
              <span style="margin-left:10px;">车辆品牌：</span>
              <a-select defaultValue="全部" style="width: 120px" @change="handleChangeCarPP">
                <a-select-option v-for="(item) in chePP" :value="item.value" :key="item.value">{{ item.text }}
                </a-select-option>
              </a-select>
              <a-button type="primary" style="margin-left:10px;" @click="searchTable">查询</a-button>
            </a-col>
          </a-row>
        </template>

        <template slot="extra">

        </template>

        <a-table rowKey="rn" :scroll="{ x: true }" bordered :columns="columns1" :dataSource="tableData1"
                 :pagination="pagination" @change=" handleTableChange1" :loading="loading1">
          <template v-for="col in inlineEditCol" :slot="col" slot-scope="text, record">
            <div :key="col">
              <span v-if="searchParams[col] && !record.editable">
                <template v-for="(fragment, i) in text
                  .toString()
                  .split(new RegExp(`(?<=${searchParams[col]})|(?=${searchParams[col]})`, 'i'))">
                  <mark v-if="fragment.toLowerCase() === searchParams[col].toLowerCase()" :key="i" class="highlight">{{
                    fragment
                  }}</mark>
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
            <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                     v-model="searchParams[column.dataIndex]"
                     @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                     @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                      style="width: 90px; margin-right: 8px">搜索</a-button>
            <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
            </a-button>
          </div>
          <a-icon slot="filterIcon" slot-scope="filtered" type="search"
                  :class="filtered ? 'ant-pro-active-icon' : undefined" />
          <div slot="filterDropdown" slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
               style="padding: 8px">
            <a-input v-ant-ref="c => (searchInput = c)" :placeholder="`搜索 ${column.title}`"
                     v-model="searchParams[column.dataIndex]"
                     @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                     @pressEnter="() => handleSearch(confirm, column.dataIndex)"
                     style="width: 188px; margin-bottom: 8px; display: block;" />
            <a-button type="primary" @click="() => handleSearch(confirm, column.dataIndex)" icon="search" size="small"
                      style="width: 90px; margin-right: 8px">搜索</a-button>
            <a-button @click="() => handleReset(clearFilters, column.dataIndex)" size="small" style="width: 90px">重置
            </a-button>
          </div>
        </a-table>
      </a-card>
    </a-modal>
  </div>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import moment from 'moment'
export default {
  mixins: [mixin, mixinDevice],
  data () {
    return {
      chePPId: 10000,
      SHengCCJId: 10000,
      carState: '行驶',
      changJia: '',
      pinPai: '',

      state: '',
      SHengCCJ: [],
      chePP: [],
      // 单选框条件
      searchRadio: {
        brand: null,
        handleType: null
      },
      searchParams: {
        typename: null,
        vin: null
      },
      inlineEditCol: ['stationName'],
      tableData1: [],
      checkedList: [], // 自定义预警驱动电机状态checkBox
      visible1: false, // 自定义预警弹窗
      confirmLoading: false, // 自定义预警弹窗内容加载
      visible2: false,
      loading1: false,
      startDate: '',
      endDate: '',
      startDate1: '',
      endDate1: '',
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
      defaultValue: [],
      defaultValue1: [],
      mode: ['month', 'month'],
      mode1: ['year', 'year'],
      dateFormat: 'YYYY-MM',
      dateFormat1: 'YYYY',
      visible: false,
      brandEchart: null,
      typeEchart: null,
      enduranceEchart: null,
      purposeEchart: null,
      yearEchart: null,
      monthEchart: null,
      chargeNum: 0,
      co2: 0,
      runNum: 0,
      totalElectricity: 0,
      totalMileage: 0,
      totalTime: 0,
      unActivationNum: 0,
      unlineNum: 0,
      vNum: 0,
      colors: [
        '#ff7f50',
        '#87cefa',
        '#da70d6',
        '#32cd32',
        '#6495ed',
        '#ff69b4',
        '#ba55d3',
        '#cd5c5c',
        '#ffa500',
        '#40e0d0',
        '#1e90ff',
        '#ff6347',
        '#7b68ee',
        '#00fa9a',
        '#ffd700',
        '#6b8e23',
        '#ff00ff',
        '#3cb371',
        '#b8860b',
        '#30e0e0'
      ],
      columns1: [
        {
          title: '序号',
          dataIndex: 'rn'
        },
        {
          title: '车牌号',
          dataIndex: 'plateCode',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'plateCode'
          }
        },
        {
          title: 'VIN',
          dataIndex: 'vin',
          scopedSlots: {
            filterDropdown: 'filterDropdown',
            filterIcon: 'filterIcon',
            customRender: 'vin'
          }
        },
        {
          title: '生产厂家',
          dataIndex: 'manufacturerAbbr'
        },
        {
          title: '品牌',
          dataIndex: 'vehicleSeriesName',
          filters: [],
          filterMultiple: false
        },
        {
          title: '车辆状态',
          dataIndex: 'status'
        },
        {
          title: '车辆型号',
          dataIndex: 'vehicleTypeName'
        }
      ]
    }
  },
  created () {
    // 车辆品牌下拉
    var that = this
    const params = [
      {
        field: 'areaCode',
        value: this.$ls.get('areaCode')
      }
    ]
    this.$store
      .dispatch('GroupStatisticsByBrand', params)
      .then(res1 => {
        this.chePP = []
        res1.forEach((item, index) => {
          this.chePP.push({ text: item.name, value: item.name })
        })
        this.chePP.push({ text: '全部', value: '全部' })
        // this.chePP = [...new Set(this.chePP)]
        // res1.push({ name: '全部', num: '10000', id: 10000 })
        // this.chePP = res1
      })
      .catch(error => {})
    // 车辆生产厂家下拉
    this.$store
      .dispatch('GroupStatisticsByFactory', params)
      .then(res => {
        this.SHengCCJ = []
        res.forEach((item, index) => {
          this.SHengCCJ.push({ text: item.name, value: item.name })
        })
        this.SHengCCJ.push({ text: '全部', value: '全部' })
      })
      .catch(error => {})

    this.startDate = moment(new Date())
      .subtract(1, 'year')
      .format('YYYY-MM')
    this.endDate = moment(new Date()).format('YYYY-MM')
    this.startDate1 = moment(new Date())
      .subtract(6, 'year')
      .format('YYYY')
    this.endDate1 = moment(new Date()).format('YYYY')
    this.defaultValue = [
      moment(moment(new Date()).subtract(1, 'year'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
    this.defaultValue1 = [
      moment(moment(new Date()).subtract(6, 'year'), this.dateFormat),
      moment(new Date(), this.dateFormat)
    ]
  },
  mounted () {
    this.initBrand()
    this.initType()
    this.initEndurance()
    this.initPurpose()
    this.initMonth()
    this.initYear()
    // this.initData()
    this.initRunStatus()
    this.initRunDataStatus()
    window.onresize = () => {
      this.brandEchart.resize()
      this.typeEchart.resize()
      this.enduranceEchart.resize()
      this.purposeEchart.resize()
      this.yearEchart.resize()
      this.monthEchart.resize()
    }
  },
  methods: {
    handleChangeCC (value) {
      this.changJia = value
    },
    handleChangeCarState (value) {
      console.log(value)
      this.carState = value
    },
    handleChangeCarPP (value) {
      this.pinPai = value
    },

    initData () {
      this.tableData1.forEach((item, index) => {
        item.rn = index + 1
      })
      // console.log(this.tableData)
    },
    searchTable () {
      this.handleTableChange1()
    },
    handleChange () {},
    handleCancel () {
      this.visible2 = false
    },
    showDialog (state) {
      this.visible2 = true
      this.state = state
      if (state === '行驶车辆') {
        this.carState = '行驶'
      } else if (state === '充电车辆') {
        this.carState = '充电'
      } else if (state === '离线车辆') {
        this.carState = '离线'
      } else if (state === '未激活车辆') {
        this.carState = '未激活'
      }
      this.handleTableChange1()
    },
    handleTableChange1 (pagination, filters, sorter) {
      this.loading1 = true
      // console.log(filters)

      this.filters = filters

      var that = this
      this.tableLoading = true
      if (this.pinPai === '全部') this.pinPai = ''
      if (this.changJia === '全部') this.changJia = ''
      const params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize,
        areaCode: this.$ls.get('areaCode'),
        status: this.carState,
        vehicleSeriesName: this.pinPai,

        manufacturerAbbr: this.changJia
      }

      this.$store.dispatch('VehicleGetCanList', params).then(res => {
        this.tableDataRn = res
        this.tableData1 = res.list
        this.loading1 = false
        this.initData()
        // that.rowClickLoadingData(that.tableData[0])
        this.pagination.total = res.total
        this.tableLoading = false
        this.tableData1.forEach((item, index) => {
          item.rn = that.tableDataRn.startRow + index
        })
      })
    },
    onChange (value) {
      this.defaultValue = value
      this.startDate = moment(value[0]).format('YYYY-MM')
      this.endDate = moment(value[1]).format('YYYY-MM')
      this.initMonth()
    },
    onChange1 (value) {
      this.defaultValue1 = value
      this.startDate1 = moment(value[0]).format('YYYY')
      this.endDate1 = moment(value[1]).format('YYYY')
      this.initYear()
    },
    initRunStatus () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('RunStatus', params).then(res => {
        // this.activeVehicle = res.activatedNum
        // this.chargeVehicle = res.chargingNum
        this.vNum = res.activatedNum + res.unActivatedNum
        this.unlineNum = res.offLineNum
        this.unActivationNum = res.unActivatedNum
        this.runNum = res.drivingNum
        this.chargeNum = res.chargingNum
        // this.online = this.onlineNum
      })
    },
    initRunDataStatus () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('RunDataStatus', params).then(res => {
        console.log(res)
        // this.stationNum = res[0].num
        this.co2 = (res.co2 / 10000).toFixed(2)
        this.totalMileage = (res.totalMileage / 10000).toFixed(2)
        this.totalTime = (res.totalTime / 10000).toFixed(2)
        this.totalElectricity = (res.totalElectricity / 10000).toFixed(2)

        // this.totalMileage = res.totalMileage
      })
    },
    initBrand () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      this.$store.dispatch('QueryBrands', params).then(res => {
        const data = res
        this.brandEchart = this.$echarts.init(
          document.getElementById('brandEchart')
        )
        // 绘制图表
        this.brandEchart.setOption({
          color: that.colors,
          title: {
            text: '车辆品牌分布(辆)',
            x: 'left',
            textStyle: {
              color: '#676a6c',
              fontSize: 14
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          toolbox: {
            show: true,
            right: 10,
            feature: {
              saveAsImage: { show: true }
            }
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆品牌分布',
              type: 'pie',
              radius: [40, 80],
              center: ['48%', '57%'],
              roseType: 'area',
              data: res.values
            }
          ]
        })
      })
    },
    initType () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      this.$store.dispatch('QueryExterior', params).then(res => {
        console.log(res)
        const data = res
        this.typeEchart = this.$echarts.init(
          document.getElementById('typeEchart')
        )
        // 绘制图表
        this.typeEchart.setOption({
          color: that.colors,
          title: {
            text: '车辆类型分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontFamily: '微软雅黑',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          toolbox: {
            show: true,
            right: 10,
            feature: {
              saveAsImage: { show: true }
            }
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆类型分布',
              type: 'pie',
              radius: [30, 68],
              center: ['48%', '57%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initEndurance () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      this.$store.dispatch('QueryMileage', params).then(res => {
        console.log(res)
        const data = res
        this.enduranceEchart = this.$echarts.init(
          document.getElementById('enduranceEchart')
        )
        // 绘制图表
        this.enduranceEchart.setOption({
          color: that.colors,
          title: {
            text: '纯电动汽车续航里程（公里）',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontFamily: '微软雅黑',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          toolbox: {
            show: true,
            right: 10,
            feature: {
              saveAsImage: { show: true }
            }
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '纯电动汽车续航里程（公里）',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['48%', '57%'],
              type: 'pie',
              x: '50%',
              max: 50,
              sort: 'ascending',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: function (params) {
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      /* if (key.length > 6) {
                                            allKey = key.slice(0, 6) + '\n' + key.slice(6, key.length) + ':'
                                        } else { */
                      allKey = key + ':'
                      //  }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initPurpose () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode')
      }
      this.$store.dispatch('QueryPurpose', params).then(res => {
        console.log(res)
        const data = res
        this.purposeEchart = this.$echarts.init(
          document.getElementById('purposeEchart')
        )
        // 绘制图表
        this.purposeEchart.setOption({
          color: that.colors,
          title: {
            text: '车辆用途分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontFamily: '微软雅黑',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          toolbox: {
            show: true,
            right: 10,
            feature: {
              saveAsImage: { show: true }
            }
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆用途分布',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['48%', '57%'],
              type: 'pie',
              x: '50%', // for funnel
              max: 50, // for funnel
              sort: 'ascending', // for funnel
              itemStyle: {
                normal: {
                  label: {
                    show: true, // "{b}:{c}",
                    formatter: function (params) {
                      // var str = '{b}:{c}'
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      if (key.length > 6) {
                        allKey =
                          key.slice(0, 5) +
                          '\n' +
                          key.slice(6, key.length) +
                          ':'
                      } else {
                        allKey = key + ':'
                      }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initMonth () {
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode'),
        endDate: this.endDate,
        startDate: this.startDate
      }
      this.$store.dispatch('ListIncrementMonth', params).then(res => {
        console.log(res)
        const data = res
        this.monthEchart = this.$echarts.init(
          document.getElementById('monthEchart')
        )
        // 绘制图表
        this.monthEchart.setOption({
          color: that.colors,
          noDataLoadingOption: {
            text: '暂无数据',
            effect: 'bubble',
            effectOption: {
              effect: {
                n: 0
              }
            }
          },
          tooltip: {
            trigger: 'axis',
            formatter: function (a) {
              console.log(a)
              var relVal = ''
              relVal = a[1].name + '车辆情况<br/>'
              if (typeof a[1].value !== 'undefined') {
                relVal += '增长率：' + a[1].value.toFixed(2) + '%<br/>'
              } else {
                relVal += '增长率：0.00%<br/>'
              }
              if (typeof a[0].value !== 'undefined') {
                relVal += '车辆总数：' + a[0].value + '辆<br/>'
              } else {
                relVal += '车辆总数：' + 0 + '辆<br/>'
              }
              /* if(typeof(a[0].value)!="undefinded"){
                                    	relVal += "车辆增长数量：" + a[0].value + "辆<br/>";
                                    }else{
                                    	relVal += "车辆增长数量：" + 0 + "辆<br/>";
                                    } */
              return relVal
            }
          },
          // legend: { data: ["车辆总数", "增长量", "增长率"], color: '#333', bottom:'5', x: 'center'},
          legend: {
            data: ['车辆总数', '增长率'],
            color: '#333',
            bottom: '5',
            x: 'center'
          },
          grid: { left: '10%', right: '10%', top: '15%', bottom: '15%' },
          calculable: !0,
          xAxis: [
            {
              type: 'category',
              data: res.name,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          toolbox: {
            show: true,
            right: 20,
            feature: {
              saveAsImage: { show: true }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '辆',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '%',
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name: '车辆总数',
              type: 'bar',
              stack: '广告',
              data: res.total
            },
            /* {
                                name: '增长量',
                                type: 'bar',
                                stack: '广告',
                                data: inc
                            }, */ {
              name: '增长率',
              type: 'line',
              yAxisIndex: 1,
              data: res.rate
            }
          ]
        })
      })
    },
    initYear () {
      console.log(this.startDate1)
      var that = this
      const params = {
        areaCode: this.$ls.get('areaCode'),
        endDate: this.endDate1,
        startDate: this.startDate1
      }
      this.$store.dispatch('ListIncrementYear', params).then(res => {
        console.log(res)
        const data = res
        this.yearEchart = this.$echarts.init(
          document.getElementById('yearEchart')
        )
        // 绘制图表
        this.yearEchart.setOption({
          color: that.colors,
          tooltip: {
            trigger: 'axis',
            formatter: function (a) {
              var relVal = ''
              relVal = a[0].name + '车辆情况<br/>'
              if (typeof a[1].value !== 'undefined') {
                relVal += '增长率：' + a[1].value.toFixed(2) + '%<br/>'
              } else {
                relVal += '增长率：0.00%<br/>'
              }
              if (typeof a[0].value !== 'undefined') {
                relVal += '车辆总数：' + a[0].value + '辆<br/>'
              } else {
                relVal += '车辆总数：' + 0 + '辆<br/>'
              }
              /* if(typeof(a[0].value)!="undefinded"){
                                    	relVal += "车辆增长数量：" + a[0].value + "辆<br/>";
                                    }else{
                                    	relVal += "车辆增长数量：" + 0 + "辆<br/>";

                                    } */
              return relVal
            }
          },
          // legend: { data: ["车辆总数", "增长量","增长率"], color: '#333', bottom:'5', x: 'center' },
          legend: {
            data: ['车辆总数', '增长率'],
            color: '#333',
            bottom: '5',
            x: 'center'
          },
          grid: { left: '10%', right: '10%', top: '15%', bottom: '15%' },
          calculable: !0,
          xAxis: [
            {
              type: 'category',
              data: res.year,
              axisLabel: {
                formatter: '{value}'
              }
            }
          ],
          toolbox: {
            show: true,
            right: 20,
            feature: {
              saveAsImage: { show: true }
            }
          },
          yAxis: [
            {
              type: 'value',
              name: '辆',
              axisLabel: {
                formatter: '{value}'
              }
            },
            {
              type: 'value',
              name: '%',
              axisLabel: {
                formatter: '{value} %'
              }
            }
          ],
          series: [
            {
              name: '车辆总数',
              type: 'bar',
              stack: '广告',
              data: res.total
            },
            /* {
                                name: '增长量',
                                type: 'bar',
                                stack: '广告',
                                data: inc
                            }, */ {
              name: '增长率',
              type: 'line',
              yAxisIndex: 1,
              data: res.rate
            }
          ]
        })
      })
    }
  }
}
</script>

<style scoped>
.statisticData {
  text-align: center;
  padding-left: 128px;
}
.statisticData-title {
  font-size: 16px;
  font-weight: bold;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.statisticData-icon {
  font-size: 60px;
  position: absolute;
  top: 10px;
  left: 27%;
}
</style>
