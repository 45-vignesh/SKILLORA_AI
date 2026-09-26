import axios from 'axios';

const API = axios.create({
  baseURL: '/api/v1',
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
    // Only redirect on 401 if it's NOT the login endpoint itself
    if (err.response?.status === 401 && !err.config?.url?.includes('/auth/login')) {
      localStorage.removeItem('skillora_token');
      localStorage.removeItem('skillora_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default API;
