import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useAlert from '../../hooks/useAlert';
import useMenuService from '../../hooks/useMenuService';
import AlertContainer from '../AlertContainer';
import LoadingSpinner from '../Common/LoadingSpinner';

// Component imports
import MenuHeader from '../Menu/MenuHeader';
import MenuItemList from '../Menu/MenuItemList';
import MenuItemModal from '../Menu/MenuItemModal';

export default function MenuManagement() {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const { alerts, showSuccess, showError, removeAlert } = useAlert();
    const { 
        loading, 
        submitting, 
        uploadProgress, 
        fetchRestaurantDetails, 
        fetchMenuItems, 
        createMenuItem, 
        updateMenuItem, 
        deleteMenuItem, 
        toggleItemAvailability 
    } = useMenuService(restaurantId, showSuccess, showError);

    const [restaurant, setRestaurant] = useState(null);
    const [menuItems, setMenuItems] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [editingItem, setEditingItem] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
        isVeg: true,
        isAvailable: true,
        imageUrl: ''
    });
    const [imageFile, setImageFile] = useState(null);

    useEffect(() => {
        const loadData = async () => {
            const [restaurantData, menuData] = await Promise.all([
                fetchRestaurantDetails(),
                fetchMenuItems()
            ]);
            
            if (restaurantData) {
                setRestaurant(restaurantData);
            }
            
            if (menuData) {
                setMenuItems(menuData);
            }
        };
        
        loadData();
    }, [restaurantId]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            price: '',
            category: '',
            isVeg: true,
            isAvailable: true,
            imageUrl: ''
        });
        setEditingItem(null);
        setImageFile(null);
    };

    const handleFileChange = (e) => {
        const file = e.target.files && e.target.files[0];
        setImageFile(file || null);
    };

    const handleAddMenuItem = () => {
        resetForm();
        setShowAddModal(true);
    };

    const handleEditMenuItem = (item) => {
        setFormData({
            name: item.name,
            description: item.description,
            price: item.price.toString(),
            category: item.category,
            isVeg: item.isVeg,
            isAvailable: item.isAvailable,
            imageUrl: item.imageUrl || ''
        });
        setEditingItem(item);
        setImageFile(null);
        setShowAddModal(true);
    };

    const handleDeleteMenuItem = async (itemId) => {
        const success = await deleteMenuItem(itemId);
        if (success) {
            setMenuItems(prev => prev.filter(item => item.id !== itemId));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            if (editingItem) {
                const updatedItem = await updateMenuItem(editingItem, formData, imageFile);
                setMenuItems(prev => 
                    prev.map(item => 
                        item.id === editingItem.id ? updatedItem : item
                    )
                );
            } else {
                const newItem = await createMenuItem(formData, imageFile);
                setMenuItems(prev => [...prev, newItem]);
            }

            setShowAddModal(false);
            resetForm();
        } catch (err) {
            // Error handling is done in the service
        }
    };

    const handleCancel = () => {
        setShowAddModal(false);
        resetForm();
    };

    const handleToggleAvailability = async (itemId, currentAvailability) => {
        const newAvailability = await toggleItemAvailability(itemId, currentAvailability);
        setMenuItems(prev => 
            prev.map(item => 
                item.id === itemId 
                    ? { ...item, isAvailable: newAvailability }
                    : item
            )
        );
    };

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return <LoadingSpinner message="Loading menu management..." />;
    }

    if (!restaurant) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-50">
                <div className="text-center p-8 bg-white rounded-lg shadow-lg">
                    <p className="text-lg font-medium text-gray-700">Restaurant not found</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            <MenuHeader 
                restaurant={restaurant} 
                onBack={handleBack} 
            />

            <MenuItemList 
                menuItems={menuItems}
                onAddItem={handleAddMenuItem}
                onEditItem={handleEditMenuItem}
                onDeleteItem={handleDeleteMenuItem}
                onToggleAvailability={handleToggleAvailability}
            />

            <MenuItemModal 
                show={showAddModal}
                editingItem={editingItem}
                formData={formData}
                submitting={submitting}
                uploadProgress={uploadProgress}
                imageFile={imageFile}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
                onInputChange={handleInputChange}
                onFileChange={handleFileChange}
            />
        </div>
    );
};
 