import React from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const MenuControls = ({ 
    item, 
    quantity, 
    onAdd, 
    onRemove,
    isMobile = false 
}) => {
    if (quantity === 0) {
        return (
            <button 
                className="bg-gradient-success hover:bg-gradient-to-r hover:from-accent-600 hover:to-accent-700 text-white px-4 sm:px-6 py-2 rounded-lg font-bold transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                onClick={() => onAdd(item)}
            >
                ADD
            </button>
        );
    }

    return (
        <div className="flex items-center gap-3 bg-gray-100 px-2 py-1 rounded-full border-2 border-gray-200">
            <button 
                className="bg-brand-500 hover:bg-brand-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                onClick={() => onRemove(item.id)}
            >
                <FaMinus className="text-xs" />
            </button>
            <span className="font-bold text-neutral-800 min-w-[20px] text-center">{quantity}</span>
            <button 
                className="bg-brand-500 hover:bg-brand-600 text-white w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                onClick={() => onAdd(item)}
            >
                <FaPlus className="text-xs" />
            </button>
        </div>
    );
};

export default MenuControls;