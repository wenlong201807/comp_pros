<template>
  <iframe src="http://47.92.121.22:50144/SafetyMonitor/a/gateway/onlineMonitor?flag=gove" frameborder="0" style="width:calc(100% + 50px);margin:-24px;" :style="iframeHeight"></iframe>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
export default {
  data () {
    return {
      iframeHeight: null
    }
  },
  mixins: [mixin, mixinDevice],
  created () {},
  mounted () {
    var that = this
    const defaultHeight = this.isMultiTab() ? 160 : 120
    this.iframeHeight = 'height:' + (document.documentElement.clientHeight - defaultHeight) + 'px'
    /* 刷新方法 */
    window.onresize = function () {
      that.iframeHeight = 'height:' + (document.documentElement.clientHeight - defaultHeight) + 'px'
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>