<template>
  <div class="con-liu">
    <div class="editBody">
      <div class="topBack">
        <div class="backButton" @click="goBack"></div>
        <div class="confirmBtn" @click="confirmBirth">完成</div>
      </div>
    </div>
    <div class="main-content">

      <div class="editContent">
        <h2 class="title">修改昵称</h2>
        <p class="editTip">昵称为2-32位字符，支持中文、英文、数字</p>
        <!--        <van-cell-group>-->
        <van-field v-model="userInfoDetail.displayName" placeholder="请输入用户名" />
        <!--        </van-cell-group>-->
      </div>
    </div>
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
  </div>

</template>

<script>
import { getStore, setStore } from 'src/utils/store'
export default {
  name: 'EditName',
  data () {
    return {
      userID: '',
      userInfoDetail: {},
      loadingShow: false
    }
  },
  mounted () {
    this.init()
    // this.displayNameGet()
  },
  methods: {
    init () {
      this.userInfoDetail = getStore('userInfoAll') // 获取昵称信息
      this.userID = this.userInfoDetail.id
      console.log(this.userInfoDetail)
      // console.log(this.userInfo)
    },
    goBack () {
      this.$router.back()
    },
    confirmBirth (value) {
      this.loadingShow = true
      var param = {
        displayName: this.userInfoDetail.displayName,
        id: this.userID
      }
      // param = JSON.stringify(param)
      this.$store.dispatch('displayNameModify', param).then((res) => {
        console.log(res)
        if (res) {
          setStore('userInfoAll', res)
          this.loadingShow = false
          this.goBack()
        }
      })
    },
    displayNameGet () { // 获取账号详细信息
      this.$store.dispatch('displayNameGet', this.userID).then((res) => {
        console.log(res)
        this.userInfoDetail = res
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
    font-weight: 600;
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
