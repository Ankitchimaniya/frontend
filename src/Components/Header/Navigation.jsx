import React from 'react';
import { NavLink } from 'react-router-dom';
import { FiLogOut, FiLogIn } from "react-icons/fi";

const Navigation = ({ links, isAuth, onLogout }) => {
    return (
        <nav className="hidden md:flex items-center space-x-6">
            {links.map((link, index) => (
                <div key={index} className="nav-link-inactive group">
                    <div className="flex items-center space-x-1">
                        <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                            {link.icon}
                        </span>
                        {link.sup && (
                            <sup className={`text-xs text-white px-1 rounded-full min-w-[16px] text-center font-semibold ${
                                link.name === 'Cart' ? 'bg-brand-500 animate-pulse' : 'bg-red-500'
                            }`}>
                                {link.sup}
                            </sup>
                        )}
                        {link.onClick ? (
                            <button onClick={link.onClick} className="font-medium">
                                {link.name}
                            </button>
                        ) : link.to ? (
                            <NavLink 
                                to={link.to}
                                className={({ isActive }) => 
                                    isActive ? "font-medium text-primary-600" : "font-medium"
                                }
                            >
                                {link.name}
                            </NavLink>
                        ) : (
                            <span className="font-medium">{link.name}</span>
                        )}
                    </div>
                </div>
            ))}

            {/* Auth Link */}
            {!isAuth ? (
                <div className="nav-link-inactive group">
                    <div className="flex items-center space-x-1">
                        <FiLogIn className="text-lg group-hover:scale-110 transition-transform duration-200" />
                        <NavLink 
                            to="/login"
                            className={({ isActive }) => 
                                isActive ? "font-medium text-primary-600" : "font-medium"
                            }
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            ) : (
                <div className="nav-link-inactive group">
                    <div className="flex items-center space-x-1">
                        <FiLogOut className="text-lg group-hover:scale-110 transition-transform duration-200" />
                        <button onClick={onLogout} className="font-medium">
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navigation;