import { useState, useCallback } from 'react';
import apiClient, { getErrorMessage } from '../services/apiClient';
import useAlert from './useAlert';

const useApi = () => {
    const [loading, setLoading] = useState(false);
    const { showError, showSuccess } = useAlert();

    const makeRequest = useCallback(async (
        requestFn, 
        options = {}
    ) => {
        const {
            showSuccessMessage = false,
            successMessage = 'Operation completed successfully',
            showErrorMessage = true,
            onSuccess,
            onError
        } = options;

        setLoading(true);
        
        try {
            const response = await requestFn();
            
            if (showSuccessMessage) {
                showSuccess(successMessage);
            }
            
            if (onSuccess) {
                onSuccess(response.data);
            }
            
            return response.data;
        } catch (error) {
            let errorMessage = 'An unexpected error occurred';
            
            if (error.response) {
                errorMessage = getErrorMessage(error.response);
            } else if (error.request) {
                errorMessage = 'No server response. Please check your connection.';
            } else {
                errorMessage = error.message;
            }
            
            if (showErrorMessage) {
                showError(errorMessage);
            }
            
            if (onError) {
                onError(error);
            }
            
            throw error;
        } finally {
            setLoading(false);
        }
    }, [showError, showSuccess]);

    const get = useCallback((url, options = {}) => {
        return makeRequest(() => apiClient.get(url), options);
    }, [makeRequest]);

    const post = useCallback((url, data, options = {}) => {
        return makeRequest(() => apiClient.post(url, data), options);
    }, [makeRequest]);

    const put = useCallback((url, data, options = {}) => {
        return makeRequest(() => apiClient.put(url, data), options);
    }, [makeRequest]);

    const patch = useCallback((url, data, options = {}) => {
        return makeRequest(() => apiClient.patch(url, data), options);
    }, [makeRequest]);

    const del = useCallback((url, options = {}) => {
        return makeRequest(() => apiClient.delete(url), options);
    }, [makeRequest]);

    return {
        loading,
        get,
        post,
        put,
        patch,
        delete: del,
        makeRequest
    };
};

export default useApi;