const API_BASE_URL = 'https://localhost:7172/api';

const orderService = {
    // Create a new order
    async createOrder(orderData) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/Order`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(orderData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to create order');
        }

        return await response.json();
    },

    // Get user orders with pagination
    async getUserOrders(page = 1, pageSize = 10) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/Order?page=${page}&pageSize=${pageSize}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch orders');
        }

        return await response.json();
    },

    // Get specific order details
    async getOrderById(orderId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/Order/${orderId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order details');
        }

        return await response.json();
    },

    // Cancel an order
    async cancelOrder(orderId, reason) {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/Order/${orderId}/cancel`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ reason })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to cancel order');
        }

        return await response.json();
    },

    // Get order statistics
    async getOrderStats() {
        const token = localStorage.getItem('token');
        const response = await fetch(`${API_BASE_URL}/Order/stats`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch order statistics');
        }

        return await response.json();
    }
};

export default orderService;