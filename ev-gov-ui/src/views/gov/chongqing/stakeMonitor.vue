<template>
  <div style="position:relative;">
    <Map></Map>
    <!-- 显示站 -->
    <!-- <div id="stationResultList" ref="stationResultList"></div> -->
    <!-- 搜索功能 -->
    <!-- <div id="mapSearchStation" style="position:absolute;top:20px;left:10px;height:45px;width:400px;background:#eee;">
      <input id="inputSearch" placeholder="搜索充电站" v-model="stationNameDisplay">
      <button id="inputText" @click="inputSearchStation" class="btn">搜索</button>
    </div> -->
    <div class="top_num">

      <a-row>

        <a-col :span="6" style="text-align:center;background: #EA6F5D;color:#fff;padding: 4px 0;">
          <h3 style="margin-bottom:0;margin-top:2px;font-weight:800;font-size:18px;color:#fff">总充电量（万千瓦·时）</h3>
          <countTo style="font-weight:800;font-size:22px" :startVal="totalEleStart" :endVal="totalEle" useEasing
                   :duration="3000">
          </countTo>

        </a-col>
        <a-col :span="6" style="text-align:center;background:#23B7A1;color:#fff;padding: 4px 0;">
          <h3 style="margin-bottom:0;margin-top:2px;font-weight:800;font-size:18px;color:#fff">总充电次数（次）</h3>
          <countTo style="font-weight:800;font-size:22px" :startVal="totalTimesStart" :endVal="totalTimes" useEasing
                   :duration="3000">
          </countTo>

        </a-col>
        <a-col :span="6" style="text-align:center;background: #EA6F5D;color:#fff;padding: 4px 0;">
          <h3 style="margin-bottom:0;margin-top:2px;font-weight:800;font-size:18px; color:#fff;">日充电量 （千瓦·时）</h3>
          <countTo style="font-weight:800;font-size:22px" :startVal="eleStart" useEasing :endVal="ele" :duration="3000">
          </countTo>

        </a-col>
        <a-col :span="6" style="text-align:center;background:#23B7A1;color:#fff;padding: 4px 0;">
          <h3 style="margin-bottom:0;margin-top:2px;font-weight:800;font-size:18px;color:#fff">日充电次数 （次）</h3>
          <countTo style="font-weight:800;font-size:22px" :startVal="dayTimesStart" :endVal="dayTimes" useEasing
                   :duration="3000">
          </countTo>

        </a-col>

      </a-row>
    </div>
    <div class="station_stake">
      <a-row :gutter="24" style="height:100%;">
        <a-col :span="8" style="height:100%;">
          <a-popover title="充电站用途">
            <template slot="content">
              <p v-for="item in contentList" :key="item.NAME">{{ item.NAME }}：{{ item.VALUE }}座</p>
            </template>
            <a-button type="primary" style="height:100%;width:100%;">
              <a-statistic class="white_text" title="充电站数量" :value="stationNum">
                <template v-slot:suffix>
                  座
                </template>
              </a-statistic>
            </a-button>
          </a-popover>
        </a-col>
        <a-col :span="8" style="height:100%;">
          <a-popover title="充电桩类型">
            <template slot="content">
              <p v-for="item in staketypeList" :key="item.NAME">{{ item.NAME }}：{{ item.value }}个</p>
            </template>
            <a-button type="primary" style="height:100%;width:100%;">
              <a-statistic class="white_text" title="充电桩数量" :value="stakeNumber">
                <template v-slot:suffix>
                  个
                </template>
              </a-statistic>
            </a-button>
          </a-popover>
        </a-col>
        <a-col :span="8" style="height:100%;">
          <a-popover title="充电站用途">
            <template slot="content">
              <p>占用桩：{{ zhanYZ }}个</p>
              <p>实时占用功率：{{ shiShiGL }}千瓦</p>
            </template>
            <a-button type="primary" style="height:100%;width:100%;">
              <a-statistic class="white_text" title="额定功率" :value="eDingGL">
                <template v-slot:suffix>
                  千瓦
                </template>
              </a-statistic>
            </a-button>
          </a-popover>
        </a-col>
      </a-row>
    </div>
    <div class="stake_status">
      <a-card style="background:#EEE;">
        <template slot="title">
          <span style="margin-left: 12px">
            <div class="titleFlag"></div>充电桩状态
          </span>
        </template>
        <a-statistic title="充电桩占用（充电中）" :value="zhanYZ" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_charge.png) no-repeat 0px 20px;"></a-statistic>
        <a-statistic title="充电桩占用（未充电）" :value="zhanWC" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_uncharge.png) no-repeat 0px 20px;"></a-statistic>
        <a-statistic title="充电桩占用（预约锁定）" :value="zhanYYSD" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_setcharge.png) no-repeat 0px 20px;"></a-statistic>
        <a-statistic title="充电桩离网" :value="zhanLW" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_offline.png) no-repeat 0px 20px;"></a-statistic>
        <a-statistic title="充电桩空闲" :value="zhanKX" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_free.png) no-repeat 0px 20px;"></a-statistic>
        <a-statistic title="充电桩故障" :value="zhanGZ" class="status-data"
                     style="background:url(/imageUrl/mapOperatorIcon/stake_fault.png) no-repeat 0px 20px;"></a-statistic>
      </a-card>
    </div>
  </div>
