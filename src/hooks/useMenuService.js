import { useState } from 'react';
import apiClient from '../services/apiClient';

const useMenuService = (restaurantId, showSuccess, showError) => {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState('');

    const fetchRestaurantDetails = async () => {
        try {
            const response = await apiClient.get(`/RestaurantDetails/${restaurantId}`);
            return response.data;
        } catch (error) {
            throw new Error('Failed to fetch restaurant details');
        }
    };
    
    const fetchMenuItems = async () => {
        try {
            const response = await apiClient.get(`/MenuItem/restaurant/${restaurantId}`);
            return response.data;
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

            const imageRes = await apiClient.post("/Images/Upload", imageFormData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

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

            const response = await apiClient.post(`/MenuItem`, menuItemData);
            const newItem = response.data;
            showSuccess('Menu item added successfully!');
            return newItem;
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

            const response = await apiClient.put(`/MenuItem/${editingItem.id}`, updateData);
            const updatedItem = response.data;
            showSuccess('Menu item updated successfully!');
            return updatedItem;
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
                await apiClient.delete(`/MenuItem/${itemId}`);
                showSuccess('Menu item deleted successfully!');
                return true;
            } catch (err) {
                showError('Error deleting menu item: ' + err.message);
                return false;
            }
        }
        return false;
    };

    const toggleItemAvailability = async (itemId, currentAvailability) => {
        try {
            const response = await apiClient.patch(`/MenuItem/${itemId}/availability`, !currentAvailability);
            return !currentAvailability;
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