<template>
  <ul
    :class="'station-filters-selector list-type-setting '+((this.list.length >= 4)?'':'selector-single-row')"
  >
    <li v-for="item in list" :key="item.key">
      <SelectorGroup
        :text="item.text"
        :count="list.length"
        @unselected="onUnselected"
        @selected="onSelected"
        ref="resetBtn"
      ></SelectorGroup>
    </li>
  </ul>
</template>

<script>
import SelectorGroup from './SelectorGroup.vue'
export default {
  name: 'Selectors',
  props: {
    list: {
      type: Array,
      require: true,
      default: () => {}
    },
    selectedList: {
      type: Array,
      require: true,
      default: () => {}
    }
  },
  components: {
    SelectorGroup: SelectorGroup
  },
  data () {
    return {
      selectedPileList: []
    }
  },
  mounted: function () {
    this.$nextTick(function () {
      this.init()
    })
  },
  updated: function () {
    this.init()
  },
  methods: {
    init () {
      this.clearBtnSelected()
      const btns = this.$refs.resetBtn
      if (btns !== undefined && this.selectedList.length > 0) {
        for (let index = 0; index < this.selectedList.length; index++) {
          const itemName = this.selectedList[index]
          for (let index = 0; index < btns.length; index++) {
            const element = btns[index]
            if (element.text === itemName) {
              element.initItem()
            }
          }
        }
      }
    },
    onUnselected: function (data) {
      for (let index = 0; index < this.selectedList.length; index++) {
        const element = this.selectedList[index]
        if (element === data) {
          this.selectedList.splice(index, 1)
          break
        }
      }
    },
    onSelected: function (data) {
      this.selectedList.push(data)
    },
    resetBtn () {
      this.selectedList = []
      const btns = this.$refs.resetBtn
      for (let index = 0; index < btns.length; index++) {
        const element = btns[index]
        element.reset()
      }
    },
    clearBtnSelected () {
      const btns = this.$refs.resetBtn
      if (btns !== undefined) {
        for (let index = 0; index < btns.length; index++) {
          const element = btns[index]
          element.clearSelected()
        }
      }
    }
  }
}
</script>

<style scoped>
.station-filters-selector {
  width: auto;
  /* height: 84%; */
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  float: left;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: scroll;
}
/* .selector-single-row {
  height: 55%;
} */
.list-type-setting {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
