
import Vue from 'vue';

let baseUrl = '/admin/account';
export default {
  login: (query) => Vue.axios.post('/admin/login', query),
  ls: () => Vue.axios.get(`${baseUrl}/list`),
  add: (options) => Vue.axios.post(`${baseUrl}/add`, options),
  del: (options) => Vue.axios.post(`${baseUrl}/delete`, options),
  update: (options) => Vue.axios.post(`${baseUrl}/update`, options)
}