<template>
  <div class="information-contains">
    <div class="topBack">
      <div class="navTitle">资讯</div>
      <div class="backButton" @click="navBack"></div>
    </div>

    <template v-if="!backList">
      <div style="background-color: white;width: 100%;height: 56px"></div>
    </template>
    <div class="information-head" v-else>
      <van-tabs @click="onClick" swipeable :ellipsis="false" color="#000000" line-width="35px" :border="false">
        <van-tab :title="item" :key="item" v-for="item in listTab"></van-tab>
      </van-tabs>
    </div>
    <!-- 内容部分 -->
    <div class="information-content" id="classRomm" v-if="showClassRomm">
      <!-- 下拉刷新组件 -->
      <scroller :on-refresh="refresh" :on-infinite="infinite" :noDataText="noDataText" ref="myscroller" class="scroller-item" style="width: 100%;height: 84%;">
        <InformationItem v-for="(item,index) in newsList" :key="item.CRT_DATE" :data="item" :special="(index+1)%3" :type="typeClick"></InformationItem></scroller>
    </div>
  </div>
</template>
<script>
import InformationItem from '../../components/Information/InformationItem'
export default {
  name: 'Information',
  mounted: function () {
    this.backList = false
    console.log(1)
    this.$nextTick(function () {
      this.init()
    })
  },
  components: {
    InformationItem: InformationItem
  },
  data () {
    return {
      showClassRomm: true,
      showPolicy: false,
      curLength: 10,
      noDate: false, // 这是一个判断是否加载的开关
      page: 1,
      pageSize: 10,
      newsList: null,
      testDataNew: {
      },
      typeClick: 1,
      pageAll: {
      },
      lastPageAll: {
      },
      noDataText: '没有更多数据',
      listTab: [],
      backList: false
    }
  },
  methods: {
    init () {
    },
    /* 返回 */
    navBack () {
      this.$router.go(-1)
    },
    initTabs: function () {
      var that = this
      return new Promise((resolve, reject) => {
        if (that.listTab.length === 0) {
          that.testDataNew = {}
          that.pageAll = {}
          that.lastPageAll = {}
          var res = {
            data: [{ 'NAME': '消息推送' }, { 'NAME': '最新政策' }, { 'NAME': '相关新闻' }]
          }
          console.log('搜索得到的信息-->', res)
          that.listTab = []
          for (var i = 0; i < res.data.length; i++) {
            that.listTab.push(res.data[i].NAME)
          }
          console.log(JSON.stringify(that.listTab))
          that.backList = true
          for (var j = 1; j <= that.listTab.length; j++) {
            that.pageAll[j] = 1
            that.testDataNew[j] = []
            that.lastPageAll[j] = []
          }
          that.typeClick = 1
          resolve()
        } else {
          resolve()
        }
      })
    },

    onClick (index, title) {
      this.typeClick = index + 1
      this.newsList = this.testDataNew[this.typeClick]
      this.$refs.myscroller.finishInfinite(false) // 这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
    },
    // 获取数据
    getData (type) {
      var that = this
      console.log(this.typeClick)
      return new Promise((resolve, reject) => {
        const params = {
          basic: {
            pageNum: that.pageAll[that.typeClick],
            pageSize: that.pageSize
          },
          params: {
            query: []
          }
        }
        params.params.query.push({ field: 'type', value: that.typeClick })
        if (that.pageAll[this.typeClick] === that.lastPageAll[that.typeClick] + 1) {
          resolve([])
        } else {
          this.$store.dispatch('InformationListGet', params).then((res) => {
            if (res.list.length > 0) {
              // 判断是下拉刷新还是上拉加载（这一步也是比较巧妙的，当然也很好理解）
              if (that.pageAll[that.typeClick] === 1) {
                that.testDataNew[that.typeClick] = res.list
              } else {
                that.testDataNew[that.typeClick] = that.testDataNew[that.typeClick].concat(res.list)
              }
              that.lastPageAll[that.typeClick] = res.pages
              that.newsList = that.testDataNew[that.typeClick]
            } else {
            }
            resolve(res.list)
          })
        }
      })
    },
    // 下拉刷新
    refresh () {
      var that = this
      this.page = 1 // 重置页数刷新每次页数都是第一页
      this.noDate = false // 重置数据判断
      that.pageAll[this.typeClick] = 1
      this.getData().then(res => {
        /* 没有数据 */
        that.$refs.myscroller.finishPullToRefresh() /// 刷新完毕关闭刷新的转圈圈
      })
    },

    // 上拉加载
    infinite (done) {
      var that = this
      this.initTabs().then(res => {
        this.getData().then(res => {
          if (done) {
            /* 没有数据 */
            if (res.length === 0) {
              if (that.pageAll[this.typeClick] === 1) {
                that.noDataText = '暂无数据'
              } else {
                that.noDataText = '没有更多数据了'
              }
              that.$refs.myscroller.finishInfinite(true) // 这个方法是不让它加载了，显示“没有更多数据”，要不然会一直转圈圈
            } else {
              done() // 进行下一次加载操作
              that.pageAll[this.typeClick]++
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped lang="scss">
  /deep/ .van-tab{
    font-size: 14px;
    line-height: 34px;
  }
  /deep/ .van-tabs--line .van-tabs__wrap{
    height: 34px;
  }
  .topBack{
    width: 100%;
    height: 44px;
    /*text-align: left;*/
    background: white;
    text-align: center;
    line-height: 44px;
  }
  .backButton{
    background: url("../../assets/login/back.png");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: 18px 16px;
    width: 52px;
    height: 44px;
    display: inline-block;
    position: absolute;
    left: 0;
  }
  .navTitle{
    display: inline-block;
    font-size: 17px;
    font-weight: 600;
    font-stretch: normal;
    letter-spacing: 0;
    color: #000000;
  }

  .van-tabs--line{
    width: 100%;
  }
.information-contains {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #ededed;
}
.information-head {
  width: 100%;
  height: 46px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: #ffffff;
}
.information-theme {
  width: 33%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.3em;
  font-weight: 300;
}
.selected-theme {
  font-size: 1.4em;
  font-weight: 600;
  border-bottom: #018E5E;
}
.information-content {
    width: 100%;
    height: calc(100% - 90px);
    top: 90px;
    background-color: #ffffff;
    overflow-y: auto;
    position: absolute;
}
.panel-content {
  height: 100%;
}
.scroller-item {
  position: inherit;
}
/*顶部*/
.mine-top-panel{
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    height: 9%;
    background:#018E5E;
}
.mine-top-title{
    font-size: 1.7em;
    color: #fff;
    font-weight: 500;
    margin-bottom: 2%;
}
</style>
