import React from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const MenuItemModal = ({ 
    show, 
    editingItem, 
    formData, 
    submitting, 
    uploadProgress, 
    imageFile,
    onSubmit, 
    onCancel, 
    onInputChange, 
    onFileChange 
}) => {
    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onCancel}>
            <div className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-6 border-b border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-800">
                        {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
                    </h3>
                    <button className="text-gray-500 hover:text-gray-700 p-2 transition-colors duration-200" onClick={onCancel}>
                        <FaTimes className="text-xl" />
                    </button>
                </div>
                
                <form onSubmit={onSubmit} className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Item Name *</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={onInputChange}
                                placeholder="Enter item name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Price *</label>
                            <input
                                type="number"
                                name="price"
                                value={formData.price}
                                onChange={onInputChange}
                                placeholder="0.00"
                                step="0.01"
                                min="0"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                required
                            />
                        </div>
                    </div>
                    
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={onInputChange}
                            placeholder="Enter item description"
                            rows="3"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
                            required
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                            <input
                                type="text"
                                name="category"
                                value={formData.category}
                                onChange={onInputChange}
                                placeholder="e.g., Pizza, Salads, Main Course"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                                required
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">Item Image</label>
                            <div className="space-y-4">
                                {editingItem && formData.imageUrl && !imageFile && (
                                    <div>
                                        <p className="text-sm text-gray-600 mb-2">Current Image:</p>
                                        <img 
                                            src={getImageUrl(formData.imageUrl)} 
                                            alt="Current item" 
                                            className="w-32 h-24 object-cover rounded-lg border border-gray-300"
                                        />
                                    </div>
                                )}
                                
                                <div>
                                    <label className="block">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={onFileChange}
                                            className="hidden"
                                        />
                                        <span className="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg cursor-pointer transition-colors duration-200">
                                            📁 {editingItem ? 'Change Image' : 'Upload Image'}
                                        </span>
                                    </label>
                                    
                                    {imageFile && (
                                        <div className="mt-4 space-y-2">
                                            <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>
                                            <img 
                                                src={URL.createObjectURL(imageFile)} 
                                                alt="Preview" 
                                                className="w-32 h-24 object-cover rounded-lg border border-gray-300"
                                            />
                                        </div>
                                    )}
                                </div>
                                
                                {uploadProgress && (
                                    <div className="text-sm text-gray-600 p-3 bg-gray-50 rounded-lg">
                                        {uploadProgress}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isVeg"
                                checked={formData.isVeg}
                                onChange={onInputChange}
                                className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">Vegetarian</label>
                        </div>
                        
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                name="isAvailable"
                                checked={formData.isAvailable}
                                onChange={onInputChange}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                            />
                            <label className="ml-2 text-sm font-medium text-gray-700">Available</label>
                        </div>
                    </div>
                    
                    <div className="flex justify-end gap-4 pt-6 border-t border-gray-200">
                        <button 
                            type="button" 
                            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors duration-200" 
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={submitting}
                            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-semibold flex items-center gap-2 transition-colors duration-200"
                        >
                            {submitting ? (
                                <>
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    {editingItem ? 'Updating...' : 'Adding...'}
                                </>
                            ) : (
                                <>
                                    <FaSave /> {editingItem ? 'Update Item' : 'Add Item'}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default MenuItemModal;