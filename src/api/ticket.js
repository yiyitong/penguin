
import Vue from 'vue';

let baseUrl = '/show/ticket';
export default {
  ls: (query) => Vue.axios.get(`${baseUrl}/list`, {params:query}),
  add: (options) => Vue.axios.post(`${baseUrl}/add`, options),
  del: (options) => Vue.axios.post(`${baseUrl}/delete`, options),
  update: (options) => Vue.axios.post(`${baseUrl}/update`, options)
}