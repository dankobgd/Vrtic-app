import { instance } from './api';

export default function(token = null) {
  if (token) {
    instance.defaults.headers.common['Authorization'] = token;
  } else {
    instance.defaults.headers.common['Authorization'] = null;
  }
}
