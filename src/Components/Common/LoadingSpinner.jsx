import React from 'react';

const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-center py-20">
                    <div className="text-center">
                        <div className="w-12 h-12 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mx-auto mb-4"></div>
                        <span className="text-gray-600 font-medium">{message}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoadingSpinner;