<template>
  <div class="logo">
    <router-link :to="{path: homePage}">
      <!-- <LogoSvg alt="logo" /> -->
      <img src="@/assets/cqlogo.png" alt="logo">
      <span v-if="showTitle"
            style="display: inline-block;width: 200px;height: 65px;font-weight: 600;vertical-align: middle;line-height: 1.5;padding-top:12px;">
        <h1 style="margin-bottom: 0;font-size: 14px;">{{ title.split(',')[0] }}</h1>
        <h1 style="margin-bottom: 0;font-size: 14px;">{{ title.split(',')[1] }}</h1>
      </span>
    </router-link>
  </div>
</template>

<script>
// import LogoSvg from '@/assets/logo.svg?inline'
import config from '@/config/system.config'

export default {
  name: 'Logo',
  data () {
    return {
      theme: ''
    }
  },
  // components: {
  //   LogoSvg
  // },
  data () {
    return {
      homePage: config.homePage
    }
  },
  props: {
    title: {
      type: String,
      default: '重庆市新能源汽车监测平台,重庆市充电基础设施监测平台',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    },
    titleColor: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  computed: {
    themeData () {
      return this.$store.state.app.theme
    }
  },
  watch: {
    themeData (val) {
      this.theme = val
    }
  },
  created () {
    this.theme = this.$store.state.app.theme
  }
}
</script>
<style lang="less" scoped>
.fontColor {
  color: #fff;
}
</style>
