import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  withCredentials: true  // Cookie automatically har request ke saath jayegi
});

// Ab Authorization header ki zarurat nahi
// Cookie browser khud bhejta hai
API.interceptors.request.use(config => {
  return config;
});

// 401 pe login page pe bhejo
API.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('lbs_user');
      window.location.href = '/admin/login';
    }
    return Promise.reject(err);
  }
);

export default API;