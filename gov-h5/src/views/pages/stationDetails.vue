<template>
  <div>
    <van-row class="top_main">
      <van-col :span="4" class="top_left_box">
        <img @click="goBack" class="top_back_img" src="./../../assets/operator/return.png" alt="">
      </van-col>
      <van-col :span="16">
        <div class="top_main_txt">站点详情</div>
      </van-col>
      <van-col :span="4" class="top_left_box">
      </van-col>
    </van-row>
    <div class="main">
      <van-tabs v-model="activeName" color="#000000" swipeable>
        <van-tab title="充电站" class="main_tab" name="a">
          <div class="main_title"></div>
          <div class="main_main">
            <div class="main_img">
              <!-- <img class="main_img_style" src="home/operator/MA002TMQX.png" alt=""> -->
              <img class="main_img_style" :src="opeImgSrc(operatorId)" alt="" onerror="javascript:this.src='home/operator/operator_default.png';">
            </div>
            <div class="main_box">
              <div class="box_title">
                <div class="box_title_left">{{ stationName }}</div>
                <div class="box_title_right">
                  <img class="box_title_right_img" src="home/operator/go.png" alt="">
                  <span class="box_title_right_txt">距离{{ distance }}km</span>
                </div>
              </div>
              <div class="box_address">{{ address }}</div>
              <div class="box_station">
                <div class="station_left">
                  <div class="station_left_img">
                    <img class="station_img" src="home/operator/DC_station.png" alt="">
                  </div>
                  <div class="station_right_txt">
                    <div class="station_txt_top">
                      <span class="station_top_num">{{ dirFree }}</span>
                      <span class="station_top_span">空闲</span>
                    </div>
                    <div class="station_txt_bottom">共{{ dirNum }}个直流桩</div>
                  </div>
                </div>
                <div class="station_mid"></div>
                <div class="station_right">
                  <div class="station_left_img">
                    <img class="station_img" src="home/operator/AC_station.png" alt="">
                  </div>
                  <div class="station_right_txt">
                    <div class="station_txt_top">
                      <span class="station_top_num">{{ comFree }}</span>
                      <span class="station_top_span">空闲</span>
                    </div>
                    <div class="station_txt_bottom">共{{ comNum }}个交流桩</div>
                  </div>
                </div>
              </div>
              <div class="main_content">
                <div class="content_left">运营商</div>
                <div class="content_right">{{ abbrName }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">电站状态</div>
                <div class="content_right">{{ stationStatus }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">营业时间</div>
                <div class="content_right">{{ busineHours === undefined ? '暂无' : busineHours }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">地址</div>
                <div class="content_right">{{ address }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">充电桩数量</div>
                <div class="content_right">{{ stakeNum }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">交流桩数量</div>
                <div class="content_right">{{ comNum }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">直流桩数量</div>
                <div class="content_right">{{ dirNum }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">一体桩数量</div>
                <div class="content_right">{{ otherNum }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">当前电价</div>
                <div class="content_right">{{ eleFee === undefined ? '暂无' : eleFee }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">停车费</div>
                <div class="content_right">{{ parkFee === undefined ? '暂无' : parkFee }}</div>
              </div>
              <div class="main_content">
                <div class="content_left">服务费</div>
                <div class="content_right">{{ serviceFee === undefined ? '暂无' : serviceFee }}</div>
              </div>
            </div>
          </div>
        </van-tab>
        <van-tab title="站内桩" class="main_tab" name="b">
          <div class="main_title"></div>
          <div class="main_stake">
            <div class="stake_title">
              <div class="stake_btn" :class="(this.stakeFlag === 0 ? 'stake_btn_checked' : '')" @click="stakeChange(0)">全部</div>
              <div class="stake_btn" :class="(this.stakeFlag === 3 ? 'stake_btn_checked' : '')" @click="stakeChange(3)">空闲</div>
              <div class="stake_btn" :class="(this.stakeFlag === 1 ? 'stake_btn_checked' : '')" @click="stakeChange(1)">直流</div>
              <div class="stake_btn" :class="(this.stakeFlag === 2 ? 'stake_btn_checked' : '')" @click="stakeChange(2)">交流</div>
            </div>
            <div class="stake_main">
              <van-row>
                <van-col class="stake_box" :span="12" v-for="item in stakeArr" :key="item">
                  <div class="stake_left">
                    <div class="stake_left_div">
                      <img class="stake_left_img" :src="stakeSrc(item.statusName)" alt="">
                    </div>
                    <div class="stake_left_bottom">
                      <div :class="stakeClass(item.statusName)">{{ item.statusName.substr(0,2) }}</div>
                    </div>
                  </div>
                  <div class="stake_right">
                    <div class="stake_right1">
                      <img class="stake_right1_img" :src="acdcSrc(item.equipmenttype)" alt="">
                      <span class="stake_right1_txt">{{ item.equipmentmodel }}</span>
                    </div>
                    <div class="stake_right_normal">
                      <span class="stake_right_normal1">接口</span>
                      <span class="stake_right_normal2">{{ item.equipmenttype }}</span>
                    </div>
                    <div class="stake_right_normal">
                      <span class="stake_right_normal1">功率</span>
                      <span class="stake_right_normal2">{{ item.powerinf }}kW</span>
                    </div>
                    <div class="stake_right_normal">
                      <span class="stake_right_normal1">电压</span>
                      <span class="stake_right_normal2">220V</span>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
          </div>
        </van-tab>
        <van-tab title="评价" class="main_tab" name="c">
          <div class="main_title"></div>
          <div class="main_eva">
            <div class="eva_title">
              <div class="eva_title_left">
                <span class="eva_title_span1">{{ starVal }}</span>
                <van-rate v-model="starVal" size="16" allow-half readonly void-icon="star" void-color="#eee"/>
                <span class="eva_title_span2">{{ totalNum }}人评价</span>
              </div>
              <div class="eva_title_right" @click="joinEvaluate">
                <img class="eva_title_img" src="home/operator/edit.png" alt="">
                <span class="eva_title_txt">参与评价</span>
              </div>
            </div>
            <div class="eva_nav">
              <div class="eva_btn" :class="(this.evaFlag === 0 ? 'eva_btn_checked' : '')" @click="evaChange(0)">全部{{ totalNum }}</div>
              <div class="eva_btn" :class="(this.evaFlag === 1 ? 'eva_btn_checked' : '')" @click="evaChange(1)">好评{{ goodNum }}</div>
              <div class="eva_btn" :class="(this.evaFlag === 2 ? 'eva_btn_checked' : '')" @click="evaChange(2)">差评{{ badNum }}</div>
              <div class="eva_btn" :class="(this.evaFlag === 3 ? 'eva_btn_checked' : '')" @click="evaChange(3)">有图{{ pictureNum }}</div>
            </div>
            <scroller :on-refresh="refresh" :on-infinite="infinite" ref="my_scroller" style="position:inherit;">
              <div class="eva_box" v-for="item in arr" :key="item.evaluationid">
                <div class="eva_left">
                  <!-- <img class="eva_left_img" :src="item.headUrl === null ? 'home/operator/operator_default.png' : item.headUrl" alt=""> -->
                  <img class="eva_left_img" :src="headSrc(item.headUrl)" alt="">
                </div>
                <div class="eva_right">
                  <div class="eva_head">
                    <div class="eva_head_left">{{ item.evaluationid }}</div>
                    <div class="eva_head_right">{{ item.evaluationtime }}</div>
                  </div>
                  <div class="eva_head_star">
                    <van-rate v-model="item.evaluationgrade" size="12" allow-half readonly void-icon="star" void-color="#eee"/>
                  </div>
                  <div class="eva_box_main">{{ item.evaluationcontent }}</div>
                  <div class="eva_bottom">
                    <div class="eva_slider_left">
                      <img class="eva_slider_left_img" src="home/operator/zan.png" alt="">
                      <span class="eva_slider_left_txt">{{ item.supportnum }}</span>
                    </div>
                    <div class="eva_slider_mid">
                      <van-slider bar-height="10" v-model="value" disabled :min="0" :max="100" inactive-color="#4a80fe" active-color="#fd6d2e">
                        <div slot="button" class="custom-button"></div>
                      </van-slider>
                    </div>
                    <div class="eva_slider_right">
                      <img class="eva_slider_right_img" src="home/operator/cai.png" alt="">
                      <span class="eva_slider_right_txt">{{ item.opposenum }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </scroller>
          </div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="bottom">
      <div class="bottom_main_left">
        <div class="bottom_box">
          <img class="bottom_img_left" v-if="isCollect === false" src="home/operator/collection.png" @click="startButton" alt="">
          <img class="bottom_img_left" v-else src="home/operator/collected.png" @click="startYellowButton" alt="">
          <span class="bottom_txt">收藏</span>
        </div>
        <div class="bottom_box" style="visibility:hidden;">
          <img class="bottom_img_left" src="home/operator/share.png" alt="">
          <span class="bottom_txt">分享</span>
        </div>
      </div>
      <div class="bottom_main_mid"></div>
      <div class="bottom_main_right">
        <div class="bottom_box_left" @click="callPhone(serviceTel)" :style="{ visibility:(serviceTel === undefined ?'hidden':'visible')}">
          <img class="bottom_img_left" src="home/operator/phone.png" alt="">
          <span class="bottom_txt">电话</span>
        </div>
        <div class="bottom_box_right" @click="toMapApp">
          <img class="bottom_img_left" src="home/operator/line.png" alt="">
          <span class="bottom_txt">导航</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'stationDetails',
  data () {
    return {
      stationName: '',
      distance: '',
      address: '',
      stationStatus: '',
      busineHours: '',
      operatorId: '',
      dirNum: '',
      dirFree: '',
      comNum: '',
      comFree: '',
      abbrName: '',
      otherNum: '',
      stakeNum: '',
      eleFee: '',
      parkFee: '',
      serviceTel: '',
      serviceFee: '',
      stationId: '',
      stakeArr: [],
      activeName: 'a',
      starVal: 0,
      totalNum: 0,
      goodNum: 0,
      badNum: 0,
      pictureNum: 0,
      stakeFlag: 0,
      evaFlag: 0,
      value: 10,
      userInfoAll: null,
      userId: null,
      isCollect: false,
      noDate: false,
      arr: [],
      page: 1,
      pageSize: 10
    }
  },
  activated () {
    this.stationName = this.$route.params.data.stationName
    this.distance = this.$route.params.data.distance
    this.address = this.$route.params.data.address
    this.stationStatus = this.$route.params.data.stationStatus
    this.busineHours = this.$route.params.data.busineHours
    this.dirNum = this.$route.params.data.dirNum
    this.dirFree = this.$route.params.data.dirFree
    this.comNum = this.$route.params.data.comNum
    this.comFree = this.$route.params.data.comFree
    this.abbrName = this.$route.params.data.abbrName
    this.otherNum = this.$route.params.data.otherNum
    this.stakeNum = this.$route.params.data.stakeNum
    this.eleFee = this.$route.params.data.eleFee
    this.parkFee = this.$route.params.data.parkFee
    this.serviceTel = this.$route.params.data.serviceTel
    this.serviceFee = this.$route.params.data.serviceFee
    this.stationId = this.$route.params.data.stationId
    this.operatorId = this.$route.params.data.operatorId
    if (getStore('userInfoAll')) {
      this.userInfoAll = getStore('userInfoAll')
      this.userId = this.userInfoAll.id
    }
    this.stakeChange(this.stakeFlag)
    this.evaChange(this.evaFlag)
    this.initComment()
  },
  created () {},
  mounted () {},
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    callPhone (serviceTel) {
      this.$utils.callPhone(serviceTel)
    },
    toMapApp () {
      const dstLngLat = {}
      dstLngLat.lng = this.$route.params.data.lng
      dstLngLat.lat = this.$route.params.data.lat
      this.$beginNavi.openNavigation(dstLngLat, this.stationName)
    },
    startButton () {
      if (!getStore('userInfoAll')) {
        this.$router.push('/login')
      } else {
        var that = this
        const params = {
          userId: this.userId,
          collectionId: this.stationId,
          collectionType: 1
        }
        this.$store.dispatch('AppAddCollection', params).then(res => {
          that.isCollect = true
          this.$notify({ type: 'success', message: '收藏成功！', duration: 700 })
        }).catch(err => console.log(err))
      }
    },
    startYellowButton () {
      var that = this
      const params = {
        userId: this.userId,
        collectionId: this.stationId,
        collectionType: 1
      }
      this.$store.dispatch('AppDeleteCollection', params).then(res => {
        that.isCollect = false
        this.$notify({ type: 'success', message: '取消收藏成功！', duration: 700 })
      }).catch(err => console.log(err))
    },
    stakeChange (e) {
      this.stakeFlag = e
      const params = {
        selectType: this.stakeFlag,
        stationId: this.stationId
      }
      this.$store.dispatch('AppMapstake', params).then(res => {
        this.stakeArr = res.list
      }).catch(err => { console.log(err) })
    },
    evaChange (e) {
      this.evaFlag = e
      this.getData()
    },
    // 评论总接口
    initComment () {
      this.$store.dispatch('AppEvaluationInfo', { id: '110' }).then(res => {
        this.starVal = res.evaluationgrade
        this.totalNum = res.totalNum
        this.pictureNum = res.pictureNum
        this.goodNum = res.goodNum
        this.badNum = res.badNum
      })
    },
    headSrc (e) {
      if (e === null) {
        return 'home/operator/operator_default.png'
      } else {
        return e
      }
    },
    getData () {
      var that = this
      return new Promise((resolve, reject) => {
        const params = {
          pageNum: that.page,
          // stationId: that.stationId,
          stationId: '110',
          pageSize: that.pageSize,
          type: that.evaFlag
        }
        that.$store.dispatch('AppEvaluationGrade', params).then(res => {
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
    refresh () {
      var that = this
      this.page = 1
      this.noDate = false
      setTimeout(function () {
        this.getData().then(res => {
          that.$refs.my_scroller.finishPullToRefresh(true)
        })
      }.bind(this), 1700)
    },
    infinite (done) {
      var that = this
      that.getData().then(res => {
        if (that.noDate === true) {
          that.$refs.my_scroller.finishInfinite(true)
        } else {
          that.page++
          done()
        }
      })
    },
    acdcSrc (rank) {
      if (rank === 1) {
        return 'home/operator/DC.png'
      } else {
        return 'home/operator/AC.png'
      }
    },
    stakeClass (rank) {
      if (rank.substr(0, 2) === '空闲') {
        return 'stake_left_btn_free'
      } else if (rank.substr(0, 2) === '占用') {
        return 'stake_left_btn_use'
      } else if (rank.substr(0, 2) === '故障') {
        return 'stake_left_btn_fault'
      } else {
        return 'stake_left_btn_unline'
      }
    },
    stakeSrc (rank) {
      if (rank.substr(0, 2) === '空闲') {
        return 'home/operator/stake_free.png'
      } else if (rank.substr(0, 2) === '占用') {
        return 'home/operator/stake_use.png'
      } else if (rank.substr(0, 2) === '故障') {
        return 'home/operator/stake_fault.png'
      } else {
        return 'home/operator/stake_unline.png'
      }
    },
    opeImgSrc (e) {
      return 'home/operator/' + e + '.png'
    },
    joinEvaluate () {
      this.$router.push({ path: '/evaluate', query: {} })
    }
  }
}
</script>

<style lang='scss' scoped>
.top_main {
  height: 54px;
  width: 100%;
  .top_left_box {
    height: 54px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    .top_back_img {
      width: 20px;
    }
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
}
.bottom {
  height: 53px;
  width: 100%;
  border-top: 1px solid #dddddd;
  display: flex;
  flex-direction: row;
  .bottom_main_mid {
    width: 15%;
  }
  .bottom_main_left {
    width: 35%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .bottom_box {
      height: 15px;
      width: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #999999;
        padding-left: 5px;
        font-size: 12px;
      }
    }
  }
  .bottom_main_right {
    width: 50%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    .bottom_box_right {
      height: 40px;
      padding: 15px;
      border-radius: 20px;
      background: #3486fe;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #ffffff;
        padding-left: 5px;
        font-size: 14px;
      }
    }
    .bottom_box_left {
      height: 38px;
      padding: 15px;
      border-radius: 19px;
      border: 1px solid #3486fe;
      color: #3486fe;
      display: flex;
      justify-content: center;
      align-items: center;
      .bottom_img_left {
        height: 15px;
        width: 15px;
      }
      .bottom_txt {
        color: #3486fe;
        padding-left: 5px;
        font-size: 14px;
      }
    }
  }
}
.main {
  height: calc(100% - 108px);
  width: 100%;
  overflow-y: scroll;
  padding: 0px 10px;
  .main_tab {
    padding: 0px 12px;
    font-size: 12px;
    .main_title {
      height: 10px;
      background-color: #ebebeb;
      width: 100%;
      border-radius: 5px;
      margin: 15px 0px 0px;
    }
    .main_main {
      width: 100%;
      display: flex;
      flex-direction: row;
      .main_img {
        width: 10%;
        height: 100%;
        text-align: center;
        .main_img_style {
          height: 20px;
          width: 20px;
          margin-top: 20px;
        }
      }
      .main_box {
        width: 90%;
        height: 100%;
        display: flex;
        flex-direction: column;
        .box_title {
          font-size: 16px;
          height: 24px;
          margin-top: 20px;
          font-family: PingFangSC-Semibold;
          display: flex;
          flex-direction: row;
          .box_title_left {
            font-size: 16px;
            width: 70%;
            height: 100%;
            font-weight: bold;
            justify-content: flex-start;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          .box_title_right {
            width: 30%;
            height: 100%;
            display: flex;
            flex-direction: row;
            justify-content: center;
            align-items: center;
            .box_title_right_img {
              height: 10px;
              width: 10px;
              margin-top: 3px;
            }
            .box_title_right_txt {
              color: #999999;
              padding-left: 3px;
              height: 15px;
              font-size: 8px;
            }
          }
        }
        .box_address {
          font-size: 12px;
          font-family: PingFangSC-Regular;
          color: #999999;
          padding-top: 12px;
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .box_station {
          height: 84px;
          padding: 15px 0px;
          width: 100%;
          display: flex;
          flex-direction: row;
          .station_left {
            height: 54px;
            width: 50%;
            display: flex;
            flex-direction: row;
            .station_left_img {
              height: 54px;
              width: 60px;
              .station_img {
                width: 100%;
                height: 100%;
              }
            }
            .station_right_txt {
              height: 54px;
              width: 100%;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              .station_txt_top {
                height: 30px;
                width: 100%;
                display: flex;
                flex-direction: row;
                .station_top_num {
                  color: #f17c01;
                  display: flex;
                  height: 30px;
                  justify-content: flex-start;
                  align-items: center;
                  font-size: 25px;
                  font-weight: bold;
                }
                .station_top_span {
                  font-size: 10px;
                  height: 30px;
                  padding-left: 10px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding-top: 10px;
                  color: #999999;
                }
              }
              .station_txt_bottom {
                height: 20px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 10px;
                color: #999999;
              }
            }
          }
          .station_mid {
            width: 1px;
            height: 54px;
            background-image: linear-gradient(0deg, #ffffff 0%, #999999 72%, #ffffff 100%);
          }
          .station_right {
            height: 54px;
            width: calc(50% - 1px);
            padding-left: 10px;
            display: flex;
            flex-direction: row;
            .station_left_img {
              height: 54px;
              width: 60px;
              .station_img {
                width: 100%;
                height: 100%;
              }
            }
            .station_right_txt {
              height: 54px;
              width: 100%;
              display: flex;
              padding-left: 10px;
              flex-direction: column;
              .station_txt_top {
                height: 30px;
                width: 100%;
                display: flex;
                flex-direction: row;
                .station_top_num {
                  color: #01af32;
                  display: flex;
                  height: 30px;
                  justify-content: flex-start;
                  align-items: center;
                  font-size: 25px;
                  font-weight: bold;
                }
                .station_top_span {
                  font-size: 10px;
                  height: 30px;
                  padding-left: 10px;
                  display: flex;
                  justify-content: flex-start;
                  align-items: center;
                  padding-top: 10px;
                  color: #999999;
                }
              }
              .station_txt_bottom {
                height: 20px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                align-items: center;
                font-size: 10px;
                color: #999999;
              }
            }
          }
        }
        .main_content {
          height: 30px;
          padding: 5px 0px;
          font-size: 12px;
          display: flex;
          flex-direction: row;
          .content_left {
            color: #999999;
            height: 30px;
            width: 30%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
          }
          .content_right {
            color: #000000;
            width: 70%;
            height: 30px;
            font-weight: normal;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
    }
    .main_stake {
      width: 100%;
      display: flex;
      flex-direction: column;
      .stake_title {
        height: 45px;
        padding-top: 10px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .stake_btn {
          font-size: 12px;
          padding: 5px 25px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          border: 1px solid #999999;
          background: #ffffff;
          border-radius: 5px;

        }
        .stake_btn_checked {
          color: #ffffff;
          border: 1px solid #4a80fc;
          background: #4a80fc;
        }
      }
      .stake_box {
        height: 140px;
        padding: 10px 0px;
        display: flex;
        flex-direction: row;
        .stake_left {
          height: 120px;
          width: 70px;
          display: flex;
          flex-direction: column;
          .stake_left_div {
            height: 80px;
            width: 70px;
            padding-right: 10px;
            .stake_left_img {
              height: 100%;
              width: 100%;
            }
          }
          .stake_left_bottom {
            height: 40px;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            .stake_left_btn_free {
              border: 1px solid #999999;
              padding: 5px 10px;
              font-size: 12px;
              color: #999999;
              border-radius: 3px;
            }
            .stake_left_btn_use {
              border: 1px solid #4a80fc;
              padding: 5px 10px;
              font-size: 12px;
              background: #4a80fc;
              color: #ffffff;
              border-radius: 3px;
            }
            .stake_left_btn_fault {
              border: 1px solid #e93802;
              padding: 5px 10px;
              font-size: 12px;
              color: #e93802;
              border-radius: 3px;
            }
            .stake_left_btn_unline {
              border: 1px solid #999999;
              padding: 5px 10px;
              font-size: 12px;
              color: #999999;
              border-radius: 3px;
            }
          }
        }
        .stake_right {
          height: 120px;
          width: 60%;
          display: flex;
          flex-direction: column;
          .stake_right1 {
            height: 30px;
            width: 60%;
            display: flex;
            flex-direction: row;
            align-items: center;
            margin-bottom: 5px;
            .stake_right1_img {
              height: 20px;
              width: 20px;
            }
            .stake_right1_txt {
              height: 20px;
              width: 60%;
              padding-left: 10px;
              font-size: 16px;
              font-weight: normal;
              color: #000000;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .stake_right_normal {
            height: 20px;
            width: 100%;
            display: flex;
            flex-direction: row;
            .stake_right_normal1 {
              height: 20px;
              display: flex;
              align-items: center;
              color: #999999;
            }
            .stake_right_normal2 {
              height: 20px;
              display: flex;
              align-items: center;
              padding-left: 5px;
            }
          }
        }
      }
    }
    .main_eva {
      width: 100%;
      display: flex;
      flex-direction: column;
      .eva_title {
        height: 40px;
        padding-top: 10px;
        display: flex;
        flex-direction: row;
        .eva_title_left {
          width: 70%;
          height: 30px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .eva_title_span1 {
            font-size: 18px;
            padding-right: 5px;
            color: #fd6d2e;
          }
          .eva_title_span2 {
            color: #999999;
            font-size: 12px;
            padding-left: 5px;
          }
        }
        .eva_title_right {
          width: 30%;
          height: 30px;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          .eva_title_img {
            height: 12px;
            width: 12px;
          }
          .eva_title_txt {
            height: 12px;
            font-size: 12px;
            color: #3486fe;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            margin-left: 5px;
          }
        }
      }
      .eva_nav {
        height: 35px;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        .eva_btn {
          font-size: 12px;
          padding: 5px 10px;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #999999;
          border: 1px solid #999999;
          background: #ffffff;
          border-radius: 5px;

        }
        .eva_btn_checked {
          color: #ffffff;
          border: 1px solid #4a80fc;
          background: #4a80fc;
        }
      }
      .my_scroller {
        width: 100%;
        height: calc(100% - 54px);
      }
      .eva_box {
        display: flex;
        flex-direction: row;
        .eva_left {
          width: 15%;
          padding-right: 10px;
          text-align: center;
          .eva_left_img {
            height: 40px;
            margin-top: 10px;
            width: 40px;
            border-radius: 50%;
          }
        }
        .eva_right {
          width: 85%;
          display: flex;
          flex-direction: column;
          .eva_head {
            height: 30px;
            padding-top: 10px;
            width: 100%;
            display: flex;
            flex-direction: row;
            .eva_head_left {
              width: 50%;
              height: 20px;
              display: flex;
              justify-content: flex-start;
              align-items: center;
              font-size: 14px;
              font-weight: bold;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .eva_head_right {
              width: 50%;
              height: 20px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
              font-size: 12px;
              color: #999999;
            }
          }
          .eva_head_star {
            height: 20px;
            padding-bottom: 5px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
          }
          .eva_box_main {
            font-size: 14px;
          }
          .eva_bottom {
            height: 50px;
            width: 100%;
            margin-top: 10px;
            padding-bottom: 10px;
            display: flex;
            flex-direction: row;
            border-bottom: 1px solid #eeeeee;
            .eva_slider_left {
              height: 40px;
              width: 15%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .eva_slider_left_img {
                height: 20px;
                width: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .eva_slider_left_txt {
                color: #fd6d2e;
                font-size: 12px;
              }
            }
            .eva_slider_mid {
              height: 40px;
              width: 70%;
              padding: 15px 0px;
              .van-slider--disabled {
                opacity: 1;
              }
              .custom-button {
                width: 5px;
                transform: rotate(25deg);
                background: #ffffff;
                height: 20px;
              }
            }
            .eva_slider_right {
              height: 40px;
              width: 15%;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              .eva_slider_right_img {
                height: 20px;
                width: 20px;
                display: flex;
                justify-content: center;
                align-items: center;
              }
              .eva_slider_right_txt {
                color: #999999;
                font-size: 12px;
              }
            }
          }
        }
      }
    }
  }
}
</style>
