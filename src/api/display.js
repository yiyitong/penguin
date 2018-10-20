
import Vue from 'vue';

let baseUrl = '/display';
export default {
  ls: (query) => Vue.axios.get(baseUrl, query),
  add: (options) => Vue.axios.post(baseUrl, options),
  del: (options) => Vue.axios.delete(baseUrl, options),
  update: (options) => Vue.axios.put(baseUrl, options)
}