import Vue from 'vue'
import Vuex from 'vuex'
import links from '@/stores/links/store.js'
import shows from '@/stores/shows/store.js'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    links,
    shows
  }
})