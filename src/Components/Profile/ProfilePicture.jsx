import React from 'react';
import { FaUser, FaCamera } from 'react-icons/fa';

const ProfilePicture = ({ imagePreview, onImageChange }) => {
    return (
        <div className="text-center pb-6 border-b border-gray-200">
            <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-food rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden">
                    {imagePreview ? (
                        <img 
                            src={imagePreview} 
                            alt="Profile" 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <FaUser className="text-white text-2xl" />
                    )}
                </div>
                <label className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-50 transition-colors">
                    <FaCamera className="text-gray-600" />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={onImageChange}
                        className="hidden"
                    />
                </label>
            </div>
            <p className="text-sm text-gray-600">Click camera icon to change profile picture</p>
        </div>
    );
};

export default ProfilePicture;