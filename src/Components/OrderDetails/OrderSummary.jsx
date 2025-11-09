import React from 'react';

const OrderSummary = ({ order }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Order Summary</h3>
            <div className="space-y-3">
                <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{order.subTotal}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Delivery Fee</span>
                    <span className="font-medium">₹{order.deliveryFee}</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span className="font-medium">₹{order.taxAmount}</span>
                </div>
                {order.discountAmount > 0 && (
                    <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span className="font-medium">-₹{order.discountAmount}</span>
                    </div>
                )}
                <div className="border-t pt-3">
                    <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span>₹{order.totalAmount}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;