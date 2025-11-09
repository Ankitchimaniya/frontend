import React from 'react';
import useAlert from '../hooks/useAlert';
import useOrderHistoryService from '../hooks/useOrderHistoryService';
import AlertContainer from './AlertContainer';

// Component imports
import LoadingState from './OrderHistory/LoadingState';
import OrderHistoryHeader from './OrderHistory/OrderHistoryHeader';
import OrderStatsCard from './OrderHistory/OrderStatsCard';
import OrderHistoryCard from './OrderHistory/OrderHistoryCard';
import EmptyOrderHistory from './OrderHistory/EmptyOrderHistory';
import OrderPagination from './OrderHistory/OrderPagination';

const OrderHistory = () => {
    const { alerts, showError, removeAlert } = useAlert();
    const {
        orders,
        loading,
        stats,
        page,
        totalPages,
        fetchOrders,
        getStatusColor,
        formatDate,
        handleViewDetails,
        handleBackToHome,
        handleCancelOrder
    } = useOrderHistoryService(showError);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-6xl mx-auto px-4">
                    <LoadingState />
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <OrderHistoryHeader onBackToHome={handleBackToHome} />

                {/* Stats Cards */}
                <OrderStatsCard stats={stats} />

                {/* Orders List */}
                {orders.length === 0 ? (
                    <EmptyOrderHistory />
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <OrderHistoryCard
                                key={order.id}
                                order={order}
                                getStatusColor={getStatusColor}
                                formatDate={formatDate}
                                onViewDetails={handleViewDetails}
                                onCancelOrder={handleCancelOrder}
                            />
                        ))}

                        {/* Pagination */}
                        <OrderPagination
                            page={page}
                            totalPages={totalPages}
                            onPageChange={fetchOrders}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrderHistory;