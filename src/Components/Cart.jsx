import React from 'react';
import useCartService from '../hooks/useCartService';
import AlertContainer from './AlertContainer';

// Component imports
import FloatingCartSummary from './Cart/FloatingCartSummary';
import CartModal from './Cart/CartModal';

const Cart = ({ 
    cart, 
    showCart, 
    setShowCart, 
    restaurantName, 
    restaurantId,
    addToCart, 
    removeFromCart, 
    removeItemCompletely,
    onCheckout 
}) => {
    const {
        alerts,
        removeAlert,
        getTotalPrice,
        getTotalItems,
        handleCheckout
    } = useCartService(cart, restaurantId, onCheckout);

    return (
        <>
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            {/* Floating Cart Summary */}
            <FloatingCartSummary
                cart={cart}
                getTotalItems={getTotalItems}
                getTotalPrice={getTotalPrice}
                onShowCart={() => setShowCart(true)}
            />

            {/* Cart Modal */}
            <CartModal
                showCart={showCart}
                setShowCart={setShowCart}
                cart={cart}
                restaurantName={restaurantName}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeItemCompletely={removeItemCompletely}
                getTotalPrice={getTotalPrice}
                handleCheckout={handleCheckout}
            />
        </>
    );
};

export default Cart;