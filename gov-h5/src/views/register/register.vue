/* eslint-disable vue/valid-v-else */
/* eslint-disable vue/valid-v-else */
<template>
  <div>
    <div class="registerTop">
      <span class="icon"
            @click="goBack"></span>
    </div>
    <div class="registerTitle">
      <h3 class="text">注册e重庆</h3>
    </div>
    <div class="registerForm">
      <ul>
        <li>
          <p>手机号</p>
          <van-field class="phoneInput"
                     v-model="phone"
                     placeholder="请输入手机号"
                     error-message="" />
        </li>
        <li>
          <p>验证码</p>
          <van-field class="phoneInput"
                     v-model="sms"
                     center
                     clearable
                     placeholder="请输入短信验证码">
            <van-button v-if="show"
                        class="codeText"
                        slot="button"
                        size="small"
                        @click="getSmsCode">获取验证码</van-button>
            <van-button v-else
                        slot="button"
                        size="small"
                        class="codeText">{{ count }} s</van-button>
          </van-field>
        </li>
        <li class="code passIcon">
          <p>密码</p>
          <van-field class="phoneInput "
                     v-model="password"
                     :type="inputType"
                     placeholder="6-16位数字和字母组成" />
          <i v-if="isShow==='noShow'"
             class="passIconWrap"
             @click="showPass('showPass')"></i>
          <van-icon v-else
                    name="cross"
                    class="close"
                    @click="showPass('hidePass')" />
        </li>

        <li class="passIcon">
          <p>确认密码</p>
          <van-field class="phoneInput  "
                     v-model="passwordOk"
                     :type="inputType1"
                     placeholder="6-16位数字和字母组成" />
          <i v-if="isShow1==='noShow'"
             class="passIconWrap"
             @click="showPass1('showPass')"></i>
          <van-icon v-else
                    name="cross"
                    class="close"
                    @click="showPass1('hidePass')" />
        </li>
      </ul>
    </div>
    <div class="regiterBottom" v-show="hidshow">
      <van-button type="info"
                  style="width:100%;border-radius:6px;z-index：-1；"
                  @click="registerOk()">同意协议并注册</van-button>
    </div>
    <p class="agreement">
      请仔细阅读<span class="agreementTitle"
                 @click="routeToPrivacyGuide">《隐私指南》</span>和<span class="agreementTitle"
                                                                  @click="routeToServiceAgreement">《e重庆服务协议》</span>
    </p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      docmHeight: '0', // 默认屏幕高度
      showHeight: '0', // 实时屏幕高度
      hidshow: true, // 显示或者隐藏footer,
      isResize: false, // 默认屏幕高度是否已获取
      inputType: 'password',
      isShow: 'noShow',
      inputType1: 'password',
      isShow1: 'noShow',
      show: true,
      count: '',
      timer: null,
      phone: null,
      sms: null,
      password: null,
      passwordOk: null
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
  mounted () {
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
  methods: {
    showPass (name) {
      if (name === 'showPass') {
        this.isShow = 'show'
        this.inputType = 'text'
      } else {
        this.isShow = 'noShow'
        this.inputType = 'password'
      }
    },
    showPass1 (name) {
      if (name === 'showPass') {
        this.isShow1 = 'show'
        this.inputType1 = 'text'
      } else {
        this.isShow1 = 'noShow'
        this.inputType1 = 'password'
      }
    },
    getCode () {
      const TIME_COUNT = 60
      if (!this.timer) {
        this.count = TIME_COUNT
        this.show = false
        this.timer = setInterval(() => {
          if (this.count > 0 && this.count <= TIME_COUNT) {
            this.count--
          } else {
            this.show = true
            clearInterval(this.timer)
            this.timer = null
          }
        }, 1000)
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    routeToPrivacyGuide () {
      this.$router.push('/memberSetting/privacyGuide')
    },
    routeToServiceAgreement () {
      this.$router.push('/memberSetting/serviceAgreement')
    },
    registerOk () {
      // 校验用户信息
      if (!this.phone) {
        this.$notify('手机号不能为空！')
        return
      } else {
        if (!this.isPoneAvailable(this.phone)) {
          this.$notify('手机号不符合要求！')
        }
      }
      if (!this.sms) {
        this.$notify('验证码不能为空！')
        return
      }
      if (!this.password) {
        this.$notify('密码不能为空！')
        return
      } else {
        if (!this.passwordValiable(this.password)) {
          this.$notify('密码不符合要求！')
          return
        }
      }
      if (!this.passwordOk) {
        this.$notify('确认密码不能为空！')
      } else {
        if (this.password !== this.passwordOk) {
          this.$notify('两次密码输入不一致！')
          return
        }
      }
      var data = {
        password: this.password,
        phoneCode: this.sms,
        phoneNumber: this.phone
      }
      this.$store.dispatch('Add', data).then((res) => {
        this.$notify({ type: 'success', message: '用户注册成功' })
        this.$router.go(-1)
      }).catch((error) => {
        console.log(error.response)
        this.$notify({ type: 'danger', message: error.response.data.message })
      })
    },
    getSmsCode () {
      if (!this.phone && !this.isPoneAvailable(this.phone)) {
        this.$notify({ type: 'warning', message: '请重新填写手机号！' })
        return
      }
      var data = {
        basic: this.phone
      }
      this.$store.dispatch('SmsCode', data).then((res) => {
        this.$notify({ type: 'success', message: '发送验证码成功！' })
      })
      this.getCode()
    },
    passwordValiable (s) {
      var regu = '^[0-9a-zA-Z]{6,16}$'
      var re = new RegExp(regu)
      if (re.test(s)) {
        return true
      } else {
        return false
      }
    },
    // 判断是否为手机号
    isPoneAvailable: function (pone) {
      var myreg = /^[1][3,4,5,7,8][0-9]{9}$/
      if (!myreg.test(pone)) {
        return false
      } else {
        return true
      }
    }

  }
}
</script>

<style lang="scss" scoped>
.registerTop {
  height: 44px;
  width: 100%;
  display: flex;
}
.text {
  font-size: 20px;
}
.icon {
  margin-left: 4%;
  margin-top: 4%;
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(../../assets/back.png) no-repeat 50% 100%;
  background-size: contain;
}
.registerTitle {
  height: 40px;
  text-align: center;
  font-weight: 700;
  font-size: 0.5em;
}
.registerForm {
  height: 384px;
  display: flex;
  justify-content: center;
  font-size: 0.4em;
  ul {
    width: 100%;
    padding: 0 10%;
  }
  li {
    width: 100%;
  }
  p {
    font-weight: 700;
    font-size: 16px;
    margin-bottom: 2px;
  }
  input {
    background: none;
    outline: none;
    border: none;
    border-bottom: 1px solid #cccccc;
    padding: 2%;
    width: 100%;
    font-size: 14px;
  }
}
.regiterBottom {

  padding: 2% 10%;
  width: 100%;
  height: 8%;
  position: fixed;
  display: flex;
  justify-content: center;
  // position: absolute;
  // z-index:-1;
}
.agreement {
  display: flex;
  justify-content: center;
  font-size: 14px;
  color: #999999;
  position: static;
  // z-index: -1;
  bottom: 7%;
  left: 12%;
  .agreementTitle {
    color: #000000;
  }
}

.phoneInput {
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
}
.codeText {
  color: #3486fe;
  font-size: 14px;
  font-weight: 700;
}
.passIcon {
  position: relative;
}
.passIconWrap {
  height: 18px;
  width: 18px;
  background: url(../../assets/icon1.png) no-repeat 100% 100%;
  background-size: contain;
  position: absolute;
  right: 8px;
  top: 34px;
}
.close {
  height: 20px;
  width: 20px;
  font-size: 20px;
  position: absolute;
  right: 6px;
  top: 38px;
}
</style>
