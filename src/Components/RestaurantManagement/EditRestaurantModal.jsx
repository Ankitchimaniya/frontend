import React from 'react';
import RestaurantForm from './RestaurantForm';

const EditRestaurantModal = ({ 
    isOpen, 
    editingRestaurant, 
    onSuccess, 
    onCancel 
}) => {
    if (!isOpen || !editingRestaurant) return null;

    return (
        <div 
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in" 
            onClick={onCancel}
        >
            <div 
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slide-up" 
                onClick={(e) => e.stopPropagation()}
            >
                <RestaurantForm
                    editMode={true}
                    restaurantId={editingRestaurant.id}
                    initialData={editingRestaurant}
                    onSuccess={onSuccess}
                    onCancel={onCancel}
                />
            </div>
        </div>
    );
};

export default EditRestaurantModal;