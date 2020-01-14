<template>
  <div>
    <van-row class="top_main">
      <van-col :span="4" class="top_left_box">
        <img @click="goBack" class="top_back_img" src="./../../assets/operator/return.png" alt="">
      </van-col>
      <van-col :span="16">
        <div class="top_main_txt">收藏中心</div>
      </van-col>
      <van-col :span="4" class="top_left_box">
      </van-col>
    </van-row>
    <van-row class="top_tab">
      <van-tabs v-model="active">
        <van-tab title="站点收藏">
          <div class="my_scroller">
            <scroller :on-refresh="refresh" :noDataText="noDataText" :on-infinite="infinite" ref="my_scroller" style="position:inherit;">
            <van-swipe-cell v-for="item in arr" :key="item.stationName" :on-close="onClose">
              <div class="stationBox">
                <div class="box_img">
                  <img class="box_img_style" src="./../../assets/operator/MA002TMQX.png" alt="">
                </div>
                <div class="box_main">
                  <div class="box_left_main" @click="gotoDetailsPage">
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
                        <span class="ac_txt">空闲&nbsp;<span class="ac_color">{{ item.dirFree }}</span>/{{ item.stakeNum }}</span>
                      </div>
                    </div>
                  </div>
                  <div class="box_right_main">
                    <div class="br_box">
                      <img class="br_distance" src="./../../assets/operator/distance.png" alt="">
                      <span class="br_span">距离{{ item.distance }}KM</span>
                    </div>
                  </div>
                </div>
              </div>
              <template slot="right">
                <van-button @click="deleteStation(item.stationId)" square type="danger" text="删除" />
              </template>
            </van-swipe-cell>
            </scroller>
          </div>
        </van-tab>
        <van-tab title="资讯收藏">
          <div class="my_scroller">
            <scroller :on-refresh="refreshSeek" :noDataText="noDataText1" :on-infinite="infiniteSeek" ref="seek_scroller" style="position:inherit;">
              <van-swipe-cell v-for="item in seekArr" :key="item.id" :on-close="onClose">
                <div class="seek">
                  <div class="seek_main">
                    <div class="seek_title">{{ item.title }}</div>
                    <div class="seek_source">{{ item.distance }}</div>
                    <div class="seek_date">{{ item.crtDate }}</div>
                  </div>
                  <div class="seek_img">
                    <img class="seek_img_size" :src="item.picUrl" alt="">
                  </div>
                </div>
                <template slot="right">
                  <van-button @click="deleteSeek(item.id)" square type="danger" text="删除" />
                </template>
              </van-swipe-cell>
            </scroller>
          </div>
        </van-tab>
      </van-tabs>
    </van-row>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'Collection',
  data () {
    return {
      active: 0,
      noDate: false, // 这是一个判断是否加载的开关
      arr: [],
      page: 1,
      pageSize: 10,
      noSeekDate: false, // 这是一个判断是否加载的开关
      seekArr: [],
      seekpage: 1,
      seekpageSize: 10,
      noDataText: '没有更多数据',
      noDataText1: '没有更多数据',
      userInfoAll: null,
      userId: null
    }
  },
  mounted () {
    if (getStore('userInfoAll')) {
      this.userInfoAll = getStore('userInfoAll')
      this.userId = this.userInfoAll.id
    }
    this.getData()
    this.getSeekData()
  },
  methods: {
    onClose (clickPosition, instance, detail) {
      // console.log(clickPosition)
      // console.log(instance)
      // console.log(detail)
    },
    deleteStation (e) {
      const params = {
        collectionId: e,
        collectionType: 1
      }
      this.$store.dispatch('AppDeleteCollection', params).then(res => {
        this.getData()
        this.$notify({ type: 'success', message: '删除成功' })
      }).catch(err => console.log(err))
    },
    deleteSeek (e) {
      const params = {
        collectionId: e,
        collectionType: 2
      }
      this.$store.dispatch('AppDeleteCollection', params).then(res => {
        this.getSeekData()
        this.$notify({ type: 'success', message: '删除成功' })
      }).catch(err => console.log(err))
    },
    goBack () {
      this.$router.go(-1)
    },
    gotoDetailsPage () {
      this.$router.push({ path: '/stationDetails' })
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
          if (res.list.length === 0) {
            that.noDataText = '暂无数据'
          } else {
            that.noDataText = '没有更多数据了'
          }
          that.$refs.my_scroller.finishInfinite(true)
        } else {
          that.page++
          done()
        }
      })
    },
    // 获取数据
    getData () {
      var that = this
      return new Promise((resolve, reject) => {
        const data = {
          basic: {
            pageNum: that.page,
            pageSize: that.pageSize,
            userId: that.userId
          },
          params: {
            collection: 'is',
            lngLat: '106.55889, 29.569741'
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
    // 下拉刷新
    refreshSeek () {
      var that = this
      this.seekpage = 1// 重置页数刷新每次页数都是第一页
      this.noSeekDate = false// 重置数据判断
      setTimeout(function () {
        this.getSeekData().then(res => {
          that.$refs.seek_scroller.finishPullToRefresh(true)// 刷新完毕关闭刷新的转圈圈
        })
      }.bind(this), 1700)
    },
    // 上拉获取
    infiniteSeek (done) {
      var that = this
      that.getSeekData().then(res => {
        if (that.noSeekDate === true) {
          if (res.list.length === 0) {
            that.noDataText1 = '暂无数据'
          } else {
            that.noDataText1 = '没有更多数据了'
          }
          that.$refs.seek_scroller.finishInfinite(true)
        } else {
          that.seekpage++// 下拉一次页数+1
          done()// 进行下一次加载操作
        }
      })
    },
    // 获取数据
    getSeekData () {
      var that = this
      return new Promise((resolve, reject) => {
        const data = {
          pageNum: that.seekpage,
          pageSize: that.seekpageSize,
          userId: that.userId
        }
        that.$store.dispatch('AppCollectionList', data).then(res => {
          console.log(res)
          if (res.pages === that.seekpage || res.pages < that.seekpage) {
            that.noSeekDate = true
            if (res.pages === 1 || res.pages === 0) {
              that.seekArr = res.list
            }
          } else {
            if (that.seekpage === 1) {
              that.seekArr = res.list
            } else {
              that.seekArr = that.seekArr.concat(res.list)
            }
          }
          resolve(res)
        }).catch(error => {
          console.log(error)
        })
      })
    }
  }
}
</script>

<style scoped>
.top_main,.top_tab {
  height: 54px;
  width: 100%;
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
.top_main_txt {
  font-size: 16px;
  font-weight: bold;
  height: 54px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.col_tab {
  width: 100%;
  height: calc(100% - 108px);
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
  height: 24px;
  width: 24px;
  margin-top: 12px;
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
  border-right: 1px solid #b0afaf;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.sn_nav2 {
  padding: 0px 10px;
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
.van-button--square {
  height: 100%;
}
.my_scroller {
  width: 100%;
  height: calc(100% - 108px);
}
.seek {
  padding: 0px 15px;
  height: 100px;
  display: flex;
  flex-direction: row;
}
.seek_img {
  height: 100px;
  width: 100px;
  padding: 10px;
}
.seek_main {
  height: 100px;
  width: calc(100% - 80px);
  display: flex;
  flex-direction: column;
}
.seek_img_size {
  height: 80px;
  width: 80px;
}
.seek_title {
  height: 50px;
  width: 100%;
  font-size: 14px;
}
.seek_source,.seek_date {
  height: 25px;
  line-height: 25px;
  color: #999999;
  font-size: 10px;
  width: 100%;
}
</style>
