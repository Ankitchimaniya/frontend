import React from 'react';

const OrderNotes = ({ orderNotes, deliveryInstructions, onOrderNotesChange, onDeliveryInstructionsChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Notes</h2>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Special Instructions for Restaurant
                    </label>
                    <textarea
                        value={orderNotes}
                        onChange={(e) => onOrderNotesChange(e.target.value)}
                        placeholder="Any special requests for your order..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Delivery Instructions
                    </label>
                    <textarea
                        value={deliveryInstructions}
                        onChange={(e) => onDeliveryInstructionsChange(e.target.value)}
                        placeholder="Instructions for delivery person..."
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                </div>
            </div>
        </div>
    );
};

export default OrderNotes;