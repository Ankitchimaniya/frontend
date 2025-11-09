import React from 'react';

const LoadingState = () => {
    return (
        <div className="flex items-center justify-center py-12">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
            <span className="ml-3 text-gray-600">Loading order history...</span>
        </div>
    );
};

export default LoadingState;