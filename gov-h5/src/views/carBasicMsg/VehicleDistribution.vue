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
              <p class="byCarTitle">车辆类型分布(辆)</p>
              <div class="chartDiv">
                <div id="echartCar1"></div>

              </div>

            </div>
            <div class="vehicleByCar">
              <p class="byCarTitle">车辆类型分布(辆)</p>
              <div class="chartDiv">
                <div id="echartCar2"></div>
              </div>

            </div>
            <div class="vehicleByCar">
              <p class="byCarTitle">车辆类型分布(辆)</p>
              <div class="chartDiv">
                <div id="echartCar3"></div>

              </div>

            </div>
          </scroller>

        </div>

      </van-row>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import CarRank from '../roleGov/carBasicInfo3'
import IndexList from './IndexList'
import playerList from './testData.json'
import { getStore } from 'src/utils/store'

export default {
  components: {
    CarRank,
    IndexList
  },
  data () {
    return {
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
      playerList,
      carEnterprises: null
    }
  },
  mounted () {
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
    initType () {
      var that = this
      const params = {
        areaCode: '500000'
      }
      this.$store.dispatch('QueryExterior', params).then(res => {
        // eslint-disable-next-line no-unused-vars
        const data = res
        this.echartCar1 = this.$echarts.init(
          document.getElementById('echartCar1')
        )
        // 绘制图表
        this.echartCar1.setOption({
          color: that.colors,
          title: {
            text: '车辆类型分布(辆)',
            x: 'left',
            y: 'top',
            itemGap: 20,
            textStyle: {
              color: '#676a6c',
              fontFamily: '微软雅黑',
              fontSize: 14,
              fontWeight: 'bolder'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}：{c} ({d}%)'
          },
          toolbox: {
            show: true,
            right: 10,
            feature: {
              saveAsImage: { show: true }
            }
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
              center: ['48%', '57%'],
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
      var user = getStore('userSpecific')
      console.log(user)
      var parsms = {
        areaCode: user.areaCode
      }
      this.$store.dispatch('LetterList', parsms).then(res => {
        var wordLetter = res.wordLetter

        this.hotCarCompany = res.hot
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

        this.totalCarCompany = res.total
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