</template>

<script>
import Map from '@/components/amap/amap.vue'
import countTo from 'vue-count-to'
import moment from 'moment'
import ReconnectingWebSocket from 'reconnectingwebsocket'
import { ACCESS_TOKEN } from '@/store/mutation-types'
export default {
  data () {
    return {
      mapDataList: null,
      stationNameDisplay: null,
      dayTimesStart: 0,
      eleStart: 0,
      totalTimesStart: 0,
      totalEleStart: 0,
      dayTimes: 0,
      ele: 0,
      totalTimes: 0,
      totalEle: 0,

      eDingGL: 0,
      zhanWC: 0,
      zhanLW: 0,
      zhanKX: 0,
      zhanGZ: 0,
      zhanYYSD: 0,
      zhanYZ: 0,
      shiShiGL: 0,
      stakeNumber: 0,
      startTime: '',
      endTime: '',

      map: null,
      stakeNum: '',
      stationNum: '',
      startVal: 0,
      endVal: 2017,
      markers: [],
      clusterMarkers: [],
      cluster: null,
      clusterOverlayGroups: null,
      idArr: [],
      infoWindow: null,
      statusContent: '',
      tableContent: '',
      contentList: [],
      staketypeList: [],
      ws: null
    }
  },
  components: {
    Map,
    countTo
  },
  created () {
    var _today = moment()
    this.startTime = _today
      .subtract(1, 'days')
      .format('YYYY-MM-DD') /* 前一天的时间 */
    this.endTime = moment(new Date())
      .add('year', 0)
      .format('YYYY-MM-DD')
  },
  mounted () {
    var that = this
    this.map = this.$store.getters.getMap
    this.initMap()
    var parsms = [
      {
        field: '',
        value: ''
      }
    ]
    this.$store
      .dispatch('Allstation', parsms)
      .then(res => {
        that.initClusteMap(res)
      })
      .catch(error => {
        console.log(error)
      })
    this.initStationNum()
    this.initStationType()
    this.initStationtotalPower()
    this.initStaketypenumber()
    this.initStakeStatusNumber()
    this.initStakeUsePower()
    this.initOperatortotalPower()
    // this.initStatisticsEleTimesTotal()
    // this.initStatisticsEleTimes()
    this.ws = new ReconnectingWebSocket(`ws://47.92.138.8:11007?token=${this.$ls.get(ACCESS_TOKEN)}`, null, { reconnectInterval: 10000 })
    this.ws.onmessage = (evt) => {
      const data = JSON.parse(evt.data)
      var value = JSON.parse(data.content)
      console.log(data)
      that.totalEleStart = that.totalEle
      that.totalTimesStart = that.totalTimes
      that.eleStart = that.ele
      that.dayTimesStart = that.dayTimes
      that.totalEle = value.totalEle
      that.totalTimes = value.totalTimes
      that.ele = value.todayEle
      that.dayTimes = value.todayTimes
    }
  },
  beforeDestroy () {
    this.ws.close()
  },
  methods: {
    initOperatortotalPower () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        this.eDingGL = res.value
      })
    },
    initStationType () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]

      this.$store.dispatch('Stationtypenumber', parsms).then(res => {
        this.contentList = res
      })
    },
    initStationNum () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]

      this.$store.dispatch('Number', parsms).then(res => {
        this.stakeNumber = res.stakeNumber
        this.stationNum = res.stationNumber
      })
    },
    initStationtotalPower () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]

      this.$store.dispatch('StationtotalPower', parsms).then(res => {
        // this.stationNum = res.stationNumber
      })
    },
    initStakeUsePower () {
      const params = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]
      this.$store.dispatch('StakeUsePower', params).then(res => {
        this.shiShiGL = res[0].value
      })
    },
    initStakeStatusNumber () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]

      this.$store.dispatch('StakeStatusNumber', parsms).then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].NAME === '占用(充电中)') {
            this.zhanYZ = res[i].value
          } else if (res[i].NAME === '占用(未充电)') {
            this.zhanWC = res[i].value
          } else if (res[i].NAME === '离网') {
            this.zhanLW = res[i].value
          } else if (res[i].NAME === '空闲') {
            this.zhanKX = res[i].value
          } else if (res[i].NAME === '故障') {
            this.zhanGZ = res[i].value
          } else {
            this.zhanYYSD = res[i].value
          }
        }
      })
    },
    initStaketypenumber () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.$ls.get('areaCode')
        }
      ]

      this.$store.dispatch('Staketypenumber', parsms).then(res => {
        this.staketypeList = res
      })
    },
    // initStatisticsEleTimes () {
    //   var that = this
    //   const data = {
    //     params: [
    //       {
    //         field: 'areaCode',
    //         value: this.$ls.get('areaCode')
    //       }
    //     ],
    //     basic: {
    //       startTime: this.startTime,
    //       endTime: this.startTime
    //     }
    //   }
    //   this.$store.dispatch('StatisticsEleTimes', data).then(res => {
    //     if (res[0]) {
    //       // 获取当前系统时间
    //       var min = new Date().getMinutes()
    //       var hours = new Date().getHours()
    //       var seconds = new Date().getSeconds()
    //       var k = (hours * 60 * 60 + min * 60 + seconds) / 10
    //       // 设置4个数据的初始值并加上当前时间系数*今日充电量充电次数
    //       if (res) {
    //         that.ele = parseInt(
    //           parseInt(k * (parseInt(res[0].ELE) / 8640)).toFixed(0)
    //         )
    //         that.dayTimes = parseInt(
    //           parseInt(k * (parseInt(res[0].times) / 8640)).toFixed(0)
    //         )
    //         setInterval(function () {
    //           that.numberFlashTDay(res)
    //         }, 10000)
    //       }
    //     }
    //   })
    // },
    // numberFlashTDay (res) {
    //   var that = this
    //   this.eleStart = this.ele
    //   this.ele =
    //     parseInt(that.ele) + Math.ceil(parseInt(res[0].ELE) / 8640)
    //   this.dayTimesStart = this.dayTimes
    //   this.dayTimes =
    //     parseInt(that.dayTimes) + Math.ceil(parseInt(res[0].times) / 8640)
    // },
    // numberFlashTTotal (res) {
    //   var that = this
    //   this.totalEleStart = this.totalEle
    //   this.totalEle =
    //     parseInt(that.totalEle) + Math.ceil(parseInt(res[0].ELE) / 8640)
    //   this.totalTimesStart = this.totalTimes
    //   this.totalTimes =
    //     parseInt(that.totalTimes) +
    //     Math.ceil(parseInt(res[0].times) / 8640)
    // },
    // initStatisticsEleTimesTotal () {
    //   var that = this
    //   const data = {
    //     params: [
    //       {
    //         field: 'areaCode',
    //         value: this.$ls.get('areaCode')
    //       }
    //     ]
    //   }
    //   this.$store.dispatch('StatisticsEleTimes', data).then(res => {
    //     var min = new Date().getMinutes()
    //     var hours = new Date().getHours()
    //     var seconds = new Date().getSeconds()
    //     var k = (hours * 60 * 60 + min * 60 + seconds) / 10
    //     // 设置4个数据的初始值并加上当前时间系数*今日充电量充电次数
    //     if (res[0].ELE) {
    //       that.totalEle = parseInt(
    //         (
    //           parseInt(that.totalEle) + parseInt(k * (res[0].ELE / 8640))
    //         ).toFixed(0)
    //       )
    //       that.totalTimes = parseInt(
    //         (
    //           parseInt(that.totalTimes) + parseInt(k * (res[0].times / 8640))
    //         ).toFixed(0)
    //       )
    //       setInterval(function () {
    //         that.numberFlashTTotal(res)
    //       }, 10000)
    //     }
    //   })
    // },

    // 打开信息窗口
    markerWindow (e) {
      var that = this
      var parsms = {
        basic: {
          stationid: e.target.Le.stationid
        },
        params: [
          {
            field: '',
            value: ''
          }
        ]
      }
      this.$store
        .dispatch('AllStakeInfo', parsms)
        .then(res => {
          var result = res.list
          var z = result.length
          var offline = 0
          var free = 0
          var Zuser = 0
          var ZNuser = 0
          var ZYuser = 0
          var breakN = 0
          var table =
            "<div style='overflow-x: auto; overflow-y: auto; height: 150px; width:100%;'><table border='1' align='center' width='100%'><tr style='background-color:#00caaf;color:white;border-bottom:1px solid black'><td align='center' style='width:50%;'>桩编号</td><td align='center' style='border-left: 1px solid black;'>桩状态</td></tr>"
          var table2 = ''
          for (var i = 0; i < result.length; i++) {
            if (result[i].statusName === '离网') {
              offline += 1
              table =
                table +
                "<tr><td align='center'><font color='#616161'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#616161'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else if (result[i].statusName === '空闲') {
              free += 1
              table =
                table +
                "<tr><td align='center'><font color='#1296DB'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#1296DB'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else if (result[i].statusName === '占用(充电中)') {
              Zuser += 1
              table =
                table +
                "<tr><td align='center'><font color='#125D04'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#125D04'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else if (result[i].statusName === '占用(未充电)') {
              ZNuser += 1
              table =
                table +
                "<tr><td align='center'><font color='#125D04'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#125D04'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else if (result[i].statusName === '占用(预约锁定)') {
              ZYuser += 1
              table =
                table +
                "<tr><td align='center'><font color='#125D04'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#125D04'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else if (result[i].statusName === '故障') {
              breakN += 1
              table =
                table +
                "<tr><td align='center'><font color='#E64340'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#E64340'>" +
                result[i].statusName +
                '</font></td></tr>'
            } else {
              table =
                table +
                "<tr><td align='center'><font color='#444444'>" +
                (result[i].equipmentname || '未命名') +
                "</font></td><td align='center'><font color='#444444'>" +
                '其他' +
                '</font></td></tr>'
            }
          }
          var zzr =
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/charge1.png' style='width:20px;height:20px;margin-right:7px;'>占用（充电中）:<span style='float: right'>" +
            Zuser +
            '/' +
            z +
            '</span></div>' +
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/charge2.png' style='width:20px;height:20px;margin-right:7px;'>占用（未充电）:<span style='float: right'>" +
            ZNuser +
            '/' +
            z +
            '</span></div>' +
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/ineed.png' style='width:20px;height:20px;margin-right:7px;'>占用（预约锁定）:<span style='float: right'>" +
            ZYuser +
            '/' +
            z +
            '</span></div>' +
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/free.png' style='width:20px;height:20px;margin-right:7px;'>空闲:<span  style='float: right'>" +
            free +
            '/' +
            z +
            '</span></div>' +
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/offline.png' style='width:20px;height:20px;margin-right:7px;'>离网:<span  style='float: right'>" +
            offline +
            '/' +
            z +
            '</span></div>' +
            "<div style='display:inline-block;width:35%;padding-right:10%'><img src='/imageUrl/mapOperatorIcon/break.png' style='width:20px;height:20px;margin-right:7px;'>故障:<span  style='float: right'>" +
            breakN +
            '/' +
            z +
            '</span></div>'
          that.statusContent = '<div>' + zzr + '</div>'
          table2 = table + '</table></div>'
          that.tableContent = table2
          var electricityfee, servicefee
          if (e.target.Le.electricityfee) {
            electricityfee = e.target.Le.electricityfee.split(',').join('\n')
          } else {
            electricityfee = ''
          }
          if (e.target.Le.servicefee) {
            servicefee = e.target.Le.servicefee.split(',').join('\n')
          } else {
            servicefee = ''
          }
          var windowContent = `
          <div style='font-weight:bold;padding:2px;width:700px;'>充电站基础信息：</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/name.png' style='width:20px;height:20px;margin-right:7px;'>站名称：${e
    .target.Le.stationname || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>运营商：${e
    .target.Le.merchantName || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>站地址：${e
    .target.Le.address || ''}</div>
          <div style='width:50%;display:inline-block;float:left;padding:2px;'><img src='/imageUrl/mapOperatorIcon/status.png' style='width:20px;height:20px;margin-right:7px;'>站状态：${e
    .target.Le.stationstatusName || ''}</div>
          <div style='width:50%;display:inline-block;float:right;padding:2px;'><img src='/imageUrl/mapOperatorIcon/stopCar.png' style='width:20px;height:20px;margin-right:7px;'>停车费：${e
    .target.Le.parkfee || ''}</div>
          <div style='width:50%;display:inline-block;float:left;padding:2px;'><img src='/imageUrl/mapOperatorIcon/eleFee.png' style='width:20px;height:20px;margin-right:7px;'>电费：${electricityfee}</div>
          <div style='width:50%;display:inline-block;float:right;padding:2px;'><img src='/imageUrl/mapOperatorIcon/serviceFee.png' style='width:20px;height:20px;margin-right:7px;'>服务费：${servicefee}</div>
          <div style='font-weight:bold;padding:2px;'>充电桩状态占比情况：</div>
          ${that.statusContent}
          <div style='font-weight:bold;padding:2px;'>本站充电桩详情：</div>
          ${that.tableContent}
        `
          that.infoWindow = new AMap.InfoWindow({
            offset: new AMap.Pixel(0, -10)
          })
          that.infoWindow.setContent(windowContent)
          that.infoWindow.open(that.map, e.target.getPosition())
        })
        .catch(error => {
          console.log(error)
        })
    },
    // 聚合图
    initClusteMap (data) {
      var that = this
      for (var i = 0; i < data.list.length; i += 1) {
        that.clusterMarkers.push(
          new AMap.Marker({
            position: [data.list[i].stationlng, data.list[i].stationlat],
            content:
              '<div style="background-color: hsla(180, 100%, 35%,0.7); height: 24px; width: 24px; border: 1px solid hsl(180, 100%, 40%); border-radius: 12px; box-shadow: hsl(180, 100%, 50%) 0px 0px 1px;text-align:center;font-weight:600;line-height:22px;">1</div>',
            offset: new AMap.Pixel(-15, -15)
          })
        )
      }
      that.cluster = new AMap.MarkerClusterer(that.map, that.clusterMarkers, {
        gridSize: 80
      })
    },

    // 地图的拖动缩放等判断
    initMap () {
      var that = this
      that.map.on('zoomend', e => {
        var mapZoom = that.map.getZoom()
        if (mapZoom > 14) {
          that.cluster.removeMarkers(that.clusterMarkers)
          that.map.add(that.markers)
          that.map.on('dragend', that.mapDrag, that.mapDrag())
        } else {
          that.map.clearInfoWindow()
          that.map.remove(that.markers)
          that.cluster.addMarkers(that.clusterMarkers)
          that.map.off('dragend', that.mapDrag)
        }
      })
    },
    // 画区域点
    mapDrag () {
      var that = this
      that.idArr = []
      // that.map.remove(that.markers)
      var bounds = that.map.getBounds()
      var parsms = [
        {
          field: 'stationlng',
          value: bounds.southwest.lng + '_x_' + bounds.northeast.lng
        },
        {
          field: 'stationlat',
          value: bounds.southwest.lat + '_x_' + bounds.northeast.lat
        }
      ]
      this.$store
        .dispatch('Allstation', parsms)
        .then(res => {
          for (var k in that.markers) {
            that.idArr.push(that.markers[k].Le.stationid)
          }
          var icon
          for (var i = 0, marker; i < res.list.length; i++) {
            if (res.list[i].eleStatus === 0 || res.list[i].eleStatus === 1) {
              icon =
                '/imageUrl/mapOperatorIcon/normal_' + res.list[i].operatorid + '.png'
            } else if (res.list[i].eleStatus === 255) {
              icon =
                '/imageUrl/mapOperatorIcon/break_' + res.list[i].operatorid + '.gif'
            } else {
              icon =
                '/imageUrl/mapOperatorIcon/charge_' + res.list[i].operatorid + '.gif'
            }
            if (that.idArr.indexOf(res.list[i].stationid) < 0) {
              marker = new AMap.Marker({
                map: that.map,
                position: [res.list[i].stationlng, res.list[i].stationlat],
                icon: icon,
                stationid: res.list[i].stationid,
                stationname: res.list[i].stationname,
                merchantName: res.list[i].merchantName,
                address: res.list[i].address,
                stationstatusName: res.list[i].stationstatusName,
                parkfee: res.list[i].parkfee,
                electricityfee: res.list[i].electricityfee,
                servicefee: res.list[i].servicefee,
                offset: new AMap.Pixel(-13, -30)
              })
              marker.on('click', that.markerWindow)
              // marker.emit('click', { target: marker }) // 默认打开信息窗口,有bug
              that.markers.push(marker)
            }
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style lang='scss' scoped>
.top_num {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 1000px;
  border-radius: 4px;
  height: 58px;
  background-color: #eee;
  box-shadow: rgb(170, 170, 170) 0px 0px 8px;
}
.top_sta_num {
  padding-left: 24px;
  padding-top: 5px;
}
.station_stake {
  border-radius: 4px;
  width: 600px;
  height: 100px;
  position: absolute;
  bottom: 20px;
  z-index: 1000;
}
.stake_status {
  border-radius: 4px;
  width: 280px;
  position: absolute;
  bottom: 20px;
  right: -14px;
  background: #eee;
}
.status-data {
  display: inline-block;
  position: relative;
  width: 100%;
  height: 80px;
  padding-left: 60px;
  padding-top: 10px;
  border-radius: 10px;
}
.status-title {
  font-size: 18px;
  text-align: center;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #ffffff;
}
.white_text {
  color: #ffffff;
  font-weight: 800;
}
.white_text .ant-statistic-title {
  font-weight: 800;
}
#inputSearch {
  display: inline-block;
  width: 320px;
  height: 45px;
  padding: 5px 10px;
  float: left;
  border: 1px solid #aaa;
  border-right: none;
  outline: none;
}
#inputText {
  outline: none;
  cursor: pointer;
  display: inline-block;
  height: 45px;
  float: right;
  width: 80px;
  text-align: center;
  background: #ea6f5d;
  color: #fff;
  font-size: 18px;
  border: 1px solid #aaa;
  border-left: none;
}
#stationResultList {
  position: fixed;
  top: 128px;
  left: 10px;
}
#stationResultList .stationSearch {
  cursor: pointer;
  font-size: 12px;
  height: 25px;
  line-height: 25px;
  padding: 2px 5px;
}
#stationResultList .stationSearch:hover {
  background: #eee;
}
#stationResultList .stationSpan {
  color: #c1c1c1;
  padding-left: 5px;
}
.searchListStyle {
  list-style: none;
  margin: 0px;
  padding: 0;
  display: inline-block;
  min-width: 202px;
  background: #fff;
  z-index: 999;
  max-height: 200px;
  overflow-y: scroll;
}
</style>
<style>
.bottom-center,
.amap-info-contentContainer {
  width: 700px !important;
}
.white_text .ant-statistic-title {
  font-weight: 800;
  font-size: 22px;
}
</style>
