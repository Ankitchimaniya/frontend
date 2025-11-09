import React from 'react';
import { MdRestaurant, MdDeliveryDining, MdCancel } from 'react-icons/md';
import { FaCreditCard } from 'react-icons/fa';

const OrderStatsCard = ({ stats }) => {
    const statItems = [
        {
            icon: <MdRestaurant className="text-blue-600 text-xl" />,
            bgColor: 'bg-blue-100',
            value: stats.totalOrders || 0,
            label: 'Total Orders'
        },
        {
            icon: <MdDeliveryDining className="text-green-600 text-xl" />,
            bgColor: 'bg-green-100',
            value: stats.completedOrders || 0,
            label: 'Delivered'
        },
        {
            icon: <MdCancel className="text-red-600 text-xl" />,
            bgColor: 'bg-red-100',
            value: stats.cancelledOrders || 0,
            label: 'Cancelled'
        },
        {
            icon: <FaCreditCard className="text-primary-600 text-xl" />,
            bgColor: 'bg-primary-100',
            value: `₹${stats.totalSpent || 0}`,
            label: 'Total Spent'
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {statItems.map((item, index) => (
                <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="flex items-center">
                        <div className={`w-12 h-12 ${item.bgColor} rounded-lg flex items-center justify-center`}>
                            {item.icon}
                        </div>
                        <div className="ml-4">
                            <p className="text-2xl font-bold text-gray-900">{item.value}</p>
                            <p className="text-gray-600 text-sm">{item.label}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default OrderStatsCard;