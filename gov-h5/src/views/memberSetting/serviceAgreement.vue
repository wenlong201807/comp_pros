<template>
  <div class="con-liu">
<!--    <van-nav-bar-->
<!--      title="《e重庆服务协议》"-->
<!--      left-text="返回"-->
<!--      left-arrow-->
<!--      @click-left="goBack" />-->
    <div class="topBack">
      <div class="navTitle">《e重庆服务协议》</div>
      <div class="backButton" @click="goBack"></div>
    </div>
    <div class="set-content" >
      <div class="main-content">
        <div style="color: #000">
          <p>欢迎您使用e重庆的服务！</p>
          <p>&#12288;&#12288;本软件尊重并保护所有使用服务用户的个人隐私权。为了给您提供更准确、更有个性化的服务，本软件会按照本隐私权政策的规定使用和披露您的个人信息。但本软件将以高度的勤勉、审慎义务对待这些信息。除本隐私权政策另有规定外，在未征得您事先许可的情况下，本软件不会将这些信息对外披露或向第三方提供。本软件会不时更新本隐私权政策。您在同意本软件服务使用协议之时，即视为您已经同意本隐私权政策全部内容。本隐私权政策属于本软件服务使用协议不可分割的一部分。</p>
          <br>
        </div>
        <div style="color: #333">
          <p>1.适用范围<br>
            在您使用本软件网络服务，本软件自动接收并记录的您的手机上的信息，包括但不限于您的健康数据、使用的语言、访问日期和时间、软硬件特征信息及您需求的网页记录等数据；</p>
          <br>
          <p>2.信息的使用<br>
            在获得您的数据之后，本软件会将其上传至服务器，以生成您的排行榜数据，以便您能够更好地使用服务。</p>
          <br>
          <p>3.信息披露<br>
            (1) 本软件不会将您的信息披露给不受信任的第三方。<br>
            (2) 根据法律的有关规定，或者行政或司法机构的要求，向第三方或者行政、司法机构披露；<br>
            (3) 如您出现违反中国有关法律、法规或者相关规则的情况，需要向第三方披露；<br>
          </p>
          <br>
          <p>4.信息存储和交换<br>
            本软件收集的有关您的信息和资料将保存在本软件及（或）其关联公司的服务器上，这些信息和资料可能传送至您所在国家、地区或本软件收集信息和资料所在地的境外并在境外被访问、存储和展示
          </p>
          <br>
          <p>5.信息安全<br>
            在使用本软件网络服务进行网上交易时，您不可避免的要向交易对方或潜在的交易对方披露自己的个人信息，如联络方式或者邮政地址。请您妥善保护自己的个人信息，仅在必要的情形下向他人提供。如您发现自己的个人信息泄密，请您立即联络本软件客服，以便本软件采取相应措施
          </p>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: 'ServiceAgreement',
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
