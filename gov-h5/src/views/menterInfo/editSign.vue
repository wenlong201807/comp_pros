<template>
  <div class="con-liu">
    <div class="topBack">
      <div class="backButton" @click="goBack"></div>
      <div class="confirmBtn" @click="confirmBirth">完成</div>
    </div>
    <div class="main-content">
      <div class="editBody">
        <div class="editContent">
          <h2 class="title">个性签名</h2>
          <!--        <van-cell-group>-->
          <van-field v-model="userInfo.signature" placeholder="请输入个性签名" />
          <!--        </van-cell-group>-->
        </div>
      </div>
    </div>
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>
</template>

<script>
import { getStore, setStore } from 'src/utils/store'
export default {
  name: 'EditSign',
  data () {
    return {
      userID: '',
      userInfo: {},
      loadingShow: false
    }
  },
  created () {
    this.init()
  },
  mounted () {
  },
  methods: {
    init () {
      this.userInfo = getStore('userSpecific') // 获取个人信息
      this.userID = this.userInfo.id
      // console.log(this.userInfoDetail)
      // console.log(this.userInfo)
    },
    goBack () {
      this.$router.back()
    },
    confirmBirth (value) {
      this.loadingShow = true
      var param = {
        id: this.userID,
        signature: this.userInfo.signature
      }
      this.$store.dispatch('userInfoModify', param).then((res) => {
        if (res) {
          setStore('userSpecific', res)
          this.goBack()
        }
        this.loadingShow = false
      })
      //
    },
    userInfoGet () {
      this.$store.dispatch('userInfoGet', this.userID).then((res) => {
        console.log(res)
        this.userInfo = res
      })
    }
  }
}
</script>

<style scoped>
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
    top:0;
  }
  .confirmBtn{
    position: absolute;
    right: 15px;
    top:0;
    font-size: 15px;
    color: #000;
  }
  .navTitle{
    display: inline-block;
    font-size: 17px;
    font-weight: 500;
    font-stretch: normal;
    letter-spacing: 0;
    color: #000000;
  }
  .main-content{
    width: 100%;
    height: calc(100% - 50px);
    top: 50px;
    background-color: #ffffff;
    overflow-y: auto;
    position: absolute;
  }
  .main-content  .van-cell{
    border-bottom: 1px solid #ddd;
    padding: 10px 15px 10px 0;
  }
  .editContent .title{
    font-size: 20px;
  }
</style>
