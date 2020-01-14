<template>
  <div class="con-liu ">
    <!-- <van-nav-bar
      title="意见反馈"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    /> -->
    <van-row class="top_main">
      <van-col :span="4" class="top_left_box">
        <img @click="goBack" class="top_back_img" src="./../../assets/operator/return.png" alt="">
      </van-col>
      <van-col :span="16">
        <span class="top_txt">意见反馈</span>
      </van-col>
      <van-col :span="4" class="top_left_box">
      </van-col>
    </van-row>
    <div class="main-content">
      <van-row>
        <van-col span="24" class="common-title">请选择反馈类型</van-col>
      </van-row>
      <van-radio-group v-model="radio"  class="border-bot">
        <van-row>
          <van-col span="8"><van-radio name="地图相关">地图相关</van-radio></van-col>
          <van-col span="8"><van-radio name="页面显示">页面显示</van-radio></van-col>
          <van-col span="8"><van-radio name="功能操作">功能操作</van-radio></van-col>
        </van-row>
        <van-row>
          <van-col span="8"><van-radio name="数据错误">数据错误</van-radio></van-col>
          <van-col span="8"><van-radio name="版本BUG">版本BUG</van-radio></van-col>
          <van-col span="8"><van-radio name="其他">其他</van-radio></van-col>
        </van-row>
      </van-radio-group>
      <van-row>
        <van-col span="24" class="common-title">填写反馈信息</van-col>
      </van-row>
      <van-cell-group  class="border-bot">
          <van-field
            v-model="message"
            rows="4"
            autosize
            type="textarea"
            maxlength="500"
            placeholder="您的反馈就是我们前进的动力"
            show-word-limit
          />
          <van-uploader
            v-model="fileList"
            :preview-size="40"
            multiple
            :max-count="5"
            :max-size="20480000"
          />
        </van-cell-group>
      <van-row>
        <van-col span="24" class="common-title">联系方式</van-col>
      </van-row>
      <van-cell-group class="phone">
        <van-field
          v-model="phone"
          placeholder="请输入您的手机号码"
          required
          :error-message="errorMessage"
        />
      </van-cell-group>
      <van-button type="info" @click="feedbackSubmit">提交</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Feedback',
  data () {
    return {
      radio: '',
      message: '',
      phone: '',
      fileList: [],
      errorMessage: ''
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    },
    feedbackSubmit () {
      if (this.phone === '') {
        this.errorMessage = '请输入手机号码...'
      } else if (!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(this.phone))) {
        this.errorMessage = '手机号码有误，请重填...'
      } else {
        var param = {
          phonenum: this.phone,
          des: this.message,
          feedbacktype: this.radio
        }
        console.log(this.fileList)
        for (var k = 0; k < this.fileList.length; k++) {
          if (this.fileList[k].content) {
            var num = k + 1
            param['pic' + num] = this.fileList[k].content
          }
        }
        console.log(param)
        this.$store.dispatch('AppFeedbackAdd', param).then(res => {
          this.$notify({ type: 'success', message: '反馈成功' })
          this.$router.go(-1)
        })
      }
    }
  }
}
</script>

<style scoped>
.top_main {
  height: 54px;
  width: 100%;
}
.top_left_box {
  height: 54px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.top_back_img {
  width: 20px;
}
.top_txt {
  width: 100%;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
}
.common-title {
  font-size: 14px;
  color: #333333;
  font-weight: bold;
  line-height:50px ;
}
.van-radio {
  margin-bottom: 20px;
}
.van-radio__label {
  color: #999;
}
.border-bot {
  border-bottom: 8px solid #eeeeee;
}
[class*=van-hairline]::after{
  border:none;
}
.phone .van-field {
  border-bottom: 1px solid #dddddd;
}
.van-button--normal {
  width: 100%;
  margin-top: 40px;
}
/deep/.van-radio__label {
  color: #999999;
}
</style>
