<template>
  <div>
    <a-card>
      <template slot="title">
        <span>
          <div class="titleFlag"></div>
          <span style="padding-left:22px;padding-bottom:10px;">报警信息统计</span>
        </span>
      </template>
      <a-card>
        <div id="Chart1"
             style="height:750px;"></div>
      </a-card>

      <a-card style="border-top:0px;">
        <a-row>
          <a-col id="Chart2"
                 :span="10"
                 style="height:350px;"></a-col>
          <a-col id="Chart3"
                 :span="13"
                 style="height:350px;margin-left:14px;border-left:1px dashed #ccc;"></a-col>
        </a-row>
      </a-card>
    </a-card>
    <a-card style="margin-top:10px;width:100%">
      <template slot="title">
        <span>
          <div class="titleFlag"></div>
          <span style="padding-left:22px;padding-bottom:10px;">各月份报警数量</span>
        </span>
      </template>

      <div id="Chart4"
           style="height:350px;"></div>
    </a-card>
    <a-card style="margin-top:10px;width:100%">
      <template slot="title">
        <span>
          <div class="titleFlag"></div>
          <span style="padding-left:22px;padding-bottom:10px;">报警数量排名第一：DC-DC状态报警</span>
        </span>
      </template>

      <div id="Chart5"
           style="height:350px;"></div>
    </a-card>
    <a-card style="margin-top:10px;width:100%">
      <template slot="title">
        <span>
          <div class="titleFlag"></div>
          <span style="padding-left:22px;padding-bottom:10px;">报警数量排名第二：单体电池过压报警,车载储能装置类型过压报警</span>
        </span>
      </template>

      <div id="Chart6"
           style="height:350px;"></div>
    </a-card>
    <a-card style="margin-top:10px;width:100%;margin-bottom:24px">
      <template slot="title">
        <span>
          <div class="titleFlag"></div>
          <span style="padding-left:22px;padding-bottom:10px;">报警数量排名第三：制动系统报警</span>
        </span>
      </template>

      <div id="Chart7"
           style="height:350px;"></div>
    </a-card>
  </div>
</template>

