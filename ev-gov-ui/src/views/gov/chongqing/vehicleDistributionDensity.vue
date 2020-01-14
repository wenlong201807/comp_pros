<template>
  <div style="position:relative">
    <div class="searchCss" style="">
      <a-col :span="14">
        <span>车企名称：</span>
        <a-select v-model="companyName" :dropdownMatchSelectWidth=false :allowClear=true style="width:200px;" placeholder="请选择生产厂家">
          <a-select-option v-for="item in companyList" :key="item.name" :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="6">
        <span>时间：</span>
        <a-select v-model="yearName" defaultValue="2019" style="width: 120px">
          <a-select-option v-for="item in yearList" :key="item.name" :value="item.name">{{item.name}}</a-select-option>
        </a-select>
      </a-col>
      <a-col :span="4">
        <a-button @click="searchMap" type="primary" icon="search">查询</a-button>
      </a-col>
    </div>
    <Map></Map>
  </div>
</template>

<script>
import Map from '@/components/amap/amap.vue'
export default {
  data () {
    return {
      map: null,
      companyList: null,
      companyName: undefined,
      yearList: [],
      yearName: undefined,
      heatmapData: null,
      heatmap: ''
    }
  },
  components: {
    Map
  },
  created () {
    // 车辆生产厂家下拉
    var that = this;
    const params = [
      {
        field: "areaCode",
        value: this.$ls.get('areaCode')
      }
    ];
    this.$store
      .dispatch("GroupStatisticsByFactory", params)
      .then(res => {
        that.companyList = res;
      })
      .catch(error => {});
    // 获取下拉年份
    var newDate = new Date();
    that.yearName = newDate.getFullYear()
    for(var i=0;i<5;i++){
      that.yearList.push({name:that.yearName-i})
    }
  },
  mounted () {
    this.map = this.$store.getters.getMap
    this.searchMap()
  },
  methods: {
    searchMap(){
      this.initMap()
    },
    // 加载地图热力图
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
        company: that.companyName,
        multiple: 1,
        time: that.yearName
      }
      this.$store
        .dispatch("VHeatForMap", params)
        .then(res => {
          that.heatmapData = res
          this.map.plugin(['AMap.Heatmap'], function () {
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
        .catch(error => {});
    },
    // 判断浏览区是否支持canvas
    isSupportCanvas () {
      var elem = document.createElement('canvas')
      return !!(elem.getContext && elem.getContext('2d'))
    }
  }
}
</script>

<style lang='scss' scoped>
.searchCss {
  position: absolute;
  left: 0;
  top: 10px;
  z-index: 1000;
  width: 40%;
  min-width: 700px;
  background: #fff;
  height: 48px;
  padding-left: 20px;
  padding-top: 8px;
  padding-right: 4px;
  box-shadow: 0 2px 4px rgb(184, 183, 183);
}
</style>
