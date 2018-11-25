const BASE_URL = 'http://localhost:3001/api';

function request(method, path, body, options = {}) {
  return new Promise((resolve, reject) => {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    const fetchURL = BASE_URL + adjustedPath;
    const timeout = 8000;

    const defaultHeaders = {
      'Content-Type': 'application/json; charset=utf-8',
      Accept: 'Application/json',
    };

    const fetchOptions = {
      method,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
      body: method !== 'GET' ? JSON.stringify(body) : null,
    };

    const requestPromise = fetch(fetchURL, fetchOptions)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(err => reject(err));

    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('request timeout')), timeout));

    return Promise.race([requestPromise, timeoutPromise]);
  });
}

export default {
  get: (endpoint, body, opts) => {
    return request('GET', endpoint, body, opts);
  },
  post: (endpoint, body, opts) => {
    return request('POST', endpoint, body, opts);
  },
  put: (endpoint, body, opts) => {
    return request('PUT', endpoint, body, opts);
  },
  del: (endpoint, body, opts) => {
    return request('DELETE', endpoint, body, opts);
  },
};
