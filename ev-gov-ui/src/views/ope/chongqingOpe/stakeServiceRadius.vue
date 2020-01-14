<template>
  <div style="position:relative;">
    <Map></Map>
  </div>
</template>

<script>
import Map from '@/components/amap/amap.vue'
import moment from 'moment'
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
      stationNum: '1210',
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
      areaCode: null,
      operatorId: null,
      circles: []
    }
  },
  components: {
    Map
  },
  created () {
    this.areaCode = this.$ls.get('areaCode')
    this.operatorId = this.$ls.get('merchantNo')
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
        field: 'areaCode',
        value: that.areaCode
      },
      {
        field: 'operatorid',
        value: that.operatorId
      }
    ]
    this.$store
      .dispatch('OpeAllStation', parsms)
      .then(res => {
        that.initClusteMap(res)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 打开信息窗口
    markerWindow (e) {
      var that = this
      var parsms = {
        basic: {
          stationid: e.target.Je.stationid
        },
        params: [
          {
            field: 'areaCode',
            value: this.areaCode
          },
          {
            field: 'operatorid',
            value: this.operatorId
          }
        ]
      }
      this.$store
        .dispatch('OpeAllStakeInfo', parsms)
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
          if (e.target.Je.electricityfee) {
            electricityfee = e.target.Je.electricityfee.split(',').join('\n')
          } else {
            electricityfee = ''
          }
          if (e.target.Je.servicefee) {
            servicefee = e.target.Je.servicefee.split(',').join('\n')
          } else {
            servicefee = ''
          }
          var windowContent = `
          <div style='font-weight:bold;padding:2px;width:700px;'>充电站基础信息：</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/name.png' style='width:20px;height:20px;margin-right:7px;'>站名称：${e.target.Je.stationname || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>运营商：${e.target.Je.merchantName || ''}</div>
          <div style='padding:2px;'><img src='/imageUrl/mapOperatorIcon/address.png' style='width:20px;height:20px;margin-right:7px;'>站地址：${e.target.Je.address || ''}</div>
          <div style='width:50%;display:inline-block;float:left;padding:2px;'><img src='/imageUrl/mapOperatorIcon/status.png' style='width:20px;height:20px;margin-right:7px;'>站状态：${e.target.Je.stationstatusName || ''}</div>
          <div style='width:50%;display:inline-block;float:right;padding:2px;'><img src='/imageUrl/mapOperatorIcon/stopCar.png' style='width:20px;height:20px;margin-right:7px;'>停车费：${e.target.Je.parkfee || ''}</div>
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
          for (var k in that.circles) {
            that.circles[k].show()
          }
          that.map.on('dragend', that.mapDrag, that.mapDrag())
        } else {
          that.map.clearInfoWindow()
          that.map.remove(that.markers)
          for (var m in that.circles) {
            that.circles[m].hide()
          }
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
        },
        {
          field: 'operatorid',
          value: this.operatorId
        }
      ]
      this.$store
        .dispatch('OpeAllStation', parsms)
        .then(res => {
          for (var k in that.markers) {
            that.idArr.push(that.markers[k].Je.stationid)
          }
          var icon
          for (var i = 0, marker, circle; i < res.list.length; i++) {
            if (res.list[i].eleStatus === 0 || res.list[i].eleStatus === 1) {
              icon = '/imageUrl/mapOperatorIcon/normal_' + res.list[i].operatorid + '.png'
            } else if (res.list[i].eleStatus === 255) {
              icon = '/imageUrl/mapOperatorIcon/break_' + res.list[i].operatorid + '.gif'
            } else {
              icon = '/imageUrl/mapOperatorIcon/charge_' + res.list[i].operatorid + '.gif'
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
              circle = new AMap.Circle({
                center: [res.list[i].stationlng, res.list[i].stationlat],
                radius: res.list[i].stakeNumber * 100, // 半径
                borderWeight: 0,
                strokeColor: '#1791fc',
                strokeWeight: 0,
                strokeOpacity: 0.2,
                fillOpacity: 0.3,
                strokeStyle: 'solid',
                fillColor: '#1791fc',
                zIndex: 50
              })
              circle.setMap(that.map)
              marker.on('click', that.markerWindow)
              // marker.emit('click', { target: marker }) // 默认打开信息窗口,有bug
              that.circles.push(circle)
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
</style>
