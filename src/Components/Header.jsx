import React, { useState } from "react";
import { GoSearch } from "react-icons/go";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import { Sidebar } from "./Sidebars";
import useAlert from "../hooks/useAlert";
import useHeaderService from "../hooks/useHeaderService";
import AlertContainer from "./AlertContainer";

// Component imports
import Logo from "./Header/Logo";
import LocationSelector from "./Header/LocationSelector";
import Navigation from "./Header/Navigation";

export default function Header() {
    const { alerts, showWarning, removeAlert } = useAlert();
    const {
        isAuth,
        locations,
        user,
        profileError,
        profileLoading,
        cartItemCount,
        allCartItems,
        addToCart,
        removeFromCart,
        removeItemCompletely,
        handleLocationChange,
        fetchUserProfile,
        handleCartClick,
        handleLogout,
        setLocation
    } = useHeaderService(showWarning);

    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarView, setSidebarView] = useState('location');

    const openLocationSidebar = () => {
        setSidebarView('location');
        setSidebarOpen(true);
    };

    const openProfileSidebar = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setSidebarView('profile');
        setSidebarOpen(true);
        fetchUserProfile();
    };

    const openCartSidebar = () => {
        if (handleCartClick()) {
            setSidebarView('cart');
            setSidebarOpen(true);
        }
    };

    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

    const onLocationChange = (newLocation) => {
        handleLocationChange(newLocation, setLocation);
        setSidebarOpen(false);
    };

    const links = [
        { icon: <GoSearch />, name: "Search" },
        { icon: <BiSolidOffer />, name: "Offers", sup: 'new' },
        { icon: <IoMdHelp />, name: "Help" },
        { icon: <TiShoppingCart />, name: "Cart", sup: cartItemCount > 0 ? cartItemCount : null, onClick: openCartSidebar },
        { icon: <FaUser />, name: "Profile", onClick: openProfileSidebar },
        { icon: <IoIosAdd />, name: "Restaurant Mode", to: '/restaurant' },
    ];

    return (
        <>
            {/* Alert Container */}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />

            {/* Sidebar */}
            <Sidebar 
                isSidebarOpen={isSidebarOpen}
                sidebarView={sidebarView}
                toggleSidebar={toggleSidebar}
                // Location props
                locations={locations}
                handleLocationChange={onLocationChange}
                // Profile props
                user={user}
                profileLoading={profileLoading}
                profileError={profileError}
                // Cart props
                allCartItems={allCartItems}
                cartItemCount={cartItemCount}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
                removeItemCompletely={removeItemCompletely}
                // Mobile menu props
                links={links}
                isAuth={isAuth}
                handleLogout={handleLogout}
                openLocationSidebar={openLocationSidebar}
            />

            {/* Header */}
            <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center space-x-4">
                            <Logo />
                            
                            {/* Desktop Location Selector */}
                            <div className="hidden sm:block">
                                <LocationSelector 
                                    onLocationClick={openLocationSidebar} 
                                    isDesktop={true} 
                                />
                            </div>
                        </div>

                        {/* Navigation */}
                        <Navigation 
                            links={links}
                            isAuth={isAuth}
                            onLogout={handleLogout}
                        />
 
                    </div>

                    {/* Mobile Location Selector */}
                    <div className="sm:hidden pb-3">
                        <LocationSelector 
                            onLocationClick={openLocationSidebar} 
                            isDesktop={false} 
                        />
                    </div>
                </div>
            </header>
        </>
    );
}