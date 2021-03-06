import axios from 'axios';
import config from '../config';

export const instance = axios.create({
  baseURL: config.BASE_URL,
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
    Accept: 'application/json',
  },
  timeout: 6000,
});

function request(method, url, data) {
  return new Promise((resolve, reject) => {
    (() => {
      if (method === 'GET') {
        return instance.request({
          url,
          method,
          params: data,
          headers: {},
        });
      } else {
        return instance.request({
          url,
          method,
          data,
          headers: {},
        });
      }
    })()
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err.response);
      });
  });
}

export default {
  get: (endpoint, data) => {
    return request('GET', endpoint, data);
  },
  post: (endpoint, data) => {
    return request('POST', endpoint, data);
  },
  put: (endpoint, data) => {
    return request('PUT', endpoint, data);
  },
  del: (endpoint, data) => {
    return request('DELETE', endpoint, data);
  },
};
