import {
  getModel

} from '@/api/misg/model'

const map = {
  state: {
    map: {}
  },

  mutations: {
    setMap(state, map) {
      state.map = map;
    }
  },

  actions: {

  },
  getters: {
    getMap: state => {
      return state.map
    }
  }
}

export default map