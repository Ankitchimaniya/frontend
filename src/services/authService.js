import apiClient from './apiClient';

// Authentication utility functions
export const authUtils = {
    // Login function
    login: async (credentials) => {
        try {
            const response = await apiClient.post('/Authenticate/login', credentials);
            const { token, refreshToken, userId } = response.data;
            
            // Store tokens and user info
            localStorage.setItem('token', token);
            localStorage.setItem('userId', userId);
            localStorage.setItem('username', credentials.username);
            
            if (refreshToken) {
                localStorage.setItem('refreshToken', refreshToken);
            }
            
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Logout function
    logout: async () => {
        try {
            // Call logout endpoint if available
            const refreshToken = localStorage.getItem('refreshToken');
            if (refreshToken) {
                await apiClient.post('/Authenticate/logout', { refreshToken });
            }
        } catch (error) {
            console.warn('Logout API call failed:', error);
        } finally {
            // Clear all stored data regardless of API call result
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('username');
            localStorage.removeItem('userId');
            
            // Redirect to login page
            window.location.href = '/login';
        }
    },

    // Register function
    register: async (userData) => {
        try {
            const response = await apiClient.post('/Authenticate/register', userData);
            return response.data;
        } catch (error) {
            throw error;
        }
    },

    // Check if user is authenticated
    isAuthenticated: () => {
        const token = localStorage.getItem('token');
        return !!token;
    },

    // Get current user info
    getCurrentUser: () => {
        return {
            token: localStorage.getItem('token'),
            username: localStorage.getItem('username'),
            userId: localStorage.getItem('userId')
        };
    },

    // Refresh token
    refreshToken: async () => {
        try {
            const refreshToken = localStorage.getItem('refreshToken');
            if (!refreshToken) {
                throw new Error('No refresh token available');
            }

            const response = await apiClient.post('/Authenticate/refresh', {
                refreshToken: refreshToken
            });

            const { token, refreshToken: newRefreshToken } = response.data;
            
            localStorage.setItem('token', token);
            if (newRefreshToken) {
                localStorage.setItem('refreshToken', newRefreshToken);
            }

            return response.data;
        } catch (error) {
            // If refresh fails, logout user
            authUtils.logout();
            throw error;
        }
    }
};

export default authUtils;