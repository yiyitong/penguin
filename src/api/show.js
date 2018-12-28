
import Vue from 'vue';

let baseUrl = '/show';
export default {
  ls: (query) => Vue.axios.get(`${baseUrl}/list`, {params:query}),
  add: (options) => Vue.axios.post(`${baseUrl}/add`, options),
  del: (options) => Vue.axios.post(`${baseUrl}/delete`, options),
  update: (options) => Vue.axios.post(`${baseUrl}/update`, options),
  detail: (query) => Vue.axios.get(`${baseUrl}/detail/list`, {params: query}),
  updateDetail: (id, contents) => Vue.axios.post(`${baseUrl}/detail/update`, {
    showId: id, contents: contents
  }),
  lsNames: (query) => Vue.axios.get(`${baseUrl}/name/list`, {params: query}),
  info: (query) => Vue.axios.get(`${baseUrl}`, {params: query})
}