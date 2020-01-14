<template>
  <div class="search_main">
    <van-row class="top_main">
      <van-col :span="4" class="top_left_box">
        <img @click="goback" class="top_back_img" src="./../../assets/operator/return.png" alt="">
      </van-col>
      <van-col :span="16">
        <form @submit.prevent action="#">
          <van-search @keypress="search($event)" background="#ffffff" v-model="stationName" placeholder="搜索充电站、充电桩" />
        </form>
      </van-col>
      <van-col :span="4" class="top_left_box">
        <span @click="stationInit" class="top_right_txt">搜索</span>
      </van-col>
    </van-row>
    <div class="my_scroller">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="position:inherit;">
        <div class="stationBox" v-for="item in arr" :key="item.stationName">
          <div class="box_img">
            <!-- <img class="box_img_style" src="./../../assets/operator/MA002TMQX.png" alt=""> -->
            <img class="box_img_style" :src='imgSrc(item.operatorId)' alt="" onerror="javascript:this.src='home/operator/operator_default.png';">
          </div>
          <div class="box_main">
            <div class="box_left_main" @click="gotoDetailsPage(item)">
              <div class="station_title">
                <span class="station_title_span">{{ item.stationName }}</span>
                <!-- <img class="title_icon" src="./../../assets/operator/star.png" alt=""> -->
              </div>
              <div class="station_address">{{ item.address }}</div>
              <div class="station_nav">
                <div class="sn_nav1">{{ item.abbrName === undefined ? '未知' : item.abbrName }}</div>
                <div class="sn_nav2"><img class="nav_icon" src="./../../assets/operator/star_percent.png" alt="">4.1分</div>
                <div class="sn_nav3"><span class="nav_text">￥&nbsp;&nbsp;1.65</span>/度</div>
              </div>
              <div class="station_bottom">
                <div class="sb_dc">
                  <img class="dc_img" src="./../../assets/operator/dc.png" alt="">
                  <span class="dc_txt">空闲&nbsp;<span class="dc_color">{{ item.dirFree }}</span>/{{ item.stakeNum }}</span>
                </div>
                <div class="sb_ac">
                  <img class="ac_img" src="./../../assets/operator/ac.png" alt="">
                  <span class="ac_txt">空闲&nbsp;<span class="ac_color">{{ item.comFree }}</span>/{{ item.stakeNum }}</span>
                </div>
              </div>
            </div>
            <div class="box_right_main">
              <div class="br_box" @click="toMapApp(item.stationName, item.lng, item.lat)">
                <img class="br_distance" src="./../../assets/operator/distance.png" alt="">
                <span class="br_span">距离{{ item.distance }}KM</span>
              </div>
            </div>
          </div>
        </div>
      </scroller>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      flag: false,
      stationName: '',
      noDate: false, // 这是一个判断是否加载的开关
      arr: [],
      page: 1,
      lngLat: '',
      lng: '',
      lat: '',
      pageSize: 10
    }
  },
  mounted () {
    // this.getData()
  },
  activated () {
    this.lngLat = this.$route.query.lng + ',' + this.$route.query.lat
    this.lng = this.$route.query.lng
    this.lat = this.$route.query.lat
  },
  methods: {
    search (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.stationInit()
      }
    },
    // 下拉刷新
    refresh () {
      var that = this
      this.page = 1// 重置页数刷新每次页数都是第一页
      this.noDate = false// 重置数据判断
      setTimeout(function () {
        this.getData().then(res => {
          that.$refs.my_scroller.finishPullToRefresh(true)// 刷新完毕关闭刷新的转圈圈
        })
      }.bind(this), 1700)
    },
    // 上拉获取
    infinite (done) {
      var that = this
      that.getData().then(res => {
        if (that.noDate === true) {
          that.$refs.my_scroller.finishInfinite(true)
        } else {
          that.page++// 下拉一次页数+1
          done()// 进行下一次加载操作
        }
      })
    },
    toMapApp (address, lng, lat) {
      const dstLngLat = {}
      dstLngLat.lng = lng
      dstLngLat.lat = lat
      this.$beginNavi.openNavigation(dstLngLat, address)
    },
    goback () {
      this.$router.go(-1)
    },
    gotoDetailsPage (e) {
      this.$router.push({ name: 'stationDetails', params: { data: e } })
    },
    // 获取数据
    getData () {
      var that = this
      return new Promise((resolve, reject) => {
        const data = {
          basic: {
            pageNum: that.page,
            pageSize: that.pageSize
          },
          params: {
            stakeName: that.stationName,
            orderType: 2,
            lngLat: that.lngLat
            // lngLat: '106.55889,29.569741'
          }
        }
        that.$store.dispatch('AppMapStation', data).then(res => {
          if (res.pages === that.page || res.pages < that.page) {
            that.noDate = true
            if (res.pages === 1 || res.pages === 0) {
              that.arr = res.list
            }
          } else {
            if (that.page === 1) {
              that.arr = res.list
            } else {
              that.arr = that.arr.concat(res.list)
            }
          }
          resolve(res)
        }).catch(error => {
          console.log(error)
        })
      })
    },
    imgSrc (src) {
      return 'home/operator/' + src + '.png'
    },
    // 搜索
    stationInit () {
      this.page = 1
      this.getData()
    }
  }
}
</script>

