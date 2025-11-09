import React from 'react';
import { FaClock } from 'react-icons/fa';
import { MdDeliveryDining } from 'react-icons/md';

const DeliveryInfo = ({ order }) => {
    // Don't render if no delivery info available
    if (!order.estimatedDeliveryTime) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Delivery Information</h3>
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <FaClock className="text-gray-400" />
                    <div>
                        <p className="text-gray-700">Estimated Delivery</p>
                        <p className="text-sm text-gray-600">
                            {new Date(order.estimatedDeliveryTime).toLocaleString()}
                        </p>
                    </div>
                </div>
                {order.actualDeliveryTime && (
                    <div className="flex items-center space-x-3">
                        <MdDeliveryDining className="text-gray-400" />
                        <div>
                            <p className="text-gray-700">Actual Delivery</p>
                            <p className="text-sm text-gray-600">
                                {new Date(order.actualDeliveryTime).toLocaleString()}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryInfo;