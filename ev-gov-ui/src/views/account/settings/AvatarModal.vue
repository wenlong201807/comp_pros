<template>
  <a-modal
    title="修改头像"
    :visible="visible"
    :maskClosable="false"
    :confirmLoading="confirmLoading"
    :width="800"
    @cancel="cancelHandel">
    <a-row>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <vue-cropper
          ref="cropper"
          :img="avatar()"
          :info="true"
          :autoCrop="options.autoCrop"
          :autoCropWidth="options.autoCropWidth"
          :autoCropHeight="options.autoCropHeight"
          :fixedBox="options.fixedBox"
          @realTime="realTime"
        >
        </vue-cropper>
      </a-col>
      <a-col :xs="24" :md="12" :style="{height: '350px'}">
        <div class="avatar-upload-preview">
          <img :src="previews.url" :style="previews.img"/>
        </div>
        <div class="avatar-upload-select">
          <a-upload
            name="file"
            accept=".jpg,.png"
            :multiple="true"
            :showUploadList="false"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
            @change="handleChange">
            <a-button icon="cloud-upload">
              上传头像
            </a-button>
          </a-upload>
        </div>
        <div class="avatar-upload-preset">
          <a-avatar :size="50" src="../avatar/preset_avatar1.png"/>
          <a-avatar :size="50" src="../avatar/preset_avatar2.png"/>
          <a-avatar :size="50" src="../avatar/preset_avatar3.png"/>
          <a-avatar :size="50" src="../avatar/preset_avatar4.png"/>
          <a-avatar :size="50" src="../avatar/preset_avatar5.png"/>
        </div>
      </a-col>
    </a-row>

    <template slot="footer">
      <a-button key="back" @click="cancelHandel">取消</a-button>
      <a-button key="submit" type="primary" :loading="confirmLoading" @click="okHandel">保存</a-button>
    </template>
  </a-modal>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      visible: false,
      id: null,
      confirmLoading: false,
      options: {
        img: '',
        autoCrop: true,
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true
      },
      previews: {}
    }
  },
  methods: {
    ...mapGetters(['nickname', 'avatar']),
    edit (img) {
      this.visible = true
      this.options.img = img
      /* 获取原始头像 */
    },
    handleChange (e, num) {
      var file = e.fileList[0]
      this.fileUpload = file
    },
    close () {
      this.id = null
      this.visible = false
    },
    cancelHandel () {
      this.close()
    },
    okHandel () {
      const vm = this

      vm.confirmLoading = true
      setTimeout(() => {
        vm.confirmLoading = false
        vm.close()
        vm.$message.success('上传头像成功')
      }, 2000)
    },
    realTime (data) {
      this.previews = {
        ...data
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .avatar-upload-select {
    position: absolute;
    top: 65%;
    transform: translate(115%, -40%);
  }
  .avatar-upload-preset{
    position: absolute;
    top: 80%;
    span{
      margin-left: 20px;
      cursor: pointer;
    }
  }
  .avatar-upload-preview {
    position: absolute;
    top: 30%;
    transform: translate(50%, -50%);
    width: 180px;
    height: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;
    overflow: hidden;

    img {
      width: 50%;
      height: 50%;
    }
  }
</style>
