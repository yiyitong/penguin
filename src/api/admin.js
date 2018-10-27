
import Vue from 'vue';

let baseUrl = '/admin';
export default {
  login: (query) => Vue.axios.post(`${baseUrl}/login`, query),
  ls: (query) => Vue.axios.get(baseUrl, query),
  add: (options) => Vue.axios.post(baseUrl, options),
  del: (options) => Vue.axios.delete(baseUrl, options),
  update: (options) => Vue.axios.put(baseUrl, options)
}