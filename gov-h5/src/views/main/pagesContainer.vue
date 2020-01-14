<template>
  <div class="pages-container-filter">
    <keep-alive>
      <router-view class="avue-view" v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view class="avue-view" v-if="!$route.meta.keepAlive"/>
  </div>
</template>

<script>
export default {
  name: 'PagesContainer',
  mounted: function () {
  },
  data () {
    return {
    }
  },
  methods: {
  },
  deactivated () {
    // this.$destroy(true)
  }
}
</script>

<style>
.pages-container-filter{
    width: 100%;
    height: 100%;
}
</style>
