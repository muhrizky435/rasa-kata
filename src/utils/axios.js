import axios from 'axios';

// Create an axios instance with custom configuration
const axiosInstance = axios.create({
    baseURL: 'https://rasa-kata-7ca6a75a895b.herokuapp.com/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
});

// Request interceptor for adding auth token, etc.
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        // Handle 401 Unauthorized responses
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            // Optionally redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;