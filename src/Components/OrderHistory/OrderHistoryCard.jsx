import React from 'react';
import { FaMapMarkerAlt, FaCreditCard, FaClock, FaEye, FaTimes } from 'react-icons/fa';

const OrderHistoryCard = ({ 
    order, 
    getStatusColor, 
    formatDate, 
    onViewDetails, 
    onCancelOrder 
}) => {
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6">
                {/* Order Header */}
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">
                                {order.restaurantName}
                            </h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                                {order.orderStatus}
                            </span>
                        </div>
                        <p className="text-sm text-gray-600">
                            Order #{order.orderNumber} • {formatDate(order.createdAt)}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xl font-bold text-gray-900">₹{order.totalAmount}</p>
                        <p className="text-sm text-gray-600">{order.totalItems} items</p>
                    </div>
                </div>

                {/* Order Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="flex items-center space-x-2">
                        <FaMapMarkerAlt className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {order.deliveryAddress.label} - {order.deliveryAddress.city}
                        </span>
                    </div>
                    <div className="flex items-center space-x-2">
                        <FaCreditCard className="text-gray-400" />
                        <span className="text-sm text-gray-600">
                            {order.paymentMethod} • {order.paymentStatus}
                        </span>
                    </div>
                    {order.estimatedDeliveryTime && (
                        <div className="flex items-center space-x-2">
                            <FaClock className="text-gray-400" />
                            <span className="text-sm text-gray-600">
                                {formatDate(order.estimatedDeliveryTime)}
                            </span>
                        </div>
                    )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex space-x-3">
                        <button
                            onClick={() => onViewDetails(order.id)}
                            className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
                        >
                            <FaEye className="text-sm" />
                            <span>View Details</span>
                        </button>
                        
                        {order.orderStatus === 'Placed' && (
                            <button
                                onClick={() => onCancelOrder(order.id)}
                                className="flex items-center space-x-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-sm" />
                                <span>Cancel Order</span>
                            </button>
                        )}
                    </div>
                    
                    {order.orderStatus === 'Delivered' && (
                        <button className="px-4 py-2 bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white rounded-lg transition-all duration-200">
                            Reorder
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default OrderHistoryCard;