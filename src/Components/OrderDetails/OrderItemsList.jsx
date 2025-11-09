import React from 'react';

const OrderItemsList = ({ orderItems }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Items</h3>
            <div className="space-y-4">
                {orderItems.map((item) => (
                    <div key={item.id} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                        <div className="flex items-center space-x-4">
                            <div className={`w-4 h-4 border-2 rounded ${item.isVeg ? 'border-green-500' : 'border-red-500'}`}>
                                <div className={`w-2 h-2 rounded-full ${item.isVeg ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900">{item.itemName}</h4>
                                <p className="text-gray-600 text-sm">₹{item.itemPrice} each</p>
                                {item.specialInstructions && (
                                    <p className="text-gray-500 text-xs italic">Note: {item.specialInstructions}</p>
                                )}
                            </div>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-gray-900">×{item.quantity}</p>
                            <p className="text-gray-600">₹{item.totalPrice}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderItemsList;