import { useState } from 'react';
import axios from 'axios';

const useMenuService = (restaurantId, showSuccess, showError) => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const fetchRestaurantDetails = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://localhost:7172/api/RestaurantDetails/${restaurantId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch restaurant details');
            }
        } catch (err) {
            showError(err.message);
            return null;
        }
    };

    const fetchMenuItems = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`https://localhost:7172/api/MenuItem/restaurant/${restaurantId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                return response.data;
            } else {
                throw new Error('Failed to fetch menu items');
            }
        } catch (err) {
            showError('Failed to fetch menu items: ' + err.message);
            return [];
        } finally {
            setLoading(false);
        }
    };

    const uploadImage = async (imageFile) => {
        if (!imageFile) return "";
        
        setUploadProgress("📤 Uploading image...");
        try {
            const imageFormData = new FormData();
            imageFormData.append("file", imageFile);

            const imageRes = await axios.post("https://localhost:7172/api/Images/Upload", imageFormData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });

            if (imageRes.status !== 200) {
                const errorText = imageRes.data.message || "Failed to upload image";
                throw new Error(errorText);
            }

            const imageData = imageRes.data;
            setUploadProgress("✅ Image uploaded successfully!");
            
            return imageData.imageUrl || imageData.url || imageData.filePath || "";
        } catch (error) {
            setUploadProgress("❌ Failed to upload image");
            throw error;
        }
    };

    const validateMenuItem = (formData) => {
        if (!formData.name || !formData.description || !formData.price || !formData.category) {
            throw new Error('Please fill in all required fields');
        }
    };

    const createMenuItem = async (formData, imageFile) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            
            validateMenuItem(formData);
            
            // Upload image if a new file is selected
            let imageUrl = formData.imageUrl || null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
                setUploadProgress("🏪 Adding menu item...");
            } else {
                setUploadProgress("🏪 Adding menu item...");
            }
            
            const menuItemData = {
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                imageUrl: imageUrl,
                isVeg: formData.isVeg,
                isAvailable: formData.isAvailable,
                restaurantId: parseInt(restaurantId)
            };

            const response = await axios.post(`https://localhost:7172/api/MenuItem`, menuItemData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }); 

            if (response.status === 201) {
                const newItem = response.data;
                showSuccess('Menu item added successfully!');
                return newItem;
            } else {
                const errorData = response.data;
                throw new Error(errorData.message || 'Failed to add menu item');
            }
        } catch (err) {
            showError('Error saving menu item: ' + err.message);
            throw err;
        } finally {
            setSubmitting(false);
            setUploadProgress('');
        }
    };

    const updateMenuItem = async (editingItem, formData, imageFile) => {
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            
            validateMenuItem(formData);
            
            // Upload image if a new file is selected
            let imageUrl = formData.imageUrl || null;
            if (imageFile) {
                imageUrl = await uploadImage(imageFile);
                setUploadProgress("🏪 Updating menu item...");
            } else {
                setUploadProgress("🏪 Updating menu item...");
            }
            
            const updateData = {
                id: editingItem.id,
                name: formData.name,
                description: formData.description,
                price: parseFloat(formData.price),
                category: formData.category,
                imageUrl: imageUrl,
                isVeg: formData.isVeg,
                isAvailable: formData.isAvailable,
                restaurantId: parseInt(restaurantId)
            };

            const response = await fetch(`https://localhost:7172/api/MenuItem/${editingItem.id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updateData)
            });

            if (response.ok) {
                const updatedItem = await response.json();
                showSuccess('Menu item updated successfully!');
                return updatedItem;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update menu item');
            }
        } catch (err) {
            showError('Error saving menu item: ' + err.message);
            throw err;
        } finally {
            setSubmitting(false);
            setUploadProgress('');
        }
    };

    const deleteMenuItem = async (itemId) => {
        if (window.confirm('Are you sure you want to delete this menu item?')) {
            try {
                const token = localStorage.getItem('token');
                const response = await fetch(`https://localhost:7172/api/MenuItem/${itemId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    showSuccess('Menu item deleted successfully!');
                    return true;
                } else {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to delete menu item');
                }
            } catch (err) {
                showError('Error deleting menu item: ' + err.message);
                return false;
            }
        }
        return false;
    };

    const toggleItemAvailability = async (itemId, currentAvailability) => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://localhost:7172/api/MenuItem/${itemId}/availability`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(!currentAvailability)
            });

            if (response.ok) {
                return !currentAvailability;
            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to update availability');
            }
        } catch (err) {
            showError('Error updating availability: ' + err.message);
            return currentAvailability;
        }
    };

    return {
        loading,
        submitting,
        uploadProgress,
        fetchRestaurantDetails,
        fetchMenuItems,
        createMenuItem,
        updateMenuItem,
        deleteMenuItem,
        toggleItemAvailability
    };
};

export default useMenuService;