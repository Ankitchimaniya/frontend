import React from 'react';
import { FaPlus } from 'react-icons/fa';
import MenuItemCard from './MenuItemCard';

const MenuItemList = ({ 
    menuItems, 
    onAddItem, 
    onEditItem, 
    onDeleteItem, 
    onToggleAvailability 
}) => {
    return (
        <div className="max-w-7xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Menu Items ({menuItems.length})
                </h2>
                <button 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 transition-all duration-200 hover:-translate-y-0.5 shadow-lg"
                    onClick={onAddItem}
                >
                    <FaPlus /> Add New Item
                </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {menuItems.length === 0 ? (
                    <div className="col-span-full text-center py-16 bg-white rounded-xl shadow-lg">
                        <p className="text-xl text-gray-600">
                            No menu items found. Add your first menu item!
                        </p>
                    </div>
                ) : (
                    menuItems.map(item => (
                        <MenuItemCard
                            key={item.id}
                            item={item}
                            onEdit={onEditItem}
                            onDelete={onDeleteItem}
                            onToggleAvailability={onToggleAvailability}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default MenuItemList;