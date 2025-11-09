import React from "react";
import { FaStar, FaClock, FaMapMarkerAlt, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import getImageUrl from "../GenericFunctions/getImageUrl.jsx";

export default function Card(props) {
    const navigate = useNavigate();
    
    const handleCardClick = () => {
        navigate(`/restaurant/${props.id}/menu`);
    };
    
    return (
        <div 
            className="group relative w-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 sm:hover:-translate-y-3 hover:rotate-1 overflow-hidden border border-neutral-100 cursor-pointer"
            onClick={handleCardClick}
        >
            {/* Image Container */}
            <div className="relative h-48 sm:h-52 overflow-hidden">
                <img 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                    src={getImageUrl(props.imageUrl)} 
                    alt={props.title}
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60"></div>
                
                {/* Favorite Button */}
                <button 
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 hover:scale-110"
                    onClick={(e) => e.stopPropagation()}
                >
                    <FaHeart className="text-xs sm:text-sm text-gray-400 hover:text-red-500 transition-colors duration-200" />
                </button>
                
                {/* Offer Badge */}
                {props.offer && (
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                        <div className="bg-gradient-food text-white px-2 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg animate-pulse">
                            🎉 <span className="hidden sm:inline">{props.offer}</span><span className="sm:hidden">{props.offer.split(' ')[0]}</span>
                        </div>
                    </div>
                )}
                
                {/* Rating Badge */}
                <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4">
                    <div className="bg-gradient-success text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold flex items-center space-x-1 shadow-lg backdrop-blur-sm">
                        <FaStar className="text-xs" />
                        <span>{props.rating || 'New'}</span>
                    </div>
                </div>
            </div>
            
            {/* Content Container */}
            <div className="p-4 sm:p-6">
                {/* Restaurant Title */}
                <div className="mb-3">
                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors duration-200"> 
                        {props.title}
                    </h3>
                    
                    {/* Delivery Time with Icon */}
                    <div className="flex items-center space-x-2 text-gray-600">
                        <div className="flex items-center space-x-1 bg-neutral-100 px-2 py-1 sm:px-3 sm:py-1 rounded-full">
                            <FaClock className="text-xs text-brand-500" />
                            <span className="text-xs sm:text-sm font-medium">
                                {props.minDeliveryTime}-{props.maxDeliveryTime} mins
                            </span>
                        </div>
                    </div>
                </div>
                
                {/* Cuisine Tags */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                        {props.cuisine && props.cuisine.split(',').slice(0, 2).map((cuisine, index) => (
                            <span 
                                key={index}
                                className="px-3 py-1 bg-gradient-to-r from-brand-100 to-secondary-100 text-brand-700 text-xs font-semibold rounded-full border border-brand-200"
                            >
                                {cuisine.trim()}
                            </span>
                        ))}
                        {props.cuisine && props.cuisine.split(',').length > 2 && (
                            <span className="px-3 py-1 bg-neutral-100 text-neutral-600 text-xs font-semibold rounded-full">
                                +{props.cuisine.split(',').length - 2} more
                            </span>
                        )}
                    </div>
                </div>
                
                {/* Location */}
                <div className="flex items-center space-x-2 text-gray-500 mb-4">
                    <FaMapMarkerAlt className="text-sm text-red-500" />
                    <span className="text-sm font-medium line-clamp-1">
                        {props.location}
                    </span>
                </div>
                
                {/* Action Button */}
                <button 
                    className="w-full bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    onClick={(e) => {
                        e.stopPropagation();
                        handleCardClick();
                    }}
                >
                    <span className="flex items-center justify-center space-x-2">
                        <span>View Menu</span>
                        <span className="text-lg">🍽️</span>
                    </span>
                </button>
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary-200/30 to-transparent rounded-full transform translate-x-8 -translate-y-8"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 bg-gradient-to-tr from-secondary-200/30 to-transparent rounded-full transform -translate-x-6 translate-y-6"></div>
        </div>
    );
}
