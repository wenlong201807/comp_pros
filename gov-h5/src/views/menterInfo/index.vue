<template>
  <div class="con-liu">
    <div class="topBack">
<!--      <div class="navTitle">关于我们</div>-->
      <div class="backButton" @click="goBack"></div>
    </div>
    <h4 class="title-zi" >个人资料</h4>
    <div class="main-content">
      <van-cell-group>
        <van-cell title="头像" is-link size="large" class="head" @click="showPopupPor">
          <van-image
            round
            fit="cover"
            width="1rem"
            height="1rem"
            :src="userInfo.headPortrait"
          />

        </van-cell>
        <van-cell title="昵称" :value="userInfoDetail.displayName" is-link size="large" to="editName"/>
        <van-cell title="性别" :value="userInfo.gender==1?'男':'女'" is-link size="large" @click="changeSex" />
        <van-cell title="生日":value="userInfo.birthday" is-link size="large" @click="showPopupBirth"/>
        <van-cell title="个性签名" :value="userInfo.signature" is-link size="large" to="editSign"/>

      </van-cell-group>
      <!--    //更换头像-->
      <van-popup v-model="showPortraitOpe" position="bottom" class="portraitPop">
        <!--      <van-button icon="photo" type="primary">上传图片</van-button>-->
        <van-uploader accept="image/*"
                      capture="camera" @after-read="afterRead" :max-count="1">
          <button class="van-action-sheet__item">拍摄</button>
        </van-uploader>
        <van-uploader accept="image/*"
                      capture="camera">
          <button class="van-action-sheet__item">相册</button>
        </van-uploader>
        <button class="van-action-sheet__cancel">取消</button>
      </van-popup>
      <input type="file" id="upload_file" class="file" style="display:none" accept="image/*" @change="change($event)">
      <!--    //选择性别-->
      <van-action-sheet
        v-model="showSex"
        :actions="sexArr"
        cancel-text="取消"
        :close-on-click-action="true"
        :close-on-click-overlay="false"
        @cancel="onCancelSex"
        @select="onSelectSex"
      />
      <!--    选择出生日期-->
      <van-popup v-model="showBrthChoose" position="bottom" :style="{ height: '265px' }">
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          :min-date="minDate"
          :formatter="formatter"
          @confirm="confirmBirth"
          @cancel="concelBirth"
        />
      </van-popup>
    </div>
<!--    <van-loading v-show="loadingShow" class="loading-liu"/>-->
    <loadingStatus content="加载中..." :loadingStatus="loadingShow"></loadingStatus>
    <pic ref="mychild" style="display:none"></pic>
  </div>
</template>

<script>
import pic from '../../components/pic'
import { getStore, setStore } from 'src/utils/store'
export default {
  name: 'Index',
  components: { pic },
  data () {
    return {
      userID: '',
      showSex: false,
      sexArr: [
        { name: '男' },
        { name: '女' }
      ],
      currentDate: new Date(),
      maxDate: new Date(),
      minDate: new Date(1960, 10, 1),
      showBrthChoose: false,
      showPortraitOpe: false,
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
        { url: 'https://cloud-image', isImage: true }
      ],
      userInfo: {},
      loadingShow: false,
      userInfoDetail: {}
    }
  },
  created () {
    this.init()
  },
  mounted () {
    // this.userInfoGet()
  },
  methods: {
    init () {
      this.userInfoDetail = getStore('userInfoAll') // 获取昵称信息
      // this.token = getStore('Access-Token')
      this.userInfo = getStore('userSpecific') // 获取个人信息
      console.log(this.userInfo)
      if (this.userInfo.birthday !== '' && this.userInfo.birthday !== null && this.userInfo.birthday !== undefined) {
        this.currentDate = new Date(Date.parse(this.userInfo.birthday.replace(/-/g, '/'))) // 初始化生日日期插件初始值
      }
      this.userID = this.userInfo.id
    },
    goBack () {
      this.$router.back()
    },
    changeSex () {
      this.showSex = true
    },
    onCancelSex () {
      this.showSex = false
      // Toast('cancel')
    },
    onSelectSex (item) { // 改变性别
      // 默认情况下，点击选项时不会自动关闭菜单
      // 可以通过 close-on-click-action 属性开启自动关闭
      this.loadingShow = true
      if (item.name === '男') {
        var gender = 1
      } else {
        gender = 0
      }
      this.showSex = false
      var params = {
        id: this.userID,
        gender: gender
      }
      this.userInfoModify(params)
    },
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    formateDay (fmt, date) {
      let ret
      var opt = {
        'Y+': date.getFullYear().toString(), // 年
        'm+': (date.getMonth() + 1).toString(), // 月
        'd+': date.getDate().toString(), // 日
        'H+': date.getHours().toString(), // 时
        'M+': date.getMinutes().toString(), // 分
        'S+': date.getSeconds().toString() // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
      }
      for (var k in opt) {
        ret = new RegExp('(' + k + ')').exec(fmt)
        if (ret) {
          fmt = fmt.replace(ret[1], (ret[1].length === 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, '0')))
        };
      };
      return fmt
    },
    showPopupBirth () {
      this.showBrthChoose = true
    },
    confirmBirth (value) { // 改变出生日期
      // this.$toast.loading({
      //   // message: '加载中...',
      //   forbidClick: true
      // })
      this.loadingShow = true
      var formatDay = this.formateDay('YYYY-mm-dd', value)
      var birthday = formatDay
      var params = {
        id: this.userID,
        birthday: birthday
      }
      this.userInfoModify(params)
      this.showBrthChoose = false
      //
    },
    concelBirth () {
      this.showBrthChoose = false
      //
    },
    showPopupPor () {
      // this.showPortraitOpe = true
      document.getElementById('upload_file').click()
    },
    // 选择图片截取
    change (e) {
      this.$refs.mychild.change(e)
    },
    // 修改头像图片
    img (data) {
      this.loadingShow = true
      // this.userMsg.pic = data
      // console.log(data + '修改后的头像')
      var headPortrait = data
      var params = {
        id: this.userID,
        headPortrait: headPortrait
      }
      this.userInfoModify(params)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    userInfoGet () { // 获取个人信息
      this.$store.dispatch('userInfoGet', this.userID).then((res) => {
        console.log(res)
        // this.userInfo = res
        // this.currentDate = new Date(Date.parse(res.birthday.replace(/-/g, '/')))
      })
    },
    userInfoModify (param) {
      this.$store.dispatch('userInfoModify', param).then((res) => {
        if (res) {
          setStore('userSpecific', res)
          this.init()
        }
        this.loadingShow = false
      })
    },
    displayNameGet () { // 获取账号详细信息
      this.$store.dispatch('displayNameGet', this.userID).then((res) => {
        // console.log(res)
        this.userInfoDetail = res
      })
    }
  }
}
</script>

<style scoped>
  .title-zi{
    font-size: 20px;
    text-align: center;margin-top: 0
  }
  .van-uploader{
    display: block;
  }
  .van-nav-bar__text{
    color:#323233;
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
  [class*=van-hairline]::after{
    border: none;
  }
  .van-cell:not(:last-child)::after{
    border: none;
  }
</style>
