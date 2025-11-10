import React, { useState, useRef, useEffect } from 'react';
import { FaChevronDown, FaChevronUp, FaCheck, FaTimes } from 'react-icons/fa';

const CuisineSelector = ({ 
    selectedCuisines, 
    onCuisineChange, 
    categories, 
    errors, 
    loading 
}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const dropdownRef = useRef(null);

    // Handle clicking outside dropdown to close it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
                setSearchTerm("");
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
        setSearchTerm("");
    };

    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const removeAllCuisines = () => {
        onCuisineChange('CLEAR_ALL');
    };

    const selectAllCuisines = () => {
        onCuisineChange('SELECT_ALL', categories.map(c => c.name));
    };

    const handleKeyDown = (e, cuisine) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onCuisineChange('TOGGLE', cuisine);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
                Cuisine Type <span className="text-red-500">*</span>
            </label>
            
            {/* Selected Cuisines Display */}
            {selectedCuisines.length > 0 && (
                <div className="selected-cuisines-container mb-3">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-gray-700">
                            Selected ({selectedCuisines.length})
                        </span>
                        <button
                            type="button"
                            onClick={removeAllCuisines}
                            className="text-xs text-red-600 hover:text-red-800 underline"
                            disabled={loading}
                        >
                            Clear All
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedCuisines.map((cuisine) => (
                            <span
                                key={cuisine}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800 border border-primary-200"
                            >
                                <span className="mr-1">🍽️</span>
                                {cuisine}
                                <button
                                    type="button"
                                    onClick={() => onCuisineChange('TOGGLE', cuisine)}
                                    className="ml-2 inline-flex items-center justify-center w-4 h-4 rounded-full bg-primary-200 text-primary-600 hover:bg-primary-300 transition-colors duration-150"
                                    disabled={loading}
                                >
                                    <FaTimes className="text-xs" />
                                </button>
                            </span>
                        ))}
                    </div>
                </div>
            )}

            {/* Multi-Select Dropdown */}
            <div className="relative" ref={dropdownRef}>
                <button
                    type="button"
                    onClick={toggleDropdown}
                    disabled={loading}
                    aria-expanded={dropdownOpen}
                    aria-haspopup="listbox"
                    aria-label="Select cuisine types"
                    className={`w-full flex items-center justify-between px-4 py-3 text-left bg-white border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors duration-200 ${
                        errors.cuisine ? 'border-red-300' : 'border-gray-300'
                    } ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-400'}`}
                >
                    <span className={selectedCuisines.length > 0 ? 'text-gray-900' : 'text-gray-500'}>
                        {selectedCuisines.length > 0
                            ? `${selectedCuisines.length} cuisine${selectedCuisines.length > 1 ? 's' : ''} selected`
                            : 'Select cuisine types'
                        }
                    </span>
                    {dropdownOpen ? (
                        <FaChevronUp className="text-gray-400" />
                    ) : (
                        <FaChevronDown className="text-gray-400" />
                    )}
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-hidden">
                        {/* Search Input */}
                        <div className="p-3 border-b border-gray-200">
                            <input
                                type="text"
                                placeholder="Search cuisines..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                            />
                        </div>

                        {/* Options List */}
                        <div className="max-h-48 overflow-y-auto">
                            {filteredCategories.length > 0 ? (
                                filteredCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        type="button"
                                        onClick={() => onCuisineChange('TOGGLE', category.name)}
                                        onKeyDown={(e) => handleKeyDown(e, category.name)}
                                        className={`w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none transition-colors duration-150 ${
                                            selectedCuisines.includes(category.name) ? 'bg-primary-50 text-primary-700' : 'text-gray-700'
                                        }`}
                                        disabled={loading}
                                    >
                                        <span className="flex items-center">
                                            <span className="mr-2">🍽️</span>
                                            {category.name}
                                        </span>
                                        {selectedCuisines.includes(category.name) && (
                                            <FaCheck className="text-primary-600" />
                                        )}
                                    </button>
                                ))
                            ) : (
                                <div className="px-4 py-6 text-center text-gray-500">
                                    <span>🔍</span>
                                    <p className="mt-2">No cuisines found</p>
                                    {searchTerm && (
                                        <p className="text-xs mt-1">Try a different search term</p>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        {categories.length > 0 && (
                            <div className="p-3 border-t border-gray-200 bg-gray-50">
                                <div className="flex items-center justify-between text-sm">
                                    <button
                                        type="button"
                                        onClick={selectAllCuisines}
                                        className="text-primary-600 hover:text-primary-800 font-medium transition-colors duration-150"
                                        disabled={loading || selectedCuisines.length === categories.length}
                                    >
                                        Select All
                                    </button>
                                    <button
                                        type="button"
                                        onClick={removeAllCuisines}
                                        className="text-gray-600 hover:text-gray-800 font-medium"
                                        disabled={loading || selectedCuisines.length === 0}
                                    >
                                        Clear All
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {errors.cuisine && <div className="form-error mt-1">{errors.cuisine}</div>}
        </div>
    );
};

export default CuisineSelector;