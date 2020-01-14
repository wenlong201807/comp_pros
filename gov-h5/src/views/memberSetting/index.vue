<template>
  <div style="background: #f4f4f4;height: 100%" class="con-liu">
<!--    <van-nav-bar-->
<!--      title="设置"-->
<!--      left-text="返回"-->
<!--      left-arrow-->
<!--      @click-left="goBack"-->
<!--    />-->
    <div class="topBack">
      <div class="navTitle">设置</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="set-content" >
      <van-cell-group>
        <van-cell title="关于我们" is-link size="large" to="aboutUs">
        </van-cell>
        <van-cell title="e重庆服务协议"  is-link size="large" to="serviceAgreement"/>
        <van-cell title="隐私指南"  is-link size="large" to="privacyGuide"/>
      </van-cell-group>
    </div>
  </div>

</template>

<script>
export default {
  name: 'index',
  methods: {
    goBack () {
      this.$router.back()
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
  .navTitle{
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0;
    color: #000000;
  }
  .set-content{
    width: 100%;
    height: calc(100% - 50px);
    top: 50px;
    /*background-color: #ffffff;*/
    overflow-y: auto;
    position: absolute;
  }
  .van-cell{
    padding-left: 20px;
  }
</style>
