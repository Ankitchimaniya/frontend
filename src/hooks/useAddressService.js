import apiClient from '../services/apiClient';
import { useState, useCallback } from 'react';

export const useAddressService = (showSuccess, showError) => {
    const [loading, setLoading] = useState(false);

    const fetchAddresses = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/UserAddress');
            return response.data;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to fetch addresses';
            showError(errorMessage);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [showError]);

    const saveAddress = useCallback(async (formData, editingAddress) => {
        try {
            let response;
            if (editingAddress) {
                response = await apiClient.put(`/UserAddress/${editingAddress.id}`, formData);
            } else {
                response = await apiClient.post('/UserAddress', formData);
            }

            showSuccess(editingAddress ? 'Address updated successfully' : 'Address added successfully');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to save address';
            showError(errorMessage);
            throw err;
        }
    }, [showSuccess, showError]);

    const deleteAddress = useCallback(async (addressId) => {
        try {
            await apiClient.delete(`/UserAddress/${addressId}`);
            showSuccess('Address deleted successfully');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to delete address';
            showError(errorMessage);
            throw err;
        }
    }, [showSuccess, showError]);

    const setDefaultAddress = useCallback(async (addressId) => {
        try {
            await apiClient.put(`/UserAddress/${addressId}/set-default`);
            showSuccess('Default address updated successfully');
            return true;
        } catch (err) {
            const errorMessage = err.response?.data?.message || 'Failed to set default address';
            showError(errorMessage);
            throw err;
        }
    }, [showSuccess, showError]);

    return {
        loading,
        fetchAddresses,
        saveAddress,
        deleteAddress,
        setDefaultAddress
    };
};

export default useAddressService;