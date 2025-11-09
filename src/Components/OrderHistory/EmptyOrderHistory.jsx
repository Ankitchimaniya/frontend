import React from 'react';
import { FaHistory } from 'react-icons/fa';

const EmptyOrderHistory = () => {
    return (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm">
            <FaHistory className="mx-auto text-gray-400 text-4xl mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No orders found</h3>
            <p className="text-gray-600 mb-6">Start ordering from your favorite restaurants</p>
        </div>
    );
};

export default EmptyOrderHistory;