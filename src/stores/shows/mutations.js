import {SHOWS} from '../mutation-types'

export default {
  [SHOWS.SET] (state, show) {
    state.curShow = show
  }
}