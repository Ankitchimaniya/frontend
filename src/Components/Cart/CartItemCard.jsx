import React from 'react';
import { FaPlus, FaMinus, FaTimes } from 'react-icons/fa';

const CartItemCard = ({ item, addToCart, removeFromCart, removeItemCompletely }) => {
    const VegNonVegIndicator = ({ isVeg, size = 'sm' }) => (
        <div className={`${size === 'sm' ? 'w-4 h-4' : 'w-5 h-5'} border-2 flex items-center justify-center bg-white rounded ${isVeg ? 'border-green-500' : 'border-red-500'}`}>
            <div className={`${size === 'sm' ? 'w-1 h-1' : 'w-1.5 h-1.5'} rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
    );

    const QuantityControls = ({ isMobile = false }) => (
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-2 rounded-lg">
            <button 
                className="bg-red-500 hover:bg-red-600 text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                onClick={() => removeFromCart(item.id)}
                title="Decrease quantity"
            >
                <FaMinus className="text-xs" />
            </button>
            <span className="font-bold text-neutral-800 min-w-[24px] text-center px-2">{item.quantity}</span>
            <button 
                className="bg-green-500 hover:bg-green-600 text-white w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 shadow-sm"
                onClick={() => addToCart(item)}
                title="Increase quantity"
            >
                <FaPlus className="text-xs" />
            </button>
        </div>
    );

    const RemoveButton = () => (
        <button 
            className="text-red-500 hover:text-red-700 p-2 transition-colors duration-200 bg-red-50 hover:bg-red-100 rounded-lg"
            onClick={() => removeItemCompletely(item.id)}
            title="Remove item completely"
        >
            <FaTimes className="text-sm" />
        </button>
    );

    return (
        <div className="py-3 sm:py-4 border-b border-gray-100 last:border-b-0 animate-fade-in">
            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden gap-2">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <VegNonVegIndicator isVeg={item.isVeg} size="sm" />
                        <div>
                            <h4 className="font-semibold text-gray-800 text-sm line-clamp-1">{item.name}</h4>
                            <p className="text-gray-600 text-sm">₹{item.price} each</p>
                        </div>
                    </div>
                    <RemoveButton />
                </div>
                
                <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Subtotal: ₹{(item.price * item.quantity).toFixed(2)}</span>
                    <QuantityControls isMobile={true} />
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex justify-between items-center">
                <div className="flex items-center gap-3 flex-1">
                    <VegNonVegIndicator isVeg={item.isVeg} size="md" />
                    <div>
                        <h4 className="font-semibold text-gray-800 text-sm">{item.name}</h4>
                        <p className="text-gray-600 text-sm">₹{item.price}</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-4">
                    <QuantityControls isMobile={false} />
                    <span className="text-sm font-semibold text-gray-700 min-w-[60px]">₹{(item.price * item.quantity).toFixed(2)}</span>
                    <RemoveButton />
                </div>
            </div>
        </div>
    );
};

export default CartItemCard;