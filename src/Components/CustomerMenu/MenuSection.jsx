import React from 'react';
import MenuItemCard from './MenuItemCard';

const MenuSection = ({ 
    category, 
    items, 
    categoryIndex, 
    getCartItemQuantity, 
    onAdd, 
    onRemove 
}) => {
    return (
        <div 
            key={category} 
            className="mb-8 sm:mb-12 animate-fade-in" 
            style={{ animationDelay: `${categoryIndex * 0.1}s` }}
        >
            <h2 className="text-2xl sm:text-3xl font-bold text-neutral-800 mb-4 sm:mb-6 pb-2 border-b-4 border-brand-500">
                {category}
            </h2>
            <div className="grid grid-cols-1 gap-4">
                {items.map((item, itemIndex) => (
                    <MenuItemCard
                        key={item.id}
                        item={item}
                        quantity={getCartItemQuantity(item.id)}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        itemIndex={itemIndex}
                    />
                ))}
            </div>
        </div>
    );
};

export default MenuSection;