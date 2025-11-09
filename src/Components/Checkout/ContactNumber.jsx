import React from 'react';

const ContactNumber = ({ contactNumber, onContactNumberChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Number</h2>
            <input
                type="tel"
                value={contactNumber}
                onChange={(e) => onContactNumberChange(e.target.value)}
                placeholder="Enter contact number for delivery"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                required
            />
        </div>
    );
};

export default ContactNumber;