<template>
  <div class="error404">
   <div style="height: 200px;width: 200px;background: red"></div>
  </div>
</template>

<script>
export default {
  name: 'Error404',
  methods: {
    backPage () {
      this.$router.go(-1)
    },
    goHome () {
      this.$router.push({
        path: '/'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
@keyframes error404animation {
  0% {
    transform: rotateZ(0deg);
  }
   20% {
    transform: rotateZ(-20deg);
  }
  /*40% {
    transform: rotateZ(-10deg);
  } */
  /*60% {
    transform: rotateZ(20deg);
    transform: rotateZ(60deg);
  }*/
   80% {
    transform: rotateZ(20deg);
  }
  100% {
    transform: rotateZ(0deg);
  }
}
.error404 {
  &-body-con {
    width: 700px;
    height: 500px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    &-title {
      text-align: center;
      font-size: 60px;
      font-weight: 700;
      color: #2d8cf0;
      height: 260px;
      line-height: 260px;
      margin-top: 40px;
      span {
        display: inline-block;
        color: #2d8cf0;
        font-size: 240px;
        animation: error404animation 3s ease 0s infinite alternate;
      }
    }
    &-message {
      display: block;
      text-align: center;
      font-size: 30px;
      font-weight: 500;
      letter-spacing: 12px;
      color: #dddde2;
    }
  }
  &-btn-con {
    text-align: center;
    padding: 20px 0;
    margin-bottom: 40px;
  }
}
</style>
