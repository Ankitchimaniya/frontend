import React from 'react';
import { FaEdit, FaTrash, FaCheck, FaHome, FaBriefcase } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const AddressCard = ({ address, onEdit, onDelete, onSetDefault }) => {
    const getAddressIcon = (type) => {
        switch (type) {
            case 'Work': 
            case 'Office': 
                return <FaBriefcase className="text-blue-500" />;
            default: 
                return <FaHome className="text-primary-500" />;
        }
    };

    return (
        <div
            className={`bg-white rounded-xl shadow-sm border-2 p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 group ${
                address.isDefault 
                    ? 'border-primary-200 ring-2 ring-primary-100 bg-gradient-to-br from-primary-25 to-white' 
                    : 'border-gray-200 hover:border-primary-200'
            }`}
        >
            {/* Address Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-primary-100 transition-colors">
                        {getAddressIcon(address.addressType)}
                    </div>
                    <div>
                        <h3 className="font-semibold text-gray-900 text-lg">{address.label}</h3>
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                            address.addressType === 'Office' || address.addressType === 'Work'
                                ? 'text-blue-700 bg-blue-100'
                                : 'text-primary-700 bg-primary-100'
                        }`}>
                            {address.addressType}
                        </span>
                    </div>
                </div>
                {address.isDefault && (
                    <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold flex items-center shadow-sm">
                        <FaCheck className="mr-1.5 text-xs" />
                        Default
                    </span>
                )}
            </div>

            {/* Address Details */}
            <div className="space-y-3 mb-6">
                <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-gray-800 text-sm leading-relaxed font-medium">
                        {address.fullAddress || `${address.addressLine1}, ${address.city}, ${address.state} - ${address.postalCode}`}
                    </p>
                </div>
                {address.landmark && (
                    <div className="flex items-center text-gray-600 text-sm">
                        <MdLocationOn className="mr-2 text-primary-500" />
                        <span>Near {address.landmark}</span>
                    </div>
                )}
                {address.contactNumber && (
                    <div className="flex items-center text-gray-600 text-sm">
                        <span className="mr-2">📞</span>
                        <span>{address.contactNumber}</span>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex space-x-1">
                    <button
                        onClick={() => onEdit(address)}
                        className="text-blue-600 hover:text-blue-700 p-2.5 rounded-xl hover:bg-blue-50 transition-all duration-200 group"
                        title="Edit Address"
                    >
                        <FaEdit className="text-sm group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                        onClick={() => onDelete(address.id)}
                        className="text-red-600 hover:text-red-700 p-2.5 rounded-xl hover:bg-red-50 transition-all duration-200 group"
                        title="Delete Address"
                    >
                        <FaTrash className="text-sm group-hover:scale-110 transition-transform" />
                    </button>
                </div>
                {!address.isDefault && (
                    <button
                        onClick={() => onSetDefault(address.id)}
                        className="text-xs text-gray-600 hover:text-primary-600 font-semibold bg-gray-100 hover:bg-primary-100 px-3 py-1.5 rounded-lg transition-all duration-200"
                    >
                        Set as Default
                    </button>
                )}
            </div>
        </div>
    );
};

export default AddressCard;