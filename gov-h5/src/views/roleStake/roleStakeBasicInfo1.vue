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
          <span class="generalTitle">重庆市新能源充电站总数</span>
        </div>
        <div style="text-align:center;width:100%;margin-top:2%;">
          <span class="numCss"
                v-for="(i,index) in numList"
                :key="index">{{ i }}</span>
          <span class="carNum">座</span>
        </div>
        <div class="carWrap">
          <div class="blockDiv">
            <div class="block"
                 style="border-top:0;border-left:0;border-right:0;">
              <div class="msgTitle">总充电桩数</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ stakeNum }}</span>(个)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;">
              <div class="msgTitle">总充电数</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ totalTimes }}</span>(万次)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-right:0;">
              <div class="msgTitle">总充电量</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ ele }}</span>(万千瓦时)</div>
            </div>
            <div class="block"
                 style="border-top:0;border-left:0;border-right:0;border-bottom:0;">
              <div class="msgTitle">总额定功率</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ ratingPower }}</span>(万千瓦)</div>
            </div>
            <!-- <div class="block"
                 style="border-top:0;border-right:0;border-bottom:0;">
              <div class="msgTitle">E充电次数</div>
              <div class="msgTitle textSize"><span class="pinPai">36</span>(万次)</div>
            </div> -->
            <div class="block"
                 style="border-top:0;border-bottom:0;">
              <div class="msgTitle">日充电量</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ nowPower }}</span>(万千瓦时)</div>
            </div>
            <div class="block"
                 style="border-left:0;border-right:0;border-top:0;">
              <div class="msgTitle">直流设备</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ zhiLiu }}</span>(个)</div>
            </div>
            <div class="block"
                 style="border-right:0;border-bottom:0;">
              <div class="msgTitle">交流设备</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ jiaoLiu }}</span>(个)</div>
            </div>
            <div class="block"
                 style="border-bottom:0;">
              <div class="msgTitle">一体设备</div>
              <div class="msgTitle textSize"><span class="pinPai">{{ jioliuYiTi }}</span>(个)</div>
            </div>

          </div>

        </div>

      </van-row>
    </div>
    <loadingStatus content="加载中..."
                   :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {

  data () {
    return {
      loadingShow: false,
      stakeNum: null,
      totalTimes: null,
      ele: null,
      nowPower: null,

      ratingPower: null,
      jiaoLiu: null,
      jioliuYiTi: null,
      zhiLiu: null,
      user: null,
      content: '数据加载中...',
      showLoading: false,
      bannerImg: require('../../assets/img02.png'),
      carHotReg: [],
      numList: [],
      hotCarCompany: null,
      barList: null,
      totalCarCompany: null,
      nowDay: '',
      carCompanter: require('../../assets/car1.png'),
      activeName: '车辆分布',
      indexList: ['热', 'A', 'B', 'C', 'D', 'E', 'F'],
      carEnterprises: null
    }
  },
  mounted () {
    this.loadingShow = true
    this.user = getStore('userSpecific')
    console.log('获取桩企')
    this.initStaketypenumber()
    this.initNumber()
    this.initStatisticsEleTimes()
    this.initOperatortotalPower()
    this.initStakeUsePower()
  },
  methods: {
    initStaketypenumber () {
      var parsms = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'operatorId',
          value: this.user.operatorid
        }
      ]

      this.$store.dispatch('Staketypenumber', parsms).then(res => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].NAME === '交流设备') {
            this.jiaoLiu = res[i].value
          } else if (res[i].NAME === '交直流一体设备') {
            this.jioliuYiTi = res[i].value
          } else if (res[i].NAME === '直流设备') {
            this.zhiLiu = res[i].value
          }
        }
      })
    },
    initNumber () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'operatorid',
          value: this.user.operatorid
        }
      ]
      this.$store.dispatch('Number', params).then(res => {
        this.stakeNum = res.stakeNumber
        this.numList = (res.stationNumber).toString().split('')
      })
    },
    initStatisticsEleTimes () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'operatorid',
          value: this.user.operatorid
        }
      ]
      this.$store.dispatch('StatisticsEleTimes', params).then(res => {
        this.totalTimes = (parseInt(res[0].times) / 10000).toFixed(2)
        this.ele = (parseInt(res[0].ELE) / 10000).toFixed(2)
      })
    },
    initOperatortotalPower () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'operatorid',
          value: this.user.operatorid
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        this.ratingPower = (parseInt(res.value) / 10000).toFixed(2)
      })
    },
    initStakeUsePower () {
      const params = [
        {
          field: 'areaCode',
          value: this.user.areaCode
        },
        {
          field: 'operatorid',
          value: this.user.operatorid
        }
      ]
      this.$store.dispatch('StakeUsePower', params).then(res => {
        this.nowPower = (parseInt(res[0].value) / 10000).toFixed(2)
        this.initStakeUsePower = false
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
  height: 240px;
  display: flex;
  flex-wrap: wrap;
  // background: url(../../assets/icon16.png) no-repeat 100% 100%;
  background-size: contain;
}

.block {
  width: calc(calc(100% / 3));
  margin: 0px;
  height: 80px;
  box-sizing: border-box;
  border: 1px solid rgb(238, 237, 237);
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
  width: 40%;
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
