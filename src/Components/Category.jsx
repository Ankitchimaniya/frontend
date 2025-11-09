import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import React from "react";
import { Link } from "react-router-dom";
import getImageUrl from "../GenericFunctions/getImageUrl.jsx";
 
export default function Category() {
    const [slide , setSlide] = React.useState(0);
    const [categories, setCategories] = React.useState([]);
   
       const fetchCategories = async () => {
           const token = localStorage.getItem('token');
           const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
           const response = await fetch('https://localhost:7172/api/Catagory/GetCatagories', { headers });
           const data = await response.json();
           setCategories(data);
       }; 

       React.useEffect(() => {
           fetchCategories();
           const onStorage = (e) => {
               if (e.key === 'token') fetchCategories();
           };
           window.addEventListener('storage', onStorage);
           return () => window.removeEventListener('storage', onStorage); //clean up function 
       }, []);

        const nextSlide = () => {
        if(slide < categories.length - 8){
            setSlide(slide + 3);
        }
        }
            const prevSlide = () => {
        if(slide > 0){
            setSlide(slide - 3);
        }
        }


    return (
        <div className="w-full py-8">
            <div className="flex items-center justify-between mb-6">
               <h2 className="text-2xl font-bold text-gray-900">What's on your Mind?</h2>
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
                            slide < categories.length - 8
                                ? 'bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                        onClick={nextSlide}
                        disabled={slide >= categories.length - 8}
                    >
                        <FaArrowRight className="text-sm" />
                    </button>
                </div>
            </div>
            
            <div className="flex overflow-hidden">
                {categories.map((category, index) => (
                    <div 
                        style={{transform: `translateX(-${slide * 100}%)`}}
                        key={index} 
                        className="w-32 flex-shrink-0 transition-transform duration-500 ease-in-out"
                    >
                        <Link 
                            to="" 
                            className="block group"
                        >
                            <div className="relative overflow-hidden rounded-lg">
                                <img 
                                    src={getImageUrl(category.imageUrl)} 
                                    alt={category.name || 'Category'}
                                    className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                            </div>
                          
                        </Link>
                    </div>
                ))}
            </div>
            
            <hr className="mt-8 mb-6 border-gray-200" />
        </div>
    );
}