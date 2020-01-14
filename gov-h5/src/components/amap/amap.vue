<template>
  <div style="height: 100%;">
    <!-- :style="mapHeight" -->
    <div id="map"
         style="width: 100%; height: 100%"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
export default {
  data () {
    return {
      map: null,
      // mapHeight: null,
      mapObj: null,
      geolocation: null
    }
  },
  created () { },
  mounted () {
    // var that = this
    // this.mapHeight = 'height:' + (document.documentElement.clientHeight + 20) + 'px'
    /* 刷新方法 */
    // window.onresize = function () {
    //   that.mapHeight = 'height:' + (document.documentElement.clientHeight + 20) + 'px'
    // }
    this.initMap()
  },
  methods: {
    initMap () {
      var that = this
      that.map = new AMap.Map('map', {
        // center: [106.55889, 29.569741],
        // zoom: 15,
        resizeEnable: true
      })
      // that.mapObj = new AMap.Map('iCenter')
      // that.mapObj.plugin('AMap.Geolocation', function () {
      //   that.geolocation = new AMap.Geolocation({
      //     enableHighAccuracy: true, // 是否使用高精度定位，默认:true
      //     timeout: 10000, // 超过10秒后停止定位，默认：无穷大
      //     maximumAge: 0, // 定位结果缓存0毫秒，默认：0
      //     convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
      //     showButton: false, // 显示定位按钮，默认：true
      //     buttonPosition: 'LB', // 定位按钮停靠位置，默认：'LB'，左下角
      //     buttonOffset: new AMap.Pixel(10, -200), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      //     showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
      //     showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
      //     panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
      //     zoomToAccuracy: true // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      //   })
      //   that.mapObj.addControl(that.geolocation)
      //   that.geolocation.getCurrentPosition()
      //   AMap.event.addListener(that.geolocation, 'complete', that.onComplete)
      //   AMap.event.addListener(that.geolocation, 'error', that.onError)
      // })
      that.$store.commit('setMap', that.map)
    }
    // onComplete (data) {
    //   var str = []
    //   str.push(data.position.getLat())
    //   str.push(data.position.getLng())
    //   localStorage.setItem('location-lng', data.position.getLng())
    //   localStorage.getItem('location-lat', data.position.getLat())
    // },
    // onError (data) {
    //   this.$notify('定位失败')
    // }
  }
}
</script>

<style lang='scss' scoped>
</style>
