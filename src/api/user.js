
import Vue from 'vue';

let baseUrl = '/user';
export default {
  getUsers: (query) => Vue.axios.get(baseUrl, query),
  addUser: (options) => Vue.axios.post(baseUrl, options),
  delUser: (options) => Vue.axios.post(`${baseUrl}/delete`, options),
  updateUser: (options) => Vue.axios.put(baseUrl, options),
  login: (options) => Vue.axios.post(baseUrl + '/login', options),
  logout: () => Vue.axios.post('/admin/logout')
}