import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../services/apiClient';

const useCustomerMenuService = (showError) => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showCart, setShowCart] = useState(false);

    useEffect(() => {
        fetchRestaurantDetails();
        fetchMenuItems();
        // Load cart from localStorage
        const savedCart = localStorage.getItem(`cart_${restaurantId}`);
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, [restaurantId]);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem(`cart_${restaurantId}`, JSON.stringify(cart));
        } else {
            localStorage.removeItem(`cart_${restaurantId}`);
        }
        // Trigger custom event to update cart count in header
        window.dispatchEvent(new CustomEvent('cartUpdated'));
    }, [cart, restaurantId]);

    const fetchRestaurantDetails = async () => {
        try {
            const response = await apiClient.get(`/RestaurantDetails/${restaurantId}`);
            setRestaurant(response.data);
        } catch (err) {
            showError(err.response?.data?.message || 'Failed to fetch restaurant details');
        }
    };

    const fetchMenuItems = async () => {
        try {
            const response = await apiClient.get(`/MenuItem/restaurant/${restaurantId}`);
            // Filter only available items for customers
            const availableItems = response.data.filter(item => item.isAvailable);
            setMenuItems(availableItems);
        } catch (err) {
            showError(err.response?.data?.message || 'Failed to fetch menu items');
        } finally {
            setLoading(false);
        }
    };

    const addToCart = (menuItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === menuItem.id);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === menuItem.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, { ...menuItem, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (itemId) => {
        setCart(prevCart => {
            return prevCart.map(item =>
                item.id === itemId && item.quantity > 1
                    ? { ...item, quantity: item.quantity - 1 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    const removeItemCompletely = (itemId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== itemId));
    };

    const getCartItemQuantity = (itemId) => {
        const item = cart.find(item => item.id === itemId);
        return item ? item.quantity : 0;
    };

    const groupMenuItemsByCategory = () => {
        return menuItems.reduce((groups, item) => {
            const category = item.category;
            if (!groups[category]) {
                groups[category] = [];
            }
            groups[category].push(item);
            return groups;
        }, {});
    };

    const goBack = () => {
        navigate(-1);
    };

    return {
        restaurant,
        menuItems,
        cart,
        loading,
        showCart,
        restaurantId,
        setShowCart,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        getCartItemQuantity,
        groupMenuItemsByCategory,
        goBack
    };
};

export default useCustomerMenuService;