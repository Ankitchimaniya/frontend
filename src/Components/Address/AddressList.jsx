import React from 'react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import AddressCard from './AddressCard';

const AddressList = ({ addresses, onEdit, onDelete, onSetDefault, onAddNew }) => {
    if (addresses.length === 0) {
        return (
            <div className="text-center py-16 bg-gradient-to-br from-gray-50 to-white rounded-xl border-2 border-dashed border-gray-200">
                <div className="w-20 h-20 mx-auto mb-6 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaMapMarkerAlt className="text-primary-500 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No addresses found</h3>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">Add your first delivery address to start ordering your favorite meals</p>
                <button
                    onClick={onAddNew}
                    className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
                >
                    Add Your First Address
                </button>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {addresses.map((address) => (
                <AddressCard
                    key={address.id}
                    address={address}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onSetDefault={onSetDefault}
                />
            ))}
        </div>
    );
};

export default AddressList;