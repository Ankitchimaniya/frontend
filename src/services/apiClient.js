import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://localhost:7172/api';

// Create Axios instance
const apiClient = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000, // 10 seconds timeout
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors and token refresh
apiClient.interceptors.response.use(
    (response) => {
        // Return successful responses
        return response;
    },
    async (error) => {
        const originalRequest = error.config;

        // Handle 401 Unauthorized errors
        if (error.response && error.response.status === 401) {
            // Check if this is not already a retry attempt
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    // Try to refresh the token
                    const refreshToken = localStorage.getItem('refreshToken');
                    
                    if (refreshToken) {
                        const refreshResponse = await axios.post(`${API_BASE_URL}/Authenticate/refresh`, {
                            refreshToken: refreshToken
                        });

                        if (refreshResponse.status === 200) {
                            // Update tokens in localStorage
                            const { token, refreshToken: newRefreshToken } = refreshResponse.data;
                            localStorage.setItem('token', token);
                            localStorage.setItem('refreshToken', newRefreshToken);

                            // Update the authorization header and retry the original request
                            originalRequest.headers.Authorization = `Bearer ${token}`;
                            return apiClient(originalRequest);
                        }
                    }
                } catch (refreshError) {
                    console.error('Token refresh failed:', refreshError);
                }
            }

            // If token refresh fails or no refresh token, logout user
            handleLogout();
        }

        // Handle other errors
        if (error.response) {
            // Server responded with error status
            const errorMessage = getErrorMessage(error.response);
            console.error('API Error:', errorMessage);
        } else if (error.request) {
            // Network error
            console.error('Network Error:', 'No server response. Please check your connection.');
        } else {
            // Other error
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

// Helper function to extract error messages
const getErrorMessage = (response) => {
    if (response.data && response.data.message) {
        return response.data.message;
    }
    
    switch (response.status) {
        case 400:
            return 'Bad request. Please check your input.';
        case 401:
            return 'Authentication failed. Please login again.';
        case 403:
            return 'Access denied. You do not have permission.';
        case 404:
            return 'Resource not found.';
        case 409:
            return 'Conflict. The resource already exists.';
        case 422:
            return 'Validation failed. Please check your input.';
        case 500:
            return 'Server error. Please try again later.';
        case 502:
            return 'Bad gateway. Service temporarily unavailable.';
        case 503:
            return 'Service unavailable. Please try again later.';
        default:
            return `Request failed with status ${response.status}`;
    }
};

// Helper function to handle logout
const handleLogout = () => {
    // Clear all auth-related data from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    localStorage.removeItem('userId');
    
    // Show user-friendly message
    console.log('Session expired. Redirecting to login...');
    
    // Redirect to login page
    window.location.href = '/login';
};

// Export the configured axios instance
export default apiClient;

// Export utility functions
export { getErrorMessage, handleLogout };