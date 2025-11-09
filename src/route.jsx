import Login from "./Components/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./Components/root";
import Signup from "./Components/Signup"; 
import ListComponent from "./Components/RestaurantComponents/ListComponent.jsx";
import MenuManagement from "./Components/RestaurantComponents/MenuManagement.jsx";
import CustomerRestaurantMenu from "./Components/CustomerRestaurantMenu.jsx";
import AddressManagement from "./Components/AddressManagement.jsx";
import ProfileManagement from "./Components/ProfileManagement.jsx";
import OrderHistory from "./Components/OrderHistory.jsx";
import OrderDetails from "./Components/OrderDetails.jsx";
import Checkout from "./Components/Checkout.jsx";
import Help from "./Components/Help.jsx";

// Protected Route component
const ProtectedRoute = ({ children }) => {
    const isAuthenticated = !!localStorage.getItem('token');
    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><RootLayout /></ProtectedRoute>
    },
    {
        path: "login",
        element: <Login />
    },
    {
        path: "signup",
        element: <Signup />
    },
    {
        path: "restaurant",
        element: <ListComponent />
    },
    {
        path: "restaurant/:restaurantId/manage-menu",
        element: <ProtectedRoute><MenuManagement /></ProtectedRoute>
    },
    {
        path: "restaurant/:restaurantId/menu",
        element: <CustomerRestaurantMenu />
    },
    {
        path: "addresses",
        element: <ProtectedRoute><AddressManagement /></ProtectedRoute>
    },
    {
        path: "profile/edit",
        element: <ProtectedRoute><ProfileManagement /></ProtectedRoute>
    },
    {
        path: "orders",
        element: <ProtectedRoute><OrderHistory /></ProtectedRoute>
    },
    {
        path: "orders/:orderId",
        element: <ProtectedRoute><OrderDetails /></ProtectedRoute>
    },
    {
        path: "checkout/:restaurantId",
        element: <ProtectedRoute><Checkout /></ProtectedRoute>
    },
    {
        path: "help",
        element: <Help />
    }
]);

export default router;