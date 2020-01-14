<template>
  <div>
    <Map></Map>
  </div>
</template>

<script>
import Map from '@/components/amap/amap.vue'
export default {
  data() {
    return {
      map: null,
      heatmapData: null,
      heatmap: ''
    }
  },
  components: {
    Map
  },
  created () {
    
  },
  mounted() {
    this.map = this.$store.getters.getMap
    this.initMap()
  },
  methods: {
    // 加载充电桩使用分布密度热力图
    initMap () {
      if (!this.isSupportCanvas()) {
        alert(
          '热力图仅对支持canvas的浏览器适用,您所使用的浏览器不能使用热力图功能,请换个浏览器试试~'
        )
      }
      var that = this
      that.map.remove(that.heatmap)
      var params = {
        areaCode: this.$ls.get('areaCode'),
        merchantNo: this.$ls.get('merchantNo')
      }
      this.$store
        .dispatch("OpeStakeLngLatInfo", params)
        .then(res => {
          that.heatmapData = res
          this.map.plugin(['AMap.Heatmap'], function() {
            // 初始化heatmap对象
            that.heatmap = new AMap.Heatmap(that.map, {
              radius: 25, // 给定半径
              opacity: [0, 0.8],
              gradient: {
                0.5: 'blue',
                0.65: 'rgb(117,211,248)',
                0.7: 'rgb(0, 255, 0)',
                0.9: '#ffea00',
                1.0: 'red'
              }
            })
            // 设置数据集
            that.heatmap.setDataSet({
              data: that.heatmapData,
              max: 5
            })
          })
        })
        .catch(error => {})
    },
    // 判断浏览区是否支持canvas
    isSupportCanvas() {
      var elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
