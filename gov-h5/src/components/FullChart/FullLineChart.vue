<template>
  <div class="full-line-chart-container">
    <div class="swiperTop">
      <swiper :options="swiperOption" class="topSwipper">
        <swiper-slide>
          <div>
            <div class="topText">充电设施运营商</div>
            <div>
              <span class="topNumber">{{ operatorNumber }}</span>
              <span class="topUnit">(个)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">充电桩数量</div>
            <div>
              <span class="topNumber">{{ stakeNumber }}</span>
              <span class="topUnit">(个)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">累计充电量</div>
            <div>
              <span class="topNumber">{{ !Math.floor(eleTimeInfo['ELE']/10000)?0:Math.floor(eleTimeInfo['ELE']/10000) }}</span>
              <span class="topUnit">万(kw)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">充电桩总功率</div>
            <div>
              <span class="topNumber">{{ ratingPower }}</span>
              <span class="topUnit">万(kw)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">今日可用功率</div>
            <div>
              <span class="topNumber">{{ dataTopAll.availablePower }}</span>
              <span class="topUnit">(kwh)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">今日充电桩负荷</div>
            <div>
              <span class="topNumber">{{ dataTopAll.realTimePower }}</span>
              <span class="topUnit">(kwh)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">预测充电桩负荷</div>
            <div>
              <span class="topNumber">{{ dataTopAll.forecastPower }}</span>
              <span class="topUnit">(kwh)</span>
            </div>
          </div>
        </swiper-slide>
        <swiper-slide>
          <div>
            <div class="topText">充电负荷环比增长率</div>
            <div>
              <span class="topNumber">{{ dataTopAll.chainRatio }}</span>
              <span class="topUnit">(%)</span>
            </div>
          </div>
        </swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
    </div>
    <div class="maxer-btn" @click="littlerBtn"></div>
    <div id="echartFull" class="echartStyple"></div>
    <loadingStatus :content="content" :loadingStatus="showLoading"></loadingStatus>
  </div>
