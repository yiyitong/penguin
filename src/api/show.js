
import Vue from 'vue';

let baseUrl = '/show';
export default {
  ls: (query) => Vue.axios.get(baseUrl, {params:query}),
  add: (options) => Vue.axios.post(baseUrl, options),
  del: (options) => Vue.axios.delete(baseUrl, options),
  update: (options) => Vue.axios.put(baseUrl, options),
  detail: (query) => Vue.axios.get(`${baseUrl}/detail`, {params: query})
}