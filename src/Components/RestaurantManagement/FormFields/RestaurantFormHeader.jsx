import React from 'react';
import { FaTimes, FaEdit, FaStore } from 'react-icons/fa';

const RestaurantFormHeader = ({ editMode, loading, onCancel }) => {
    return (
        <div className="bg-gradient-food text-white p-4 sm:p-6 relative">
            {(editMode || onCancel) && (
                <button 
                    className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors duration-200" 
                    type="button"   
                    onClick={() => {
                        if (typeof onCancel === "function") {
                            onCancel();
                        }
                    }}
                    disabled={loading}
                    title="Close"
                > 
                    <FaTimes className="text-xl" />
                </button>
            )}
            <div className="text-center">
                <div className="text-3xl sm:text-4xl mb-3 sm:mb-4">
                    {editMode ? <FaEdit /> : <FaStore />}
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold mb-2">
                    {editMode ? 'Edit Restaurant' : 'Add New Restaurant'}
                </h2>
                <p className="text-white/90 text-sm sm:text-base">
                    {editMode 
                        ? 'Update the restaurant information below' 
                        : 'Fill in the details to add a new restaurant to our platform'
                    }
                </p>
            </div>
        </div>
    );
};

export default RestaurantFormHeader;