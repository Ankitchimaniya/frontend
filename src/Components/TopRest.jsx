import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import React from "react";
import Card from "./Card";

export default function TopRest() {
    const [data, setData] = React.useState([]);
    const [slide, setSlide] = React.useState(0);

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
        <div className="max-w-[1200px] mx-auto ">
            <div className="flex my-5 item-left justify-between">
                <div className="text-[25px] font-bold">Top restaurants in Indore</div>
                <div className="flex">
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-gray rounded-full mx-2 "
                        onClick={prevSlide}>
                        <FaArrowLeft />
                    </div>
                    <div className="cursor-pointer flex justify-center items-center w-[30px] h-[30px] bg-gray rounded-full mx-2"
                        onClick={nextSlide}>
                        <FaArrowRight />
                    </div>
                </div>
            </div>
            <div className="flex gap-10 overflow-hidden">
                 {data.map(
                    (item, index) => {
                        return (
                            <div style={{ transform: `translateX(-${slide * 100}%)` }}
                                key={index} className="w-[250px] shrink-0 duration-500">
                                <Card key={index} {...item} />
                            </div>
                        );
                    })
                } 
            </div>
        </div>
    );
}