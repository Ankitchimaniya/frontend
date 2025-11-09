import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import orderService from '../services/orderService';

const useOrderHistoryService = (showError) => {
    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({});
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchOrders = async (pageNumber = 1) => {
        try {
            const data = await orderService.getUserOrders(pageNumber, 10);
            setOrders(data.orders);
            setTotalPages(data.totalPages);
            setPage(data.page);
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchStats = async () => {
        try {
            const data = await orderService.getOrderStats();
            setStats(data);
        } catch (err) {
            console.error('Failed to fetch stats:', err);
        }
    };

    const cancelOrder = async (orderId, reason) => {
        try {
            await orderService.cancelOrder(orderId, reason);
            // Refresh orders
            await fetchOrders(page);
        } catch (err) {
            showError(err.message);
        }
    };

    useEffect(() => {
        fetchOrders();
        fetchStats();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Placed': return 'bg-blue-100 text-blue-800';
            case 'Confirmed': return 'bg-yellow-100 text-yellow-800';
            case 'Preparing': return 'bg-orange-100 text-orange-800';
            case 'OutForDelivery': return 'bg-purple-100 text-purple-800';
            case 'Delivered': return 'bg-green-100 text-green-800';
            case 'Cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const handleViewDetails = (orderId) => {
        navigate(`/orders/${orderId}`);
    };

    const handleBackToHome = () => {
        navigate('/');
    };

    const handleCancelOrder = (orderId) => {
        const reason = prompt('Please provide reason for cancellation:');
        if (reason) {
            cancelOrder(orderId, reason);
        }
    };

    return {
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
    };
};

export default useOrderHistoryService;