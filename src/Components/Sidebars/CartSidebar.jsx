import React from 'react';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';

const CartSidebar = ({ 
    allCartItems, 
    cartItemCount,
    addToCart,
    removeFromCart,
    removeItemCompletely
}) => {
    return (
        <div className="p-4 sm:p-6">
            {allCartItems.length === 0 ? (
                <div className="text-center py-8">
                    <div className="text-6xl mb-4">🛒</div>
                    <h3 className="text-lg font-semibold text-gray-600 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Browse restaurants and add some delicious items!</p>
                </div>
            ) : (
                <div className="space-y-6">
                    <div className="bg-brand-50 p-4 rounded-lg border border-brand-200">
                        <div className="flex items-center justify-between">
                            <span className="font-semibold text-brand-800">Total Items</span>
                            <span className="font-bold text-brand-600">{cartItemCount}</span>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold text-brand-800">Total Amount</span>
                            <span className="font-bold text-brand-600">
                                ₹{allCartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}
                            </span>
                        </div>
                    </div>

                    <div className="space-y-4 max-h-96 overflow-y-auto">
                        {Object.entries(
                            allCartItems.reduce((groups, item) => {
                                const restaurantId = item.restaurantId;
                                if (!groups[restaurantId]) {
                                    groups[restaurantId] = {
                                        name: item.restaurantName,
                                        items: []
                                    };
                                }
                                groups[restaurantId].items.push(item);
                                return groups;
                            }, {})
                        ).map(([restaurantId, restaurant]) => (
                            <div key={restaurantId} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                                {/* Restaurant Header */}
                                <div className="bg-gradient-food text-white p-3">
                                    <h3 className="font-semibold text-sm flex items-center">
                                        <span className="mr-2">🏪</span>
                                        {restaurant.name}
                                    </h3>
                                </div>
                                
                                {/* Restaurant Items */}
                                <div className="p-3 space-y-3">
                                    {restaurant.items.map((item, index) => (
                                        <div key={`${restaurantId}-${item.id}-${index}`} className="bg-gray-50 p-3 rounded-lg">
                                            <div className="flex items-start gap-3">
                                                {/* Veg/Non-Veg Indicator */}
                                                <div className={`w-4 h-4 border-2 flex items-center justify-center bg-white rounded mt-1 ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                                                    <div className={`w-1.5 h-1.5 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                                </div>
                                                
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-2">
                                                        <div>
                                                            <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                                                            <span className="text-brand-600 font-medium text-xs">₹{item.price} each</span>
                                                        </div>
                                                        {/* Remove Item Button */}
                                                        {removeItemCompletely && (
                                                            <button 
                                                                className="text-red-500 hover:text-red-700 p-1 transition-colors duration-200 bg-red-50 hover:bg-red-100 rounded"
                                                                onClick={() => removeItemCompletely(item.id, item.restaurantId)}
                                                                title="Remove item completely"
                                                            >
                                                                <FaTimes className="text-xs" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-bold text-gray-800 text-sm">₹{(item.price * item.quantity).toFixed(2)}</span>
                                                        
                                                        {/* Quantity Controls */}
                                                        {addToCart && removeFromCart ? (
                                                            <div className="flex items-center gap-2 bg-white px-2 py-1 rounded-lg border">
                                                                <button 
                                                                    className="bg-red-500 hover:bg-red-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                                                    onClick={() => removeFromCart(item.id, item.restaurantId)}
                                                                    title="Decrease quantity"
                                                                >
                                                                    <FaMinus className="text-xs" />
                                                                </button>
                                                                <span className="font-bold text-gray-800 min-w-[20px] text-center text-sm">{item.quantity}</span>
                                                                <button 
                                                                    className="bg-green-500 hover:bg-green-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                                                                    onClick={() => addToCart(item, item.restaurantId)}
                                                                    title="Increase quantity"
                                                                >
                                                                    <FaPlus className="text-xs" />
                                                                </button>
                                                            </div>
                                                        ) : (
                                                            <span className="text-gray-600 text-sm">Qty: {item.quantity}</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t pt-4">
                        <button 
                            onClick={() => {
                                // Get the first restaurant ID from cart items
                                const firstRestaurantId = allCartItems[0]?.restaurantId;
                                if (firstRestaurantId) {
                                    window.location.href = `/checkout/${firstRestaurantId}`;
                                }
                            }}
                            className="w-full bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white py-3 px-4 rounded-lg font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartSidebar;