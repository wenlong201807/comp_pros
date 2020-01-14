<template>
  <div>
    <van-row class="top_main">
      <van-col :span="4" class="top_left_box">
        <img @click="goback" class="top_back_img" src="./../../assets/operator/return.png" alt="">
      </van-col>
      <van-col :span="16">
        <van-search @focus="pageToSearch" shape="round" placeholder="搜索充电站、充电桩" />
      </van-col>
      <van-col :span="4" class="top_left_box">
        <!-- <img class="top_back_img" src="./../../assets/operator/horn.png" alt=""> -->
      </van-col>
    </van-row>
    <van-row class="mid_main">
      <van-dropdown-menu>
        <van-dropdown-item @change="distanceChange" @open="closeChoice" v-model="distanceVal" :options="option1"></van-dropdown-item>
        <van-dropdown-item @change="compChange" @open="closeChoice" v-model="compVal" :options="option2"></van-dropdown-item>
        <div class="choice" @click="showCond">
          <span
            :class="'choice_txt '+((this.condFlag === true)?'cond-color':'')"
            >筛选
            <img v-if="this.condFlag === false" class="choice_img" src="./../../assets/operator/screen.png" alt="">
            <img v-else class="choice_img" src="./../../assets/operator/screen_color.png" alt="">
          </span>
        </div>
      </van-dropdown-menu>
    </van-row>
    <div class="cond" v-if="condFlag">
      <div class="cond_top">
        <div class="cond_title_txt">充电桩类型</div>
        <div class="cond_title_main">
          <Selectors :list = pileTypeList :selectedList = selectedPileList ref="reset1"></Selectors>
        </div>
        <div class="cond_switch">
          <div class="cond_switch_txt">仅显示空闲站点</div>
          <div class="cond_switch_main">
            <van-switch v-model="checked" size="14"/>
          </div>
        </div>
        <div class="cond_slider" style="display:none;">
          <div class="cond_slider_title_top">收费范围</div>
          <div class="cond_slider_title_bottom">价格：<span class="cond_slider_title_span">1.20-1.40</span>&nbsp;元</div>
          <div class="cond_slider_txt">
            <div class="cond_slider_txt_left">1元/度</div>
            <div class="cond_slider_txt_right">1.75元/度</div>
          </div>
          <div class="cond_slider_main">
            <van-slider v-model="sliderValue" @change="onChange" />
          </div>
        </div>
        <div class="cond_title_txt">充电接口类型</div>
        <div class="cond_title_main">
          <Selectors :list = connList :selectedList = selectedConnList ref="reset2"></Selectors>
        </div>
        <div class="cond_title_txt">运营商</div>
        <div class="cond_title_main_noborder">
          <Selectors :list = opeList :selectedList = selectedOpeList ref="reset3"></Selectors>
        </div>
      </div>
      <div class="cond_bottom">
        <div class="cond_btn cond_btn_left" @click="resetAllFilter">重置</div>
        <div class="cond_btn cond_btn_right" @click="showValue">确定</div>
      </div>
    </div>
    <div class="my_scroller" v-if="this.condFlag === false">
      <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="position:inherit;">
        <div class="stationBox" v-for="item in arr" :key="item.stationName">
          <div class="box_img">
            <!-- <img class="box_img_style" :src='"./../../assets/operator/"+item.operatorId+".png"' alt=""> -->
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
import Selectors from './../../components/Selector/Selectors.vue'
export default {
  name: 'Search',
  data () {
    return {
      noDate: false, // 这是一个判断是否加载的开关
      arr: [],
      page: 1,
      pageSize: 10,
      distanceVal: 5000,
      option1: [
        { text: '5KM', value: 5000 },
        { text: '10KM', value: 10000 },
        { text: '20KM', value: 20000 }
      ],
      compVal: 1,
      option2: [
        { text: '综合排序', value: 1 },
        { text: '离我最近', value: 2 }
      ],
      condFlag: false,
      pileTypeList: [
        { key: 1, text: '直流桩' },
        { key: 2, text: '交流桩' }
      ],
      selectedPileList: [],
      connList: [
        { key: 2, text: '国标2015' },
        { key: 1, text: '国标2011' }
      ],
      selectedConnList: [],
      opeList: [],
      selectedOpeList: [],
      checked: false,
      sliderValue: 50,
      lngLat: '',
      lng: '',
      lat: '',
      arrs1: [],
      arrs2: [],
      arrs3: [],
      freeFlag: ''
    }
  },
  components: {
    Selectors: Selectors
  },
  activated () {
    this.lngLat = this.$route.query.lng + ',' + this.$route.query.lat
    this.lng = this.$route.query.lng
    this.lat = this.$route.query.lat
    const param = []
    this.$store.dispatch('AppOperatorInfo', param).then(res => {
      res.list.forEach(item => {
        this.opeList.push({ key: item.merchantNo, text: item.abbrName })
      })
    }).catch(err => console.log(err))
  },
  created () {},
  methods: {
    toMapApp (address, lng, lat) {
      const dstLngLat = {}
      dstLngLat.lng = lng
      dstLngLat.lat = lat
      this.$beginNavi.openNavigation(dstLngLat, address)
    },
    showValue () {
      this.arrs1 = []
      this.arrs2 = []
      this.arrs3 = []
      var that = this
      that.pileTypeList.forEach(itemn => {
        if (that.selectedPileList.length > 0) {
          that.selectedPileList.forEach(item => {
            if (item === itemn.text) {
              item = itemn.key
              that.arrs1.push(item)
            }
          })
        }
      })
      if (that.selectedConnList.length > 0) {
        that.selectedConnList.forEach(item => {
          that.connList.forEach(itemn => {
            if (item === itemn.text) {
              item = itemn.key
              that.arrs2.push(item)
            }
          })
        })
      }
      if (that.selectedOpeList.length > 0) {
        that.selectedOpeList.forEach(item => {
          that.opeList.forEach(itemn => {
            if (item === itemn.text) {
              item = itemn.key
              that.arrs3.push(item)
            }
          })
        })
      }
      if (that.checked === true) {
        that.freeFlag = 'is'
      } else {
        that.freeFlag = ''
      }
      that.condFlag = false
      this.page = 1
      this.arr = []
      // this.getData()
    },
    distanceChange (val) {
      this.distanceVal = val
      this.page = 1
      this.arr = []
      // this.getData()
    },
    compChange (val) {
      this.compVal = val
      this.page = 1
      this.arr = []
      // this.getData()
    },
    showCond () {
      this.condFlag = !this.condFlag
    },
    onChange (value) {
      this.$toast('当前值：' + value)
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
    resetAllFilter () {
      this.$refs.reset1.resetBtn()
      this.$refs.reset2.resetBtn()
      this.$refs.reset3.resetBtn()
      this.selectedPileList = []
      this.selectedConnList = []
      this.selectedOpeList = []
      this.arrs1 = []
      this.arrs2 = []
      this.arrs3 = []
      this.sliderValue = 50
      this.checked = false
    },
    pageToSearch () {
      this.$router.push({ path: '/search', query: { lng: this.$route.query.lng, lat: this.$route.query.lat } })
    },
    closeChoice () {
      this.condFlag = false
    },
    goback () {
      this.$router.go(-1)
    },
    gotoDetailsPage (e) {
      console.log(e)
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
            stakeTypes: that.arrs1,
            nationalStandards: that.arrs2,
            operatorIds: that.arrs3,
            free: that.freeFlag,
            distance: that.distanceVal,
            orderType: that.compVal,
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
    // 搜索
    stationInit () {
      this.page = 1
      this.getData()
    },
    imgSrc (src) {
      return 'home/operator/' + src + '.png'
    }
  }
}
</script>

<style scoped>
.top_main {
  height: 54px;
  width: 100%;
}
.mid_main {
  border-bottom: 1px solid #b5c7d2;
}
.top_left_box {
  height: 54px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top_back_img {
  width: 20px;
}
.my_scroller {
  width: 100%;
  height: calc(100% - 105px);
}
.stationBox {
  display: flex;
	flex-direction: row;
  height: 120px;
  width: 100%;
}
.box_img {
  width: 10%;
  height: 100%;
  text-align: center;
}
.box_img_style {
  height: 20px;
  width: 20px;
  margin-top: 16px;
}
.box_main {
  width: 90%;
  height: 100%;
  padding: 12px 0px;
  border-bottom: 1px solid #b5c7d2;
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
  height: 12px;
  display: none;
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
.choice {
  width: 33.3%;
  height: 100%;
  font-size: 0.3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.choice_img {
  width: 12px;
  height: 12px;
  margin-left: 3px;
}
.cond {
  width: 100%;
  height: calc(100% - 105px);
}
.cond-color {
  color: #1989fa;
}
.cond_top {
  height: calc(100% - 70px);
  padding: 0px 20px;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
}
.cond_bottom {
  height: 69px;
  width: 100%;
  border-top: 1px solid #b5c7d2;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.cond_btn {
  height: 60%;
  width: 40%;
  border-radius: 6px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.cond_btn_left {
  background: #f2f2f2;
  color: #333333;
}
.cond_btn_right {
  background: #3486fe;
  color: #ffffff;
}
.cond_title_txt {
  font-size: 14px;
  padding: 10px 0px;
  color: #333333;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}
.cond_title_main {
  padding-bottom: 10px;
  border-bottom: 1px solid #b5c7d2;
}
.cond_title_main_noborder {
  padding-bottom: 10px;
}
.cond_switch {
  padding: 10px 0px;
  font-size: 14px;
  height: 50px;
  border-bottom: 1px solid #b5c7d2;
  display: flex;
  flex-direction: row;
}
.cond_switch_txt {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 50%;
}
.cond_switch_main {
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: flex-end;
}
.cond_slider {
  border-bottom: 1px solid #b5c7d2;
  display: flex;
  flex-direction: column;
}
.cond_slider_title_top {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 10px 0px;
  font-size: 14px;
}
.cond_slider_title_bottom {
  height: 25px;
  font-size: 14px;
  color: #999999;
}
.cond_slider_title_span {
  color: #2b63ee;
}
.cond_slider_txt {
  display: flex;
  flex-direction: row;
  height: 40px;
  padding: 5px 0px;
  font-size: 12px;
}
.cond_slider_txt_left {
  display: flex;
  color: #999999;
  justify-content: flex-start;
  align-items: center;
  width: 50%;
  height: 30px;
}
.cond_slider_txt_right {
  display: flex;
  color: #999999;
  justify-content: flex-end;
  align-items: center;
  width: 50%;
  height: 30px;
}
.cond_slider_main {
  height: 20px;
}
</style>
