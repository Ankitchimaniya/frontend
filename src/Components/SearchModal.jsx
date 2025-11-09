import React, { useState, useEffect } from 'react';
import { GoSearch } from "react-icons/go";
import { IoMdClose } from "react-icons/io";
import apiClient from '../services/apiClient';
import getImageUrl from '../GenericFunctions/getImageUrl';

const SearchModal = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    // Handle keyboard events for search modal
    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    // Debounced search effect
    useEffect(() => {
        if (!searchQuery.trim()) {
            setSearchResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            handleSearch(searchQuery);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [searchQuery]);

    // Reset search when modal closes
    useEffect(() => {
        if (!isOpen) {
            setSearchQuery('');
            setSearchResults([]);
            setIsSearching(false);
        }
    }, [isOpen]);

    const handleSearch = async (query) => {
        if (!query.trim()) {
            setSearchResults([]);
            return;
        }

        setIsSearching(true);
        try {
            let restaurants = [];
            let menuItems = [];

            // Try dedicated search endpoints first
            try {
                const restaurantResponse = await apiClient.get(`/RestaurantDetails/search?query=${encodeURIComponent(query)}`);
                restaurants = restaurantResponse.data || [];
            } catch (error) {
                // Fallback: Get all restaurants and filter client-side
                try {
                    const allRestaurantsResponse = await apiClient.get('/RestaurantDetails');
                    const allRestaurants = allRestaurantsResponse.data || [];
                    restaurants = allRestaurants.filter(restaurant => 
                        restaurant.title?.toLowerCase().includes(query.toLowerCase()) ||
                        restaurant.cuisine?.toLowerCase().includes(query.toLowerCase())
                    );
                } catch (fallbackError) {
                    console.warn('Restaurant search failed:', fallbackError);
                }
            }

            try {
                const menuResponse = await apiClient.get(`/MenuItem/search?query=${encodeURIComponent(query)}`);
                menuItems = menuResponse.data || [];
            } catch (error) {
                // If menu search endpoint doesn't exist, we skip menu items for now
                console.warn('Menu item search endpoint not available');
            }

            setSearchResults({
                restaurants: restaurants.slice(0, 5), // Limit to 5 results
                menuItems: menuItems.slice(0, 10) // Limit to 10 results
            });
        } catch (error) {
            console.error('Search error:', error);
            setSearchResults({ restaurants: [], menuItems: [] });
        } finally {
            setIsSearching(false);
        }
    };

    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const handleResultClick = (path) => {
        window.location.href = path;
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div 
            className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-start justify-center pt-20"
            onClick={onClose}
        >
            <div 
                className="bg-white w-full max-w-2xl mx-4 rounded-lg shadow-lg max-h-96 overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Search Header */}
                <div className="flex items-center border-b border-gray-200 p-4">
                    <GoSearch className="text-gray-400 mr-3 text-xl" />
                    <input
                        type="text"
                        placeholder="Search for restaurants, dishes..."
                        value={searchQuery}
                        onChange={handleSearchInputChange}
                        className="flex-1 outline-none text-lg"
                        autoFocus
                    />
                    <div className="hidden sm:flex items-center text-xs text-gray-400 mr-3">
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">Ctrl</kbd>
                        <span className="mx-1">+</span>
                        <kbd className="px-2 py-1 bg-gray-100 rounded border">K</kbd>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600"
                        aria-label="Close search"
                    >
                        <IoMdClose className="text-xl" />
                    </button>
                </div>

                {/* Search Results */}
                <div className="max-h-80 overflow-y-auto">
                    {isSearching ? (
                        <div className="p-6 text-center text-gray-500">
                            <div className="animate-spin w-6 h-6 border-2 border-orange-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                            Searching...
                        </div>
                    ) : searchQuery && (searchResults.restaurants?.length > 0 || searchResults.menuItems?.length > 0) ? (
                        <div className="p-4">
                            {/* Restaurant Results */}
                            {searchResults.restaurants?.length > 0 && (
                                <div className="mb-4">
                                    <h3 className="font-semibold text-gray-800 mb-2">Restaurants</h3>
                                    {searchResults.restaurants.map((restaurant) => (
                                        <div
                                            key={restaurant.id}
                                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                                            onClick={() => handleResultClick(`/restaurant/${restaurant.id}`)}
                                        >
                                            <img
                                                src={restaurant.imageUrl ? getImageUrl(restaurant.imageUrl) : '/placeholder-restaurant.jpg'}
                                                alt={restaurant.title}
                                                className="w-12 h-12 rounded object-cover mr-3"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-restaurant.jpg';
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{restaurant.title}</p>
                                                <p className="text-sm text-gray-500">{restaurant.cuisine}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Menu Item Results */}
                            {searchResults.menuItems?.length > 0 && (
                                <div>
                                    <h3 className="font-semibold text-gray-800 mb-2">Dishes</h3>
                                    {searchResults.menuItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer transition-colors"
                                            onClick={() => handleResultClick(`/restaurant/${item.restaurantId}`)}
                                        >
                                            <img
                                                src={item.imageUrl ? getImageUrl(item.imageUrl) : '/placeholder-food.jpg'}
                                                alt={item.name}
                                                className="w-12 h-12 rounded object-cover mr-3"
                                                onError={(e) => {
                                                    e.target.src = '/placeholder-food.jpg';
                                                }}
                                            />
                                            <div>
                                                <p className="font-medium text-gray-800">{item.name}</p>
                                                <p className="text-sm text-gray-500">₹{item.price}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ) : searchQuery ? (
                        <div className="p-6 text-center text-gray-500">
                            No results found for "{searchQuery}"
                        </div>
                    ) : (
                        <div className="p-6 text-center text-gray-500">
                            Start typing to search for restaurants and dishes...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SearchModal;