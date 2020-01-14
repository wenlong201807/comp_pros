<template>
  <div>
    <div class="topBack">
      <div class="navTitle">建设排行</div>
      <div class="backButton" @click="navBack"></div>
    </div>
    <div class="containerAll">
      <scroller :on-refresh="refresh" ref="myscroller" style="width: 100%;height: 100%;">
        <div class="topContainer" v-if="aheadRank.length!==0">
          <div class="topInner">
            <div class="left">
              <div class="silver"></div>
              <div class="brand">{{ ((aheadRank[1]||{}).name||'').substring(0,4) }}</div>
              <div class="numer">
                <span class="num">{{ (aheadRank[1]||{}).value }}</span>
                <span class="unit">桩</span>
              </div>
              <div class="percent">
                <div class="num">{{ (aheadRank[1]||{}).percent }}</div>
              <!--            <span class="rank">1</span>-->
              <!--            <div class="down"></div>-->
              </div>
            </div>
            <div class="center">
              <div class="gold"></div>
              <div class="brand bigText">{{ ((aheadRank[0]||{}).name||'').substring(0,4) }}</div>
              <div class="numer bigNumTop">
                <span class="num bigNum">{{ (aheadRank[0]||{}).value }}</span>
                <span class="unit">桩</span>
              </div>
              <div class="percent">
                <div class="num">{{ (aheadRank[0]||{}).percent }}</div>
              <!--            <span class="rank">1</span>-->
              <!--            <div class="down"></div>-->
              </div>
            </div>
            <div class="right">
              <div class="copper"></div>
              <div class="brand">{{ ((aheadRank[2]||{}).name||'').substring(0,4) }}</div>
              <div class="numer">
                <span class="num">{{ (aheadRank[2]||{}).value }}</span>
                <span class="unit">桩</span>
              </div>
              <div class="percent">
                <div class="num">{{ (aheadRank[0]||{}).percent }}</div>
              <!--            <span class="rank">1</span>-->
              <!--            <div class="down"></div>-->
              </div>
            </div>
          </div>
        </div>
        <div class="containerCenter">
          <div class="listCar" v-for="(item,index) in behindRank" :key="item.rank">
            <div class="number">{{ index+4 }}</div>
            <div class="text">{{ item.name.substring(0,4) }}</div>
            <div class="rightCar">
              <div class="num">{{ item.value }}</div>
              <div class="unit">桩</div>
              <div class="per">
                <div class="percent">{{ item.percent }}</div>
              </div>
            <!--          <span class="rank">1</span>-->
            <!--          <div class="down"></div>-->
            </div>
          </div>
        </div>
      </scroller>
      <loadingStatus :content="content" :loadingStatus="showLoading"></loadingStatus>
    </div>
  </div>
