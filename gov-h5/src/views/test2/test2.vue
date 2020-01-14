<template>
  <div>
    <van-button type="default">默认按钮</van-button>
    <van-button type="primary">主要按钮</van-button>

    <div class="tst">天才</div>
    <div class="t">天才</div>

  </div>
</template>

<script>
import { getStore } from 'src/utils/store'
export default {
  name: 'Test2',
  activated () {
    var t = getStore('userInfoAll')
    var t2 = getStore('Access-Token')
    var t3 = getStore('userSpecific')
    console.log(t)
    console.log(t2)
    console.log(t3)
  },
  mounted () {
    var t = getStore('userInfoAll')
    var t2 = getStore('Access-Token')
    var t3 = getStore('userSpecific')
    console.log(t)
    console.log(t2)
    console.log(t3)
  }
}

</script>

<style scoped>
  .tst{
    font-family: 'Ping';
  }
  .t{
    font-weight: bold;
  }

</style>
