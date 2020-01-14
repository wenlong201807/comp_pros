<template>
  <div class="con-liu">
    <div class="common-top">
      <h4>欢迎您，{{ userInfoDetail.displayName }}
        <span class="close-btn"><img src="../../assets/roleGov/close.png" alt="" @click="goBack"></span>
      </h4>
      <div class="count-data">
        <van-row>
          <van-col span="6">
            <span>接入车辆</span>
            <span> <a style="color: #1c76e1">{{ ((carNumInfo.activatedNum + carNumInfo.unActivatedNum)/10000).toFixed(1) }} </a>万辆</span>
          </van-col>
          <van-col span="6">
            <span>激活车辆</span>
            <span> <a style="color: #49c971">{{ (carNumInfo.activatedNum/10000).toFixed(1) }} </a>万辆</span>
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
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'Index',
  data () {
    return {
      userInfoDetail: {},
      ziXunFirst: '',
      loadingShow: false,
      carNumInfo: {},
      co2: 0,
      carCountList: [
        { name: '发展趋势', imgSrc: require('../../assets/roleCar/carOpe11.png') },
        { name: '当前现状', imgSrc: require('../../assets/roleCar/carOpe12.png') },
        { name: '行驶分析', imgSrc: require('../../assets/roleCar/carOpe13.png') },
        { name: '习惯分析', imgSrc: require('../../assets/roleCar/carOpe14.png') }
      ],
      carBasicList: [
        { name: '总体概况', imgSrc: require('../../assets/roleCar/carOpe01.png') },
        { name: '车辆分布', imgSrc: require('../../assets/roleCar/carOpe02.png') },
        { name: '车辆规模', imgSrc: require('../../assets/roleCar/carOpe03.png') },
        { name: '传输监测', imgSrc: require('../../assets/roleCar/carOpe04.png') }
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
    goBack () {
      this.$router.back()
    },
    goCarCountInfo (index) {
      this.$router.push({
        path: '/roleCarCountInfo' + (index + 1)
      })
    },
    goCarBasicInfo (index) {
      this.$router.push({
        path: '/roleCarBasicInfo' + (index + 1)
      })
    },
    init () {
      this.loadingShow = true
      this.userInfoDetail = getStore('userInfoAll') // 获取昵称信息
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.areaCode = this.userInfo.areaCode
      this.getZiXunFirst()
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
          this.loadingShow = false
        }
      }).catch(() => {
        this.loadingShow = false
        this.showErr()
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
          this.co2 = (res.co2 / 10000).toFixed(1)
          // this.carNumInfo = res
        }
      })
    }
  }
}
</script>

<style scoped>
  .content {
    width: 100%;
    height: calc(100% - 180px);
    top: 180px;
    background-color: #ffffff;
    overflow-y: auto;
    position: absolute;
    padding-bottom: 50px;
  }
  .van-tabs{
    position: initial;
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
</style>
