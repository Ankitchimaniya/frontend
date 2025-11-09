import { useNavigate } from 'react-router-dom';
import useAlert from '../hooks/useAlert';

const useCartService = (
    cart,
    restaurantId,
    onCheckout
) => {
    const navigate = useNavigate();
    const { alerts, showInfo, removeAlert } = useAlert();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
    };

    const getTotalItems = () => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    };

    const handleCheckout = () => {
        if (onCheckout) {
            onCheckout(cart, getTotalPrice());
        } else {
            // Navigate to checkout page with restaurant ID
            if (restaurantId) {
                navigate(`/checkout/${restaurantId}`);
            } else {
                showInfo('Unable to proceed to checkout. Restaurant information not available.');
            }
        }
    };

    return {
        alerts,
        removeAlert,
        getTotalPrice,
        getTotalItems,
        handleCheckout
    };
};

export default useCartService;