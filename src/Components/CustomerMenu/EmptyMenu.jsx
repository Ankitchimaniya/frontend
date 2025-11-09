import React from 'react';

const EmptyMenu = () => {
    return (
        <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-800 mb-3">🍽️ Menu Coming Soon!</h3>
            <p className="text-gray-600 text-lg">This restaurant is still preparing their delicious menu for you.</p>
        </div>
    );
};

export default EmptyMenu;