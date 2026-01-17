/**
 * Configuration file for API endpoints
 * Điều chỉnh API_BASE_URL theo môi trường của bạn
 */

// Tự động detect môi trường
const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

// API Base URL
// API Base URL
export const API_BASE_URL = 'https://convertifycrm.com/api';

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  LOGIN: '/users/login/',
  SOCIAL_LOGIN: '/users/social_login/',
  REFRESH_TOKEN: '/token/refresh/',
  
  // Registration
  REGISTRATIONS: '/registrations/',
  
  // Users
  USERS: '/users/',
  USER_DETAIL: (id: number) => `/users/${id}/`,
  
  // Add more endpoints here
};

// Request timeout (milliseconds)
export const REQUEST_TIMEOUT = 30000; // 30 seconds

// Debug mode
export const DEBUG = isDevelopment;

export default {
  API_BASE_URL,
  API_ENDPOINTS,
  REQUEST_TIMEOUT,
  DEBUG,
};
