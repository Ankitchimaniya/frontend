import React from 'react';

const NotFoundState = ({ onBackClick }) => {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center py-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
                    <button
                        onClick={onBackClick}
                        className="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors"
                    >
                        Back to Orders
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundState;