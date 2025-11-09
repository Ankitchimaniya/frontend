import apiClient from "./apiClient";

const orderService = {
    // Create a new order
    async createOrder(orderData) {
        const response = await apiClient.post('/Order', orderData);
        return response.data;
    },

    // Get user orders with pagination
    async getUserOrders(page = 1, pageSize = 10) {
        const response = await apiClient.get('/Order', {
            params: { page, pageSize }
        });
        return response.data;
    },

    // Get specific order details
    async getOrderById(orderId) { 
        const response = await apiClient.get(`/Order/${orderId}`);
        return response.data;
    },

    // Cancel an order
    async cancelOrder(orderId, reason) {
        const response = await apiClient.put(`/Order/${orderId}/cancel`, {
            reason
        });
        return response.data;
    },

    // Get order statistics
    async getOrderStats() {
        const response = await apiClient.get('/Order/stats');
        return response.data;
    },

    // Update order status (for admin/restaurant)
    async updateOrderStatus(orderId, status) {
        const response = await apiClient.put(`/Order/${orderId}/status`, {
            status
        });
        return response.data;
    },

    // Get order history for a user
    async getOrderHistory(userId) {
        const response = await apiClient.get(`/Order/history/${userId}`);
        return response.data;
    }
};

export default orderService;