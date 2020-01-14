/* eslint-disable no-unused-vars */
<template>
  <div class="registerTop1">
    <div >
      <van-row class="evaluateTop1">
        <van-col span="2"
                 style="position:absolute;"> <span class="icon"
                @click="goBack"> </span></van-col>
        <span>接入车企</span>
      </van-row>

      <van-row class="hotCarWrap1">

        <mt-index-list v-if="carHotReg.length>0">
          <mt-index-section index="热门车企">
            <mt-cell class="carHotCell">
              <van-row>
                <van-grid :column-num="4">
                  <van-grid-item v-for="(i,index) in carHotReg"
                                 :key="index"
                                 style="border:none !important;">
                    <van-image width="80px"
                               height="80px"
                               fit="contain"
                               :src="carCompanter" />
                    <p class="carHotText">{{ i }}</p>
                  </van-grid-item>

                </van-grid>
                <p class="carMsg">截止{{ nowDay }}，e重庆共接入车企{{ totalCarCompany }}家</p>
              </van-row>
              <div class="borderCss"></div>
            </mt-cell>

          </mt-index-section>
          <mt-index-section v-for="item in barList"
                            :index="item"
                            :key="item">
            <mt-cell v-for="(car,index) in carEnterprises[item]"
                     class="carCell"
                     :key="index">
              <div class="carList">
                <van-image width="80px"
                           height="80px"
                           fit="contain"
                           :src="carCompanter"
                           class="carCompanyImg" />
                <span class="carCellText">{{ car }}</span>

              </div>
            </mt-cell>

          </mt-index-section>

        </mt-index-list>

      </van-row>
    </div>
    <loadingStatus content="加载中..."
                   :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import moment from 'moment'

import { getStore } from 'src/utils/store'

export default {

  data () {
    return {
      loadingShow: false,
      echartCar1: null,
      echartCar2: null,
      echartCar3: null,
      bannerImg: require('../../assets/img01.png'),
      carHotReg: [],
      numList: ['5', '2', '3', '6', '4'],
      hotCarCompany: null,
      barList: null,
      totalCarCompany: null,
      nowDay: '',
      carCompanter: require('../../assets/icon18.png'),
      activeName: '总体概况',
      indexList: ['热', 'A', 'B', 'C', 'D', 'E', 'F'],
      carEnterprises: null
    }
  },
  mounted () {
    this.loadingShow = true
    var nowDayArray = (moment(new Date()).format('L')).split('/')
    this.nowDay = nowDayArray[2] + '年' + nowDayArray[0] + '月' + nowDayArray[1] + '日'

    this.initCarEnterprises()

    window.onresize = function () {
      this.echart1.resize()
    }
  },
  watch: {
    activeName: function (value) {
      if (value === '车辆分布') {

      }
    }
  },
  methods: {
    changeTable (name, title) {
      if (name === '车辆分布') {
        this.$nextTick(() => {
          this.initType()
        })
      }
    },

    initCarEnterprises () {
      this.showLoading = true
      this.carHotReg = []
      var user = getStore('userSpecific')

      var parsms = {
        areaCode: user.areaCode
      }
      this.$store.dispatch('LetterList', parsms).then(res => {
        var wordLetter = res.wordLetter

        this.hotCarCompany = res.hot

        this.hotCarCompany.forEach(item => {
          this.carHotReg.push(item.substring(0, 5) + '...')
        })
        this.carEnterprises = wordLetter
        this.barList = res.firstLetter

        this.totalCarCompany = res.total
        this.loadingShow = false
      })
    },
    onChoose (item) {
      console.log(item)
    },
    goBack () {
      this.$router.go(-1)
    },
    refresh () {
      setTimeout(() => {
        this.$refs.myscroller.finishPullToRefresh() /// 刷新完毕关闭刷新的转圈圈
      }, 3000)
    }
  }
}
</script>

