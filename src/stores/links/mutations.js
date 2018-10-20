import {LINKS} from '../mutation-types'

export default {
  [LINKS.SET] (state, list) {
    state.links = list
  },
  [LINKS.UPDATE] (state, link) {
    state.links.map((item) => {
      if (item.to === link.to) {
        item.title = link.title
      }
    })
  }
}