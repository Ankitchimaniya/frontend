import React from 'react';
import { FaCreditCard, FaMoneyBillAlt, FaCheck } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';

const PaymentMethod = ({ paymentMethod, onPaymentMethodChange }) => {
    return (
        <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MdPayment className="mr-2 text-primary-500" />
                Payment Method
            </h2>
            <div className="space-y-3">
                <div
                    onClick={() => onPaymentMethodChange('COD')}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'COD'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <FaMoneyBillAlt className="text-green-500 mr-3" />
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">Cash on Delivery</p>
                        <p className="text-sm text-gray-600">Pay when your order arrives</p>
                    </div>
                    {paymentMethod === 'COD' && <FaCheck className="text-primary-500" />}
                </div>

                <div
                    onClick={() => onPaymentMethodChange('UPI')}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                        paymentMethod === 'UPI'
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                    }`}
                >
                    <FaCreditCard className="text-blue-500 mr-3" />
                    <div className="flex-1">
                        <p className="font-medium text-gray-900">UPI Payment</p>
                        <p className="text-sm text-gray-600">Pay using UPI apps</p>
                    </div>
                    {paymentMethod === 'UPI' && <FaCheck className="text-primary-500" />}
                </div>
            </div>
        </div>
    );
};

export default PaymentMethod;