import React from 'react';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const RestaurantCard = ({ 
    restaurant, 
    onImageClick, 
    onEdit, 
    onDelete 
}) => {
    return (
        <div key={restaurant.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden">
            <div className="relative h-48 overflow-hidden"> 
                <img
                    src={getImageUrl(restaurant.imageUrl)}
                    alt={restaurant.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 cursor-pointer"
                    onClick={() => onImageClick(restaurant.id)}
                    title="Click to manage restaurant menu"
                />
                {restaurant.offer && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                        {restaurant.offer}
                    </div>
                )}
            </div>
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2 truncate">{restaurant.title}</h3>
                <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">⭐ {restaurant.rating}</span>
                    </div>
                    <div className="text-gray-600 text-sm">
                        {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} mins
                    </div>
                </div>
                <p className="text-gray-600 text-sm mb-2 truncate">{restaurant.cuisine}</p>
                <p className="text-gray-500 text-xs mb-4 truncate">{restaurant.location}</p>
                
                <div className="flex gap-2">
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors duration-200" 
                        onClick={() => onEdit(restaurant.id)}
                        title="Edit Restaurant"
                    >
                        <span>✏️</span>
                        Edit
                    </button>
                    <button 
                        className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-colors duration-200" 
                        onClick={() => onDelete(restaurant.id)}
                        title="Delete Restaurant"
                    >
                        <span>🗑️</span>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;