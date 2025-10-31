import { RxCaretDown } from "react-icons/rx";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { MdLocationOn, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from '../CSS/Sidebar.module.css';

const locations = [
    {
        name: "Indore",
        address: "Madhya Pradesh, India",
        selected: true
    },
    {
        name: "Bhopal",
        address: "Madhya Pradesh, India",
        selected: false
    },
    {
        name: "Mumbai",
        address: "Maharashtra, India",
        selected: false
    },
    {
        name: "Delhi",
        address: "Delhi, India",
        selected: false
    }
];

localStorage.setItem('location', locations[0].name);
localStorage.setItem('address', locations[0].address);

export default function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false); 

    const handleLocationChange = (newLocation) => {
        const oldLocation = localStorage.getItem('location');
        localStorage.setItem('location', newLocation);
        const newLocationObj = locations.find(loc => loc.name === newLocation);
        if (newLocationObj) { 
            newLocationObj.selected = true;
            localStorage.setItem('address', newLocationObj.address);
            const selectedLocation = locations.find(loc => loc.name === oldLocation);
            if (selectedLocation) selectedLocation.selected = false;
        }

        localStorage.setItem('address', newLocationObj.address);
 
        // Close the sidebar after selecting a location
        setSidebarOpen(false);
    };

    const links = [
        { icon: <GoSearch />, name: "Search" },
        { icon: <BiSolidOffer />, name: "Offers", sup:'new' },
        { icon: <IoMdHelp />, name: "Help" },
        { icon: <TiShoppingCart />, name: "Cart", sup: 0 },
        // login/logout will be conditionally rendered below
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuth(!!token);

        // attach storage event to update UI if other tabs change auth
        const onStorage = (e) => {
            if (e.key === 'token') setIsAuth(!!e.newValue);
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsAuth(false);
        // simple redirect to home
        window.location.href = '/login';
    };
    const toggleSidebar = () => {
        setSidebarOpen(!isSidebarOpen);
    };

  

    return (
        <>
            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}>
                <div className={styles.sidebarContent} onClick={e => e.stopPropagation()}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.sidebarTitle}>Select Location</h2>
                        <button className={styles.closeButton} onClick={toggleSidebar}>
                            <MdClose />
                        </button>
                    </div>
                    <ul className={styles.locationList}>
                        {locations.map((location, index) => (
                            <li 
                                key={index} 
                                className={styles.locationItem}
                                onClick={() => {
                                    // Handle location selection here
                                    handleLocationChange(location.name);
                                }}
                            >
                                <MdLocationOn className={styles.locationIcon} />
                                <div className={styles.locationInfo}>
                                    <div className={styles.locationName}>{location.name}</div>
                                    <div className={styles.locationAddress}>{location.address}</div>
                                </div>
                                {location.selected && (
                                    <span className="text-orange-500">✓</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            
            {/* Header */}
            <header className="p-[15px] shadow-xl">
                <div className="max-w-[1200px] mx-auto flex items-center">
                    <div className="w-[50px] border">
                        <img src="images/logo.png" className="w-full" alt="" />
                    </div>
                    <div>
                        <span className="font-bold border-b-[3px] border-black">{localStorage.getItem('location')}</span>
                        {localStorage.getItem('address')} <RxCaretDown className="inline text-[orange] cursor-pointer" onClick={toggleSidebar} />

                    </div>
                    <nav className="ml-auto list-none flex gap-6 text-gray-600 font-semibold">
                        {links.map((link, index) => (
                            <li key={index} className="flex items-center gap-1 hover:text-black cursor-pointer">
                                {link.icon}
                                <sup>{link.sup}</sup>
                                 <span>{link.name}</span>
                            </li>
                        ))}

                        {/* auth link */}
                        {!isAuth ? (
                            <li className="flex items-center gap-1 hover:text-black cursor-pointer">
                                <FiLogIn />
                                <NavLink to="/login">Login</NavLink>
                            </li>
                        ) : (
                            <li className="flex items-center gap-1 hover:text-black cursor-pointer">
                                <FiLogOut />
                                <button onClick={handleLogout} className="text-left">Logout</button>
                            </li>
                        )}
                    </nav>
                </div>
            </header>
        </>
    );
}