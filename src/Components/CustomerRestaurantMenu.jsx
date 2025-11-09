import React from 'react';
import useAlert from '../hooks/useAlert';
import useCustomerMenuService from '../hooks/useCustomerMenuService';
import AlertContainer from './AlertContainer';
import Cart from './Cart';

// Component imports
import LoadingState from './CustomerMenu/LoadingState';
import NotFoundState from './CustomerMenu/NotFoundState';
import RestaurantHeader from './CustomerMenu/RestaurantHeader';
import MenuSection from './CustomerMenu/MenuSection';
import EmptyMenu from './CustomerMenu/EmptyMenu';

const CustomerRestaurantMenu  = () => {
    const { alerts, showError, removeAlert } = useAlert();
    const {
        restaurant,
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
    } = useCustomerMenuService(showError);

    const groupedMenuItems = groupMenuItemsByCategory();

    if (loading) {
        return <LoadingState />;
    }

    if (!restaurant) {
        return <NotFoundState onGoBack={goBack} />;
    }

    return (
        <div className="min-h-screen bg-neutral-50 font-sans">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            {/* Header */}
            <RestaurantHeader restaurant={restaurant} onGoBack={goBack} />

            {/* Menu Content */}
            <div className="max-w-4xl mx-auto p-4 sm:p-8">
                {Object.keys(groupedMenuItems).length === 0 ? (
                    <EmptyMenu />
                ) : (
                    Object.entries(groupedMenuItems).map(([category, items], categoryIndex) => (
                        <MenuSection
                            key={category}
                            category={category}
                            items={items}
                            categoryIndex={categoryIndex}
                            getCartItemQuantity={getCartItemQuantity}
                            onAdd={addToCart}
                            onRemove={removeFromCart}
                        />
                    ))
                )}
            </div>

            {/* Cart Component */}
            <Cart 
                cart={cart}
                showCart={showCart}
                setShowCart={setShowCart}
                restaurantName={restaurant?.title}
                restaurantId={restaurantId}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeItemCompletely={removeItemCompletely}
            />
        </div>
    );
};

export default CustomerRestaurantMenu;