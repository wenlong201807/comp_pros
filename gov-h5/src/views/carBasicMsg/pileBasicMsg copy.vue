<template>
  <div>
    <div class="registerTop">
      <van-row class="evaluateTop">
        <van-col span="2"> <span class="icon"
                @click="goBack"> </span></van-col>
        <span>基础信息</span>
      </van-row>

      <van-row>
        <van-tabs v-model="activeName"
                  swipeable
                  class="tabsCss">
          <van-tab title="总体概况"
                   name="总体概况">

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
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(万个)</div>
                </div>
                <div class="block"
                     style="border-top:0;border-right:0;">
                  <div class="msgTitle">总充电数</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(万次)</div>
                </div>
                <div class="block"
                     style="border-top:0;border-right:0;">
                  <div class="msgTitle">总充电辆</div>
                  <div class="msgTitle textSize"><span class="pinPai">4400</span>(万千瓦时)</div>
                </div>
                <div class="block"
                     style="border-top:0;border-left:0;border-right:0;border-bottom:0;">
                  <div class="msgTitle">总额定功率</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(万千瓦)</div>
                </div>
                <div class="block"
                     style="border-top:0;border-right:0;border-bottom:0;">
                  <div class="msgTitle">E充电次数</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(万次)</div>
                </div>
                <div class="block"
                     style="border-top:0;border-right:0;border-bottom:0;">
                  <div class="msgTitle">日充电量</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(万千瓦时)</div>
                </div>
                <div class="block"
                     style="border-left:0;border-right:0;border-bottom:0;">
                  <div class="msgTitle">直流设备</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(个)</div>
                </div>
                <div class="block"
                     style="border-right:0;border-bottom:0;">
                  <div class="msgTitle">交流设备</div>
                  <div class="msgTitle textSize"><span class="pinPai">12534</span>(个)</div>
                </div>
                <div class="block"
                     style="border-right:0;border-bottom:0;">
                  <div class="msgTitle">一体设备</div>
                  <div class="msgTitle textSize"><span class="pinPai">36</span>(个)</div>
                </div>

              </div>

            </div>

          </van-tab>
          <van-tab title="桩分布"
                   name="车辆分布">
            <div class="vehicle">
              <div class="vehicleByCar">
                <p class="byCarTitle">充电桩用途</p>
                <div class="chartDiv">
                  <div id="echartCar1"></div>
                </div>
                <div class="noMsg">
                  <span>—— 暂无更多统计 ——</span>
                </div>
              </div>

            </div>
          </van-tab>
          <van-tab title="桩企排行"
                   name="桩企排行">
            <scroller :on-refresh="refresh"
                      ref="myscroller"
                      class="scrollerCss">
              <CarRank></CarRank>
            </scroller>
          </van-tab>
          <van-tab title="接入桩企"
                   name="接入桩企">

            <mt-index-list>
              <mt-index-section index="热门桩企">
                <mt-cell class="carHotCell">
                  <van-row>
                    <van-grid :column-num="4">
                      <van-grid-item v-for="(i,index) in carHotReg"
                                     :key="index"
                                     style="border:none !important;">
                        <van-image width="50px"
                                   height="50px"
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
                    <van-image width="48px"
                               height="48px"
                               fit="contain"
                               :src="carCompanter"
                               class="carCompanyImg" />
                    <span class="carCellText">{{ car }}</span>

                  </div>
                </mt-cell>

              </mt-index-section>

            </mt-index-list>
          </van-tab>
        </van-tabs>
      </van-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import CarRank from '../roleGov/carBasicInfo3'
import IndexList from './IndexList'
import playerList from './testData.json'

