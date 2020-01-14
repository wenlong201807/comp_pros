<template>
  <div class="con-liu" style="height: 100%;position: relative">
<!--    <van-nav-bar-->
<!--      title="关于我们"-->
<!--      left-text="返回"-->
<!--      left-arrow-->
<!--      @click-left="goBack"-->
<!--    />-->
    <div class="topBack">
      <div class="navTitle">关于我们</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="set-content" >

      <div class="logo-sec">
        <div class="logo_img">
          <img class="logo-img" src="../../assets/login/logNew.png" alt="">
        </div>
        <div class="text-sec">
          <h3>e重庆移动应用</h3>
          <p>Version 1.0.1</p>
        </div>
        <!--      <img src="../../assets/about_logo.png" alt="" >-->
      </div>
      <div class="copyright">
        <p>北京科东  技术支持</p>
        <p>Copyright © 2020 ChongQing-all rights Reserved</p>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'AboutUs',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.logo-sec{
  height: 500px;
  display: flex;
  flex-direction: column;
  /*background: url('../../assets/aboutUs1.png');*/
  padding: 60px 0;
  position: relative;
}
  .logo_img {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .logo-img {
    height: 200px;
    width: 150px;
  }
  .text-sec{
    position: absolute;
    bottom: 8%;
    text-align: center;
    width: 100%;
  }
  .copyright{
    color: #999999;
    position: absolute;
    bottom: 30px;
    width: 100%;
    text-align: center;
  }
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
.navTitle{
  display: inline-block;
  font-size: 17px;
  font-weight: 500;
  font-stretch: normal;
  letter-spacing: 0;
  color: #000000;
}
.set-content{
  width: 100%;
  height: calc(100% - 50px);
  top: 50px;
  background-color: #ffffff;
  overflow-y: auto;
  position: absolute;
}
</style>
