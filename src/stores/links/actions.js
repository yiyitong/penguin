import {LINKS} from '../mutation-types'

export default {
  setLinks: ({ commit }, matched) => {
    commit(LINKS.SET, matched)
  },
  updateLinkTitle: ({ commit }, link) => {
    commit(LINKS.UPDATE, link)
  }
}