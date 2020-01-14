<template>
  <div class="login-wrapper">
    <!--    <div name="close" class="close" @click.native="$emit('close')"></div>-->
    <div class="topBack">
      <div class="backButton" @click="navBack"></div>
    </div>
    <div class="topLog">
      <div class="logIcon"></div>
      <!--      <div class="logText">-->
      <!--        <span class="text">欢迎登录e重庆</span>-->
      <!--      </div>-->
    </div>
    <div class="centerContent" v-if="!phoneIdentify">
      <van-field v-model="username" autocomplete="off" clearable placeholder="请输入用户名" />
      <van-field v-model="password" autocomplete="off" @keypress="search($event)" clearable type="password" placeholder="请输入密码" />
      <van-row v-if="showCode">
        <van-col span="16">
          <van-field v-model="captcha" @keypress="search($event)" autocomplete="off" clearable placeholder="请输入验证码" />
        </van-col>
        <van-col span="8">
          <img @click="initImg" class="imgCode" id="img" :src="srcUrl1">
        </van-col>
      </van-row>
    </div>
    <div class="centerContent" v-else>
      <van-field v-model="phone" autocomplete="off" type="number" center clearable label-width="1.2rem" label="+86" placeholder="请输入手机号">
      </van-field>
      <van-field type="number" autocomplete="off" v-model="phoneCode" @keypress="search($event)" clearable placeholder="请输入验证码">
        <div class="codeButton" slot="button" v-show="sendCode" @click="codeButton">获取验证码</div>
        <div class="codeButton" slot="button" style="color: #B0B1B3" v-show="!sendCode">{{ authTime }} S</div>
      </van-field>
    </div>
    <div class="bottomButton">
      <span class="newUser" @click="newRegister">新用户注册</span>
      <span class="forgetSecret" @click="forgetButton">忘记密码？</span>
    </div>
    <van-button class="login" @click="login" :disabled="state.loginBtn">登录</van-button>
    <div class="changeButton" @click="changeButton">{{ changeText }}</div>
    <div class="protocol">
      <span class="gray">登录即已同意</span>
      <span class="black" @click="guide">《隐私指南》</span>
      <span class="gray">和</span>
      <span class="black" @click="serveProtocol">《e重庆服务协议》</span>
    </div>
    <loadingStatus :content="content" :loadingStatus="showLoading"></loadingStatus>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data () {
    return {
      username_msg: '',
      // password: '',
      password_msg: '',
      phone: '',
      phoneCode: '',
      phoneIdentify: false, /* 是否是手机验证码登录 */
      changeText: '手机号验证码登录',
      username: '',
      password: '',
      captcha: '', /* 验证码 */
      state: {
        loginBtn: false
      },
      showLoading: false,
      content: '登录中...',
      srcUrl1: null, /* 图片 */
      showCode: false, /* 显示验证码 */
      sendCode: true,
      authTime: 0, // 倒计时
      docmHeight: '0', // 默认屏幕高度
      showHeight: '0', // 实时屏幕高度
      hidshow: true, // 显示或者隐藏footer,
      isResize: false // 默认屏幕高度是否已获取
    }
  },
  mounted () {
    // window.onresize监听页面高度的变化
    window.onresize = () => {
      return (() => {
        if (!this.isResize) {
          // 默认屏幕高度
          this.docmHeight = document.documentElement.clientHeight
          this.isResize = true
        }
        // 实时屏幕高度
        this.showHeight = document.body.clientHeight
      })()
    }
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidshow = false
      } else {
        this.hidshow = true
      }
    }
  },
  methods: {
    newRegister () {
      this.$router.push('/register')
    },
    search (event) {
      if (event.keyCode === 13) {
        event.preventDefault()
        this.login()
      }
    },
    /* 隐私指南 */
    guide () {
      this.$router.push('/memberSetting/privacyGuide')
    },
    serveProtocol () {
      this.$router.push('/memberSetting/serviceAgreement')
    },
    initImg () {
      this.$store.dispatch('Image').then(res => {
        this.srcUrl1 = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      })
    },
    login () {
      document.activeElement.blur()
      if (this.phoneIdentify === false) {
        if (this.username === '' || this.password === '') {
          this.$notify('用户名或密码不能为空')
        } else {
          const { state } = this
          state.loginBtn = false
          var loginParams = {}
          loginParams.username = this.username
          loginParams.password = this.password
          if (this.captcha !== '') {
            loginParams.captcha = this.captcha
          }
          loginParams['grant_type'] = 'password'
          this.showLoading = true
          this.$store.dispatch('Login', loginParams).then((res) => {
            console.log(1)
            this.$store.dispatch('GetInfo').then((res) => {
              this.$store.dispatch('userInfoGet', res.principal.id).then((res) => {
                this.showLoading = false
                this.$router.go(-1)
              })
            })
          }).catch((res) => {
            this.showLoading = false
            if (res.response !== undefined) {
              if (res.response.data.message === '验证码为空！') {
                this.$notify('请输入验证码!')
                this.initImg()
                this.showCode = true
              } else if (res.response.data.message === '验证码错误！') {
                this.$notify('验证码输入错误,请重新输入!')
                this.initImg()
                this.showCode = true
              }
            } else {
              this.$notify('用户名或密码错误!')
            }
          })
        }
      } else {
        const { state } = this
        state.loginBtn = false
        var data = {
          phoneCode: this.phoneCode,
          phoneNumber: this.phone
        }
        if (this.phoneCode === '' || this.phone === '') {
          this.$notify('手机号验证码不能为空')
          return
        }
        if (!this.phone || !this.isPoneAvailable(this.phone)) {
          this.$notify('手机号格式错误！')
          return
        }
        this.showLoading = true
        this.$store.dispatch('CodeLog', data).then((res) => {
          this.$store.dispatch('GetInfo').then((res) => {
            this.$store.dispatch('userInfoGet', res.principal.id).then((res) => {
              this.showLoading = false
              this.$router.go(-1)
            })
          })
        }).catch((error) => {
          this.showLoading = false
          this.$notify({ type: 'danger', message: error.response.data.message ? error.response.data.message : '手机号或验证码错误' })
        })
      }
    },
    forgetButton () {
      this.$router.push('/changePassWord')
    },
    loginSuccess (res) {
      this.$emit('close')
    },
    requestFailed () {
    },
    changeButton () {
      this.phoneIdentify = !this.phoneIdentify
      if (this.phoneIdentify === false) {
        this.changeText = '手机号验证码登录'
      } else {
        this.changeText = '用户名密码登录'
      }
    },
    /* 获取验证码 */
    codeButton () {
      if (!this.phone || !this.isPoneAvailable(this.phone)) {
        this.$notify('请重新填写手机号！')
        return
      }
      this.sendCode = false // 控制显示隐藏
      this.authTime = 60
      const timeInt = setInterval(() => {
        this.authTime--
        if (this.authTime <= 0) {
          this.sendCode = true
          window.clearInterval(timeInt)
        }
      }, 1000)
      var data = {
        basic: this.phone
      }
      this.$store.dispatch('SmsCode', data).then((res) => {
        this.$notify({ type: 'success', message: '发送验证码成功！' })
      })
    },
    // 判断是否为手机号
    isPoneAvailable: function (pone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(pone)) {
        return false
      } else {
        return true
      }
    },
    /* 返回 */
    navBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  /deep/ .van-field__label{
    text-align: left;
  }
  /deep/ .van-cell{
    border-bottom: 1px solid #e7e7e7;
    padding: 16px 0;
  }
  /deep/ .van-cell:not(:last-child)::after{
    border: 0;
  }
  .topBack{
    width: 100%;
    height: 44px;
    text-align: left;
  }
  .backButton{
    background: url("../../assets/login/back.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
  }
  .topLog{
    text-align: center;
    position: relative;
    width: 100%;
    height: 177px;
    margin-top: 12px;
    .logIcon{
      background: url("../../assets/login/logNew.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      width: 127px;
      height: 177px;
      display: inline-block;
    }
    .logText{
      width: 100%;
      display: flex;
      justify-content: center;
      .text{
        font-size: 20px;
        font-stretch: normal;
        letter-spacing: 0px;
        color: #333333;
        position: absolute;
        font-weight: 600;
        bottom: 0;
      }
    }
  }
  .codeButton{
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #247cfd;
  }
  .centerContent{
    padding: 15px 37px 20px 37px;

  }
  .bottomButton{
    width: 100%;
    padding: 0 37px 0 37px;
    .newUser{
      display: inline-block;
      float: left;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #666666;
    }
    .forgetSecret{
      display: inline-block;
      float: right;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #666666;
    }
  }
  .login-wrapper {
    /*position: fixed;*/
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 1000;
    opacity: 1;
    background-color: #fff;
    text-align: center;
    transition: top .2s ease-out;
    .login {
      margin-top: 53px;
      width: 301px;
      height: 51px;
      border-radius: 22px;
      line-height: 51px;
      border: none;
      background-color:#3486fe;
      font-size: 17px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 6px;
      color: #ffffff;
    }
  }
  .changeButton{
    margin-top: 18px;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #3486fe;
  }
  .protocol{
    /*bottom: 30px;*/
    /*position: absolute;*/
    padding-top:calc(10vh);
    width: 100%;
    .gray{
      font-size: 13px;
      font-weight: normal;
      font-stretch: normal;
      letter-spacing: 0;
      color: #999999;
    }
    .black{
      font-size: 13px;
      font-weight: normal;
      letter-spacing: 0;
      color: #333333;
    }
  }

  .imgCode{
    width: 100%;
    height: 57px
  }
</style>
