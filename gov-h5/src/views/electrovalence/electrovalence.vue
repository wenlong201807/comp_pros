<template>
  <div class="electrovalence">
    <van-row class="evaluateTop">
      <van-col span="2"> <span class="icon"
                               @click="goBack"></span></van-col>
      <span>华一路充电站电价详情</span>
    </van-row>
    <van-row class="electrovalenceBar">
      <van-notice-bar background="#f8f7f0"
                      left-icon="volume-o"
                      :scrollable="false">
        1小时20分后，电价降低0.1元。
      </van-notice-bar>
    </van-row>
    <van-row class="electrovalenceValue">
      <p class="titleName">当前时段电价（元/度）</p>
      <p><span class="money">¥</span><span class="moneyValue">1.72</span></p>
    </van-row>
    <van-row class="electrovalenceEchart">
      <div id="echart"></div>
    </van-row>

  </div>
</template>

<script>
export default {
  data () {
    return {
      echart1: null
      // show: false,
      // show1: true,
    }
  },
  mounted () {
    const echart1 = this.$echarts.init(document.getElementById('echart'))
    this.drawBar(echart1)
    // window.onresize = function () {
    //   this.echart1.resize()
    // }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    drawBar (name) {
      // 绘制图表
      name.setOption({
        title: {
          text: '时段电价'
        },
        color: ['#3398DB'],
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed'],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            max: 2.4,
            type: 'value',
            minInterval: 0.8,

            axisLine: {
              show: false // 不显示坐标轴线
            }
          }
        ],
        series: [
          {
            name: '直接访问',
            type: 'bar',
            barWidth: '60%',
            data: [1.48, 1.59, 1.72],
            // itemStyle: {
            //   // 上方显示数值
            //   normal: {
            //     label: {
            //       show: true, // 开启显示
            //       position: 'top', // 在上方显示
            //       textStyle: {
            //         // 数值样式
            //         color: 'black',
            //         fontSize: 16
            //       }
            //     }
            //   }
            // },
            label: {
              normal: {
                show: true,
                position: 'top',
                formatter: function (a) {
                  var result = []
                  var counter = 0
                  var num = a.data
                  num = (num || 0).toString().split('')
                  for (var i = num.length - 1; i >= 0; i--) {
                    counter++
                    result.unshift(num[i])
                    if (!(counter % 3) && i !== 0) {
                      result.unshift(',')
                    }
                  }
                  result.unshift('¥')
                  result = result.join('')
                  return result
                }
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
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
.electrovalenceBar {
  margin-top: 6%;
  padding: 0 6%;
}
.electrovalenceValue {
  height: 20%;
  padding: 0 10%;
  .titleName {
    font-size: 18px;
    font-weight: 600;
    color: #999999;
    margin-bottom: 4px;
  }
}
.money {
  font-size: 18px;
  font-weight: 800;
  line-height: 18px;
}
.moneyValue {
  font-size: 32px;
  font-weight: 800;
}
.electrovalenceEchart {
  height: 22%;
  width: 100%;
  padding: 0 6%;
  #echart {
    width: 100%;
    height: 300px;
  }
}
.van-popup--left {
  width: 70%;
}
.popTop {
  height: 18%;
  width: 100%;
  padding: 20% 0% 0% 0%;
  display: flex;
  justify-content: center;
  position: relative;

  .name {
    font-size: 22px;
    font-weight: 800;
  }
}
.photo {
  width: 80px;
  height: 80px;
  display: block;
}
.photoText {
  text-align: center;
  font-size: 20px;
  font-weight: 800;
}
.editText {
  width: 80%;
  font-size: 14px;
  font-weight: 600;
  color: #999999;
  position: relative;
  padding-bottom: 8%;
  margin: 0 10% 8% 10%;
  border-bottom: 1px solid #cccccc;
}
.editIcon {
  display: inline-block;
  width: 16px;
  height: 16px;
  margin-right: 2px;
  background: url(../../assets/icon4.png) no-repeat 100% 100%;
  background-size: contain;
}
.photoName {
  margin-bottom: 4px;
}
.functionList {
  height: 54%;
  width: 100%;
  padding: 0 10%;
  .listIcon {
    display: inline-block;
    margin-top: 6px;
  }
  .listText {
    display: inline-block;
    margin-left: 20px;
    line-height: 16px;
    position: relative;
  }
  .msg::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon5.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .collection::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon6.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .feedback::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon7.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .safe::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon7.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .setUp::before {
    content: "";
    width: 16px;
    height: 16px;
    background: url(../../assets/icon8.png) no-repeat 100% 100%;
    background-size: contain;
    position: absolute;
    left: -20px;
  }
  .listItem {
    padding: 12% 4%;
  }
}
.edition {
  text-align: center;
  color: goldenrod;
}
.mapWrap {
  text-align: center;
  font-size: 14px;
  .mapTitle {
    color: #a1a1a1;
    height: 28px;
  }
  .mapName {
    font-size: 18px;
    height: 30px;
  }
  .cancelBtn {
    font-size: 18px;
    height: 30px;
  }
}
.mapBorder {
  width: 100%;
  height: 8px;
  background: #f5f5f5;
}
</style>
ß
