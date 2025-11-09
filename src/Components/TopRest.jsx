import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";
import Card from "./Card";
import apiClient from '../services/apiClient';

export default function TopRest() {
    const [data, setData] = React.useState([]);
    const [slide, setSlide] = React.useState(0);

    const fetchData = async () => {
        const response = await apiClient.get('/RestaurantDetails');
        setData(response.data);
    }

    React.useEffect(() => {
        fetchData();
        const onStorage = (e) => {
            if (e.key === 'token') fetchData();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const nextSlide = () => {
        if (slide < data.length - 3) {
            setSlide(slide + 3);
        }
    }
    const prevSlide = () => {
        if (slide > 0) {
            setSlide(slide - 3);
        }
    }

    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Top Restaurants Near You</h2>
                <div className="flex space-x-2">
                    <button 
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                            slide > 0 
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer' 
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={prevSlide}
                        disabled={slide === 0}
                    >
                        <FaArrowLeft className="text-sm" />
                    </button>
                    <button 
                        className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 ${
                            slide < data.length - 3
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={nextSlide}
                        disabled={slide >= data.length - 3}
                    >
                        <FaArrowRight className="text-sm" />
                    </button>
                </div>
            </div>
            
            <div className="flex gap-6 overflow-hidden">
                 {data.map((item, index) => (
                    <div 
                        style={{ transform: `translateX(-${slide * 100}%)` }}
                        key={index} 
                        className="w-80 flex-shrink-0 transition-transform duration-500 ease-in-out"
                    >
                        <Card {...item} />
                    </div>
                ))} 
            </div>
            
            <hr className="mt-8 mb-6 border-gray-200" />
        </div>
    );
}