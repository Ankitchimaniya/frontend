import React from 'react';
import Card from './Card';
import apiClient from '../services/apiClient';

export default function OnlineDelivery() {
    const [data, setData] = React.useState([]); 

    const fetchData = async () => {
        const response = await apiClient.get('/RestaurantDetails');
        setData(response.data);
    }
    React.useEffect(() => {
        fetchData();
        
    }, []);
    return (
        <div className="w-full py-8">
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    Restaurants with Online Food Delivery
                </h2>
                <p className="text-gray-600">
                    Discover restaurants that deliver to your location
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
                {data.map((item, index) => (
                    <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                        <Card {...item} />
                    </div>
                ))}
            </div>
            
            {data.length === 0 && (
                <div className="text-center py-12">
                    <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
                    <p className="text-gray-500">Check back later for new restaurants in your area</p>
                </div>
            )}
        </div>
    );
};
