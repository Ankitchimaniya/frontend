import React from 'react';

const RestaurantListHeader = ({ onBackToUserMode, onAddRestaurant }) => {
    return (
        <div className="max-w-7xl mx-auto mb-8 flex justify-between items-center flex-wrap gap-4">
            <button 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                onClick={onBackToUserMode}
                title="Back to User Mode"
            >
                <span>⬅️</span>
                Back to User Mode
            </button>
            <h1 className="text-4xl font-bold text-white text-center flex-1"> All Restaurants </h1>
            <button 
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-300 hover:-translate-y-1 shadow-lg hover:shadow-xl" 
                onClick={onAddRestaurant}
                title="Add New Restaurant"
            >
                <span>➕</span>
                Add Restaurant
            </button>
        </div>
    );
};

export default RestaurantListHeader;