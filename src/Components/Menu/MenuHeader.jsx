import React from 'react';
import { FaArrowLeft, FaStar, FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const MenuHeader = ({ restaurant, onBack }) => {
    return (
        <div className="relative bg-white shadow-lg">
            <button 
                className="absolute top-5 left-5 z-20 bg-white/95 backdrop-blur-sm border-none py-3 px-5 rounded-full font-semibold text-gray-800 cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5"
                onClick={onBack}
            >
                <FaArrowLeft /> Back to Restaurants
            </button>
            
            <div className="relative h-80 overflow-hidden">
                <img 
                    src={getImageUrl(restaurant.imageUrl)} 
                    alt={restaurant.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                    <h1 className="text-4xl font-bold mb-4 drop-shadow-lg">
                        Menu Management - {restaurant.title}
                    </h1>
                    <div className="flex flex-wrap gap-5">
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <FaStar className="text-yellow-400" />
                            <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <FaClock className="text-yellow-400" />
                            <span>{restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} mins</span>
                        </div>
                        <div className="flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-full backdrop-blur-sm">
                            <FaMapMarkerAlt className="text-yellow-400" />
                            <span>{restaurant.location}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuHeader;