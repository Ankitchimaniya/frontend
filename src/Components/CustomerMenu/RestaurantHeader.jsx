import React from 'react';
import { FaStar, FaClock, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const RestaurantHeader = ({ restaurant, onGoBack }) => {
    return (
        <div className="relative bg-white shadow-lg">
            <button 
                className="absolute top-3 left-3 sm:top-5 sm:left-5 z-20 bg-white/95 backdrop-blur-sm border-none py-2 px-3 sm:py-3 sm:px-5 rounded-full font-semibold text-gray-800 cursor-pointer flex items-center gap-2 transition-all duration-300 hover:bg-white hover:shadow-lg hover:-translate-y-0.5 text-sm sm:text-base"
                onClick={onGoBack}
            >
                <FaArrowLeft className="text-sm" /> <span className="hidden sm:inline">Back</span>
            </button>
            
            <div className="relative h-64 sm:h-80 overflow-hidden">
                <img 
                    src={getImageUrl(restaurant.imageUrl)} 
                    alt={restaurant.title}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8 text-white">
                    <h1 className="text-2xl sm:text-4xl font-bold mb-3 sm:mb-4 drop-shadow-lg animate-slide-up">{restaurant.title}</h1>
                    <div className="flex flex-wrap gap-2 sm:gap-5 mb-3">
                        <div className="flex items-center gap-1 sm:gap-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-sm text-sm sm:text-base">
                            <FaStar className="text-secondary-300 text-xs sm:text-sm" />
                            <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-sm text-sm sm:text-base">
                            <FaClock className="text-secondary-300 text-xs sm:text-sm" />
                            <span>{restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} mins</span>
                        </div>
                        <div className="flex items-center gap-1 sm:gap-2 bg-white/20 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full backdrop-blur-sm text-sm sm:text-base">
                            <FaMapMarkerAlt className="text-secondary-300 text-xs sm:text-sm" />
                            <span className="truncate max-w-24 sm:max-w-none">{restaurant.location}</span>
                        </div>
                    </div>
                    <p className="text-sm sm:text-lg opacity-90 mb-3 line-clamp-2">{restaurant.cuisine}</p>
                    {restaurant.offer && (
                        <div className="inline-block bg-gradient-food px-4 py-2 rounded-full font-bold animate-pulse">
                            🎉 {restaurant.offer}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantHeader;