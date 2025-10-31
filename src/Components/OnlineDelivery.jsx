import React from 'react';
import Card from './Card';

export default function OnlineDelivery() {
    const [data, setData] = React.useState([]); 

    const fetchData = async () => {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await fetch('https://localhost:7172/api/RestaurantDetails', { headers });
        const apiData = await response.json();
        setData(apiData);
    }
    React.useEffect(() => {
        fetchData();
        const onStorage = (e) => {
            if (e.key === 'token') fetchData();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);
    return (
        <div className="max-w-[1200px] mx-auto mb-4">
            <div className="flex my-5 item-left justify-between">
                <div className="text-[25px] font-bold">Restaurants with online food delivery in Indore</div>
             </div>

            <div className="grid grid-cols-4 gap-4">
                {
                    data.map(
                        (item, index) => {
                            return <Card key={index} {...item} />
                        }
                    )
                }
            </div>
        </div>
    );
};
