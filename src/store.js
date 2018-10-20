import Vue from 'vue'
import Vuex from 'vuex'
import links from '@/stores/links/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    links
  }
})