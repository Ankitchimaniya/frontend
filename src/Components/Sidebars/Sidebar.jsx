import React from 'react';
import PropTypes from 'prop-types';
import { MdClose } from 'react-icons/md';
import LocationSidebar from './LocationSidebar';
import ProfileSidebar from './ProfileSidebar';
import CartSidebar from './CartSidebar';

const Sidebar = ({
    isSidebarOpen,
    sidebarView,
    toggleSidebar,
    // Location props
    locations,
    handleLocationChange,
    // Profile props
    user,
    profileLoading,
    profileError,
    // Cart props
    allCartItems,
    cartItemCount,
    addToCart,
    removeFromCart,
    removeItemCompletely,
    // Mobile menu props
    links,
    isAuth,
    handleLogout,
    openLocationSidebar
}) => {
    const getSidebarTitle = () => {
        switch (sidebarView) {
            case 'location':
                return 'Select Location';
            case 'profile':
                return 'Your Profile';
            case 'cart':
                return 'Your Cart';
            default:
                return 'Menu';
        }
    };

    const renderSidebarContent = () => {
        switch (sidebarView) {
            case 'location':
                return (
                    <LocationSidebar 
                        locations={locations}
                        onLocationChange={handleLocationChange}
                    />
                );
            case 'profile':
                return (
                    <ProfileSidebar 
                        user={user}
                        profileLoading={profileLoading}
                        profileError={profileError}
                    />
                );
            case 'cart':
                return (
                    <CartSidebar 
                        allCartItems={allCartItems}
                        cartItemCount={cartItemCount}
                        addToCart={addToCart}
                        removeFromCart={removeFromCart}
                        removeItemCompletely={removeItemCompletely}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className={`fixed inset-0 z-50 ${isSidebarOpen ? 'visible' : 'invisible'} transition-all duration-300`} onClick={toggleSidebar}>
            <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${isSidebarOpen ? 'opacity-50' : 'opacity-0'}`}></div>
            <div className={`absolute top-0 ${sidebarView === 'location' ? 'left-0' : 'right-0'} h-full ${sidebarView === 'mobile-menu' ? 'w-full sm:w-80' : 'w-full sm:w-96'} bg-white shadow-2xl transform transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : (sidebarView === 'location' ? '-translate-x-full' : 'translate-x-full')}`} onClick={e => e.stopPropagation()}>
                {/* Header */}
                <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-200">
                    <h2 className="text-xl font-bold text-gray-900">
                        {getSidebarTitle()}
                    </h2>
                    <button 
                        className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200" 
                        onClick={toggleSidebar}
                    >
                        <MdClose className="text-xl text-gray-600" />
                    </button>
                </div>

                {/* Content */}
                {renderSidebarContent()}
            </div>
        </div>
    );
};

Sidebar.propTypes = {
    isSidebarOpen: PropTypes.bool.isRequired,
    sidebarView: PropTypes.oneOf(['location', 'profile', 'cart', 'mobile-menu']).isRequired,
    toggleSidebar: PropTypes.func.isRequired,
    // Location props
    locations: PropTypes.array,
    handleLocationChange: PropTypes.func,
    // Profile props
    user: PropTypes.object,
    profileLoading: PropTypes.bool,
    profileError: PropTypes.string,
    // Cart props
    allCartItems: PropTypes.array,
    cartItemCount: PropTypes.number,
    addToCart: PropTypes.func,
    removeFromCart: PropTypes.func,
    removeItemCompletely: PropTypes.func,
    // Mobile menu props
    links: PropTypes.array,
    isAuth: PropTypes.bool,
    handleLogout: PropTypes.func,
    openLocationSidebar: PropTypes.func
};

export default Sidebar;