export default {
  components: {
    CarRank,
    IndexList
  },
  data () {
    return {
      bannerImg: require('../../assets/img02.png'),
      carHotReg: [],
      numList: ['5', '2', '3', '6', '4'],
      hotCarCompany: null,
      barList: null,
      totalCarCompany: null,
      nowDay: '',
      carCompanter: require('../../assets/car1.png'),
      activeName: '车辆分布',
      indexList: ['热', 'A', 'B', 'C', 'D', 'E', 'F'],
      playerList,
      carEnterprises: null
    }
  },
  mounted () {
    this.$nextTick(() => {
      console.log(document.getElementById('echartCar1'))
      const echart1 = this.$echarts.init(document.getElementById('echartCar1'))
      console.log(echart1)
      this.initEchart1(echart1)
    })

    var nowDayArray = (moment(new Date()).format('L')).split('/')
    this.nowDay = nowDayArray[2] + '年' + nowDayArray[0] + '月' + nowDayArray[1] + '日'

    this.initCarEnterprises()

    window.onresize = function () {
      this.echart1.resize()
    }
  },
  methods: {
    initEchart1 (name) {
      var data = [{
        name: '本科及以上',
        value: 13211
      },
      {
        name: '高中',
        value: 42111
      },
      {
        name: '初中及以下',
        value: 81711
      },
      {
        name: '其他',
        value: 121711
      }
      ]
      // eslint-disable-next-line no-unused-vars
      var arrName = getArrayValue(data, 'name')
      var arrValue = getArrayValue(data, 'value')
      // eslint-disable-next-line no-eval
      var sumValue = eval(arrValue.join('+'))
      // eslint-disable-next-line no-unused-vars
      var objData = array2obj(data, 'name')
      var optionData = getData(data)
      function getArrayValue (array, key) {
        key = key || 'value'
        var res = []
        if (array) {
          array.forEach(function (t) {
            res.push(t[key])
          })
        }
        return res
      }

      function array2obj (array, key) {
        var resObj = {}
        for (var i = 0; i < array.length; i++) {
          resObj[array[i][key]] = array[i]
        }
        return resObj
      }

      function getData (data) {
        var res = {
          series: [],
          yAxis: []
        }
        for (let i = 0; i < data.length; i++) {
          res.series.push({
            name: '学历',
            type: 'pie',
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
            center: ['50%', '55%'],
            label: {
              show: false
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [{
              value: data[i].value,
              name: data[i].name
            }, {
              value: sumValue - data[i].value,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }]
          })
          res.series.push({
            name: '',
            type: 'pie',
            silent: true,
            z: 1,
            clockWise: false, // 顺时加载
            hoverAnimation: false, // 鼠标移入变大
            radius: [65 - i * 15 + '%', 57 - i * 15 + '%'],
            center: ['50%', '55%'],
            label: {
              show: false
            },
            itemStyle: {
              label: {
                show: false
              },
              labelLine: {
                show: false
              },
              borderWidth: 5
            },
            data: [{
              value: 7.5,
              itemStyle: {
                color: '#E3F0FF',
                borderWidth: 0
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }, {
              value: 2.5,
              name: '',
              itemStyle: {
                color: 'rgba(0,0,0,0)',
                borderWidth: 0
              },
              tooltip: {
                show: false
              },
              hoverAnimation: false
            }]
          })
          res.yAxis.push((data[i].value / sumValue * 100).toFixed(2) + '%')
        }
        return res
      }

      var option = {
        backgroundColor: '#fff',

        tooltip: {
          show: true,
          trigger: 'item',
          formatter: '{a}<br>{b}:{c}({d}%)'
        },
        color: ['#5eb3fc', '#59e8f2', '#fce654', '#fcaf54'],
        grid: {
          top: '20%',
          bottom: '48%',
          left: '30%',
          containLabel: false
        },
        yAxis: [{
          type: 'category',
          inverse: true,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            inside: true,
            textStyle: {
              color: '#000',
              fontSize: 10
            },
            show: false
          },

          data: optionData.yAxis
        }],
        xAxis: [{
          show: false
        }],
        series: optionData.series
      }
      name.setOption(option)
    },
    initCarEnterprises () {
      this.carHotReg = []
      var parsms = {

      }
      this.$store.dispatch('LetterList', parsms).then(res => {
        var wordLetter = res.wordLetter

        this.hotCarCompany = res.热门车企
        console.log(this.hotCarCompany)
        this.hotCarCompany.forEach(item => {
          // var reg = /(.*车)/
          // var item1 = reg.exec(item)[1]
          // this.carHotReg.push(item1)
          // console.log(this.carHotReg)
          this.carHotReg.push(item.substring(0, 5) + '...')
        })
        this.carEnterprises = wordLetter
        this.barList = res.firstLetter

        this.totalCarCompany = res.车企总数
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
  height: 6%;
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
