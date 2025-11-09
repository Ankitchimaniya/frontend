import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import AlertContainer from './AlertContainer';
import getImageUrl from "../GenericFunctions/getImageUrl.jsx";

// Component imports
import PageHeader from './Common/PageHeader';
import LoadingSpinner from './Common/LoadingSpinner';
import ProfilePicture from './Profile/ProfilePicture';
import PersonalInformation from './Profile/PersonalInformation';
import ContactInformation from './Profile/ContactInformation';
import ProfilePreferences from './Profile/ProfilePreferences';
import SubmitButton from './Profile/SubmitButton';
import useProfileService from '../hooks/useProfileService';

const ProfileManagement = () => {
    const navigate = useNavigate();
    const { alerts, showSuccess, showError, removeAlert } = useAlert();
    const { loading, saving, fetchProfile, updateProfile, validateImageFile } = useProfileService(showSuccess, showError);
    
    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        email: '',
        primaryMobileNumber: '',
        secondaryMobileNumber: '',
        dateOfBirth: '',
        gender: '',
        profileImageUrl: '',
        preferredLanguage: 'English',
        emailNotifications: true,
        smsNotifications: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        const loadProfile = async () => {
            const profileData = await fetchProfile();
            if (profileData) {
                setProfile(prevProfile => ({
                    ...prevProfile,
                    ...profileData,
                    dateOfBirth: profileData.dateOfBirth ? profileData.dateOfBirth.split('T')[0] : ''
                }));
                
                if (profileData.profileImageUrl) {
                    setImagePreview(getImageUrl(profileData.profileImageUrl.slice(1)));
                }
            }
        };
        loadProfile();
    }, [fetchProfile]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setProfile(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validation = validateImageFile(file);
            if (!validation.isValid) {
                showError(validation.message);
                return;
            }

            setImageFile(file);
            
            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const success = await updateProfile(profile, imageFile);
            if (success) {
                setImageFile(null);
                // Reload the profile to get updated data including new image URL
                const updatedProfile = await fetchProfile();
                if (updatedProfile) {
                    setProfile(prev => ({
                        ...prev,
                        ...updatedProfile
                    }));
                    if (updatedProfile.profileImageUrl) {
                        setImagePreview(`https://localhost:7172/api/Images/File${updatedProfile.profileImageUrl}`);
                    }
                }
            }
        } catch (error) {
            // Error is already handled in updateProfile
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading profile..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            {/* Alert Container */}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            <div className="max-w-2xl mx-auto px-4">
                {/* Header */}
                <PageHeader 
                    title="Edit Profile"
                    subtitle="Update your personal information and preferences"
                    onBack={() => navigate('/')}
                    backText="Back to User Mode"
                />

                {/* Profile Form */}
                <div className="bg-white rounded-lg shadow-sm">
                    <form onSubmit={handleSubmit} className="p-6 space-y-6">
                        <ProfilePicture 
                            imagePreview={imagePreview}
                            onImageChange={handleImageChange}
                        />

                        <PersonalInformation 
                            profile={profile}
                            onChange={handleInputChange}
                        />

                        <ContactInformation 
                            profile={profile}
                            onChange={handleInputChange}
                        />

                        <ProfilePreferences 
                            profile={profile}
                            onChange={handleInputChange}
                        />

                        <SubmitButton 
                            saving={saving}
                        />
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ProfileManagement;