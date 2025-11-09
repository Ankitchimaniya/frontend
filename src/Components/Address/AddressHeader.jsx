import React from 'react';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const AddressHeader = ({ onAddNew }) => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
            <div className="flex items-center space-x-4">
                <button
                    onClick={() => navigate('/')}
                    className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-200 bg-white px-4 py-2.5 rounded-xl shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300 group"
                >
                    <FaArrowLeft className="text-sm group-hover:-translate-x-0.5 transition-transform duration-200" />
                    <span className="font-medium">Back to Home</span>
                </button>
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent mb-1 tracking-tight">
                        Manage Addresses
                    </h1>
                    <p className="text-gray-600 font-medium">Add and organize your delivery addresses</p>
                </div>
            </div>
            <button
                onClick={onAddNew}
                className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-6 py-3 rounded-xl font-semibold flex items-center space-x-2 transition-all duration-200 hover:-translate-y-0.5 shadow-lg hover:shadow-xl group"
            >
                <FaPlus className="text-sm group-hover:rotate-90 transition-transform duration-200" />
                <span>Add New Address</span>
            </button>
        </div>
    );
};

export default AddressHeader;