<template>
  <div class="main">

    <a-row style=" width: 1100px;
      height: 600px;
      background: #fff;
      border-radius: 12px;
      position: absolute;
       left: 50%;
       margin-left: -550px;
       top:50%;
       margin-top:-300px;
        box-shadow: 0 0 22px #9a9898;">
      <a-col :span="10" class="contentCss">
        <a-form id="formLogin" class="user-layout-login" ref="formLogin" :form="form" @submit="handleSubmit">
          <a-row>
            <h3 class="titleCss">欢迎登录</h3>
          </a-row>
          <a-row>
            <h3 class="nameCss">重庆市电动汽车政府监管服务平台</h3>
            <!-- <h6 class="nameTestCss">THE ELECTRIC VEHICLE GOVERNMENT SUPERVISION SERVICE PLATFORM OF CHONGQING</h6> -->
          </a-row>
          <a-row style="padding:0 12px;margin-top:16px;">

            <a-alert v-if="isLoginError" type="error" showIcon style="margin-bottom: 24px;"
                     message="账户或密码错误" />
            <a-form-item>
              <a-row><label>输入账号：</label></a-row>
              <a-input size="large" type="text" placeholder="请输入账号" v-decorator="[
                'username',
                {rules: [{ required: true, message: '请输入帐户名或邮箱地址' }, { validator: handleUsernameOrEmail }], validateTrigger: 'change'}
              ]">
                <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>

            <a-form-item>
              <a-row><label>输入密码：</label></a-row>
              <a-input size="large" type="password" autocomplete="false" placeholder="请输入密码"
                       v-decorator="[
                         'password',
                         {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
                       ]">
                <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
              </a-input>
            </a-form-item>
            <!-- <a-form-item>
              <a-row><label>输入验证码：</label></a-row>
              <a-row>
                <a-col :span="12">
                  <a-input size="large" type="text" autocomplete="false" placeholder="请输入验证码" v-decorator="[
                    'captcha',
                    {rules: [{ required: true, message: '请输入验证码' }], validateTrigger: 'blur'}
                  ]">
                    <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }" />
                  </a-input>
                </a-col>
                <a-col :span="12">
                  <img @click="initImg" style="width:180px;height:40px;margin-left:10px;" id="img" :src="srcUrl1">
                </a-col>
              </a-row>
            </a-form-item> -->
          </a-row>

          <!-- <a-form-item>
            <a-checkbox v-decorator="['rememberMe']">自动登录</a-checkbox>
            <router-link :to="{ name: 'recover', params: { user: 'aaa'} }" class="forge-password" style="float: right;">
              忘记密码</router-link>
          </a-form-item> -->
          <a-form-item style="margin-top:24px">
            <a-button size="large" type="primary" htmlType="submit" class="login-button" :loading="state.loginBtn"
                      :disabled="state.loginBtn">登录</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="14" class="bannerCss"></a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { timeFix } from '@/utils/util'
import config from '@/config/system.config'
export default {
  data () {
    return {
      srcUrl1: null,
      customActiveKey: 'tab1',
      loginBtn: false,
      // login type: 0 email, 1 username, 2 telephone
      loginType: 0,
      isLoginError: false,
      form: this.$form.createForm(this),
      state: {
        time: 60,
        loginBtn: false,
        // login type: 0 email, 1 username, 2 telephone
        loginType: 0,
        smsSendBtn: false
      }
    }
  },
  created () {
    // this.initImg()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    initImg () {
      this.$store.dispatch('Image').then(res => {
        this.srcUrl1 = 'data:image/png;base64,' + btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      })
    },
    // handler
    handleUsernameOrEmail (rule, value, callback) {
      const { state } = this
      const regex = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (regex.test(value)) {
        state.loginType = 0
      } else {
        state.loginType = 1
      }
      callback()
    },
    handleTabClick (key) {
      this.customActiveKey = key
      // this.form.resetFields()
    },
    handleSubmit (e) {
      e.preventDefault()
      const {
        form: { validateFields },
        state,
        customActiveKey,
        Login
      } = this

      state.loginBtn = true

      const validateFieldsKey =
        customActiveKey === 'tab1'
          ? ['username', 'password']
          : ['mobile', 'captcha']

      validateFields(validateFieldsKey, { force: true }, (err, values) => {
        if (!err) {
          console.log('login form', values)
          const loginParams = { ...values }
          delete loginParams.username
          loginParams[!state.loginType ? 'email' : 'username'] = values.username
          loginParams.password = values.password
          loginParams['grant_type'] = 'password'
          Login(loginParams)
            .then(res => this.loginSuccess(res))
            .catch(err => this.requestFailed(err))
            .finally(() => {
              state.loginBtn = false
            })
        } else {
          setTimeout(() => {
            state.loginBtn = false
          }, 600)
        }
      })
    },
    loginSuccess (res) {
      this.$router.push(
        { path: config.homePage },
        () => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
        },
        () => {
          this.$notification.success({
            message: '欢迎',
            description: `${timeFix()}，欢迎回来`
          })
          console.log(2)
        }
      )
      this.isLoginError = false
    },
    requestFailed (err) {
      this.isLoginError = true
      this.$notification['error']({
        message: '错误',
        description:
          ((err.response || {}).data || {}).error_description ||
          '请求出现错误，请稍后再试',
        duration: 4
      })
    }
  }
}
</script>

<style lang="less" scoped>
.user-layout-login {
  label {
    font-size: 14px;
  }

  .getCaptcha {
    display: block;
    width: 100%;
    height: 40px;
  }

  .forge-password {
    font-size: 14px;
  }

  button.login-button {
    padding: 0 15px;
    font-size: 16px;
    height: 40px;
    width: 100%;
  }

  .user-login-other {
    text-align: left;
    margin-top: 24px;
    line-height: 22px;

    .item-icon {
      font-size: 24px;
      color: rgba(0, 0, 0, 0.2);
      margin-left: 16px;
      vertical-align: middle;
      cursor: pointer;
      transition: color 0.3s;

      &:hover {
        color: #1890ff;
      }
    }

    .register {
      float: right;
    }
  }
}
.bgCss {
  width: 1200px;
  height: 860px;
  background: #fff;
  border-radius: 6px;
}
.bannerCss {
  height: 100%;
  background: url(~@/assets/banner2.png) no-repeat 100% 100%;
  background-size: contain;
}
.contentCss {
  padding: 24px 12px 0 18px;
  height: 100%;
}
.titleCss {
  font-size: 28px !important;
  color: blue !important;
  font-weight: 800 !important;
}
.nameCss {
  font-size: 28px;
  font-weight: 900;
}
.nameTestCss {
  font-size: 14px;
  margin-top: -18px;
}
.contentCss .ant-row {
  margin-bottom: 2px;
}
</style>
