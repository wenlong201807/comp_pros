<template>
  <div id="app">
    <transition :name="animate">
      <keep-alive exclude="Login,InformationContent">
        <router-view id="view" v-if="isRouterAlive"></router-view>
      </keep-alive>
    </transition>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      animate: 'slide-right',
      isRouterAlive: true,
      isSwiper: ''
    }
  },
  beforeCreate() {
    document.addEventListener('plusready', function() {}, false)
  },
  mounted() {
    this.scroll()
  },
  watch: {
    $route(to, from) {
      /*
          0: 不做动画
          1: 左切换
          2: 右切换
          3: 上切换
          4: 下切换
           */
      // const animate = this.$router.animate || to.meta.slide
      // if (!animate) {
      //   this.animate = 'slide-left'
      // } else {
      //   this.animate = animate === 1 ? 'slide-left'
      //     : animate === 2 ? 'slide-right'
      //       : animate === 3 ? 'slide-top'
      //         : animate === 4 ? 'slide-bottom' : ''
      // }
      // this.$router.animate = 0
      // 切换动画
      const isBack = this.$router.isBack // 监听路由变化时的状态为前进还是后退

      if (isBack) {
        this.animate = 'slide-left'
      } else {
        this.animate = 'slide-right'
      }
      this.$router.isBack = false
    }
  },
  methods: {
    // 右滑事件
    onSwipeRight() {
      // const that = this
      if (!this.isSwiper) {
        const flag = navigator.userAgent.match(
          // match方法可在字符串内检索指定的值，
          /(iPhone|iPod|ios|iPad)/i
        )
        // 判断是不是ios
        if (flag) {
          history.go(-1)
        } else {
        }
      }
    },
    scroll() {
      const that = this
      var startX = ''
      var endX = ''
      var startY = ''
      var endY = ''
      var startTime = ''
      var endTime = ''
      document.body.addEventListener('touchstart', function(e) {
        startTime = new Date().getTime()
        startX = e.targetTouches[0].pageX
        startY = e.targetTouches[0].pageY
        // console.log(e.target.parentNode.parentNode.className)
        // 判断是不是点击了空白处
        if (e.target.parentNode.parentNode.className === undefined) {
          that.isSwiper = false
        }
        // 判断是不是点击了轮播图
        if (
          e.target.parentNode.parentNode.className.indexOf('swiper-slide') !==
            -1 ||
          e.target.parentNode.parentNode.className.indexOf('picker-slot') !==
            -1 ||
          e.target.parentNode.parentNode.className.indexOf('amap-marker') !==
            -1 ||
          e.target.parentNode.parentNode.className.indexOf('amap-drags') !== -1
          // e.target.tagName == 'CANVAS'
        ) {
          that.isSwiper = true
        } else {
          that.isSwiper = false
        }
      })
      document.body.addEventListener('touchmove', function(e) {
        endX = e.targetTouches[0].pageX
        endY = e.targetTouches[0].pageY
      })
      document.body.addEventListener('touchend', function(e) {
        endTime = new Date().getTime()
        if (endX === '' && endY === '') {
          return
        }
        if (
          endX - startX > 100 &&
          endX - startX > Math.abs(endY - startY) &&
          endTime - startTime > 120
        ) {
          that.onSwipeRight()
        }
      })
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function() {
        this.isRouterAlive = true
      })
    }
  },
  computed: {
    ...mapGetters(['isLogin', 'pageLoading'])
  }
}
</script>
<style lang="scss" scoped>
@import 'font/font.css';
#app {
  width: 100%;
  height: 100%;
  .login-active {
    opacity: 1;
    top: 0;
  }
}
#view {
  width: 100%;
  height: 100%;
  transition: all 0.24s ease;
  will-change: transform;
  top: 0;
  backface-visibility: hidden;
}
.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-top-enter,
.slide-bottom-leave-active {
  opacity: 0;
  transform: translate(0, 100%);
}

.slide-top-leave-active,
.slide-bottom-enter {
  opacity: 0;
  transform: translate(0, -100%);
}
</style>
