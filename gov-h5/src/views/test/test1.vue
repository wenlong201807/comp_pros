<template>
  <div>
    test1
    <div @click="test2">test2</div>
  </div>
</template>

<script>
export default {
  name: 'Test1',
  methods: {
    test2 () {
      this.$router.push('/test2')
    }
  }
}
</script>

<style scoped>

</style>
