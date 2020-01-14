<template>
  <div style="margin:-24px;">
    <div id="map"
         :style="mapHeight"
         style="width:100%;"></div>
  </div>
</template>

<script>
import AMap from 'AMap'
import { mixin, mixinDevice } from '@/utils/mixin'

export default {
  data () {
    return {
      map: null,
      mapHeight: null
    }
  },
  mixins: [mixin, mixinDevice],
  created () { },
  mounted () {
    var that = this
    const defaultHeight = this.isMultiTab() ? 160 : 120
    this.mapHeight = 'height:' + (document.documentElement.clientHeight - defaultHeight) + 'px'
    /* 刷新方法 */
    window.onresize = function () {
      that.mapHeight = 'height:' + (document.documentElement.clientHeight - defaultHeight) + 'px'
    }
    this.initMap()
  },
  methods: {
    initMap () {
      var that = this
      that.map = new AMap.Map('map', {
        center: [106.55889, 29.569741],
        resizeEnable: true,
        zoom: 10
      })
      that.$store.commit('setMap', that.map)
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
