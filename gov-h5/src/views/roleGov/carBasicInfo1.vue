<template>
  <div>
    <div class="registerTop">
      <van-row class="evaluateTop">
        <van-col span="2"
                 style="position:absolute;"> <span class="icon"
                                                   @click="goBack"> </span></van-col>
        <span>总体概况</span>
      </van-row>

      <van-row>

        <img :src="bannerImg"
             alt=""
             class="imgBanner">
        <div style="text-align:center;width:100%;">
          <span class="generalTitle">重庆市新能源汽车总数</span>
        </div>
        <div style="text-align:center;width:100%;margin-top:2%;">
          <span class="numCss"
                v-for="(i,index) in numList"
                :key="index">{{ i }}</span>
          <span class="carNum">辆</span>
        </div>
        <div class="carWrap">
          <div class="blockDiv">
            <div class="block"
                 style="border-top:0;border-left:0;border-right:0;">
              <div class="msgTitle">接入品牌</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ brandsNum }}</span>(个)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;">
              <div class="msgTitle">接入车型</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ vehicleModelNum }}</span>(个)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;">
              <div class="msgTitle">本地车牌</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ plateCode }}</span>(辆)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-left:0;border-right:0;border-bottom:0;">
              <div class="msgTitle">行驶里程</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ totalMileage }}</span>(万公里)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;border-bottom:0;">
              <div class="msgTitle">行驶时间</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ totalTime }}</span>(万小时)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;border-bottom:0;">
              <div class="msgTitle">节能减排</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ totalCo2 }}</span>(万吨)</div>
            </div>

          </div>

        </div>

      </van-row>
    </div>
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'

export default {

  data () {
    return {
      loadingShow: false,
      totalCo2: null,
      totalTime: null,
      totalMileage: null,
      plateCode: null,
      vehicleModelNum: null,
      brandsNum: null,
      user: null,
      echartCar1: null,
      echartCar2: null,
      echartCar3: null,
      bannerImg: require('../../assets/img01.png'),
      carHotReg: [],
      numList: [],
      hotCarCompany: null,
      barList: null,
      totalCarCompany: null,
      nowDay: '',
      carCompanter: require('../../assets/car1.png'),
      activeName: '总体概况',
      indexList: ['热', 'A', 'B', 'C', 'D', 'E', 'F'],
      carEnterprises: null
    }
  },
  mounted () {
    this.loadingShow = true
    this.user = getStore('userSpecific')
    this.initRunStatus()
    this.initGroupStatisticsByBrandCount()
    this.initGroupStatisticsByModelCount()
    this.initRunDataStatus()
    this.initCountByParameter()
  },
  methods: {
    initRunDataStatus () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        }
      ]
      this.$store.dispatch('RunDataStatus', params).then(res => {
        // console.log(res)
        // this.stationNum = res[0].num
        this.totalTime = (res.totalTime / 10000).toFixed(2)
        this.totalCo2 = (parseInt(res.co2) / 10000).toFixed(2)
        this.totalMileage = (parseInt(res.totalMileage) / 10000).toFixed(2)
      })
    },
    initCountByParameter () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        }
      ]
      this.$store.dispatch('CountByParameter', params).then(res => {
        this.numList = res.toString().split('')
      })
      const params1 = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'vehicleNo',
          value: '渝%'
        }
      ]
      this.$store.dispatch('CountByParameter', params1).then(res => {
        this.plateCode = res
        this.loadingShow = false
      })
    },
    initGroupStatisticsByModelCount () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        }
      ]
      this.$store.dispatch('GroupStatisticsByModelCount', params).then(res => {
        this.vehicleModelNum = res
      })
    },
    initGroupStatisticsByBrandCount () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        }
      ]
      this.$store.dispatch('GroupStatisticsByBrandCount', params).then(res => {
        this.brandsNum = res
      })
    },
    initRunStatus () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        }
      ]
      this.$store.dispatch('RunStatus', params).then(res => {
        this.activeVehicle = res.activatedNum
        this.chargeVehicle = res.chargingNum
        this.carHotReg = (res.drivingNum).toString().split('')

        this.online = this.onlineNum
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
.evaluateTop {
  height: 44px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;

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
    margin-left: 2px;
    font-size: 14px;
    line-height: 60px;
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
</style>
