import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

// Create the authentication context
const AuthContext = createContext(null);

/**
 * Auth Provider component that wraps the application and provides authentication state
 */
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize auth state from stored token on app load
  useEffect(() => {
    const initializeAuth = () => {
      setLoading(true);
      try {
        const isValid = authService.setupAxiosInterceptors();
        if (isValid) {
          const userData = authService.getCurrentUser();
          setCurrentUser(userData);
          setIsAuthenticated(true);
        } else {
          setCurrentUser(null);
          setIsAuthenticated(false);
        }
        setError(null);
      } catch (error) {
        console.error("Auth initialization error:", error);
        setError("Failed to restore authentication session");
        setCurrentUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login user with provided credentials
   * @param {Object} credentials - User login credentials
   */
  const login = async (credentials) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authService.login(credentials);
      setCurrentUser(user);
      setIsAuthenticated(true);
      return user;
    } catch (error) {
      setError(error.message || "Login failed. Please check your credentials.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   */
  const register = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await authService.register(userData);
      return result;
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logout the current user
   */
  const logout = () => {
    authService.logout();
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  // Context value object with auth state and methods
  const contextValue = {
    currentUser,
    isAuthenticated,
    loading,
    error,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to use the auth context
 * @returns {Object} Auth context value
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;