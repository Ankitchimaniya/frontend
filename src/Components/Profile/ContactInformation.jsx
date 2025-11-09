import React from 'react';
import { FaPhone } from 'react-icons/fa';

const ContactInformation = ({ profile, onChange }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                <FaPhone className="mr-2 text-primary-500" />
                Contact Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Primary Mobile Number
                    </label>
                    <input
                        type="tel"
                        name="primaryMobileNumber"
                        value={profile.primaryMobileNumber || ''}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter primary mobile number"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Secondary Mobile Number
                    </label>
                    <input
                        type="tel"
                        name="secondaryMobileNumber"
                        value={profile.secondaryMobileNumber || ''}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Enter secondary mobile number (optional)"
                    />
                </div>
            </div>
        </div>
    );
};

export default ContactInformation;