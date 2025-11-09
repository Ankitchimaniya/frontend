import React from 'react';
import { FaCreditCard } from 'react-icons/fa';

const PaymentInfo = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Payment Information</h3>
            <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-400" />
                <span className="text-gray-700">{order.paymentMethod}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    order.paymentStatus === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                    {order.paymentStatus}
                </span>
            </div>
        </div>
    );
};

export default PaymentInfo;