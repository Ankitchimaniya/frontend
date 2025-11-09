import { useState, useCallback } from 'react';
import apiClient from '../services/apiClient';

export const useProfileService = (showSuccess, showError) => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const response = await apiClient.get('/UserProfile');
            const data = response.data;
            return {
                ...data,
                dateOfBirth: data.dateOfBirth ? data.dateOfBirth.split('T')[0] : ''
            };
        } catch (err) {
            showError(err.message || 'Failed to load profile');
            throw err;
        } finally {
            setLoading(false);
        }
    }, [showError]);

    const updateProfile = useCallback(async (profileData, imageFile) => {
        setSaving(true);
        try {
            // First, update the profile data (without image)
            await apiClient.put('/UserProfile', {
                firstName: profileData.firstName,
                lastName: profileData.lastName,
                primaryMobileNumber: profileData.primaryMobileNumber,
                secondaryMobileNumber: profileData.secondaryMobileNumber,
                dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString() : null,
                gender: profileData.gender,
                preferredLanguage: profileData.preferredLanguage || 'English',
                emailNotifications: profileData.emailNotifications,
                smsNotifications: profileData.smsNotifications
            });

            // If there's an image file, upload it separately
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                await apiClient.post('/UserProfile/upload-image', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
            }

            showSuccess('Profile updated successfully');
            return true;
        } catch (err) {
            showError(err.message || 'Failed to update profile');
            throw err;
        } finally {
            setSaving(false);
        }
    }, [showSuccess, showError]);

    const validateImageFile = useCallback((file) => {
        if (!file.type.startsWith('image/')) {
            return {
                isValid: false,
                message: 'Please select a valid image file'
            };
        }
        
        if (file.size > 5 * 1024 * 1024) {
            return {
                isValid: false,
                message: 'Image size must be less than 5MB'
            };
        }

        return {
            isValid: true,
            message: ''
        };
    }, []);

    return {
        loading,
        saving,
        fetchProfile,
        updateProfile,
        validateImageFile
    };
};

export default useProfileService;