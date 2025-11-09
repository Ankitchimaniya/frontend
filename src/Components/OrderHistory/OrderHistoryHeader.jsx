import React from 'react';
import { FaHistory, FaArrowLeft } from 'react-icons/fa';

const OrderHistoryHeader = ({ onBackToHome }) => {
    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                        <FaHistory className="mr-3 text-primary-500" />
                        Order History
                    </h1>
                    <p className="text-gray-600 mt-1">Track your food orders and reorder your favorites</p>
                </div>
                <button
                    onClick={onBackToHome}
                    className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                >
                    <FaArrowLeft className="text-sm" />
                    <span>Back to Home</span>
                </button>
            </div>
        </div>
    );
};

export default OrderHistoryHeader;