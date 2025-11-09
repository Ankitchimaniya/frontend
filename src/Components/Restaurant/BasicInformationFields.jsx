import React from 'react';

function BasicInformationFields({ form, errors, loading, onChange }) {
    return (
        <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-800 border-b border-gray-200 pb-2 mb-6">
                Basic Information
            </h3>
            
            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Restaurant Title <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📝</span>
                    <input
                        name="title"
                        value={form.title}
                        onChange={onChange}
                        disabled={loading}
                        className={`w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 placeholder-gray-400 ${
                            errors.title ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter restaurant title"
                    />
                </div>
                {errors.title && <div className="text-sm text-red-600 mt-1">{errors.title}</div>}
            </div>

            <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                    Location <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg">📍</span>
                    <input
                        name="location"
                        value={form.location}
                        onChange={onChange}
                        disabled={loading}
                        className={`w-full pl-14 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 placeholder-gray-400 ${
                            errors.location ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter restaurant location"
                    />
                </div>
                {errors.location && <div className="text-sm text-red-600 mt-1">{errors.location}</div>}
            </div>
        </div>
    );
};

export default BasicInformationFields;