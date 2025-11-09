import axios from 'axios';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const useRestaurantListService = (showSuccess, showError) => {
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingRestaurant, setEditingRestaurant] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showAddModal, setShowAddModal] = useState(false);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
            const response = await axios.get('https://localhost:7172/api/RestaurantDetails', { headers });
            if (response.status !== 200) {
                throw new Error('Failed to fetch restaurants');
            }
            setRestaurants(response.data);
        } catch (err) {
            showError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (restaurantId) => {
        const restaurant = restaurants.find(r => r.id === restaurantId);
        if (restaurant) {
            setEditingRestaurant(restaurant);
            setShowEditModal(true);
        }
    };

    const handleEditSuccess = () => {
        // Close the modal first
        setShowEditModal(false);
        setEditingRestaurant(null);
        
        // Set loading state to show refresh is happening
        setLoading(true);
        
        // Refresh the list from server to ensure we have the latest data
        fetchRestaurants().then(() => {
            console.log('Restaurant list refreshed after update');
        }).catch((err) => {
            console.error('Failed to refresh restaurant list:', err);
            showError('Failed to refresh restaurant list');
        });
    };

    const handleEditCancel = () => {
        console.log('Edit modal closed, refreshing list...');
        setShowEditModal(false);
        setEditingRestaurant(null);
        
        // Reload list on close
        setLoading(true);
        fetchRestaurants().then(() => {
            console.log('Restaurant list refreshed after edit modal close');
        }).catch((err) => {
            console.error('Failed to refresh restaurant list:', err);
            showError('Failed to refresh restaurant list');
        });
    };

    const handleAddRestaurant = () => {
        setShowAddModal(true);
    };

    const handleAddSuccess = () => {
        console.log('Restaurant added successfully, refreshing list...');
        
        // Close the modal first
        setShowAddModal(false);
        
        // Set loading state to show refresh is happening
        setLoading(true);
        
        // Refresh the list from server to ensure we have the latest data
        fetchRestaurants().then(() => {
            console.log('Restaurant list refreshed after add');
        }).catch((err) => {
            console.error('Failed to refresh restaurant list:', err);
            showError('Failed to refresh restaurant list');
        });
    };

    const handleAddCancel = () => {
        console.log('Add modal closed, refreshing list...');
        setShowAddModal(false);
        
        // Reload list on close
        setLoading(true);
        fetchRestaurants().then(() => {
            console.log('Restaurant list refreshed after add modal close');
        }).catch((err) => {
            console.error('Failed to refresh restaurant list:', err);
            showError('Failed to refresh restaurant list');
        });
    };

    const handleBackToUserMode = () => {
        navigate('/');
    };

    const handleImageClick = (restaurantId) => {
        navigate(`/restaurant/${restaurantId}/manage-menu`);
    };

    const handleDelete = async (restaurantId) => {
        if (window.confirm('Are you sure you want to delete this restaurant?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.delete(`https://localhost:7172/api/RestaurantDetails/${restaurantId}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }); 

                if (response.status === 200) {
                    // Remove restaurant from state
                    setRestaurants(restaurants.filter(r => r.id !== restaurantId));
                    showSuccess('Restaurant deleted successfully!');
                } else {
                    throw new Error('Failed to delete restaurant');
                }
            } catch (err) {
                showError('Error deleting restaurant: ' + err.message);
            }
        }
    };

    return {
        restaurants,
        loading,
        editingRestaurant,
        showEditModal,
        showAddModal,
        handleEdit,
        handleEditSuccess,
        handleEditCancel,
        handleAddRestaurant,
        handleAddSuccess,
        handleAddCancel,
        handleBackToUserMode,
        handleImageClick,
        handleDelete
    };
};

export default useRestaurantListService;