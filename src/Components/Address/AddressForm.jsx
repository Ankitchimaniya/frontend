import React from 'react';
import { FaPlus, FaEdit } from 'react-icons/fa';

const AddressForm = ({ 
    formData,
    onInputChange,
    onSubmit,
    onCancel,
    submitting,
    editingAddress 
}) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
            <div className="max-w-3xl w-full bg-white rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto border border-gray-200">
                <div className="px-8 py-6 border-b border-gray-200 bg-gradient-to-r from-primary-50 to-orange-50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
                                {editingAddress ? <FaEdit className="text-white text-lg" /> : <FaPlus className="text-white text-lg" />}
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {editingAddress ? 'Edit Address' : 'Add New Address'}
                                </h2>
                                <p className="text-sm text-gray-600 mt-1">
                                    {editingAddress ? 'Update your delivery address details' : 'Add a new delivery address to your account'}
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={onCancel} 
                            className="text-gray-400 hover:text-gray-600 p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 group"
                            disabled={submitting}
                        >
                            <span className="text-2xl group-hover:rotate-90 transition-transform duration-200">×</span>
                        </button>
                    </div>
                </div>

                <form onSubmit={onSubmit} className="p-8 space-y-8">
                    {/* Address Label */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Address Label <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="label"
                            value={formData.label}
                            onChange={onInputChange}
                            placeholder="e.g., Home, Office, Apartment, etc."
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            required
                            disabled={submitting}
                        />
                    </div>

                    {/* Address Lines */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Address Line 1 <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="addressLine1"
                                value={formData.addressLine1}
                                onChange={onInputChange}
                                placeholder="House/Flat/Office No., Building Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                required
                                disabled={submitting}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Address Line 2
                            </label>
                            <input
                                type="text"
                                name="addressLine2"
                                value={formData.addressLine2}
                                onChange={onInputChange}
                                placeholder="Street, Area, Locality"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                disabled={submitting}
                            />
                        </div>
                    </div>

                    {/* City, State, Postal Code */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                City <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={onInputChange}
                                placeholder="City"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                required
                                disabled={submitting}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                State <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="state"
                                value={formData.state}
                                onChange={onInputChange}
                                placeholder="State"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                required
                                disabled={submitting}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Postal Code <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="postalCode"
                                value={formData.postalCode}
                                onChange={onInputChange}
                                placeholder="Postal Code"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                required
                                disabled={submitting}
                            />
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Country <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="country"
                            value={formData.country}
                            onChange={onInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                            required
                            disabled={submitting}
                        >
                            <option value="India">India</option>
                            <option value="USA">United States</option>
                            <option value="UK">United Kingdom</option>
                            <option value="Canada">Canada</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </div>

                    {/* Additional Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Landmark
                            </label>
                            <input
                                type="text"
                                name="landmark"
                                value={formData.landmark}
                                onChange={onInputChange}
                                placeholder="Nearby landmark"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                disabled={submitting}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Address Type
                            </label>
                            <select
                                name="addressType"
                                value={formData.addressType}
                                onChange={onInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                disabled={submitting}
                            >
                                <option value="Home">Home</option>
                                <option value="Office">Office</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Contact Person Name
                            </label>
                            <input
                                type="text"
                                name="contactPersonName"
                                value={formData.contactPersonName}
                                onChange={onInputChange}
                                placeholder="Contact person name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                disabled={submitting}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-3">
                                Contact Number
                            </label>
                            <input
                                type="tel"
                                name="contactNumber"
                                value={formData.contactNumber}
                                onChange={onInputChange}
                                placeholder="Contact number"
                                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                                disabled={submitting}
                            />
                        </div>
                    </div>

                    {/* Delivery Instructions */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                            Delivery Instructions
                        </label>
                        <textarea
                            name="deliveryInstructions"
                            value={formData.deliveryInstructions}
                            onChange={onInputChange}
                            placeholder="Special delivery instructions"
                            rows="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                            disabled={submitting}
                        />
                    </div>

                    {/* Default Address Checkbox */}
                    <div className="flex items-center bg-gray-50 p-4 rounded-xl">
                        <input
                            type="checkbox"
                            id="isDefault"
                            name="isDefault"
                            checked={formData.isDefault}
                            onChange={onInputChange}
                            className="h-5 w-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500 focus:ring-2"
                            disabled={submitting}
                        />
                        <label htmlFor="isDefault" className="ml-3 text-sm font-medium text-gray-700">
                            Set as default address for deliveries
                        </label>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-4 pt-8 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onCancel}
                            className="px-8 py-3 border-2 border-gray-300 rounded-xl text-gray-700 font-semibold hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={submitting}
                            className="px-8 py-3 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-3 shadow-lg hover:shadow-xl"
                        >
                            {submitting && (
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            )}
                            <span>
                                {submitting 
                                    ? 'Saving...' 
                                    : (editingAddress ? 'Update Address' : 'Add Address')
                                }
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddressForm ;