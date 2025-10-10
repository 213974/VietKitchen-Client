import axios, { type InternalAxiosRequestConfig } from 'axios';

// --- FIX: Use a relative path for the API ---
// This tells the frontend to make requests to its own domain (e.g., /api/contact)
// instead of an external URL. This is correct for the Vercel serverless setup.
const api = axios.create({
  baseURL: '/api',
});

// The interceptor remains the same. It's not currently used but is good to keep.
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