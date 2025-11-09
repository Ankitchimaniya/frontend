import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';

const DeliveryAddress = ({ deliveryAddress }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
                <FaMapMarkerAlt className="text-primary-600" />
                <h3 className="text-lg font-bold text-gray-900">Delivery Address</h3>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-gray-900">{deliveryAddress.label}</p>
                <p className="text-gray-700">
                    {deliveryAddress.addressLine1}
                    {deliveryAddress.addressLine2 && `, ${deliveryAddress.addressLine2}`}
                </p>
                <p className="text-gray-700">
                    {deliveryAddress.city}, {deliveryAddress.state} - {deliveryAddress.postalCode}
                </p>
                {deliveryAddress.landmark && (
                    <p className="text-gray-600 text-sm">Near {deliveryAddress.landmark}</p>
                )}
            </div>
        </div>
    );
};

export default DeliveryAddress;