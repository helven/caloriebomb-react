// Typescript file
import axios from 'axios';
import { authServices } from '@/services/api/auth/';
import { API_ROUTES } from '@/constants/apiRoutes';

export const apiService = axios.create({
  baseURL: API_ROUTES.BASEURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Handles token injection
apiService.interceptors.request.use(
  async (config) => {
    const token = await authServices.auth.getToken(); // Get the token from authService
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach the token to the request headers
    }
    return config;
  },
  (error) => {
    console.error('Request setup failed:', error.message);
    return Promise.reject(new Error('Failed to make request. Please check your connection.'));
  }
);

// Response interceptor to handle common errors
apiService.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // For public site: Handle unauthorized gracefully
      console.error('API Access Unauthorized:', error.message);
      return Promise.reject(new Error('Unable to access data. Please try again later.'));
    }

    // Handle other errors
    if (error.response?.status === 429) {
      // Too many requests
      return Promise.reject(new Error('Too many requests. Please wait a moment.'));
    }

    if (error.response?.status >= 500) {
      // Server errors
      return Promise.reject(new Error('Service temporarily unavailable.'));
    }

    return Promise.reject(error);
  }
);