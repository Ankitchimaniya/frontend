import React from 'react';
import { FaTimes } from 'react-icons/fa';
import CartItemCard from './CartItemCard';

const CartModal = ({ 
    showCart, 
    setShowCart, 
    cart, 
    restaurantName,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    getTotalPrice,
    handleCheckout 
}) => {
    if (!showCart) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/70 flex items-end sm:items-center justify-center z-50 p-0 sm:p-5" 
            onClick={() => setShowCart(false)}
        >
            <div 
                className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[90vh] sm:max-h-[80vh] overflow-hidden flex flex-col animate-slide-up" 
                onClick={(e) => e.stopPropagation()}
            >
                {/* Modal Header */}
                <div className="flex justify-between items-center p-4 sm:p-5 border-b border-gray-200">
                    <h3 className="text-base sm:text-lg font-bold text-gray-800">
                        Your Order {restaurantName && <span className="hidden sm:inline">from {restaurantName}</span>}
                    </h3>
                    <button 
                        className="text-gray-600 hover:text-gray-800 p-1 transition-colors duration-200"
                        onClick={() => setShowCart(false)}
                    >
                        <FaTimes className="text-lg sm:text-xl" />
                    </button>
                </div>
                
                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-5">
                    {cart.map(item => (
                        <CartItemCard 
                            key={item.id}
                            item={item}
                            addToCart={addToCart}
                            removeFromCart={removeFromCart}
                            removeItemCompletely={removeItemCompletely}
                        />
                    ))}
                </div>
                
                {/* Cart Footer */}
                <div className="border-t border-neutral-200 p-4 sm:p-5">
                    <div className="mb-3 sm:mb-4">
                        <div className="text-lg sm:text-xl font-bold text-center text-neutral-800">
                            Total: ₹{getTotalPrice()}
                        </div>
                    </div>
                    <button 
                        className="w-full bg-gradient-success hover:bg-gradient-to-r hover:from-accent-600 hover:to-accent-700 text-white py-3 sm:py-4 rounded-lg text-base sm:text-lg font-bold transition-all duration-200 hover:-translate-y-0.5"
                        onClick={handleCheckout}
                    >
                        PROCEED TO CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartModal;