import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const MenuItemCard = ({ item, onEdit, onDelete, onToggleAvailability }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="relative h-48 overflow-hidden">
                <img 
                    src={getImageUrl(item.imageUrl)} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                />
                <div className={`absolute top-3 left-3 w-6 h-6 border-2 flex items-center justify-center bg-white rounded-sm ${
                    item.isVeg ? 'border-green-500' : 'border-red-500'
                }`}>
                    <div className={`w-2 h-2 rounded-full ${
                        item.isVeg ? 'bg-green-500' : 'bg-red-500'
                    }`}></div>
                </div>
                <button 
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold cursor-pointer transition-colors duration-200 ${
                        item.isAvailable 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-red-100 text-red-800 hover:bg-red-200'
                    }`}
                    onClick={() => onToggleAvailability(item.id, item.isAvailable)}
                    title="Click to toggle availability"
                >
                    {item.isAvailable ? 'Available' : 'Unavailable'}
                </button>
            </div>
            
            <div className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                <div className="flex justify-between items-center mb-4">
                    <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        {item.category}
                    </span>
                    <span className="text-xl font-bold text-green-600">₹{item.price}</span>
                </div>
                
                <div className="flex gap-2">
                    <button 
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                        onClick={() => onEdit(item)}
                    >
                        <FaEdit /> Edit
                    </button>
                    <button 
                        className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors duration-200"
                        onClick={() => onDelete(item.id)}
                    >
                        <FaTrash /> Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;