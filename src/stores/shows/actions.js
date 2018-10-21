import {SHOWS} from '../mutation-types'

export default {
  setCurShow: ({ commit }, matched) => {
    commit(SHOWS.SET, matched)
  }
}