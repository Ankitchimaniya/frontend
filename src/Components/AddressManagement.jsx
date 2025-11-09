import React, { useState, useEffect } from 'react';
import useAlert from '../hooks/useAlert';
import AlertContainer from './AlertContainer';
import LoadingSpinner from './Common/LoadingSpinner';
import AddressHeader from './Address/AddressHeader';
import AddressList from './Address/AddressList';
import AddressForm from './Address/AddressForm';
import useAddressService from '../hooks/useAddressService';

const AddressManagement = () => {
    const { alerts, showSuccess, showError, removeAlert } = useAlert();
    const { loading, fetchAddresses, saveAddress, deleteAddress, setDefaultAddress } = useAddressService(showSuccess, showError);
    
    const [addresses, setAddresses] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        label: '',
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        postalCode: '',
        country: 'India',
        landmark: '',
        addressType: 'Home',
        contactNumber: '',
        contactPersonName: '',
        deliveryInstructions: '',
        isDefault: false
    });

    const loadAddresses = async () => {
        try {
            const data = await fetchAddresses();
            setAddresses(data);
        } catch (err) {
            // Error handling is done in the service
        }
    };

    useEffect(() => {
        loadAddresses();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const resetForm = () => {
        setFormData({
            label: '',
            addressLine1: '',
            addressLine2: '',
            city: '',
            state: '',
            postalCode: '',
            country: 'India',
            landmark: '',
            addressType: 'Home',
            contactNumber: '',
            contactPersonName: '',
            deliveryInstructions: '',
            isDefault: false
        });
        setEditingAddress(null);
    };

    const openModal = (address = null) => {
        if (address) {
            setFormData(address);
            setEditingAddress(address);
        } else {
            resetForm();
        }
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        resetForm();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            await saveAddress(formData, editingAddress);
            await loadAddresses();
            closeModal();
        } catch (err) {
            // Error handling is done in the service
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (addressId) => {
        if (!window.confirm('Are you sure you want to delete this address?')) {
            return;
        }

        try {
            await deleteAddress(addressId);
            await loadAddresses();
        } catch (err) {
            // Error handling is done in the service
        }
    };

    const handleSetDefault = async (addressId) => {
        try {
            await setDefaultAddress(addressId);
            await loadAddresses();
        } catch (err) {
            // Error handling is done in the service
        }
    };

    if (loading) {
        return <LoadingSpinner message="Loading addresses..." />;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <AddressHeader onAddNew={() => openModal()} />
                
                <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
                    <AddressList 
                        addresses={addresses}
                        onEdit={openModal}
                        onDelete={handleDelete}
                        onSetDefault={handleSetDefault}
                        onAddNew={() => openModal()}
                    />
                </div>

                {showModal && (
                    <AddressForm
                        formData={formData}
                        onInputChange={handleInputChange}
                        onSubmit={handleSubmit}
                        onCancel={closeModal}
                        submitting={submitting}
                        editingAddress={editingAddress}
                    />
                )}
            </div>
        </div>
    );
};

export default AddressManagement;