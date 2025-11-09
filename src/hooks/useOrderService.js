import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

const useOrderService = (showError, showSuccess) => {
    const { orderId } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [cancelling, setCancelling] = useState(false);

    useEffect(() => {
        fetchOrderDetails();
    }, [orderId]);

    const fetchOrderDetails = async () => {
        try {
            const data = await orderService.getOrderById(orderId);
            setOrder(data);
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (cancelReason) => {
        if (!cancelReason.trim()) {
            showError('Please provide a reason for cancellation');
            return false;
        }

        setCancelling(true);
        try {
            await orderService.cancelOrder(orderId, cancelReason);
            showSuccess('Order cancelled successfully');
            await fetchOrderDetails(); // Refresh order details
            return true;
        } catch (err) {
            showError(err.message);
            return false;
        } finally {
            setCancelling(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-blue-100 text-blue-800';
            case 'Confirmed': return 'bg-yellow-100 text-yellow-800';
            case 'Preparing': return 'bg-orange-100 text-orange-800';
            case 'Ready': return 'bg-purple-100 text-purple-800';
            case 'Out for Delivery': return 'bg-indigo-100 text-indigo-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const canCancelOrder = (status) => {
        return ['Placed', 'Confirmed'].includes(status);
    };

    const navigateToOrders = () => {
        navigate('/orders');
    };

    return {
        order,
        loading,
        cancelling,
        fetchOrderDetails,
        handleCancelOrder,
        getStatusColor,
        canCancelOrder,
        navigateToOrders
    };
};

export default useOrderService;