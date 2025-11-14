import axios, { type InternalAxiosRequestConfig } from 'axios';

// This relative path is correct for both CRA and Next.js setups.
const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;