import React from 'react';
import useAlert from '../../hooks/useAlert';
import useRestaurantListService from '../../hooks/useRestaurantListService';
import AlertContainer from '../AlertContainer';

// Component imports
import LoadingState from '../RestaurantList/LoadingState';
import RestaurantListHeader from '../RestaurantList/RestaurantListHeader';
import RestaurantCard from '../RestaurantList/RestaurantCard';
import AddRestaurant from './AddRestaurant';
import EditRestaurantModal from '../RestaurantList/EditRestaurantModal';

function ListComponent() {
    const { alerts, showSuccess, showError, removeAlert } = useAlert();
    const {
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
    } = useRestaurantListService(showSuccess, showError);

    if (loading) return <LoadingState />;

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-700 p-5">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            <RestaurantListHeader 
                onBackToUserMode={handleBackToUserMode}
                onAddRestaurant={handleAddRestaurant}
            />

            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {restaurants.map((restaurant) => (
                    <RestaurantCard
                        key={restaurant.id}
                        restaurant={restaurant}
                        onImageClick={handleImageClick}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                    />
                ))}
            </div>

            {/* Add Restaurant Modal/Page */}
            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
                        <AddRestaurant
                            editMode={false}
                            onSuccess={handleAddSuccess}
                            onCancel={handleAddCancel}
                        />
                    </div>
                </div>
            )}

            {/* Edit Restaurant Modal */}
            <EditRestaurantModal
                isOpen={showEditModal}
                editingRestaurant={editingRestaurant}
                onSuccess={handleEditSuccess}
                onCancel={handleEditCancel}
            />
        </div>
    );
};

export default ListComponent;