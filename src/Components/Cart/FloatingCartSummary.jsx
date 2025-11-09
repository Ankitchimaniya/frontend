import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const FloatingCartSummary = ({ 
    cart, 
    getTotalItems, 
    getTotalPrice, 
    onShowCart 
}) => {
    // Don't render anything if cart is empty
    if (cart.length === 0) {
        return null;
    }

    return (
        <div className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-50 animate-slide-up">
            <div 
                className="bg-white rounded-xl p-3 sm:p-4 flex items-center justify-between shadow-2xl cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-3xl" 
                onClick={onShowCart}
            >
                <div className="flex items-center gap-2 sm:gap-3">
                    <FaShoppingCart className="text-brand-500 text-lg sm:text-xl" />
                    <div className="flex flex-col">
                        <span className="font-semibold text-neutral-800 text-xs sm:text-sm">{getTotalItems()} items</span>
                        <span className="font-bold text-brand-500 text-base sm:text-lg">₹{getTotalPrice()}</span>
                    </div>
                </div>
                <button className="bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white px-3 py-2 sm:px-5 sm:py-3 rounded-lg font-bold transition-all duration-200 hover:-translate-y-0.5 text-sm sm:text-base">
                    VIEW CART
                </button>
            </div>
        </div>
    );
};

export default FloatingCartSummary;