import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';

const OrderHeader = ({ 
    order, 
    onBackClick, 
    getStatusColor, 
    canCancelOrder, 
    onCancelClick 
}) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
                <button
                    onClick={onBackClick}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 bg-white px-4 py-2 rounded-lg shadow-sm hover:shadow-md border border-gray-200"
                >
                    <FaArrowLeft className="text-sm" />
                    <span className="font-medium">Back to Orders</span>
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order Details</h1>
                    <p className="text-gray-600 mt-1">Order #{order.orderNumber}</p>
                </div>
            </div>
            
            {/* Order Status */}
            <div className="flex items-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus}
                </span>
                {canCancelOrder(order.orderStatus) && (
                    <button
                        onClick={onCancelClick}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                    >
                        Cancel Order
                    </button>
                )}
            </div>
        </div>
    );
};

export default OrderHeader;