<script>
import moment from 'moment'
export default {
  data () {
    return {
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
      ],
      Charts: {
        Chart1: null,
        Chart2: null,
        Chart3: null,
        Chart4: null,
        Chart5: null,
        Chart6: null,
        Chart7: null
      },
      starttime: '',
      endtime: ''
    }
  },
  created () {
    this.starttime = moment(new Date()).subtract(365, 'days').format('YYYY-MM-DD')
    this.endtime = moment(new Date()).format('YYYY-MM-DD')
  },
  mounted () {
    this.initCharts()
    this.getdata()
    window.onresize = () => {
      this.Charts.Chart1.resize()
      this.Charts.Chart2.resize()
      this.Charts.Chart3.resize()
      this.Charts.Chart4.resize()
      this.Charts.Chart5.resize()
      this.Charts.Chart6.resize()
      this.Charts.Chart7.resize()
    }
  },
  methods: {
    initCharts () {
      for (var key in this.Charts) {
        this.Charts[key] = this.$echarts.init(document.getElementById([key]))
      }
    },
    getdata () {
      var that = this
      var params = {
        areaCode: that.$ls.get('areaCode'),
        startTime: that.starttime,
        endTime: that.endtime
      }
      this.$store.dispatch('WarningCategory', params).then(data1 => {
        var keys = data1.keys
        var values = data1.values
        var option1 = {
          title: {
            text: '报警分类占比',
            // subtext: '纯属虚构',
            x: 'left',
            textStyle: {
              color: '#676a6c',
              fontSize: 14
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 5
          },
          color: that.colors,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: 0,
            data: keys
          },
          series: [
            {
              name: '报警分类占比',
              type: 'pie',
              radius: '40%',
              center: ['50%', '40%'],
              data: values,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        that.Charts.Chart1.setOption(option1)
      }).catch(error => {
        console.log(error)
      })

      this.$store.dispatch('WaringLevel', params).then(data2 => {
        var keys = data2.keys
        var values = data2.values
        var option2 = {
          title: {
            text: '报警等级占比',
            // subtext: '纯属虚构',
            x: 'left',
            left: 15,
            textStyle: {
              color: '#676a6c',
              fontSize: 14
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 5
          },
          color: that.colors,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: '0',
            data: keys
          },
          series: [
            {
              name: '报警等级占比',
              type: 'pie',
              radius: '40%',
              center: ['50%', '40%'],
              data: values,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        that.Charts.Chart2.setOption(option2)
      }).catch(error => {
        console.log(error)
      })

      this.$store.dispatch('WarningCompany', params).then(data3 => {
        var keys = data3.keys
        var values = data3.values
        var option3 = {
          title: {
            text: '报警生产厂家占比',
            // subtext: '纯属虚构',
            x: 'left',
            left: 15,
            textStyle: {
              color: '#676a6c',
              fontSize: 14
            }
          },
          color: that.colors,
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            bottom: '0',
            data: keys
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 5
          },
          series: [
            {
              name: '报警生产厂家占比',
              type: 'pie',
              radius: '40%',
              center: ['50%', '40%'],
              data: values,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        }
        that.Charts.Chart3.setOption(option3)
      }).catch(error => {
        console.log(error)
      })

      this.$store.dispatch('WarningMonthSize', params).then(data4 => {
        var keys = data4.name
        var one = data4.one
        var two = data4.two
        var three = data4.three
        var option4 = {
          tooltip: {
            trigger: 'axis',
            formatter: function (param) {
              if (param[0].value) {
                return (
                  param[0].name +
                  '<br>一级报警：' +
                  param[0].value +
                  '次<br>二级报警：' +
                  param[1].value +
                  '次<br>三级报警：' +
                  param[2].value +
                  '次<br>'
                )
              }
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: that.colors,
          legend: {
            data: ['一级报警', '二级报警', '三级报警'],
            bottom: 0
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 20
          },
          grid: {
            left: '7%',
            top: '15%',
            bottom: '15%',
            right: '5%'
          },
          xAxis: {
            type: 'category',
            data: keys
          },
          yAxis: {
            type: 'value',
            name: '次'
          },
          series: [
            {
              name: '一级报警',
              type: 'bar',
              stack: '总量',
              barWidth: '70%',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: one
            },
            {
              name: '二级报警',
              type: 'bar',
              stack: '总量',
              barWidth: '70%',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: two
            },
            {
              name: '三级报警',
              type: 'bar',
              stack: '总量',
              barWidth: '70%',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: three
            }
          ]
        }
        that.Charts.Chart4.setOption(option4)
      }).catch(error => {
        console.log(error)
      })

      this.$store.dispatch('WarningTopThree', params).then(data5 => {
        var myRank = []
        for (var i = 0; i < data5.rank.length; i++) {
          if (data5.rank[i].length > 0) {
            myRank = data5.rank[i]
          }
        }
        that.rank1 = myRank[0]
        that.rank2 = myRank[1]
        that.rank3 = myRank[2]
        // eslint-disable-next-line no-redeclare
        var keys = data5.name
        // eslint-disable-next-line no-redeclare
        var one = data5.one
        // eslint-disable-next-line no-redeclare
        var two = data5.two
        // eslint-disable-next-line no-redeclare
        var three = data5.three
        var option5 = {
          tooltip: {
            trigger: 'axis',
            formatter: function (param) {
              // console.log(param);
              if (param[0].value) {
                return (
                  param[0].name +
                  '<br>' +
                  param[0].seriesName +
                  '：' +
                  param[0].value +
                  '次'
                )
              }
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: that.colors,
          grid: {
            left: '7%',
            right: '5%',
            bottom: '15%',
            top: '15%'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 20
          },
          xAxis: {
            type: 'category',
            data: keys
          },
          yAxis: {
            type: 'value',
            name: '次'
          },
          series: [
            {
              name: that.rank1,
              type: 'bar',
              barWidth: '40%',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: one
            }
          ]
        }
        that.Charts.Chart5.setOption(option5)

        var option6 = {
          tooltip: {
            trigger: 'axis',
            formatter: function (param) {
              // console.log(param);
              if (param[0].value) {
                return (
                  param[0].name +
                  '<br>' +
                  param[0].seriesName +
                  '：' +
                  param[0].value +
                  '次'
                )
              }
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: that.colors,
          grid: {
            left: '7%',
            right: '5%',
            bottom: '15%',
            top: '15%'
          },
          xAxis: {
            type: 'category',
            data: keys
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 20
          },
          yAxis: {
            type: 'value',
            name: '次'
          },
          series: [
            {
              name: that.rank2,
              type: 'bar',
              barWidth: '40%',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: two
            }
          ]
        }
        that.Charts.Chart6.setOption(option6)

        var option7 = {
          tooltip: {
            trigger: 'axis',
            formatter: function (param) {
              // console.log(param);
              if (param[0].value) {
                return (
                  param[0].name +
                  '<br>' +
                  param[0].seriesName +
                  '：' +
                  param[0].value +
                  '次'
                )
              }
            },
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'line' // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          color: that.colors,
          grid: {
            left: '7%',
            right: '5%',
            bottom: '15%',
            top: '15%'
          },
          toolbox: {
            feature: {
              saveAsImage: {
                show: true
              }
            },
            right: 20
          },
          xAxis: {
            type: 'category',
            data: keys
          },
          yAxis: {
            type: 'value',
            name: '次'
          },
          series: [
            {
              name: that.rank3,
              type: 'bar',
              barWidth: '40%',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  formatter: function (params) {
                    if (params.value === 0) {
                      return ''
                    } else {
                      return params.value
                    }
                  },
                  position: 'inside'
                }
              },
              data: three
            }
          ]
        }
        that.Charts.Chart7.setOption(option7)
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
