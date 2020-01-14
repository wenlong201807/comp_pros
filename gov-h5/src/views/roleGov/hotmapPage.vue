<template>
  <div class="hotmapPage">
    <img @click="goBack" class="top_back_img" src="../../assets/operator/return.png">
    <img src="../../assets/hotmap/hotMap.gif" class="hotmap">
  </div>
</template>

<script>
export default {
  name: 'HotmapPage',
  methods: {
    goBack () {
      this.$router.back()
    }
  }
}
</script>

<style scoped>
.hotmap {
  width: 100%;
  height: 100%;
}
.hotmapPage {
  position: relative;
  width: 100%;
  height: 100%;
}
.top_back_img {
  position: absolute;
  width: 20px;
  left: 20px;
  top: 20px;
}
</style>
