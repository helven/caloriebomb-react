// Typescript file
import axios from 'axios';
import type { AxiosInstance, AxiosRequestConfig } from 'axios';
import { authServices } from '@/services/api/auth/';
import { API_ROUTES } from '@/constants/apiRoutes';

export class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_ROUTES.BASEURL,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Axios Request Interceptor (before fetch): Attach bearer token to all requests
    this.api.interceptors.request.use(
      async (config) => {
        return config; 
        // app now connect to api through local node server
        // local node server doesn't need token, code below will not be used

        // Get bearer token with API auth service
        const token = await authServices.auth.getToken();
        if (token) {
          // Put bearer token into Axios internal config
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        console.error('Request setup failed:', error.message);
        return Promise.reject(new Error('Failed to make request. Please check your connection.'));
      }
    );

    // Axios Response Interceptor (after fetch): Handle API errors globally
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error('API Access Unauthorized:', error.message);
          return Promise.reject(new Error('Unable to access data. Please try again later.'));
        }

        if (error.response?.status === 429) {
          return Promise.reject(new Error('Too many requests. Please wait a moment.'));
        }

        if (error.response?.status >= 500) {
          return Promise.reject(new Error('Service temporarily unavailable.'));
        }

        return Promise.reject(error);
      }
    );
  }

  // 3. Add HTTP methods
  async get<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.get<T>(url, config);
    return response;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.post<T>(url, data, config);
    return response;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig) {
    const response = await this.api.put<T>(url, data, config);
    return response;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig) {
    const response = await this.api.delete<T>(url, config);
    return response;
  }
}

// Export a singleton instance
export const apiService = new ApiService();