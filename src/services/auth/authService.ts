// Typescript file
import axios from 'axios';
import { API_ROUTES } from '@/constants/apiRoutes';

const API_CLIENT_ID = import.meta.env.VITE_CLIENT_ID || '';
const API_CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET || '';

interface TokenCredentials {
  client_id: string;
  client_secret: string;
}

const getToken = async () => {
  let storedToken = null;
  let tokenExpiration = null;

  // Get token from localStorage
  try {
    storedToken = localStorage.getItem('token');
    tokenExpiration = localStorage.getItem('tokenExpiration');

    // Check if we have a valid token
    const isTokenValid = tokenExpiration && (new Date(tokenExpiration).getTime() > new Date().getTime());
    if (storedToken && isTokenValid) {
      return storedToken;
    }
  } catch (error) {
    console.warn('localStorage access failed:', error);
  }

  // Request from API if not exists or expired
  try {
    const result = await requestBearerToken({
      client_id: API_CLIENT_ID,
      client_secret: API_CLIENT_SECRET
    });
    
    if (!result.success) {
      console.warn('Token request failed:', result.error);
      return null;
    }

    return result.token;
  } catch (error) {
    console.warn('API token request failed:', error);
    return null;
  }
};

/**
 * Request a bearer token from the API and store it in localStorage
 * @param credentials - The API credentials needed to request a token
 * @returns Promise with the result of the token request
 */
const requestBearerToken = async (credentials: TokenCredentials) => {
  try {
    // Make the request to your token endpoint
    const response = await axios.post(`${API_ROUTES.BASEURL}/api/v1/login`, {
      client_id: credentials.client_id,
      client_secret: credentials.client_secret,
      // Add any other required fields for your API
      grant_type: 'client_credentials'
    });

    // Extract the token from the response
    const { token, expires_at } = response.data;

    // Store the token in localStorage
    localStorage.setItem('token', token);

    // Optionally store the expiration time
    if (expires_at) {
      //const expiresAt = new Date().getTime() + expires_in * 1000; // calculate expiration time
      localStorage.setItem('tokenExpiration', expires_at.toString());
    }

    return { success: true, token: token };
  } catch (error) {
    console.error('Failed to get bearer token:', error);
    return {
      success: false,
      error: 'Failed to get access token'
    };
  }
};

const getUserSession = () => {
  return localStorage.getItem('userSession');
};

export const authService = {
  getToken,
  getUserSession,
  requestBearerToken,
  hasValidToken: () => !!getToken(),
  isUserLoggedIn: () => !!getUserSession(),
};