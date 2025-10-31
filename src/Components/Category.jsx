import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import React from "react";

function getImageUrl(imagePath) {
    return "https://localhost:7172/api/Images/File/" + imagePath;
}

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
           return () => window.removeEventListener('storage', onStorage);
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
        <div className="max-w-[1200px] mx-auto">
            <div className="flex my-5 item-left justify-between">
               <div className="text-[25px] font-bold">What's on your Mind??</div>
                <div className="flex">
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-gray rounded-full mx-2 "
                    onClick={prevSlide}>
                        <FaArrowLeft/>
                    </div>
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-gray rounded-full mx-2"
                    onClick={nextSlide}>
                        <FaArrowRight/>
                    </div>
                </div>
            </div>
            <div className="flex border-red-600 overflow-hidden">
                {categories.map((category, index) => {
                    return(

                    <div  style={ {transform:`translateX(-${slide*100}%)`}}
                    key={index} className="w-[150px] shrink-0 duration-500">
                        <img src={getImageUrl(category.imageUrl)} alt=""/>
                    </div>
                )})}
            </div>
            <hr className="my-6 border-[1px]"/>
            
        </div>
    );
}

