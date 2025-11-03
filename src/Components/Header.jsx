import { RxCaretDown } from "react-icons/rx";
import { useState, useEffect } from "react";
import { GoSearch } from "react-icons/go";
import { BiSolidOffer } from "react-icons/bi";
import { IoMdHelp } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { FaUser } from "react-icons/fa";
import { MdLocationOn, MdClose } from "react-icons/md";
import { NavLink } from "react-router-dom";
import styles from '../CSS/Sidebar.module.css';


export default function Header() {
    const [isAuth, setIsAuth] = useState(false);
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [sidebarView, setSidebarView] = useState('location'); // 'location' | 'profile'
    const [locations, setLocation] = useState([]);
    const [user, setUser] = useState(null);
    const [profileError, setProfileError] = useState("");
    const [profileLoading, setProfileLoading] = useState(false);

    const fetchLocation = async () => {
        const token = localStorage.getItem('token');
        const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
        const response = await fetch('https://localhost:7172/api/locations', { headers });
        const data = await response.json();
        setLocation(data);
    };

    useEffect(() => {
        fetchLocation();
        const onStorage = (e) => {
            if (e.key === 'token') fetchLocation();
        };
        window.addEventListener('storage', onStorage);
        return () => window.removeEventListener('storage', onStorage);
    }, []);

    const handleLocationChange = (newLocation) => {
        locations.forEach(location => {       
            location.name === newLocation ? location.isSelected = true : location.isSelected = false;
        });
        const selectedLocation = locations.find(loc => loc.name === newLocation);
        localStorage.setItem('location', selectedLocation.name);
        localStorage.setItem('address', selectedLocation.address);
        setLocation([...locations]);

        // Close the sidebar after selecting a location
        setSidebarOpen(false);
    };

    const openLocationSidebar = () => {
        setSidebarView('location');
        setSidebarOpen(true);
    };

    const fetchUserProfile = async () => {
        setProfileLoading(true);
        setProfileError("");
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                throw new Error('User not logged in');
            }
            const res = await fetch('https://localhost:7172/api/authenticate/profile', {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (!res.ok) throw new Error('Failed to fetch profile');
            const data = await res.json();
            setUser(data);
        } catch (err) {
            setUser(null);
            setProfileError(err.message || 'Failed to load profile');
        } finally {
            setProfileLoading(false);
        }
    };

    const openProfileSidebar = (e) => {
        if (e && e.preventDefault) e.preventDefault();
        setSidebarView('profile');
        setSidebarOpen(true);
        // Fetch profile details when opening the sidebar
        fetchUserProfile();
    };

    const links = [
        { icon: <GoSearch />, name: "Search" },
        { icon: <BiSolidOffer />, name: "Offers", sup: 'new' },
        { icon: <IoMdHelp />, name: "Help" },
        { icon: <TiShoppingCart />, name: "Cart", sup: 0 },
        { icon: <FaUser />, name: "Profile", onClick: openProfileSidebar },
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
            {/* Sidebar (Location/Profile) */}
            <div className={`${styles.sidebar} ${isSidebarOpen ? styles.active : ''}`} onClick={toggleSidebar}>
                <div className={`${sidebarView === 'location' ? styles.sidebarContentLeft : styles.sidebarContent}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.sidebarTitle}>
                            {sidebarView === 'location' ? 'Select Location' : 'Your Profile'}
                        </h2>
                        <button className={styles.closeButton} onClick={toggleSidebar}>
                            <MdClose />
                        </button>
                    </div>

                    {sidebarView === 'location' ? (
                        <ul className={styles.locationList}>
                            {locations.map((location, index) => (
                                <li
                                    key={index}
                                    className={styles.locationItem}
                                    onClick={() => handleLocationChange(location.name)}
                                >
                                    <MdLocationOn className={styles.locationIcon} />
                                    <div className={styles.locationInfo}>
                                        <div className={styles.locationName}>{location.name}</div>
                                        <div className={styles.locationAddress}>{location.address}</div>
                                    </div>
                                    {location.isSelected && (
                                        <span className="text-orange-500">✓</span>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <div>
                            {profileLoading && <p>Loading profile...</p>}
                            {!profileLoading && profileError && (
                                <p style={{ color: 'red', marginBottom: 12 }}>{profileError}. <a href="/login" className="text-blue-600 underline">Login</a></p>
                            )}
                            {!profileLoading && !profileError && user && (
                                <div className={styles.locationList}>
                                    <div className={styles.locationItem} style={{ cursor: 'default' }}>
                                        <FaUser />
                                        <div className={styles.locationInfo}>
                                            <div className={styles.locationName}>Username</div>
                                            <div className={styles.locationAddress}>{user.username || user.email}</div>
                                        </div>
                                    </div>
                                    <div className={styles.locationItem} style={{ cursor: 'default' }}>
                                        <MdLocationOn className={styles.locationIcon} />
                                        <div className={styles.locationInfo}>
                                            <div className={styles.locationName}>Email</div>
                                            <div className={styles.locationAddress}>{user.email}</div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
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
                        {localStorage.getItem('address')} <RxCaretDown className="inline text-[orange] cursor-pointer" onClick={openLocationSidebar} />

                    </div>
                    <nav className="ml-auto list-none flex gap-6 text-gray-600 font-semibold">
                        {links.map((link, index) => (
                            <li key={index} className="flex items-center gap-1 hover:text-black cursor-pointer">
                                {link.icon}
                                <sup>{link.sup}</sup>
                                {link.onClick ? (
                                    <button onClick={link.onClick} className="text-left">
                                        {link.name}
                                    </button>
                                ) : link.to ? (
                                    <NavLink to={link.to}>{link.name}</NavLink>
                                ) : (
                                    <span>{link.name}</span>
                                )}
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