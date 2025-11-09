import React, { useState } from 'react';
import useAlert from '../hooks/useAlert';
import useOrderService from '../hooks/useOrderService';
import AlertContainer from './AlertContainer';

// Component imports
import LoadingState from './OrderDetails/LoadingState';
import NotFoundState from './OrderDetails/NotFoundState';
import OrderHeader from './OrderDetails/OrderHeader';
import RestaurantInfo from './OrderDetails/RestaurantInfo';
import OrderItemsList from './OrderDetails/OrderItemsList';
import DeliveryAddress from './OrderDetails/DeliveryAddress';
import OrderNotes from './OrderDetails/OrderNotes';
import OrderSummary from './OrderDetails/OrderSummary';
import ContactInfo from './OrderDetails/ContactInfo';
import PaymentInfo from './OrderDetails/PaymentInfo';
import DeliveryInfo from './OrderDetails/DeliveryInfo';
import CancelOrderModal from './OrderDetails/CancelOrderModal';

const OrderDetails = () => {
    const { alerts, showError, showSuccess, removeAlert } = useAlert();
    const {
        order,
        loading,
        cancelling,
        handleCancelOrder,
        getStatusColor,
        canCancelOrder,
        navigateToOrders
    } = useOrderService(showError, showSuccess);

    const [showCancelModal, setShowCancelModal] = useState(false);

    const onCancelConfirm = async (cancelReason) => {
        const success = await handleCancelOrder(cancelReason);
        if (success) {
            setShowCancelModal(false);
        }
        return success;
    };

    if (loading) {
        return <LoadingState />;
    }

    if (!order) {
        return <NotFoundState onBackClick={navigateToOrders} />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            <div className="max-w-4xl mx-auto px-4">
                {/* Header */}
                <OrderHeader
                    order={order}
                    onBackClick={navigateToOrders}
                    getStatusColor={getStatusColor}
                    canCancelOrder={canCancelOrder}
                    onCancelClick={() => setShowCancelModal(true)}
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <RestaurantInfo order={order} />
                        <OrderItemsList orderItems={order.orderItems} />
                        <DeliveryAddress deliveryAddress={order.deliveryAddress} />
                        <OrderNotes 
                            orderNotes={order.orderNotes} 
                            deliveryInstructions={order.deliveryInstructions} 
                        />
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <OrderSummary order={order} />
                        <ContactInfo order={order} />
                        <PaymentInfo order={order} />
                        <DeliveryInfo order={order} />
                    </div>
                </div>

                {/* Cancel Order Modal */}
                <CancelOrderModal
                    isOpen={showCancelModal}
                    onClose={() => setShowCancelModal(false)}
                    onConfirm={onCancelConfirm}
                    cancelling={cancelling}
                />
            </div>
        </div>
    );
};

export default OrderDetails;