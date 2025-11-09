import React from 'react';
import { MdRestaurant } from 'react-icons/md';

const RestaurantInfo = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-4 mb-4">
                <MdRestaurant className="text-2xl text-primary-600" />
                <div>
                    <h2 className="text-xl font-bold text-gray-900">{order.restaurantName}</h2>
                    <p className="text-gray-600">Order placed on {new Date(order.createdAt).toLocaleString()}</p>
                </div>
            </div>
        </div>
    );
};

export default RestaurantInfo;