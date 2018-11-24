const BASE_URL = 'http://localhost:3001/api';

function request(method, path, options = {}) {
  return new Promise((resolve, reject) => {
    const adjustedPath = path[0] !== '/' ? '/' + path : path;
    const fetchURL = BASE_URL + adjustedPath;
    const timeout = 8000;

    const defaultHeaders = {
      'Content-Type': 'Application/json',
      Accept: 'Application/json',
    };

    const fetchOptions = {
      method,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
      ...options,
      body: method !== 'GET' ? JSON.stringify(options.body) : null,
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
  get: (endpoint, opts) => {
    return request('GET', endpoint, opts);
  },
  post: (endpoint, opts) => {
    return request('POST', endpoint, opts);
  },
  put: (endpoint, opts) => {
    return request('PUT', endpoint, opts);
  },
  del: (endpoint, opts) => {
    return request('DELETE', endpoint, opts);
  },
};
