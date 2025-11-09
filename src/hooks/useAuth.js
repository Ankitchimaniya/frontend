import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import authUtils from '../services/authService';
import useAlert from './useAlert';

const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(authUtils.isAuthenticated());
    const [user, setUser] = useState(authUtils.getCurrentUser());
    const navigate = useNavigate();
    const { showSuccess, showError, alerts, removeAlert } = useAlert();

    // Update authentication state when storage changes
    useEffect(() => {
        const handleStorageChange = () => {
            setIsAuthenticated(authUtils.isAuthenticated());
            setUser(authUtils.getCurrentUser());
        };

        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, []);

    const login = useCallback(async (credentials) => {
        setLoading(true);
        try {
            const userData = await authUtils.login(credentials);
            setIsAuthenticated(true);
            setUser(authUtils.getCurrentUser());
            showSuccess('Login successful! Welcome back!');
            return userData;
        } catch (error) {
            let errorMessage = 'Login failed. Please try again.';
            
            if (error.response?.status === 401) {
                errorMessage = 'Invalid credentials. Please check your username and password.';
            } else if (error.response?.status === 400) {
                errorMessage = 'Missing username or password.';
            } else if (!error.response) {
                errorMessage = 'No server response. Please check your connection.';
            }
            
            showError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError]);

    const logout = useCallback(async () => {
        setLoading(true);
        try {
            await authUtils.logout();
            setIsAuthenticated(false);
            setUser({ token: null, username: null, userId: null });
            showSuccess('Logged out successfully');
        } catch (error) {
            console.warn('Logout error:', error);
            // Even if logout API fails, clear local state
            setIsAuthenticated(false);
            setUser({ token: null, username: null, userId: null });
        } finally {
            setLoading(false);
        }
    }, [showSuccess]);

    const register = useCallback(async (userData) => {
        setLoading(true);
        try {
            const result = await authUtils.register(userData);
            showSuccess('Registration successful! Please login with your credentials.');
            return result;
        } catch (error) {
            let errorMessage = 'Registration failed. Please try again.';
            
            if (error.response?.status === 409) {
                errorMessage = 'Username or email already exists.';
            } else if (error.response?.status === 400) {
                errorMessage = 'Please check your input and try again.';
            } else if (!error.response) {
                errorMessage = 'No server response. Please check your connection.';
            }
            
            showError(errorMessage);
            throw error;
        } finally {
            setLoading(false);
        }
    }, [showSuccess, showError]);

    const checkAuthAndRedirect = useCallback((redirectTo = '/login') => {
        if (!isAuthenticated) {
            navigate(redirectTo);
            return false;
        }
        return true;
    }, [isAuthenticated, navigate]);

    return {
        loading,
        isAuthenticated,
        user,
        login,
        logout,
        register,
        checkAuthAndRedirect,
        alerts,
        removeAlert
    };
};

export default useAuth;