</template>
<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'FullLineChart',
  props: {
    chartData: {
      type: Object,
      require: true,
      default: () => {}
    },
    seriseData: {
      type: Object,
      require: true,
      default: () => {}
    }
  },
  activated () {
    this.userSpecific = getStore('userSpecific')
  },
  data () {
    return {
      stationList: [1, 2, 3, 4, 7],
      data: this.chartData,
      myChart: {},
      content: '数据加载中...',
      showLoading: false,
      eleBar: '',
      swiperOption: {
        loop: false,
        slidesPerView: 4,
        slidesPerGroup: 4,
        spaceBetween: 1,
        resistanceRatio: 0,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        on: {
          tap () {
          },
          slideChangeTransitionEnd () {
          }
        }
      },
      dataTopAll: {},
      stakeNumber: 0, /* 充电桩数量 */
      eleTimeInfo: {}, /* 累计充电量 */
      ratingPower: 0, /* 充电桩总功率 */
      operatorNumber: 0, /* 运营商数量 */
      endTime: '' /* 运营商数量 */
    }
  },
  mounted () {
    this.userSpecific = getStore('userSpecific')
    this.endTime = this.$moment().format('YYYY-MM-DD')
    this.$nextTick(function () {
      plus.screen.lockOrientation("landscape") //eslint-disable-line
      this.initOperatortotalPower()
      this.initData()
      this.initTopData()
      this.getNumber()
      this.statisticsEleTimeGet()
    })
  },
  methods: {
    initData () {
      var that = this
      return new Promise((resolve, reject) => {
        var params = {
          areaCode: this.userSpecific.areaCode,
          startTime: that.endTime
        }
        this.showLoading = true
        this.$store.dispatch('PowerForecastAndEle', params).then(data => {
          this.showLoading = false
          resolve(data)
          this.name = data.keys
          this.eleAll = data.power
          this.eleAllFor = data.forecastPower
          this.eleBar = data.ele
          this.echartFull = this.$echarts.init(document.getElementById('echartFull'))
          this.drawechartFull()
          window.onresize = function () {
            that.echartFull.resize()
          }
        }).catch(error => {
          console.log(error)
          this.showLoading = false
        })
      })
    },
    drawechartFull (name) {
      this.echartFull.setOption({
        color: ['#00C09B', '#E3AE23', '#43ACFA'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          top: '12%',
          left: '2%',
          right: '2%',
          bottom: '3%',
          containLabel: true
        },
        legend: {
          data: ['实时功率', '预测功率', '充电量'],
          textStyle: {
            color: '#646464'
          },
          itemWidth: 20,
          itemHeight: 10,
          padding: [5, 5, 5, 40]

        },
        xAxis: [
          {
            type: 'category',
            axisLabel: {
              rotate: 0
              // interval: 30
            },
            data: this.name,
            axisLine: {
              show: true, // 不显示坐标轴线
              lineStyle: {
                color: '#ccc'
              }
            },
            axisTick: {
              show: false
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            position: 'left',
            name: 'kw/h',
            axisLine: {
              show: true, // 不显示坐标轴线
              lineStyle: {
                color: '#ccc'
              }
            }
          },
          {
            type: 'value',
            name: 'kw',
            position: 'right',
            axisLine: {
              show: true, // 不显示坐标轴线
              lineStyle: {
                color: '#ccc'
              }
            }
          }
        ],
        series: [
          {
            name: '实时功率',
            type: 'line',
            barWidth: '60%',
            data: this.eleAll
          },
          {
            name: '预测功率',
            type: 'line',
            barWidth: '60%',
            data: this.eleAllFor
          },
          {
            name: '充电量',
            type: 'bar',
            barWidth: '60%',
            data: this.eleBar,
            yAxisIndex: 1
          }
        ]
      })
    },
    initTopData () {
      // var data = {
      //   'chainRatio': -0.0081,
      //   'availablePower': 727690,
      //   'realTimePower': 88872,
      //   'forecastPower': 131742
      // }
      const params = {
        areaCode: getStore('userSpecific').areaCode
      }
      this.$store.dispatch('TodayVariousPower', params).then(res => {
        if (res) {
          res.chainRatio = (res.chainRatio * 100).toFixed(2) + '%'
          this.dataTopAll = res
        }
      })
      // this.dataTopAll = data
    },

    getNumber () {
      var params = [
        {
          field: 'areaCode',
          value: getStore('userSpecific').areaCode
        }
      ]
      this.$store.dispatch('Number', params).then(data => {
        this.operatorNumber = data.operatorNumber
        this.stakeNumber = data.stakeNumber
        this.stationNumber = data.stationNumber
      })
    },
    // 获取充电量、次数
    statisticsEleTimeGet () {
      const params = [
        { 'field': 'areaCode', value: getStore('userSpecific').areaCode }
      ]
      this.$store.dispatch('statisticsEleTimeGet', params).then((res) => {
        if (res) {
          // console.log(res)
          this.eleTimeInfo = res[0]
        }
      })
    },
    initOperatortotalPower () {
      const params = [
        {
          field: 'areaCode',
          value: getStore('userSpecific').areaCode
        }
      ]
      this.$store.dispatch('OperatortotalPower', params).then(res => {
        console.log(res)
        this.ratingPower = (parseInt(res[0].value) / 10000).toFixed(2)
      })
    },

    littlerBtn () {
      plus.screen.lockOrientation('portrait') // eslint-disable-line
      this.$emit('close', false)
    }
  }
}
</script>

<style scoped>
  .full-line-chart-container {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10001;
    background-color: #ffffff;
    display: flex;
    flex-direction: column;
    padding: 20px;
  }

  .lineChart {
    width: 100vh;
    height: calc(100vw - 5rem);
    margin-top: 1rem;
  }

  .swiperTop {
    padding-right: 30px;
    width: 100%;
  }

  .maxer-btn {
    background-image: url('../../assets/svg/maxer.svg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: 100%;
    position: fixed;
    z-index: 10002;
    top: 30px;
    right: 17px;
    width: 30px;
    height: 40px;
  }

  .swiper-container {
    width: calc(100% - 20px);
    height: 60px;
  }

  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
    /*height: 20px;*/
  }

  .topSwipper {
    height: 60px;
    width: 100%;
    background: #DEDEDE;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, .1);
    border-radius: 5px;

  }

  .echartStyple {
    padding-top: 10px;
    height: calc(100% - 60px);
    width: 100%;
  }

  .topText {
    color: #0C91FA;
  }

  .topNumber {
    color: #252525;
  }

  .topUnit {
    color: #ABABAB;
    font-size: 13px;
  }

  .swiper-button-next {
    background-size: 20px 20px;
    outline:none;
  }

  .swiper-button-prev {
    background-size: 20px 20px;
    outline:none;
  }
</style>
