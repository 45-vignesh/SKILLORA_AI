import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  timeout: 10000,
});

API.interceptors.request.use(config => {
  const token = localStorage.getItem('skillora_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('skillora_token');
      localStorage.removeItem('skillora_user');
      window.location.href = '/';
    }
    return Promise.reject(err);
  }
);

export default API;
