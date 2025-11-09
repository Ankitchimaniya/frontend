import React from 'react';

const NotFoundState = ({ onGoBack }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center text-gray-600 bg-gray-50">
            <p className="text-lg mb-4 text-gray-700">😕 Restaurant not found</p>
            <button 
                onClick={onGoBack} 
                className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
                Go Back
            </button>
        </div>
    );
};

export default NotFoundState;