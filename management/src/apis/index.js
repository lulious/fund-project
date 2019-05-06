"use strict";

import axios from "axios";
import settings from './settings'

let config = {
  timeout: 3 * 1000, // Timeout
};

const _axios = axios.create(config);
// Add a request interceptor
_axios.interceptors.request.use(
  function(config) {
    // Do something before request is sent
    config = settings.interceptors.request(config)
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
_axios.interceptors.response.use(
  function(response) {
    // Do something with response data
    response = settings.interceptors.response(response)
    return response;
  },
  function(error) {
    // Do something with response error
    return Promise.reject(error);
  }
);

export default function(Vue, options) {
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
};;
