/* eslint-disable no-unused-vars */
<template>
  <div>
    <div class="registerTop">
      <van-row class="evaluateTop">
        <van-col span="2"
                 style="position:absolute;"> <span class="icon"
                                                   @click="goBack"> </span></van-col>
        <span>车辆分布</span>
      </van-row>
      <van-row>
        <div class="vehicle">
          <scroller :on-refresh="refresh"
                    ref="myscroller"
                    class="scrollerCss">
            <div class="vehicleByCar">
              <!-- <p class="byCarTitle">车辆类型分布(辆)</p> -->
              <div id="echartCar1"></div>
            </div>
            <div class="vehicleByCar">
              <!-- <p class="byCarTitle">车辆类型分布(辆)</p> -->
              <div class="chartDiv">
                <div id="enduranceEchart"></div>
              </div>
            </div>
            <div class="vehicleByCar" style="border-bottom: none;">
              <!-- <p class="byCarTitle">车辆类型分布(辆)</p> -->
              <div class="chartDiv1">
                <div id="purposeEchart"></div>
              </div>
            </div>
          </scroller>
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
      user: null,
      enduranceEchart: null,
      purposeEchart: null,
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
      carCompanter: require('../../assets/car1.png'),
      activeName: '总体概况',
      indexList: ['热', 'A', 'B', 'C', 'D', 'E', 'F'],
      carEnterprises: null,
      colors: [
        '#ff7f50',
        '#87cefa',
        '#da70d6',
        '#32cd32',
        '#6495ed',
        '#ff69b4',
        '#ba55d3',
        '#cd5c5c',
        '#ffa500',
        '#40e0d0',
        '#1e90ff',
        '#ff6347',
        '#7b68ee',
        '#00fa9a',
        '#ffd700',
        '#6b8e23',
        '#ff00ff',
        '#3cb371',
        '#b8860b',
        '#30e0e0'
      ]
    }
  },
  mounted () {
    this.user = getStore('userSpecific')
    this.$nextTick(() => {
      this.initType()
      this.initEndurance()
      this.initPurpose()
      window.onresize = function () {
        this.echartCar1.resize()
        this.enduranceEchart.resize()
        this.purposeEchart.resize()
      }
    })
  },

  methods: {
    initType () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryExterior', params).then(res => {
        this.echartCar1 = this.$echarts.init(
          document.getElementById('echartCar1')
        )
        this.echartCar1.setOption({
          color: that.colors,
          title: {
            text: '车辆类型分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆类型分布',
              type: 'pie',
              radius: [30, 68],
              center: ['60%', '50%'],
              roseType: 'radius',
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              lableLine: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: true
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initEndurance () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryMileage', params).then(res => {
        this.enduranceEchart = this.$echarts.init(
          document.getElementById('enduranceEchart')
        )
        this.enduranceEchart.setOption({
          color: that.colors,
          title: {
            text: '纯电动汽车续航里程（公里）',
            x: 'left',
            y: 'top',
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          grid: {
            top: '10%',
            left: '5%',
            right: '5%',
            bottom: '3%',
            containLabel: true
          },
          calculable: true,
          series: [
            {
              name: '纯电动汽车续航里程（公里）',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['60%', '50%'],
              // eslint-disable-next-line no-dupe-keys
              type: 'pie',
              x: '50%',
              max: 50,
              sort: 'ascending',
              itemStyle: {
                normal: {
                  label: {
                    show: true,
                    formatter: function (params) {
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      /* if (key.length > 6) {
                                            allKey = key.slice(0, 6) + '\n' + key.slice(6, key.length) + ':'
                                        } else { */
                      allKey = key + ':'
                      //  }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    initPurpose () {
      var that = this
      const params = {
        areaCode: this.user.areaCode
      }
      this.$store.dispatch('QueryPurpose', params).then(res => {
        this.purposeEchart = this.$echarts.init(
          document.getElementById('purposeEchart')
        )
        // 绘制图表
        this.purposeEchart.setOption({
          color: that.colors,
          title: {
            text: '车辆用途分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          legend: {
            x: 'left',
            y: '10%',
            orient: 'vertical',
            data: res.keys
          },
          calculable: true,
          series: [
            {
              name: '车辆用途分布',
              type: 'pie',
              radius: ['38%', '48%'],
              center: ['60%', '50%'],
              // eslint-disable-next-line no-dupe-keys
              type: 'pie',
              x: '50%', // for funnel
              max: 50, // for funnel
              sort: 'ascending', // for funnel
              itemStyle: {
                normal: {
                  label: {
                    show: true, // "{b}:{c}",
                    formatter: function (params) {
                      // var str = '{b}:{c}'
                      var key = params.name.toString()
                      var value = params.value
                      var allKey = null
                      if (key.length > 6) {
                        allKey =
                          key.slice(0, 5) +
                          '\n' +
                          key.slice(6, key.length) +
                          ':'
                      } else {
                        allKey = key + ':'
                      }
                      return allKey + value
                    }
                  },
                  labelLine: {
                    show: true
                  }
                }
              },
              data: res.values
            }
          ]
        })
      })
    },
    onChoose (item) {
      console.log(item)
    },
    goBack () {
      this.$router.go(-1)
    },
    refresh () {
      this.initType()
      this.initEndurance()
      this.initPurpose()
      setTimeout(() => {
        this.$refs.myscroller.finishPullToRefresh()
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
  margin-top: 44px;
  width: 100%;
  height: calc(100% - 44px) !important;
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
  height: calc(100% - 44px);
  overflow-y: scroll;
  background: #f4f4f4;
  display: flex;
  flex-direction: column;
}
.vehicleByCar {
  padding: 4% 4%;
  height: 222px;
  background: #ffffff;
  border-bottom: 6px solid #ccc;
}
.chartDiv {
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: space-around;
}
.chartDiv1 {
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: space-around;
}
#echartCar1 {
  width: 100%;
  height: 200px;
  // background: red;
}
#enduranceEchart {
  width: 100%;
  height: 180px;
  // background: red;
}
#purposeEchart {
  width: 100%;
  height: 280px;
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
