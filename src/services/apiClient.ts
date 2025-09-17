import axios, { type InternalAxiosRequestConfig } from 'axios';

// This file configures a reusable Axios instance for all API communications.

// Create an Axios instance with a predefined base URL from environment variables.
// This avoids repeating the base URL in every API call.
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
});

// Use an Axios interceptor to automatically attach the JWT to outgoing requests.
// This function runs before each request is sent.
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Retrieve the admin token from localStorage.
    const token = localStorage.getItem('adminToken');
    // If a token exists, add it to the Authorization header.
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified config to proceed with the request.
    return config;
  },
  (error) => {
    // Pass along any request setup errors.
    return Promise.reject(error);
  }
);

export default api;