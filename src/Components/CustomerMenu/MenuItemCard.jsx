import React from 'react';
import getImageUrl from '../../GenericFunctions/getImageUrl';
import MenuControls from './MenuControls';

const MenuItemCard = ({ 
    item, 
    quantity, 
    onAdd, 
    onRemove, 
    itemIndex 
}) => {
    const VegNonVegIndicator = ({ isVeg }) => (
        <div className={`absolute top-1 sm:top-2 left-1 sm:left-2 w-4 sm:w-5 h-4 sm:h-5 border-2 flex items-center justify-center bg-white rounded ${isVeg ? 'border-green-500' : 'border-red-500'}`}>
            <div className={`w-1 sm:w-1.5 h-1 sm:h-1.5 rounded-full ${isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
        </div>
    );

    return (
        <div 
            key={item.id} 
            className="bg-white rounded-xl p-3 sm:p-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 animate-bounce-in" 
            style={{ animationDelay: `${itemIndex * 0.05}s` }}
        >
            {/* Mobile Layout */}
            <div className="flex flex-col sm:hidden gap-3">
                <div className="flex gap-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <img 
                            src={getImageUrl(item.imageUrl)} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                        />
                        <VegNonVegIndicator isVeg={item.isVeg} />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-lg font-bold text-gray-800 mb-1 line-clamp-2">{item.name}</h3>
                        <div className="text-lg font-bold text-brand-500">₹{item.price}</div>
                    </div>
                </div>
                <p className="text-gray-600 text-sm line-clamp-2">{item.description}</p>
                <div className="flex justify-end">
                    <MenuControls
                        item={item}
                        quantity={quantity}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isMobile={true}
                    />
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex gap-4">
                <div className="relative w-32 h-28 rounded-lg overflow-hidden flex-shrink-0">
                    <img 
                        src={getImageUrl(item.imageUrl)} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                    />
                    <VegNonVegIndicator isVeg={item.isVeg} />
                </div>
                
                <div className="flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2">{item.name}</h3>
                        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{item.description}</p>
                        <div className="text-lg font-bold text-brand-500">₹{item.price}</div>
                    </div>
                </div>
                
                <div className="flex items-center">
                    <MenuControls
                        item={item}
                        quantity={quantity}
                        onAdd={onAdd}
                        onRemove={onRemove}
                        isMobile={false}
                    />
                </div>
            </div>
        </div>
    );
};

export default MenuItemCard;