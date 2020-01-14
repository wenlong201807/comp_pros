<template>
  <div class="con-liu">
    <div class="common-top">
      <h4>欢迎您，{{ userInfoDetail.displayName }}
        <span class="close-btn"><img src="../../assets/roleGov/close.png" alt="" @click="goBack"></span>
      </h4>
    </div>
    <van-tabs v-model="active" class="gov-tab">
      <van-tab title="充电设施">
        <div >
          <div class="count-data">
            <van-row>
              <van-col span="6">
                <span>充电站数</span>
                <span> <a style="color: #1c76e1">{{ stationInfo.stationNumber }} </a>座</span>
              </van-col>
              <van-col span="6">
                <span>充电桩数</span>
                <span> <a style="color: #49c971">{{ stationInfo.stakeNumber }} </a>个</span>
              </van-col>
              <van-col span="6">
                <span>充电次数</span>
                <span> <a style="color: #d89212">{{ !Math.floor(eleTimeInfo['times']/10000)?0:Math.floor(eleTimeInfo['times']/10000) }} </a>万次</span>
              </van-col>
              <van-col span="6">
                <span>累计充电量</span>
                <span> <a style="color: #e34f38">{{ !Math.floor(eleTimeInfo['ELE']/10000)?0:Math.floor(eleTimeInfo['ELE']/10000) }} </a>万度</span>
              </van-col>
            </van-row>
            <van-row class="notice">
              <span class="notice-icon"><img src="../../assets/roleGov/icon3.png" alt=""></span>
              <van-notice-bar
                :text="ziXunFirst"
              />
              <span class="notice-more" @click="RouterToPage('资讯')"><a>更多</a><van-icon name="arrow" /></span>
            </van-row>
          </div>
          <div class="content">
            <div class="stakeMidu"><img @click="hotmapPage" src="../../assets/roleGov/midu.png" alt="" style="width: 100%"></div>
            <div class="basic-info">
              <h4 class="common-title1"> <span>基础信息</span></h4>
              <van-row >
                <van-col v-for="(item,index) in stakeBasicList" :key="index" span="6" @click="goStakeBasicInfo(index)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{ item.name }}</p>
                </van-col>
              </van-row>
            </div>
            <div class="real-time-info">
              <h4 class="common-title1"> <span>实时信息</span></h4>
              <van-row>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake05.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>空闲桩</p>
                      <p ><span style="color: #0a90ed" class="value">{{ stakeStatus.type1 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type1/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type1/stakeAll).toFixed(2)==='NaN'?0:(100*stakeStatus.type1/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake06.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>占用（充电）</p>
                      <p ><span style="color: #e8af03" class="value">{{ stakeStatus.type2 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type2/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type2/stakeAll).toFixed(2)==='NaN'?0: (100*stakeStatus.type2/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake07.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>离网桩</p>
                      <p ><span style="color: #01bea5" class="value">{{ stakeStatus.type3 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type3/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type3/stakeAll).toFixed(2)==='NaN'?0: (100*stakeStatus.type3/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake08.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>占用（未充电）</p>
                      <p ><span style="color: #a7a6a6" class="value">{{ stakeStatus.type4 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type4/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type4/stakeAll).toFixed(2)==='NaN'?0: (100*stakeStatus.type4/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake09.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>故障桩</p>
                      <p ><span style="color: #0cd937" class="value">{{ stakeStatus.type5 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type5/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type5/stakeAll).toFixed(2)==='NaN'? 0:(100*stakeStatus.type5/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake10.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>占用（锁定）</p>
                      <p ><span style="color: #fa6436" class="value">{{ !stakeStatus.type6 ? stakeStatus.type6 : 0 }}</span>  个
                        <!--                        <span class="per">{{(100*stakeStatus.type6/stakeAll).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*stakeStatus.type6/stakeAll).toFixed(2)==='NaN'?0:(100*stakeStatus.type6/stakeAll).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake11.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>实时功率</p>
                      <p ><span style="color: #fa6436" class="value">{{ stakeUsePower=={}?0:stakeUsePower }}</span>  千瓦   </p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleStake/roleStake12.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>在线率</p>
                      <p ><span style="color: #fa6436" class="value">{{ (100*stationInfo.onLineNum/stationInfo.stakeNumber).toFixed(2)==='NaN'?0:(100*stationInfo.onLineNum/stationInfo.stakeNumber).toFixed(2) }}</span>  %</p>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="count-info">
              <h4 class="common-title1"> <span>统计信息</span></h4>
              <van-row>
                <van-col v-for="(item,index) in stakeCountList" :key="index" span="6" @click="goStakeCountInfo(index)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{ item.name }}</p>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="电动汽车">
        <div>
          <div class="count-data">
            <van-row>
              <van-col span="6">
                <span>接入车辆</span>
                <span> <a style="color: #1c76e1">{{ ((carNumInfo.activatedNum + carNumInfo.unActivatedNum)/10000).toFixed(2) }} </a>万辆</span>
              </van-col>
              <van-col span="6">
                <span>激活车辆</span>
                <span> <a style="color: #49c971">{{ (carNumInfo.activatedNum/10000).toFixed(2) }} </a>万辆</span>
              </van-col>
              <van-col span="6">
                <span>在线车辆</span>
                <span> <a style="color: #d89212">{{ carNumInfo.onlineNum }} </a>辆</span>
              </van-col>
              <van-col span="6">
                <span>二氧化碳</span>
                <span> <a style="color: #e34f38">{{ co2 }} </a>万吨</span>
              </van-col>
            </van-row>
            <van-row class="notice">
              <span class="notice-icon"><img src="../../assets/roleGov/icon3.png" alt=""></span>
              <van-notice-bar
                :text="ziXunFirst"
              />
              <span class="notice-more" @click="RouterToPage('资讯')"><a>更多</a><van-icon name="arrow" /></span>
            </van-row>
          </div>
          <div class="content">
            <div class="basic-info">
              <h4 class="common-title1"> <span>基础信息</span></h4>
              <van-row>
                <van-col v-for="(item,index) in carBasicList" :key="index" span="6" @click="goCarBasicInfo(index)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{ item.name }}</p>
                </van-col>
              </van-row>
            </div>
            <div class="real-time-info">
              <h4 class="common-title1"> <span>实时信息</span></h4>
              <van-row>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe05.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>行驶中车辆</p>
                      <p ><span style="color: #0a90ed" class="value">{{ carNumInfo.drivingNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.drivingNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.drivingNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe06.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>充电车辆</p>
                      <p ><span style="color: #e8af03" class="value">{{ carNumInfo.chargingNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.chargingNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.chargingNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe07.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>在线车辆</p>
                      <p ><span style="color: #01bea5" class="value">{{ carNumInfo.onlineNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.onlineNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.onlineNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe08.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>离线车辆</p>
                      <p ><span style="color: #a7a6a6" class="value">{{ carNumInfo.offLineNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.offLineNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.offLineNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe09.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>激活车辆</p>
                      <p ><span style="color: #0cd937" class="value">{{ carNumInfo.activatedNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.activatedNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.activatedNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
                <van-col span="12">
                  <div class="box">
                    <div class="left-icon">
                      <img src="../../assets/roleCar/carOpe10.png" alt="">
                    </div>
                    <div class="right-info">
                      <p>未激活车辆</p>
                      <p ><span style="color: #fa6436" class="value">{{ carNumInfo.unActivatedNum }}</span>  辆
                        <!--                        <span class="per">{{(100*carNumInfo.unActivatedNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2)}}%</span>-->
                      </p>
                      <p class="per">占比：{{ (100*carNumInfo.unActivatedNum/(carNumInfo.activatedNum+carNumInfo.unActivatedNum)).toFixed(2) }}%</p>
                    </div>
                  </div>
                </van-col>
              </van-row>
            </div>
            <div class="count-info">
              <h4 class="common-title1"> <span>统计信息</span></h4>
              <van-row>
                <van-col v-for="(item,index) in carCountList" :key="index" span="6" @click="goCarCountInfo(index)">
                  <img :src="item.imgSrc" alt="">
                  <p>{{ item.name }}</p>
                </van-col>
              </van-row>
            </div>
          </div>
        </div>
      </van-tab>
    </van-tabs>
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'Index',
  data () {
    return {
      active: 0,
      userInfoDetail: {},
      ziXunFirst: '',
      stationInfo: {
        stationNumber: 0,
        stakeNumber: 0,
        onLineNum: 0

      }, // 站、桩数量
      stakeAll: 0, // 桩总数
      eleTimeInfo: {},
      stakeStatus: {
        type1: 0,
        type2: 0,
        type3: 0,
        type4: 0,
        type5: 0,
        type6: 0
      },
      stakeUsePower: 0, // 实时功率
      carNumInfo: {},
      co2: 0,
      loadingShow: false,
      stakeBasicList: [
        { name: '总体概况', imgSrc: require('../../assets/roleStake/roleStake01.png') },
        { name: '设施分布', imgSrc: require('../../assets/roleStake/roleStake02.png') },
        { name: '建设排行', imgSrc: require('../../assets/roleStake/roleStake03.png') },
        { name: '接入桩企', imgSrc: require('../../assets/roleStake/roleStake04.png') }
      ],
      stakeCountList: [
        { name: '发展趋势', imgSrc: require('../../assets/roleStake/roleStake13.png') },
        { name: '充电统计', imgSrc: require('../../assets/roleStake/roleStake14.png') },
        { name: '运行情况', imgSrc: require('../../assets/roleStake/roleStake15.png') },
        { name: '使用情况', imgSrc: require('../../assets/roleStake/roleStake16.png') }
        // { name: '在线率趋势', imgSrc: require('../../assets/roleStake/roleStake17.png') },
        // { name: '电站统计', imgSrc: require('../../assets/roleStake/roleStake18.png') },
        // { name: '电桩统计', imgSrc: require('../../assets/roleStake/roleStake19.png') }
      ],
      carCountList: [
        { name: '发展趋势', imgSrc: require('../../assets/roleCar/carOpe11.png') },
        { name: '当前现状', imgSrc: require('../../assets/roleCar/carOpe12.png') },
        { name: '行驶分析', imgSrc: require('../../assets/roleCar/carOpe13.png') },
        { name: '习惯分析', imgSrc: require('../../assets/roleCar/carOpe14.png') }
      ],
      carBasicList: [
        { name: '总体概况', imgSrc: require('../../assets/roleCar/carOpe01.png') },
        { name: '车辆分布', imgSrc: require('../../assets/roleCar/carOpe02.png') },
        { name: '车企排行', imgSrc: require('../../assets/roleCar/carOpe03.png') },
        { name: '接入车企', imgSrc: require('../../assets/roleCar/carOpe04.png') }
      ]
    }
  },
  created () {
  },
  mounted () {
    this.$nextTick(() => {
      this.init()
    })
  },
  methods: {
    hotmapPage () {
      this.$router.push('hotmapPage')
    },
    goBack () {
      this.$router.back()
    },
    goCarCountInfo (index) {
      this.$router.push({
        path: 'carCountInfo' + (index + 1)
      })
    },
    goStakeCountInfo (index) {
      this.$router.push({
        path: 'stakeCountInfo' + (index + 1)
      })
    },
    goStakeBasicInfo (index) {
      this.$router.push({
        path: 'stakeBasicInfo' + (index + 1)
      })
    },
    goCarBasicInfo (index) {
      this.$router.push({
        path: 'carBasicInfo' + (index + 1)
      })
    },
    RouterToPage (name) {
      name === '资讯' && this.$router.push('/information')
      name === '车企基础信息' && this.$router.push('/carBasicMsg')
    },
    init () {
      this.loadingShow = true
      this.userInfoDetail = getStore('userInfoAll') // 获取昵称信息
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.areaCode = this.userInfo.areaCode
      // 桩tab
      // this.getZiXunFirst()
      this.stakeStatisticsGet()
      this.statisticsEleTimeGet()
      this.stakeStatusNumberGet()
      this.stakeUsePowerGet()
      this.carRunStatusGet()
      this.carRunDataStatusGet()
      // 车tab
    },
    showErr () {
      this.$toast('加载错误')
    },
    // 获取资讯第一条数据
    getZiXunFirst (type) {
      const params = {
        basic: {
          pageNum: 1,
          pageSize: 1
        },
        params: {
          query: []
        }
      }
      params.params.query.push({ field: 'type', value: 1 })
      this.$store.dispatch('InformationListGet', params).then((res) => {
        if (res.list.length > 0) {
          // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
          // console.log(res)
          this.ziXunFirst = res.list[0].title
        }
      })
    },
    // 获取充电设施站、桩、运营商数量
    stakeStatisticsGet () {
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('stakeStatisticsGet', params).then((res) => {
        if (res) {
          this.stationInfo = res
          this.loadingShow = false
        }
      }).catch(() => {
        this.loadingShow = false
        this.showErr()
      })
    },
    // 获取充电量、次数
    statisticsEleTimeGet () {
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('statisticsEleTimeGet', params).then((res) => {
        if (res) {
          // console.log(res)
          this.eleTimeInfo = res[0]
        }
      })
    },
    // 获取充电桩状态
    stakeStatusNumberGet () {
      var that = this
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('stakeStatusNumberGet', params).then((res) => {
        if (res) {
          console.log(res)
          res.forEach(function (item, index) {
            that.stakeAll += item.value
            if (item.NAME === '空闲') {
              that.stakeStatus.type1 = item.value
              // console.log(that.stakeAll)
              // that.stakeStatus.perType1 = item.value / that.stakeAll
            }
            if (item.NAME === '占用(充电中)') {
              that.stakeStatus.type2 = item.value
            }
            if (item.NAME === '离网') {
              that.stakeStatus.type3 = item.value
            }
            if (item.NAME === '占用(未充电)') {
              that.stakeStatus.type4 = item.value
            }
            if (item.NAME === '故障') {
              that.stakeStatus.type5 = item.value
            }
            if (item.NAME === '占用(预约锁定)') {
              that.stakeStatus.type6 = item.value
            }
          })
          // this.stakeStatus = res
        }
      }).catch({
      })
    },
    // 获取充电桩实时功率
    stakeUsePowerGet () {
      // var that = this
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('stakeUsePowerGet', params).then((res) => {
        if (res) {
          // console.log(res)
          this.stakeUsePower = res[0].value
        }
      })
    },
    // 获取车状态数量
    carRunStatusGet () {
      // var that = this
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('carRunStatusGet', params).then((res) => {
        if (res) {
          console.log(res)
          this.carNumInfo = res
        }
      })
    },
    // 获取车co2减排量
    carRunDataStatusGet () {
      // var that = this
      const params = [
        { 'field': 'areaCode', value: this.areaCode }
      ]
      this.$store.dispatch('carRunDataStatusGet', params).then((res) => {
        if (res) {
          // console.log(res)
          this.co2 = (res.co2 / 10000).toFixed(2)
          // this.carNumInfo = res
        }
      })
    }
  }
}
</script>

<style scoped>
  .con-liu .common-top{
    background: url("../../assets/roleStake/govbg.png");
    background-size: 100% 100%;
    height: 180px;
  }
  .content {
    width: 100%;
    height: calc(100% - 180px);
    top: 180px;
    /*background-color: #ffffff;*/
    overflow-y: auto;
    position: absolute;
    padding-bottom: 50px;
  }
  .van-tabs{
    position: initial;
    margin-top: -115px;
  }
  .close-btn{
    position: absolute;
    right: 0px;
    top:0;
    padding: 22px 20px;
  }
  .close-btn img{
    width: 20px;
  }
  .stakeMidu {
    padding: 20px 10px 10px;
    border-bottom:10px solid #f4f4f4;}
</style>
