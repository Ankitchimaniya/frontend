import { useState, useCallback } from 'react';

export const useProfileService = (showSuccess, showError) => {
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);

    const fetchProfile = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please login to view profile');
            }

            const response = await fetch('https://localhost:7172/api/UserProfile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (!response.ok) {
                throw new Error('Failed to fetch profile');
            }

            const data = await response.json();
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
            const token = localStorage.getItem('token');
            
            // First, update the profile data (without image)
            const response = await fetch('https://localhost:7172/api/UserProfile', {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: profileData.firstName,
                    lastName: profileData.lastName,
                    primaryMobileNumber: profileData.primaryMobileNumber,
                    secondaryMobileNumber: profileData.secondaryMobileNumber,
                    dateOfBirth: profileData.dateOfBirth ? new Date(profileData.dateOfBirth).toISOString() : null,
                    gender: profileData.gender,
                    preferredLanguage: profileData.preferredLanguage || 'English',
                    emailNotifications: profileData.emailNotifications,
                    smsNotifications: profileData.smsNotifications
                })
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Failed to update profile');
            }

            // If there's an image file, upload it separately
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);

                const imageResponse = await fetch('https://localhost:7172/api/UserProfile/upload-image', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });

                if (!imageResponse.ok) {
                    const errorData = await imageResponse.text();
                    throw new Error(errorData || 'Failed to upload profile image');
                }
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