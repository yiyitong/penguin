"use strict";

import Vue from 'vue';
import axios from "axios";
import storageAPI from '@/common/storageAPI'
import ERROR_CODE from '@/common/ErrorCode.json'
import {Message} from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
console.info('token:', storageAPI.getValueFromStorage('token'))
axios.defaults.headers.common['x-token'] = storageAPI.getValueFromStorage('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

let config = {
  baseURL: process.env.baseURL || process.env.apiUrl || "/api/v1"
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    console.info('request', config);
    config.headers['x-token'] = storageAPI.getValueFromStorage('token');
    return config;
  },
  function(error) {
    Message.error({message: '请求超时!'});
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    if (response.status && response.status == 200 && !response.data.result) {
      if (response.data.code === 'SERVICE_0004') {
        window.location.href = '/'
      } else {
        let errInfo = ERROR_CODE[response.data.code] || '未知错误'
        Message.error({message: errInfo});
      }
    }
    return response;
  },
  function(error) {
    if (error.response.status == 504||error.response.status == 404) {
      Message.error({message: '服务器被吃了⊙﹏⊙∥'});
    } else if (error.response.status == 403) {
      Message.error({message: '权限不足,请联系管理员!'});
    }else {
      Message.error({message: '未知错误!'});
    }
    return Promise.reject(error);
  }
);

Plugin.install = function(Vue) {
  Vue.axios = _axios;
  window.axios = _axios;
  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
