import React from 'react';
import { MdDeliveryDining } from 'react-icons/md';

const OrderSummary = ({ 
    restaurantInfo, 
    cartItems, 
    orderSummary, 
    onPlaceOrder, 
    placing, 
    isDisabled 
}) => {
    return (
        <div className="space-y-6">
            {/* Restaurant Info */}
            {restaurantInfo && (
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="font-semibold text-gray-900 mb-2">Ordering from</h3>
                    <p className="text-gray-700">{restaurantInfo.title}</p>
                </div>
            )}

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Order Summary</h3>
                <div className="space-y-3 mb-4">
                    {cartItems.map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <div className={`w-3 h-3 border rounded ${item.isVeg ? 'border-green-500 bg-green-100' : 'border-red-500 bg-red-100'}`}></div>
                                <div>
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-xs text-gray-600">₹{item.price} × {item.quantity}</p>
                                </div>
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                                ₹{(item.price * item.quantity).toFixed(2)}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Bill Details */}
                <div className="space-y-2 pt-4 border-t border-gray-200">
                    <div className="flex justify-between">
                        <span className="text-gray-600">Subtotal</span>
                        <span className="text-gray-900">₹{orderSummary.subtotal}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Fee</span>
                        <span className="text-gray-900">₹{orderSummary.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-gray-600">Taxes & Charges</span>
                        <span className="text-gray-900">₹{orderSummary.taxes}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
                        <span>Total</span>
                        <span>₹{orderSummary.total}</span>
                    </div>
                </div>
            </div>

            {/* Place Order Button */}
            <button
                onClick={onPlaceOrder}
                disabled={isDisabled || placing}
                className="w-full bg-gradient-food hover:bg-gradient-to-r hover:from-brand-600 hover:to-danger-600 text-white py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 hover:-translate-y-0.5 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
                {placing ? (
                    <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                        Placing Order...
                    </>
                ) : (
                    <>
                        <MdDeliveryDining className="mr-2 text-xl" />
                        Place Order ₹{orderSummary.total}
                    </>
                )}
            </button>
        </div>
    );
};

export default OrderSummary;