import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAlert from '../hooks/useAlert';
import AlertContainer from './AlertContainer';
import orderService from '../services/orderService';

// Component imports
import PageHeader from './Common/PageHeader';
import LoadingSpinner from './Common/LoadingSpinner';
import AddressSelection from './Checkout/AddressSelection';
import ContactNumber from './Checkout/ContactNumber';
import PaymentMethod from './Checkout/PaymentMethod';
import OrderNotes from './Checkout/OrderNotes';
import OrderSummary from './Checkout/OrderSummary';

const Checkout = () => {
    const { restaurantId } = useParams();
    const navigate = useNavigate();
    const { alerts, showSuccess, showError, removeAlert } = useAlert();
    const [cartItems, setCartItems] = useState([]);
    const [restaurantInfo, setRestaurantInfo] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [paymentMethod, setPaymentMethod] = useState('COD');
    const [orderNotes, setOrderNotes] = useState('');
    const [deliveryInstructions, setDeliveryInstructions] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [loading, setLoading] = useState(true);
    const [placing, setPlacing] = useState(false);

    const [orderSummary, setOrderSummary] = useState({
        subtotal: 0,
        deliveryFee: 0,
        taxes: 0,
        total: 0
    });

    useEffect(() => {
        loadCheckoutData();
    }, [restaurantId]);

    const loadCheckoutData = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            // Load cart items
            const cartKey = `cart_${restaurantId}`;
            const cart = JSON.parse(localStorage.getItem(cartKey) || '[]');
            if (cart.length === 0) {
                navigate('/');
                return;
            }
            setCartItems(cart);

            // Load restaurant info
            const restaurantResponse = await fetch(`https://localhost:7172/api/RestaurantDetails/${restaurantId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (restaurantResponse.ok) {
                const restaurantData = await restaurantResponse.json();
                setRestaurantInfo(restaurantData);
            }

            // Load user addresses
            const addressResponse = await fetch('https://localhost:7172/api/UserAddress', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (addressResponse.ok) {
                const addressData = await addressResponse.json();
                setAddresses(addressData);
                const defaultAddress = addressData.find(addr => addr.isDefault);
                if (defaultAddress) {
                    setSelectedAddress(defaultAddress);
                    setContactNumber(defaultAddress.contactNumber || '');
                }
            }

            // Load user profile for contact number
            const profileResponse = await fetch('https://localhost:7172/api/UserProfile', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (profileResponse.ok) {
                const profileData = await profileResponse.json();
                if (!contactNumber && profileData.primaryMobileNumber) {
                    setContactNumber(profileData.primaryMobileNumber);
                }
            }

            // Calculate order summary
            calculateOrderSummary(cart);
        } catch (err) {
            showError('Failed to load checkout data');
        } finally {
            setLoading(false);
        }
    };

    const calculateOrderSummary = (items) => {
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const deliveryFee = subtotal < 200 ? 40 : 0; // Free delivery above ₹200
        const taxes = Math.round((subtotal + deliveryFee) * 0.18 * 100) / 100; // 18% GST
        const total = subtotal + deliveryFee + taxes;

        setOrderSummary({
            subtotal: subtotal.toFixed(2),
            deliveryFee: deliveryFee.toFixed(2),
            taxes: taxes.toFixed(2),
            total: total.toFixed(2)
        });
    };

    const handleAddressSelect = (address) => {
        setSelectedAddress(address);
        if (address.contactNumber) {
            setContactNumber(address.contactNumber);
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            showError('Please select a delivery address');
            return;
        }

        if (!contactNumber.trim()) {
            showError('Please provide a contact number');
            return;
        }

        setPlacing(true);

        try {
            const orderData = {
                restaurantId: parseInt(restaurantId),
                deliveryAddressId: selectedAddress.id,
                contactNumber: contactNumber,
                orderNotes: orderNotes,
                deliveryInstructions: deliveryInstructions,
                paymentMethod: paymentMethod,
                orderItems: cartItems.map(item => ({
                    menuItemId: item.id,
                    quantity: item.quantity,
                    specialInstructions: item.specialInstructions || ''
                }))
            };

            const result = await orderService.createOrder(orderData);
            
            // Clear cart
            localStorage.removeItem(`cart_${restaurantId}`);
            
            // Trigger cart update event
            window.dispatchEvent(new Event('cartUpdated'));
            
            // Navigate to order details page
            showSuccess(`Order placed successfully! Order Number: ${result.orderNumber}`);
            navigate(`/orders`);
        } catch (err) {
            showError(err.message || 'Failed to place order');
        } finally {
            setPlacing(false);
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading checkout details..." />;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            <div className="max-w-4xl mx-auto px-4">
                <PageHeader 
                    title="Checkout" 
                    subtitle="Review your order and complete payment" 
                />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <AddressSelection 
                            addresses={addresses}
                            selectedAddress={selectedAddress}
                            onAddressSelect={handleAddressSelect}
                        />

                        <ContactNumber 
                            contactNumber={contactNumber}
                            onContactNumberChange={setContactNumber}
                        />

                        <PaymentMethod 
                            paymentMethod={paymentMethod}
                            onPaymentMethodChange={setPaymentMethod}
                        />

                        <OrderNotes 
                            orderNotes={orderNotes}
                            deliveryInstructions={deliveryInstructions}
                            onOrderNotesChange={setOrderNotes}
                            onDeliveryInstructionsChange={setDeliveryInstructions}
                        />
                    </div>

                    {/* Order Summary Sidebar */}
                    <OrderSummary 
                        restaurantInfo={restaurantInfo}
                        cartItems={cartItems}
                        orderSummary={orderSummary}
                        onPlaceOrder={handlePlaceOrder}
                        placing={placing}
                        isDisabled={!selectedAddress || !contactNumber.trim()}
                    />
                </div>
            </div>
        </div>
    );
};

export default Checkout;