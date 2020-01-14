<template>
  <div>
    <div class="information-item-contains-activity" @click="openNews" v-if="special!==0">
      <div class="information-wrap" >
        <div class="information-details">
          <div class="information-details-title">{{ data.title }}</div>
          <div class="information-details-foot">
            <div class="information-details-date">电车资源</div>
          </div>
          <div class="information-details-foot">
            <!--            <div class="information-details-date">{{ formatDate(new Date(data.CRT_DATE),'yyyy/MM/dd') }}</div>-->
            <div class="information-details-date">{{ data.crtDate }}</div>
          </div>
        </div>
        <template v-if="data.picUrl">
          <!--          <img :src="'http://117.73.253.100:50501/GovPlatform'+data.PIC_URL" :onerror="errorImg01" class="information-picture">-->
          <img :src="data.picUrl" :onerror="errorImg01" class="information-picture">
        </template>
        <template v-else>
          <img :src="errorImg01" :onerror="errorImg01" class="information-picture">
        </template>
      </div>

    </div>
    <div class="information-item-contains-activityBig" @click="openNews" v-else>
      <div class="information-wrap-activity" >
        <div class="information-detailsBig">
          <div class="information-details-title">{{ data.title }}</div>
        </div>
        <template v-if="data.picUrl">
          <div class="information-pictureBigAll">
            <div class="pictureMargin">
              <img :src="data.picUrl" :onerror="errorImg01" class="information-pictureBig">
            </div>
            <div class="pictureMargin">
              <img :src="data.picUrl" :onerror="errorImg01" class="information-pictureBig">
            </div>
            <div class="pictureMargin">
              <img :src="data.picUrl" :onerror="errorImg01" class="information-pictureBig">
            </div>
          </div>
        </template>
        <div class="information-details-foot">
          <div class="information-details-date">{{ data.crtDate }}</div>
          <div class="information-details-readNum">电车资源</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'InformationItem',
  // eslint-disable-next-line vue/require-prop-types
  props: ['data', 'type', 'special'],
  data () {
    return {
      type1: 0,
      errorImg01: 'this.src="' + require('src/assets/basicInfo/defaultCar.png') + '"'
    }
  },
  computed: {
  },
  mounted () {
  },
  methods: {
    openNews () {
      this.$router.push({ path: '/infoDetail', query: { id: this.data.id, type: this.type } })
    },
    formatDate (date, fmt) {
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1,
          (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1)
            ? str : this.padLeftZero(str))
        }
      }
      return fmt
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    }
  }
}
</script>

<style scoped>
.information-item-contains{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: #ededed 1px solid;
}
.information-wrap{
    width: 90%;
    height: 95%;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: #ededed 1px solid;
}
.information-details{
    width: 65%;
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
}
.information-detailsBig{
  width: 100%;
  height: 30%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.information-details-title{
    width: 100%;
    height: 68%;
    font-weight: 500;
    color: #333333;
    text-align: left;
    /*padding-left: 10px;*/
    box-sizing: border-box;
    font-size: 15px;
    letter-spacing: 0;

}
.information-details-foot{
    width: 100%;
    height: 16%;
    display: flex;
    flex-direction: row;
    /*padding-left: 10px;*/
    box-sizing: border-box;
    justify-content: flex-start;
    font-size: 11px;
    color: #999999;
    position: relative;
}
.information-details-date{
    width: auto;
    height: 100%;
    font-size: 11px;
    color: #999999;
    display: flex;
    align-items: center;
}
.information-details-readNum{
  position: absolute;
  right: 0;
  line-height: 28px
}
.information-picture{
    width: 35%;
    height: 90%;
    border-radius: 5px;
}
.information-item-contains-activity{
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    /*border-bottom: #ededed 1px solid;*/

}
.information-wrap-activity{
   width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-bottom: #ededed 1px solid
}
.information-picture-activity{
    height: 100%;
    width: 100%;
    border-radius: 4%;
}

.information-item-contains-activityBig{
  width: 100%;
  height: 178px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.information-pictureBigAll{
  display: flex;
  justify-content: center;
  width: 100%;
  height: 54%;
}

.information-pictureBig{
  width: 100%;
  height: 100%;
  border-radius: 5px;

}
.information-pictureBig:nth-child(1){
  width: 100%;
  height: 100%;
  border-radius: 5px;
}
.pictureMargin{
  flex: 1;
  display: flex;
  padding-left: 10px;
}
  .pictureMargin:nth-child(1){
    padding-left: 0;
  }
</style>
