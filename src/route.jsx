import Login from "./Components/Login";
import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "./Components/root";
import Signup from "./Components/Signup";

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
    }
]);

export default router;