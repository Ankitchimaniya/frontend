import React from 'react';

const LoadingState = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-600 bg-gray-50">
            <div className="w-12 h-12 border-4 border-gray-200 border-t-red-500 rounded-full animate-spin mb-5"></div>
            <p className="text-lg font-medium text-gray-700">Loading delicious menu...</p>
        </div>
    );
};

export default LoadingState;