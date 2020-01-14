/* eslint-disable semi */
<template>
  <div>
    <van-row class="evaluateTop">
      <van-col span="2"> <span class="icon" @click="goBack"></span></van-col>
      <span>评价</span>
    </van-row>
    <van-row>
      <h3 class="stationEvaluate"><i class="icon"></i>华一路充电站</h3>
    </van-row>
    <van-row class="evaluateWrap">
      <ul>
        <li class="list">
          <span class="listName">评价</span>
          <van-rate gutter="16px" v-model="value1" class="rate" />
          <span class="listValue">{{ value1 }}.0</span>
        </li>
        <li class="list">
          <span class="listName">环境</span>
          <van-rate gutter="16px" v-model="value2" class="rate" />
          <span class="listValue">{{ value2 }}.0</span>
        </li>
        <li class="list">
          <span class="listName">服务</span>
          <van-rate gutter="16px" v-model="value3" class="rate" />
          <span class="listValue">{{ value3 }}.0</span>
        </li>
        <li class="list">
          <span class="listName">价格</span>
          <van-rate gutter="16px" v-model="value4" class="rate" />
          <span class="listValue">{{ value4 }}.0</span>
        </li>
      </ul>
    </van-row>
    <div class="borderCss"></div>
    <!-- <van-panel class="textPanel" title="填写图文评价" desc="说说哪里好嘛，其他车主也想知道">
      <div>内容</div>
    </van-panel> -->
    <van-row class="textPanel">
      <div class="textPanelTop">
        <span class="textPanelTitle">填写图文评价</span>
      </div>
      <textarea
        class="textPanelArea"
        placeholder="说说哪里好嘛，其他车主也想知道"
        name="填写图文评价"
        id=""
        cols="30"
        rows="10"
        v-model="evaluateText"
      >
      </textarea>
      <span class="textNum">500</span>
      <van-uploader
        v-if="isShow"
        :max-count="5"
        :after-read="afterRead"
        class="updateicon"
      />
    </van-row>
    <div class="borderCss"></div>
    <van-row class="commitBtn" v-show="hidshow">
      <van-button
        type="info"
        style="width:100%;border-radius:6px;"
        @click="commitEvaluate"
      >提交</van-button
      >
    </van-row>
  </div>
</template>

<script>
// eslint-disable-next-line semi
import { getStore } from 'src/utils/store';
export default {
  data () {
    return {
      docmHeight: '0', // 默认屏幕高度
      showHeight: '0', // 实时屏幕高度
      hidshow: true, // 显示或者隐藏footer,
      isResize: false, // 默认屏幕高度是否已获取
      isShow: true,
      value1: 0,
      value2: 0,
      value3: 0,
      value4: 0,
      evaluateText: '',
      fileList: [],
      userMsg: null
    }
  },
  created () {
    this.userMsg = getStore('userInfoAll')
    this.fileList = []
  },
  watch: {
    fileList (value) {
      if (this.fileList.length > 4) {
        this.$notify('最多只能上传5张照片')
        this.isShow = false
      } else {
        this.isShow = true
      }
    },
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
    goBack () {
      this.$router.go(-1)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)

      var pic = file.content.replace(/^data:image\/\w+;base64,/, '')
      this.fileList.push(pic)
      console.log(this.fileList)
      // return file => {
      //   const query = {
      //     file: file.content
      //   }
      //   console.log(query)
      // }
    },

    commitEvaluate () {
      var data = {
        phonenum: this.userMsg ? this.userMsg.phoneNo : '',
        stationid: '',
        evaluationcontent: this.evaluateText,
        environmentgrade: this.value2,
        pricegrade: this.value4,
        servicegrade: this.value3,
        evaluationgrade: this.value1,
        evaluationpic1: this.fileList[0],
        evaluationpic2: this.fileList[1],
        evaluationpic3: this.fileList[2],
        evaluationpic4: this.fileList[3],
        evaluationpic5: this.fileList[4]
      }
      console.log(data)
      this.$store
        .dispatch('Save', data)
        .then(res => {
          this.$notify({ type: 'success', message: '提交成功' })
          this.fileList = []
          this.$router.go(-1)
        })
        .catch(error => {
          console.log(error.response)
          this.$notify({
            type: 'danger',
            message: error.response.data.message
          })
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  margin-left: 4%;
  margin-top: 4%;
  width: 18px;
  height: 18px;
  display: inline-block;
  background: url(../../assets/back.png) no-repeat 50% 100%;
  background-size: contain;
}
.evaluateTop {
  height: 44px;
  text-align: center;
  font-size: 18px;
  font-weight: 700;

  // line-height: 6%;
  padding: 2% 0;
}
.stationEvaluate {
  font-size: 22px;
  font-weight: 800;

  text-align: center;

  .icon {
    width: 22px;
    height: 22px;
    margin-right: 4px;
    background: url(../../assets/icon2.png) no-repeat 100% 100%;
    background-size: contain;
  }
}
.evaluateWrap {
  width: 100%;
  height: 200px;
  // padding: 0 20%;
  display: flex;
  justify-content: center;
  .list {
    height: 48px;

    font-size: 18px;
    padding: 10px 0;
    .listName {
      display: inline-block;
      margin-right: 16px;
      line-height: 20px;
    }
    .listValue {
      display: inline-block;
      margin-left: 16px;
      line-height: 40px;
    }
  }
}
.borderCss {
  height: 10px;
  width: 86%;
  background: #f2f2f2;
  height: 1%;
  border-radius: 5px;
  margin: 10px auto;
}
.textPanel {
  width: 100%;
  height: 180px;
  padding: 2% 10%;
  position: relative;
   display: flex;
  justify-content: center;
}
.commitBtn {
  // display: flex;
  padding: 0 10%;
  margin-top: 20px;
}
.textPanelTitle {
  font-size: 18px;
  font-weight: 700;
}
.textPanelTop {
  margin-bottom: 4px;
  height:26px;
  width:100%;
}
.textPanelArea {
  height: 80%;
  width: 300px;
  border: none;
      position: absolute;
    top: 34px;
    left: 43px;
}
.textNum {
  position: absolute;
  right: 8%;
  bottom: 4%;
  font-size: 16px;
  font-weight: 700;
  color: #cccccc;
}
.updateicon {
  position: absolute;
  left: 7%;
  bottom: -9%;
}
</style>
