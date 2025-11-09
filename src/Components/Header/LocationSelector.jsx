import React from 'react';
import { RxCaretDown } from "react-icons/rx";

const LocationSelector = ({ onLocationClick, isDesktop = false }) => {
    const location = localStorage.getItem('location') || 'Select Location';
    const address = localStorage.getItem('address') || 'Choose your area';

    const baseClasses = "flex items-center space-x-1 text-gray-700 hover:text-gray-900 transition-colors duration-200 group";
    const classes = isDesktop ? baseClasses : `${baseClasses} w-full`;
    
    const borderColor = isDesktop ? "border-primary-500" : "border-orange-500";
    const textColor = isDesktop ? "text-primary-500 group-hover:text-primary-600" : "text-orange-500 group-hover:text-orange-600";

    return (
        <button onClick={onLocationClick} className={classes}>
            <div className={`text-left ${isDesktop ? '' : 'flex-1'}`}>
                <div className={`font-semibold text-sm border-b-2 ${borderColor} inline-block`}>
                    {location}
                </div>
                <div className={`text-xs ${isDesktop ? 'text-neutral-500 truncate max-w-48' : 'text-gray-500 truncate'}`}>
                    {address}
                </div>
            </div>
            <RxCaretDown className={`${textColor} transition-colors`} />
        </button>
    );
};

export default LocationSelector;