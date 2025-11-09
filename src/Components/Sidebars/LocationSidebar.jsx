import React from 'react';
import { MdLocationOn } from 'react-icons/md';

const LocationSidebar = ({ locations, onLocationChange }) => {
    return (
        <div className="p-6">
            <ul className="space-y-3">
                {locations.map((location, index) => (
                    <li
                        key={index}
                        className="flex items-center p-4 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors duration-200 border border-gray-100"
                        onClick={() => onLocationChange(location.name)}
                    >
                        <MdLocationOn className="text-brand-600 text-xl mr-3 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                            <div className="font-medium text-gray-900 truncate">{location.name}</div>
                            <div className="text-sm text-gray-500 truncate">{location.address}</div>
                        </div>
                        {location.isSelected && (
                            <span className="text-green-500 text-xl ml-2">✓</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LocationSidebar;