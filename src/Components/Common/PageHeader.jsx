import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const PageHeader = ({ title, subtitle, showBackButton = true, backPath = '/' }) => {
    const navigate = useNavigate();

    return (
        <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
                    {subtitle && <p className="text-gray-600 mt-1">{subtitle}</p>}
                </div>
                {showBackButton && (
                    <button
                        onClick={() => navigate(backPath)}
                        className="flex items-center space-x-2 px-4 py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-lg transition-colors"
                    >
                        <FaArrowLeft className="text-sm" />
                        <span>Back to Home</span>
                    </button>
                )}
            </div>
        </div>
    );
};

export default PageHeader;