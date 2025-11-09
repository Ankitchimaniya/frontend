import { useState, useEffect } from 'react';
import axios from 'axios';

const useHeaderService = (showWarning) => {
    const [isAuth, setIsAuth] = useState(false);
    const [locations, setLocation] = useState([]);
    const [user, setUser] = useState(null);
    const [profileError, setProfileError] = useState("");
    const [profileLoading, setProfileLoading] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);
    const [allCartItems, setAllCartItems] = useState([]);

    const fetchLocation = async () => {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await axios.get('https://localhost:7172/api/locations', { headers });
        setLocation(response.data);
    };

    const updateCartCount = async () => {
        let totalItems = 0;
        const allItems = [];
        
        // Get all cart keys from localStorage
        Object.keys(localStorage).forEach(key => {
            if (key.startsWith('cart_')) {
                try {
                    const cart = JSON.parse(localStorage.getItem(key));
                    const restaurantId = key.replace('cart_', '');
                    
                    if (Array.isArray(cart) && cart.length > 0) {
                        // Add restaurant info to each item
                        const itemsWithRestaurant = cart.map(item => ({
                            ...item,
                            restaurantId,
                            cartKey: key
                        }));
                        allItems.push(...itemsWithRestaurant);
                        totalItems += cart.reduce((sum, item) => sum + (item.quantity || 0), 0);
                    }
                } catch (error) {
                    console.error('Error parsing cart data:', error);
                }
            }
        });
        
        // Fetch restaurant names for all cart items
        const uniqueRestaurantIds = [...new Set(allItems.map(item => item.restaurantId))];
        const restaurantPromises = uniqueRestaurantIds.map(async (restaurantId) => {
            try {
                const token = localStorage.getItem('token');
                const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
                const response = await fetch(`https://localhost:7172/api/RestaurantDetails/${restaurantId}`, { headers });
                if (response.ok) {
                    const data = await response.json();
                    return { id: restaurantId, name: data.title };
                }
            } catch (error) {
                console.error('Error fetching restaurant details:', error);
            }
            return { id: restaurantId, name: `Restaurant ${restaurantId}` };
        });

        try {
            const restaurants = await Promise.all(restaurantPromises);
            const restaurantMap = restaurants.reduce((map, restaurant) => {
                map[restaurant.id] = restaurant.name;
                return map;
            }, {});

            // Add restaurant names to items
            const itemsWithNames = allItems.map(item => ({
                ...item,
                restaurantName: restaurantMap[item.restaurantId] || `Restaurant ${item.restaurantId}`
            }));

            setAllCartItems(itemsWithNames);
        } catch (error) {
            console.error('Error processing restaurant names:', error);
            setAllCartItems(allItems);
        }
        
        setCartItemCount(totalItems);
    };

    const addToCart = (menuItem, restaurantId) => {
        const cartKey = `cart_${restaurantId}`;
        const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        
        const existingItem = existingCart.find(item => item.id === menuItem.id);
        let updatedCart;
        
        if (existingItem) {
            updatedCart = existingCart.map(item =>
                item.id === menuItem.id
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            );
        } else {
            updatedCart = [...existingCart, { ...menuItem, quantity: 1 }];
        }
        
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        updateCartCount();
    };

    const removeFromCart = (itemId, restaurantId) => {
        const cartKey = `cart_${restaurantId}`;
        const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        
        const updatedCart = existingCart.map(item =>
            item.id === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        ).filter(item => item.quantity > 0);
        
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        updateCartCount();
    };

    const removeItemCompletely = (itemId, restaurantId) => {
        const cartKey = `cart_${restaurantId}`;
        const existingCart = JSON.parse(localStorage.getItem(cartKey) || '[]');
        
        const updatedCart = existingCart.filter(item => item.id !== itemId);
        
        localStorage.setItem(cartKey, JSON.stringify(updatedCart));
        updateCartCount();
    };

    const handleLocationChange = (newLocation, setLocation) => {
        setLocation(prevLocations => {
            if (!Array.isArray(prevLocations)) return prevLocations;

            const updated = prevLocations.map(loc => {
                const isSelected = typeof newLocation === 'string'
                    ? loc.name === newLocation
                    : (newLocation && (loc.name === newLocation.name || loc === newLocation));
                return { ...loc, isSelected };
            });

            // Persist selected location safely
            const selectedLocation = updated.find(l => l.isSelected);
            if (selectedLocation) {
                try {
                    localStorage.setItem('location', selectedLocation.name);
                    if (selectedLocation.address) {
                        localStorage.setItem('address', selectedLocation.address);
                    }
                } catch (e) {
                    console.error('Failed to save location to localStorage:', e);
                }
            }

            return updated;
        });
    };

    const fetchUserProfile = async () => {
        setProfileLoading(true);
        setProfileError("");
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('Please log in to view your profile');
            }
            
            const res = await fetch('https://localhost:7172/api/UserProfile', {
                headers: { 
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (res.status === 401) {
                // Token expired or invalid
                localStorage.removeItem('token');
                setIsAuth(false);
                throw new Error('Session expired. Please log in again');
            }
            
            if (!res.ok) {
                throw new Error(`Failed to fetch profile: ${res.status} ${res.statusText}`);
            }
            
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setUser(null);
            setProfileError(err.message || 'Failed to load profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const handleCartClick = () => {
        if (cartItemCount === 0) {
            showWarning('Your cart is empty! Add some delicious items from restaurants first.');
            return false;
        }
        return true;
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuth(false);
        window.location.href = '/login';
    };

    // Initialize data on mount
    useEffect(() => {
        fetchLocation();
        updateCartCount();
        
        const onStorage = (e) => {
            if (e.key === 'token') {
                setIsAuth(!!e.newValue);
                fetchLocation();
            }
            if (e.key && e.key.startsWith('cart_')) updateCartCount();
        };
        window.addEventListener('storage', onStorage);
        
        // Custom event listener for cart updates within the same tab
        const onCartUpdate = () => updateCartCount();
        window.addEventListener('cartUpdated', onCartUpdate);
        
        return () => {
            window.removeEventListener('storage', onStorage);
            window.removeEventListener('cartUpdated', onCartUpdate);
        };
    }, []);

    // Check auth status
    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);
    }, []);

    return {
        isAuth,
        locations,
        user,
        profileError,
        profileLoading,
        cartItemCount,
        allCartItems,
        fetchLocation,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        handleLocationChange,
        fetchUserProfile,
        handleCartClick,
        handleLogout,
        setLocation
    };
};

export default useHeaderService;