<template>
  <div id="ui-loading-panel" v-show="loadingStatus">
    <div class="loading-mask"></div>
    <div id="loading-ui" >
      <div class="loading-bg"></div>
      <span class="loading-text">{{ content }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoadingStatus',
  props: {
    content: {
      type: String,
      default: '数据载入中...'
    },
    loadingStatus: {
      type: Boolean,
      require: true,
      default: false
    }
  },
  data () {
    return {
      show: this.loadingStatus
    }
  },
  watch: {
    immediate: true,
    loadingStatus (curVal, oldVal) {
      // console.log("curVal=>",curVal,"oldVal=>",oldVal);
      if (!oldVal) {
        var timer = setTimeout(() => {
          this.$message({
            showClose: true,
            message: '网络连接超时!',
            type: 'error',
            center: true
          })
        }, 20 * 1000)
        if (curVal) {
          clearTimeout(timer)
        }
      }
    }
  }
}
</script>

<style scoped>
#ui-loading-panel{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
}
#loading-ui{
    width: 144px;
    height: 36px;
    display: flex;
    flex-direction: row;
    line-height: 36px;
    text-align: center;
    /* position: absolute; */
    margin: 20px auto;
    background: #808080;
    border-radius: 23px;
    font-size: 12px;
    color: #fff;
    cursor: pointer;
    /* top:40%;
    left:35%; */
    justify-content: center;
    align-items: center;
    z-index: 10001;
}
.loading-bg{
    width: 32px;
    height: 32px;
    background-image: url('../../assets/svg/loading.svg');
    animation: circle 1.5s infinite;
}
.loading-text{
    color: #fff;
    font-size: 14px;
}
.loading-mask{
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0;
}
@keyframes circle{
    from{
        transform: rotate(0);
    }
    to{
        transform: rotate(360deg);
    }
}
</style>
