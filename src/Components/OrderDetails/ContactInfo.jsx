import React from 'react';
import { FaPhone, FaUser } from 'react-icons/fa';

const ContactInfo = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h3>
            <div className="space-y-3">
                <div className="flex items-center space-x-3">
                    <FaPhone className="text-gray-400" />
                    <span className="text-gray-700">{order.contactNumber}</span>
                </div>
                {order.deliveryAddress.contactPersonName && (
                    <div className="flex items-center space-x-3">
                        <FaUser className="text-gray-400" />
                        <span className="text-gray-700">{order.deliveryAddress.contactPersonName}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ContactInfo;