</template>
<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'StakeBasicInfo3',
  data () {
    return {
      aheadRank: [],
      behindRank: [],
      content: '数据加载中...',
      showLoading: false,
      userSpecific: ''
    }
  },
  mounted: function () {
    this.userSpecific = getStore('userSpecific')
    this.initCarRank()
  },
  activated () {
  },
  methods: {
    // 下拉刷新
    refresh () {
      var that = this
      this.initCarRank().then(res => {
        /* 没有数据 */
        that.$refs.myscroller.finishPullToRefresh() /// 刷新完毕关闭刷新的转圈圈
      })
    },
    /* 返回 */
    navBack () {
      this.$router.go(-1)
    },
    initCarRank () {
      return new Promise((resolve, reject) => {
        this.showLoading = true
        const params = []
        params.push({ field: 'areaCode', value: this.userSpecific.areaCode })
        this.$store.dispatch('stakeRankRequest', params).then(res => {
          resolve()
          this.showLoading = false
          this.aheadRank = res.slice(0, 3)
          this.behindRank = res.slice(4, res.length)
        }).catch(err => {
          resolve()
          console.log(err)
          this.showLoading = false
        })
      })
    }
  }
}
</script>
<style scoped lang="scss">
  .topBack{
    width: 100%;
    height: 44px;
    /*text-align: left;*/
    background: white;
    text-align: center;
    line-height: 44px;
  }
  .backButton{
    background: url("../../assets/login/back.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
    position: absolute;
    left: 0;
  }
  .navTitle{
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0;
    color: #000000;
  }
  .topContainer{
    background: url("../../assets/basicInfo/carBackground.png");
    background-size: 100% 100%;
    width: 100%;
    height: 184px;
    background-position: center center;
    display: flex;
    justify-content: center;

  }
  .topInner{
    width: 96%;
    height: 100%;
    display: flex;
    .left{
      padding-top: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .center{
      padding-top: 10px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .right{
      padding-top: 20px;
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }
    .silver{
      background: url("../../assets/basicInfo/silver.png");
      background-size: 100% 100%;
      width: 36px;
      height: 43px;
      background-position: center center;
    }
    .brand{
      font-size: 15px;
      color: #333333;
      font-weight: 600;
      padding-top: 15px;
    }
    .numer{
      padding-top: 10px;
      .num{
        font-size: 18px;
        color: #f09300;
      }
      .unit{
        font-size: 12px;
        color: #999999;
        padding-left: 8px;
      }
    }
    .percent{
      padding-top: 10px;
      font-size: 12px;
      .num{
        display: inline-block;
        padding: 0 5px;
        background-color: #f9aa2d;
        border-radius: 3px;
        color: white;
      }
      .rank{
        padding-left: 8px;
        display: inline-block;
      }
      .down{
        background: url("../../assets/basicInfo/down.png");
        background-size: 7px 11px;
        width: 7px;
        height: 13px;
        background-repeat: no-repeat;
        background-position: top center;
        display: inline-block;
        vertical-align: middle;
      }
    }
    .gold{
      width: 43px;
      height: 53px;
      background: url("../../assets/basicInfo/gold.png");
      background-size: 100% 100%;
      background-position: center center;
    }
    .copper{
      width: 36px;
      height: 43px;
      background: url("../../assets/basicInfo/copper.png");
      background-size: 100% 100%;
      background-position: center center;
    }
    .bigNumTop{
      padding-top: 8px;
    }
    .bigText{
      font-size: 17px;
      padding-top: 10px;
    }
    .bigNum{
      font-size: 23px !important;
    }
  }
  .containerCenter{
    /*background: red;*/
    height: calc(100% - 184px);
    .listCar{
      height: 60px;
      /*background: red;*/
      width: 90%;
      margin: auto;
      border-bottom: 1px solid #dddddd;
      display: flex;
      align-items: center;
      .number{
        width: 21px;
        height: 21px;
        background-color: #6192ec;
        border-radius: 3px;
        color: white;
        text-align: center;
        line-height: 21px;
      }
      .text{
        padding-left: 9px;
        font-size: 15px;
        color: #333333;
        font-weight: 600;
      }
      .rightCar{
        flex: 1;
        text-align: right;
        div{
          display: inline-block;
          padding-left: 10px;
        }
        .num{
          font-size: 18px;
          color: #333333;
          font-weight: 600;
        }
        .unit{
          font-size: 12px;
          color: #999999;
          padding-left: 5px;
        }
        .percent{
          display: inline-block;
          padding: 0 5px;
          background-color: #f9aa2d;
          border-radius: 3px;
          color: white;
        }
        .rank{
          padding-left: 15px;
          display: inline-block;
        }
        .down{
          background: url("../../assets/basicInfo/down.png");
          background-size: 7px 11px;
          width: 7px;
          height: 13px;
          background-repeat: no-repeat;
          background-position: top center;
          display: inline-block;
          vertical-align: middle;
        }
      }

    }

  }
  .containerAll{
    position: absolute;
    overflow-y: auto;
    height: calc(100% - 44px);
    width: 100%;
  }
</style>
