import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle, FaCheckCircle, FaInfoCircle, FaTimes } from 'react-icons/fa';

const Alert = ({ 
    isVisible, 
    message, 
    type = 'warning', 
    duration = 3000, 
    onClose,
    position = 'top-center'
}) => {
    const [show, setShow] = useState(isVisible);

    useEffect(() => {
        setShow(isVisible);
        
        if (isVisible && duration > 0) {
            const timer = setTimeout(() => {
                handleClose();
            }, duration);
            
            return () => clearTimeout(timer);
        }
    }, [isVisible, duration]);

    const handleClose = () => {
        setShow(false);
        if (onClose) {
            // Delay the onClose callback to allow animation to complete
            setTimeout(() => onClose(), 300);
        }
    };

    const getAlertStyles = () => {
        const baseStyles = "fixed z-50 animate-slide-down";
        
        const positionStyles = {
            'top-center': 'top-20 left-1/2 transform -translate-x-1/2',
            'top-right': 'top-20 right-4',
            'top-left': 'top-20 left-4',
            'bottom-center': 'bottom-20 left-1/2 transform -translate-x-1/2',
            'bottom-right': 'bottom-20 right-4',
            'bottom-left': 'bottom-20 left-4'
        };

        return `${baseStyles} ${positionStyles[position]}`;
    };

    const getTypeStyles = () => {
        switch (type) {
            case 'success':
                return {
                    background: 'bg-gradient-to-r from-green-500 to-emerald-600',
                    icon: FaCheckCircle
                };
            case 'error':
                return {
                    background: 'bg-gradient-to-r from-red-500 to-rose-600',
                    icon: FaExclamationTriangle
                };
            case 'info':
                return {
                    background: 'bg-gradient-to-r from-blue-500 to-indigo-600',
                    icon: FaInfoCircle
                };
            case 'warning':
            default:
                return {
                    background: 'bg-gradient-to-r from-orange-500 to-red-500',
                    icon: FaExclamationTriangle
                };
        }
    };

    if (!show) return null;

    const { background, icon: IconComponent } = getTypeStyles();

    return (
        <div className={getAlertStyles()}>
            <div className={`${background} text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3 max-w-md mx-4 min-w-80`}>
                <IconComponent className="text-xl flex-shrink-0" />
                <div className="flex-1">
                    <p className="font-medium text-sm">{message}</p>
                </div>
                <button 
                    onClick={handleClose}
                    className="text-white hover:text-gray-200 transition-colors p-1 rounded hover:bg-white/20"
                    aria-label="Close alert"
                >
                    <FaTimes className="text-sm" />
                </button>
            </div>
        </div>
    );
};

export default Alert;