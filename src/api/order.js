
import Vue from 'vue';

let baseUrl = '/show/order';
export default {
  ls: (query) => Vue.axios.get(`${baseUrl}/list`, {params: query}),
  del: (options) => Vue.axios.post(`/user/order/delete`, options),
  check: (options) => Vue.axios.post('/admin/order/writeOff', options)
}