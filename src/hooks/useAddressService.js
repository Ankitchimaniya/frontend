import axios from 'axios';
import { useState, useCallback } from 'react';

export const useAddressService = (showSuccess, showError) => {
    const [loading, setLoading] = useState(false);

    const fetchAddresses = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please login to view addresses');
            }

            const response = await axios.get('https://localhost:7172/api/UserAddress', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (response.status !== 200) {
                throw new Error('Failed to fetch addresses');
            }

            return response.data;
        } catch (err) {
            showError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }, [showError]);

    const saveAddress = useCallback(async (formData, editingAddress) => {
        try {
            const token = localStorage.getItem('token');
            const url = editingAddress 
                ? `https://localhost:7172/api/UserAddress/${editingAddress.id}`
                : 'https://localhost:7172/api/UserAddress';
            
            const method = editingAddress ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                throw new Error('Failed to save address');
            }

            showSuccess(editingAddress ? 'Address updated successfully' : 'Address added successfully');
            return true;
        } catch (err) {
            showError(err.message);
            throw err;
        }
    }, [showSuccess, showError]);

    const deleteAddress = useCallback(async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7172/api/UserAddress/${addressId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to delete address');
            }

            showSuccess('Address deleted successfully');
            return true;
        } catch (err) {
            showError(err.message);
            throw err;
        }
    }, [showSuccess, showError]);

    const setDefaultAddress = useCallback(async (addressId) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7172/api/UserAddress/${addressId}/set-default`, {
                method: 'PUT',
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to set default address');
            }

            showSuccess('Default address updated successfully');
            return true;
        } catch (err) {
            showError(err.message);
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