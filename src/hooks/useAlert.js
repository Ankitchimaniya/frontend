import { useState, useCallback } from 'react';

export const useAlert = () => {
    const [alerts, setAlerts] = useState([]);

    const showAlert = useCallback(({ 
        message, 
        type = 'warning', 
        duration = 3000, 
        position = 'top-center' 
    }) => {
        const id = Date.now() + Math.random();
        const newAlert = {
            id,
            message,
            type,
            duration,
            position,
            isVisible: true
        };

        setAlerts(prev => [...prev, newAlert]);

        // Auto-remove alert after duration (if duration > 0)
        if (duration > 0) {
            setTimeout(() => {
                removeAlert(id);
            }, duration);
        }

        return id;
    }, []);

    const removeAlert = useCallback((id) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    }, []);

    const clearAllAlerts = useCallback(() => {
        setAlerts([]);
    }, []);

    // Convenience methods for different alert types
    const showSuccess = useCallback((message, options = {}) => {
        return showAlert({ message, type: 'success', ...options });
    }, [showAlert]);

    const showError = useCallback((message, options = {}) => {
        return showAlert({ message, type: 'error', ...options });
    }, [showAlert]);

    const showWarning = useCallback((message, options = {}) => {
        return showAlert({ message, type: 'warning', ...options });
    }, [showAlert]);

    const showInfo = useCallback((message, options = {}) => {
        return showAlert({ message, type: 'info', ...options });
    }, [showAlert]);

    return {
        alerts,
        showAlert,
        showSuccess,
        showError,
        showWarning,
        showInfo,
        removeAlert,
        clearAllAlerts
    };
};

export default useAlert;