<style scoped>
.search_main {
  padding: 10px;
  background: #f1f1f1;
}
.top_main {
  height: 54px;
  width: 100%;
  background: #ffffff;
}
.top_left_box {
  height: 54px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.van-search__content--square {
  background-color: #ffffff;
}
.top_right_txt {
  font-size: 16px;
  border-left: 1px solid #dddddd;
  width: 100%;
  height: 20px;
  /* display: flex;
  justify-content: center;
  align-items: center; */
}
.top_back_img {
  width: 20px;
}
.my_scroller {
  width: 100%;
  height: calc(100% - 54px);
}
.stationBox {
  display: flex;
	flex-direction: row;
  height: 120px;
  width: 100%;
  background: #ffffff;
  margin: 10px 0px;
}
.box_img {
  width: 10%;
  height: 100%;
  text-align: center;
}
.box_img_style {
  height: 24px;
  width: 24px;
  margin-top: 12px;
}
.box_main {
  width: 90%;
  height: 100%;
  padding: 12px 0px;
  display: flex;
	flex-direction: row;
}
.box_left_main {
  width: 70%;
  height: 100%;
  display: flex;
	flex-direction: column;
}
.station_title {
  height: 24px;
  width: 100%;
  font-size: 16px;
  font-weight: bold;
  justify-content: center;
  font-family: PingFangSC-Semibold;
}
.station_title_span {
  width: 60%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.title_icon {
  height: 12px;
  width: 12px;
  margin-left: 12px;
}
.station_address {
  font-size: 12px;
  font-family: PingFangSC-Regular;
  color: #999999;
  padding-top: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.station_nav {
  height: 24px;
  padding: 6px 0px;
  font-size: 12px;
  display: flex;
  flex-direction: row;
}
.sn_nav1 {
  padding-right: 10px;
  height: 12px;
  line-height: 12px;
  /* border-right: 1px solid #b0afaf; */
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sn_nav2 {
  padding: 0px 10px;
  display: none;
  height: 12px;
  line-height: 12px;
  border-right: 1px solid #b0afaf;
}
.nav_icon {
  height: 12px;
  width: 12px;
  margin-right: 6px;
  float: left;
}
.sn_nav3 {
  padding-left: 10px;
  display: none;
  height: 12px;
  line-height: 12px;
  color: #999999;
}
.nav_text{
  font-weight: bold;
  color: #333333;
}
.station_bottom {
  height: 18px;
  display: flex;
  flex-direction: row;
  margin-top: 4px;
}
.sb_dc {
  height: 18px;
  border: 1px solid #ea7900;
}
.sb_ac {
  height: 18px;
  border: 1px solid #01af32;
  margin-left: 12px;
}
.dc_img,.ac_img {
  height: 16px;
  float: left;
}
.dc_txt,.ac_txt {
  font-size: 8px;
  color: #999999;
  float: left;
  padding: 0px 6px;
  height: 16px;
  line-height: 16px;
}
.dc_color {
  color: #ea7900;
}
.ac_color {
  color: #01af32;
}
.box_right_main {
  width: 30%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.br_box {
  display: flex;
  flex-direction: column;
}
.br_distance {
  width: 30px;
  margin: 0 auto;
}
.br_span {
  font-size: 12px;
  color: #999999;
  margin-top: 6px;
}
</style>
