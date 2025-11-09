import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaPlus, FaCheck, FaHome, FaBriefcase } from 'react-icons/fa';

const AddressSelection = ({ addresses, selectedAddress, onAddressSelect }) => {
    const navigate = useNavigate();

    const getAddressIcon = (type) => {
        switch (type) {
            case 'Home':
                return <FaHome className="text-primary-500 text-lg mt-1" />;
            case 'Work':
                return <FaBriefcase className="text-primary-500 text-lg mt-1" />;
            default:
                return <FaMapMarkerAlt className="text-primary-500 text-lg mt-1" />;
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-primary-500" />
                    Delivery Address
                </h2>
                <button
                    onClick={() => navigate('/addresses')}
                    className="text-primary-500 hover:text-primary-600 text-sm font-medium flex items-center"
                >
                    <FaPlus className="mr-1" />
                    Add New
                </button>
            </div>

            {addresses.length === 0 ? (
                <div className="text-center py-6">
                    <p className="text-gray-600 mb-4">No saved addresses found</p>
                    <button
                        onClick={() => navigate('/addresses')}
                        className="bg-primary-500 text-white px-4 py-2 rounded-lg hover:bg-primary-600 transition-colors"
                    >
                        Add Address
                    </button>
                </div>
            ) : (
                <div className="space-y-3">
                    {addresses.map((address) => (
                        <div
                            key={address.id}
                            onClick={() => onAddressSelect(address)}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                                selectedAddress?.id === address.id
                                    ? 'border-primary-500 bg-primary-50'
                                    : 'border-gray-200 hover:border-gray-300'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex items-start space-x-3">
                                    {getAddressIcon(address.addressType)}
                                    <div>
                                        <p className="font-medium text-gray-900">{address.label}</p>
                                        <p className="text-sm text-gray-600 mt-1">
                                            {address.fullAddress}
                                        </p>
                                        {address.contactNumber && (
                                            <p className="text-xs text-gray-500 mt-1">
                                                📞 {address.contactNumber}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                {selectedAddress?.id === address.id && (
                                    <FaCheck className="text-primary-500" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AddressSelection;