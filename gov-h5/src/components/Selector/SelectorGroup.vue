<template>
  <div
    :class="'selector-button-contains '+((this.selected)?'selected':'unselected')"
    :style="marginNum"
    @click="clickItem"
  >
    <div :class="'selector-text '+((this.selected)?'selected-text':'unselected-text')">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'SelectorGroup',
  props: {
    text: {
      type: String,
      require: true,
      default: () => {}
    },
    count: {
      type: Number,
      require: true,
      default: () => {}
    }
  },
  computed: {
    marginNum: function () {
      // var cwd = document.documentElement.clientWidth
      // var num = parseInt(cwd / (79.5 + 9 * 2))
      if (this.count >= 4) {
        return {
          // 'margin-right': parseInt((cwd - num * 79.5) / (num + 1)) + 'px',
          // 'width': 'auto',
          // 'padding': '5px 15px',
          'margin-right': '9px',
          'margin-bottom': '9px'
        }
      } else {
        return {
          'margin-right': '9px'
        }
      }
    }
  },
  data () {
    return {
      selected: false
    }
  },
  methods: {
    clickItem () {
      this.selected = !this.selected
      this.eventHandle()
    },
    eventHandle () {
      if (this.selected) {
        this.$emit('selected', this.text)
      } else {
        this.$emit('unselected', this.text)
      }
    },
    reset () {
      this.selected = false
      this.$emit('unselected', this.text)
    },
    initItem () {
      this.selected = true
    },
    clearSelected () {
      this.selected = false
    }
  }
}
</script>

<style scoped>
.selector-button-contains {
  /* width: 79.5px; */
  width: auto;
  padding: 5px 15px;
  height: 35px;
  font-size: 14px;
  /* padding: 5px 15px;
  height: 40px;
  font-size: 14px; */
  /* width: 100%;
    height: 100%; */
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  color: #018e5e;
}
.unselected {
  background-color: #f2f2f2;
  border: 1px solid #f2f2f2;
}
.selected {
  background-color: #ffffff;
  border: 1px solid #3486fe;
  background: url('./../../assets/operator/radius.png') no-repeat top right;
  background-size: 12px;
}
.selected-icon {
  width: 16px;
  height: 16px;
}
.selector-text {
  font-size: 1.1em;
}
.selected-text {
  color: #3486fe;
}
.unselected-text {
  color: #666666;
}
</style>
