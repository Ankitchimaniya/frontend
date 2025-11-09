import React from 'react';

const OrderNotes = ({ orderNotes, deliveryInstructions }) => {
    // Don't render if no notes or instructions
    if (!orderNotes && !deliveryInstructions) {
        return null;
    }

    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Notes & Instructions</h3>
            {orderNotes && (
                <div className="mb-3">
                    <p className="font-medium text-gray-700">Order Notes:</p>
                    <p className="text-gray-600">{orderNotes}</p>
                </div>
            )}
            {deliveryInstructions && (
                <div>
                    <p className="font-medium text-gray-700">Delivery Instructions:</p>
                    <p className="text-gray-600">{deliveryInstructions}</p>
                </div>
            )}
        </div>
    );
};

export default OrderNotes;