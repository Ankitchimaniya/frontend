import React from 'react';
import PropTypes from 'prop-types';
import { FaUser, FaPhone, FaMapMarkerAlt, FaEdit, FaHistory } from 'react-icons/fa';
import { MdEmail, MdHome } from 'react-icons/md';
import { NavLink } from 'react-router-dom';
import getImageUrl from '../../GenericFunctions/getImageUrl';

const ProfileSidebar = ({ 
    user, 
    profileLoading, 
    profileError 
}) => {
    return (
        <div className="p-4 sm:p-6 h-full overflow-y-auto">
            {profileLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="w-6 h-6 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="ml-3 text-gray-600 text-sm sm:text-base">Loading profile...</p>
                </div>
            )}
            {!profileLoading && profileError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center mb-3">
                        <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-2">
                            <span className="text-red-600 text-sm">!</span>
                        </div>
                        <p className="text-red-700 flex-1">{profileError}</p>
                    </div>
                    <div className="flex gap-2">
                        {profileError.includes('log in') || profileError.includes('Session expired') ? (
                            <NavLink to="/login" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                                Login
                            </NavLink>
                        ) : (
                            <button 
                                onClick={() => window.location.reload()} 
                                className="inline-block bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                            >
                                Retry
                            </button>
                        )}
                    </div>
                </div>
            )}
            {!profileLoading && !profileError && !user && (
                <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                    <FaUser className="text-gray-400 text-3xl mx-auto mb-3" />
                    <p className="text-gray-600 mb-3">Please log in to view your profile</p>
                    <NavLink to="/login" className="inline-block bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Login
                    </NavLink>
                </div>
            )}
            {!profileLoading && !profileError && user && (
                <div className="space-y-6">
                    {/* Profile Header */}
                    <div className="text-center pb-6 border-b border-gray-200">
                        <div className="w-20 h-20 bg-gradient-food rounded-full flex items-center justify-center mx-auto mb-4 relative overflow-hidden">
                            {user.profileImageUrl ? (
                                <>
                                    <img 
                                        src={user.profileImageUrl.startsWith('http') 
                                            ? user.profileImageUrl 
                                            : getImageUrl(user.profileImageUrl.slice(1))
                                        } 
                                        alt="Profile" 
                                        className="w-full h-full rounded-full object-cover"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            const fallback = e.target.parentNode.querySelector('.fallback-icon');
                                            if (fallback) fallback.style.display = 'flex';
                                        }}
                                    />
                                    <FaUser className="fallback-icon text-white text-2xl absolute inset-0 items-center justify-center hidden" />
                                </>
                            ) : (
                                <FaUser className="text-white text-2xl" />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900">
                            {user.firstName && user.lastName 
                                ? `${user.firstName} ${user.lastName}`
                                : user.userName || user.username || 'User'
                            }
                        </h3>
                        <p className="text-sm text-gray-600">{user.email}</p>
                    </div>

                    {/* Profile Information */}
                    <div className="space-y-3">
                        {user.primaryMobileNumber && (
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                                    <FaPhone className="text-green-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">Primary Mobile</div>
                                    <div className="text-sm text-gray-600">{user.primaryMobileNumber}</div>
                                </div>
                            </div>
                        )}

                        {user.secondaryMobileNumber && (
                            <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                    <FaPhone className="text-blue-600 text-sm" />
                                </div>
                                <div className="flex-1">
                                    <div className="text-sm font-medium text-gray-900">Secondary Mobile</div>
                                    <div className="text-sm text-gray-600">{user.secondaryMobileNumber}</div>
                                </div>
                            </div>
                        )}

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center mr-3">
                                <MdEmail className="text-primary-600 text-sm" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">Email Address</div>
                                <div className="text-sm text-gray-600">{user.email}</div>
                            </div>
                        </div>

                        <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center mr-3">
                                <MdHome className="text-orange-600 text-sm" />
                            </div>
                            <div className="flex-1">
                                <div className="text-sm font-medium text-gray-900">Saved Addresses</div>
                                <div className="text-sm text-gray-600">
                                    {user.addressCount !== undefined 
                                        ? `${user.addressCount} address${user.addressCount !== 1 ? 'es' : ''}`
                                        : user.addresses 
                                        ? `${user.addresses.length} address${user.addresses.length !== 1 ? 'es' : ''}`
                                        : 'No addresses saved'
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-2 pt-4 border-t border-gray-200">
                        <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide px-3 mb-2">
                            Quick Actions
                        </h4>
                        <NavLink 
                            to="/profile/edit" 
                            className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                            <FaEdit className="text-gray-400 group-hover:text-primary-500 mr-3" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                Edit Profile
                            </span>
                        </NavLink>
                        
                        <NavLink 
                            to="/addresses" 
                            className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                            <FaMapMarkerAlt className="text-gray-400 group-hover:text-primary-500 mr-3" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                Manage Addresses
                            </span>
                        </NavLink>

                        <NavLink 
                            to="/orders" 
                            className="flex items-center w-full p-3 text-left hover:bg-gray-50 rounded-lg transition-colors group"
                        >
                            <FaHistory className="text-gray-400 group-hover:text-primary-500 mr-3" />
                            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
                                Order History
                            </span>
                        </NavLink>
                    </div>
                </div>
            )}
        </div>
    );
};

ProfileSidebar.propTypes = {
    user: PropTypes.object,
    profileLoading: PropTypes.bool,
    profileError: PropTypes.string,
};

ProfileSidebar.defaultProps = {
    user: null,
    profileLoading: false,
    profileError: null,
};

export default ProfileSidebar;