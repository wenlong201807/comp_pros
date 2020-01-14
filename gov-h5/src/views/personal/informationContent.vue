<template v-cloak>
  <div class="information-content-contains" v-cloak>
    <div class="topBack">
      <div class="backButton" @click="navBack"></div>
      <div v-if="!isCollect" class="starButton" @click="startButton"></div>
      <div v-else class="starButtonYellow" @click="startYellowButton"></div>
    </div>
    <div class="information-content-detail">
      <template v-if="!backList">
        <van-skeleton title style="padding-top: 20px" :row="3"/>
      </template>
      <div class="introduce-section" v-else>
        <div class="title">{{ detailData.title }}</div>
        <div class="introduce">
          <div class="time">{{ detailData.crtDate }}</div>
          <div v-cloak>{{ detailData.author }}</div>
        </div>
        <div class="detail" style="font-size: 16px;text-indent:4px;" v-html="detailData.content"></div>
      </div>
    </div>
  </div>
</template>
<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'InformationContent',
  data () {
    return {
      loading: true,
      type: 1,
      detailData: {
        title: '',
        crtDate: '',
        PIC_URL: '',
        author: '',
        content: ''
      },
      errorImg01: 'this.src=\'https://img66.gkzhan.com/9/20151210/635853381355786091993.jpg\'',
      newsList: [],
      evaList: [],
      loadingContent: '数据载入中...',
      showloading: false,
      backList: false,
      isCollect: false,
      userInfoAll: null,
      userId: null
    }
  },

  mounted: function () {
    if (getStore('userInfoAll')) {
      this.userInfoAll = getStore('userInfoAll')
      this.userId = this.userInfoAll.id
    }
    this.showloading = true
    this.$nextTick(function () {
      this.init()
    })
  },
  activated () {
    this.init()
  },

  methods: {
    navBack () {
      this.$router.go(-1)
    },
    startButton () {
      if (!getStore('userInfoAll')) {
        this.$router.push('/login')
      } else {
        var that = this
        const params = {
          userId: this.userId,
          collectionId: this.$route.query.id,
          collectionType: 2
        }
        this.$store.dispatch('AppAddCollection', params).then(res => {
          that.isCollect = true
          this.$notify({ type: 'success', message: '收藏成功！', duration: 700 })
        }).catch(err => console.log(err))
      }
    },
    startYellowButton () {
      var that = this
      const params = {
        userId: this.userId,
        collectionId: this.$route.query.id,
        collectionType: 2
      }
      this.$store.dispatch('AppDeleteCollection', params).then(res => {
        that.isCollect = false
        this.$notify({ type: 'success', message: '取消收藏成功！', duration: 700 })
      }).catch(err => console.log(err))
    },
    shareButton () {
    },
    init () {
      var that = this
      // this.detailData.id = this.$route.query.id;
      this.type = this.$route.query.type
      const params = {
        id: this.$route.query.id
      }
      if (getStore('userInfoAll')) {
        params.userId = this.userId
      }
      this.$store.dispatch('InformationDetail', params).then((res) => {
        if (res.collectionStatus === null || res.collectionStatus === 0) {
          that.isCollect = false
        } else {
          that.isCollect = true
        }
        that.detailData = res
        that.showloading = false
        that.backList = true
      })
    },
    back () {
      history.back()
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
            ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    }
  }
}
</script>

<style scoped>
  [v-cloak] {
    display: none !important;
  }
  .information-content-contains {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .information-picture {
    width: 100%;
    height: 40%;
    padding-bottom: 20px;
  }

  .information-content-top-panel {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 60px;
    background: #018E5E;
  }

  .information-content-top-back {
    display: flex;
    flex-direction: row;
    width: 30%;
    height: 100%;
    align-items: center;
  }
  .back-button-text {
    display: flex;
    font-size: 1.3rem;
    color: white;
    position: relative;
    margin-top: 15%;
    margin-left: -5px;
  }

  .information-content-top-title {
    display: flex;
    flex-direction: column;
    width: 40%;
    justify-content: center;
    align-items: center;
    margin-top: 4%;
    font-size: 1.7rem;
    color: #fff;
    font-weight: 500;
  }

  .common-img-setting {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100%;
  }

  .information-content-more {
    width: 30%;
    display: flex;
    justify-content: flex-end;
  }
  .information-content-detail {
    height: calc(100% - 44px);
    overflow-y: auto;
  }
  /* 简介 */
  .introduce-section {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    background: #fff;
    line-height: 1.5em;
  }

  .title {
    font-size: 18px;
    margin-bottom: 6px;
    font-weight: 600;
    text-align: left;
    padding-top: 10px;
  }

  .introduce {
    display: flex;
    font-size: 12px;
    color: #909399;
    padding-bottom: 10px;
  }

  .time {
    margin-right: 20px;
  }

  .detail {
    text-align: left;
  }

  .topBack {
    width: 100%;
    height: 44px;
    /*text-align: left;*/
    background: white;
    text-align: center;
    line-height: 44px;
  }

  .backButton {
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

  .starButton {
    background: url("../../assets/login/star.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
    position: absolute;
    right: 0px;
  }
  .starButtonYellow {
    background: url("../../assets/login/starYellow.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
    position: absolute;
    right: 0px;
  }
  .shareButton {
    background: url("../../assets/login/share.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
    position: absolute;
    right: 0;
  }
  .navTitle {
    display: inline-block;
    font-size: 17px;
    font-weight: 500;
    font-stretch: normal;
    letter-spacing: 0;
    color: #000000;
  }
</style>