<style lang="scss" scoped>
.carCompanyImg {
  margin: 6px 0 6px 18px;
}
/deep/ .mint-indexlist-content {
  width: 100%;
}
.icon {
  margin-left: 4%;
  margin-top: 4%;
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(../../assets/back.png) no-repeat 50% 100%;
  background-size: contain;
}
.evaluateTop1 {
  position: absolute;;
  height: 44px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  z-index: 10000;
  top: 0;
  width: 100%;

  // line-height: 6%;
  padding: 2% 0;
}
.carHotText {
  font-size: 14px;

  margin-top: 4px;
}
.carTitle {
  font-size: 16px;
  font-weight: 700;
  // padding: 2% 2%;
}
.scrollerCss {
  margin-top: 12%;
  width: 100%;
  height: calc(100vh - 88px) !important;
  // padding: 0 4%;
}
.carMsg {
  text-align: center;
  font-size: 12px;
  color: #aaaaaa;
}
/deep/ .van-grid-item__content::after {
  border: none !important;
}
.borderCss {
  height: 10px;
  background: #f4f4f4;
}
.carHotCell {
  padding: 0;
}
/deep/ .van-grid-item__content {
  padding: 0;
}
.carCell {
  display: flxe !important;
  justify-content: left;
  .carList {
    display: flex;
    justify-content: left;
  }
  .carCellImg {
    display: inline-block;
    width: 60px;
    height: 50px;
    margin-top: 4px;
    background: url(../../assets/car1.png) no-repeat 100% 100%;
    background-size: contain;
  }
  .carCellText {
    margin-left: -18px;
    font-size: 14px;
    line-height: 100px;
  }
}
.carImgCss {
  width: 40px;
  height: 50px;
  background: url(../../assets/car1.png) no-repeat 100% 100%;
  background-size: contain;
}
/deep/ .van-index-bar__sidebar {
  right: 2%;
}

/deep/ .mint-cell-title {
  flex: 0;
}
/deep/ .mint-indexlist-nav {
  border: none;
  width: 30px;
  background: rgba(0, 0, 0, 0);
}

.imgBanner {
  width: 100%;
  height: 200px;
}
.generalTitle {
  font-size: 18px;
  text-align: center;
}
.numCss {
  display: inline-block;
  width: 33px;
  height: 33px;
  background: #eeeeee;
  line-height: 33px;
  font-size: 20px;
  margin-left: 8px;
}
.carNum {
  margin-left: 10px;
  color: #aaaaaa;
}
.carWrap {
  width: 100%;
  height: 30%;
  margin-top: 8%;
}
.blockDiv {
  width: 100%;
  height: 150px;
  display: flex;
  flex-wrap: wrap;
  // background: url(../../assets/icon1.png) no-repeat 100% 100%;
  background-size: contain;
}

.block {
  width: calc(calc(100% / 3));
  margin: 0px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid rgb(238, 238, 238);
}

.msgTitle {
  text-align: center;
  margin-top: 8px;
  color: #666666;
  font-size: 16px;
  .pinPai {
    font-size: 20px;
    color: #000;
    margin-right: 4px;
  }
}
.textSize {
  font-size: 12px;
}
.vehicle {
  width: 100%;
  height: calc(100vh - 84px);
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}
.vehicleByCar {
  padding: 0 4%;
  height: 222px;
  background: #ffffff;
}
.chartDiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
}
#echartCar1 {
  width: 100%;
  height: 140px;
  margin-top: 6px;
  // background: red;
}
.echartMsg {
  width: 60%;
  height: 140px;
  margin-left: 4px;
}
.blockEchart {
  width: calc(calc(100% / 3));
  margin: 0px;
  height: 40px;
  box-sizing: border-box;
  // border: 1px solid rgb(182, 182, 182);
  text-align: center;
  line-height: 40px;
}
.blockDivEchart {
  width: 100%;
  height: 140px;
  display: flex;
  flex-wrap: wrap;

  // background: url(../../assets/icon11.png) no-repeat 100% 100%;
  // background-size: contain;
}
.echartIcon1 {
  position: relative;
}
.echartIcon2 {
  position: relative;
}
.echartIcon3 {
  position: relative;
}
.echartIcon4 {
  position: relative;
}
.echartIcon1::before {
  content: "";
  width: 12px;
  height: 12px;
  background: url("../../assets/icon12.png") no-repeat 100% 100%;
  background-size: contain;
  position: absolute;
  left: -14px;
  top: 4px;
}
.echartIcon2::before {
  content: "";
  width: 12px;
  height: 12px;
  background: url("../../assets/icon13.png") no-repeat 100% 100%;
  background-size: contain;
  position: absolute;
  left: -14px;
  top: 4px;
}
.echartIcon3::before {
  content: "";
  width: 12px;
  height: 12px;
  background: url("../../assets/icon14.png") no-repeat 100% 100%;
  background-size: contain;
  position: absolute;
  left: -14px;
  top: 4px;
}
.echartIcon4::before {
  content: "";
  width: 12px;
  height: 12px;
  background: url("../../assets/icon15.png") no-repeat 100% 100%;
  background-size: contain;
  position: absolute;
  left: -14px;
  top: 4px;
}
.color1Css {
  color: #aaaaaa;
}
.noMsg {
  text-align: center;
  color: #aaaaaa;
  margin-top: 6px;
}

/deep/ .mint-indexlist-content{
  margin-top: 44px !important;
  height:calc(100% - 44px);
  -webkit-overflow-scrolling: touch;
  overflow-scrolling: touch;
}

</style>
