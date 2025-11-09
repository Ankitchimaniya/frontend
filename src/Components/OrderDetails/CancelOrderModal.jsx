import React, { useState } from 'react';

const CancelOrderModal = ({ 
    isOpen, 
    onClose, 
    onConfirm, 
    cancelling 
}) => {
    const [cancelReason, setCancelReason] = useState('');

    const handleConfirm = async () => {
        const success = await onConfirm(cancelReason);
        if (success) {
            setCancelReason('');
            onClose();
        }
    };

    const handleClose = () => {
        setCancelReason('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Cancel Order</h3>
                <p className="text-gray-600 mb-4">
                    Are you sure you want to cancel this order? Please provide a reason:
                </p>
                <textarea
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                    placeholder="Reason for cancellation..."
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
                <div className="flex items-center justify-end space-x-4 mt-6">
                    <button
                        onClick={handleClose}
                        className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Keep Order
                    </button>
                    <button
                        onClick={handleConfirm}
                        disabled={cancelling}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {cancelling ? 'Cancelling...' : 'Cancel Order'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CancelOrderModal;