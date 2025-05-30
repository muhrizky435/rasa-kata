import axios from "axios";
import { jwtDecode } from "jwt-decode";

// API base URL - adjust to match your actual API endpoint
const API_BASE_URL = "https://rasa-kata-7ca6a75a895b.herokuapp.com/api";

// Create axios instance specifically for auth requests
const authClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Token storage keys
const TOKEN_KEY = "auth_token";
const USER_KEY = "user_data";

/**
 * Service for handling authentication related functionality
 */
const authService = {
  /**
   * Login user and store authentication token
   * @param {Object} credentials - User credentials {email, password}
   * @returns {Promise<Object>} User data
   */
  login: async (credentials) => {
    try {

      const response = await authClient.post("/auth/login", credentials);
      console.log("Login response:", response.data.data);
      const { token, user } = response.data.data;

      // Store token and user data
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem(USER_KEY, JSON.stringify(user));

      // Set the token for future API requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      return user;
    } catch (error) {
      console.error("Login error:", error);
      throw error.response?.data || error;
    }
  },

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise<Object>} Registered user data
   */
  register: async (userData) => {
    try {
      const response = await authClient.post("/auth/register", userData);
      return response.data;
    } catch (error) {
      console.error("Registration error:", error);
      throw error.response?.data || error;
    }
  },

  updateUser: async (userData, userId) => {
    try {
      const token = localStorage.getItem(TOKEN_KEY);
      if (!token) throw new Error("User not authenticated");

      // Set token in headers for this request
      authClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      const response = await authClient.put(`/user/${userId}`, userData);
      const updatedUser = response.data.data.user;
      console.log(updatedUser)
      

      // Update stored user data
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));

      return updatedUser;
    } catch (error) {
      console.error("Update user error:", error);
      throw error.response?.data || error;
    }
  },

  /**
   * Logout user and clear stored authentication data
   */
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    delete axios.defaults.headers.common["Authorization"];
  },

  /**
   * Check if user is currently authenticated
   * @returns {boolean} True if authenticated
   */
  isAuthenticated: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      // Check token expiration
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        authService.logout();
        return false;
      }

      return true;
    } catch (error) {
      console.error("Token validation error:", error);
      authService.logout();
      return false;
    }
  },

  /**
   * Get current authenticated user data
   * @returns {Object|null} User data or null if not authenticated
   */
  getCurrentUser: () => {
    if (!authService.isAuthenticated()) return null;

    const userString = localStorage.getItem(USER_KEY);
    if (!userString) return null;

    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error("Error parsing user data:", error);
      return null;
    }
  },

  /**
   * Get stored authentication token
   * @returns {string|null} Auth token or null if not authenticated
   */
  getToken: () => {
    return localStorage.getItem(TOKEN_KEY);
  },

  /**
   * Set up authentication from stored token (useful on app startup)
   * @returns {boolean} True if token was found and is valid
   */
  setupAxiosInterceptors: () => {
    const token = localStorage.getItem(TOKEN_KEY);
    if (!token) return false;

    try {
      // Check token expiration
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp < Date.now() / 1000;

      if (isExpired) {
        authService.logout();
        return false;
      }

      // Set token for API requests
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      return true;
    } catch (error) {
      console.error("Token setup error:", error);
      authService.logout();
      return false;
    }
  },
};

// Set up token for API requests on service initialization
authService.setupAxiosInterceptors();

export default authService;
