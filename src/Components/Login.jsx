import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash, FaFacebookF, FaTwitter, FaGoogle } from 'react-icons/fa';
import useAuth from '../hooks/useAuth';
import AlertContainer from './AlertContainer';

export default function Login() {
    const { login, loading, alerts, removeAlert } = useAuth();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await login({
                username: formData.username,
                password: formData.password
            });
            
            // Navigate to home page after successful login
            setTimeout(() => navigate('/'), 1500);
        } catch (error) {
            // Error handling is done in the useAuth hook
            console.error('Login error:', error);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 flex items-center justify-center p-4">
            {/* Alert Container */}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            <div className="w-full max-w-md">
                {/* Login Card */}
                <div className="card p-8 shadow-hard animate-fade-in">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
                        <p className="text-gray-600">Sign in to your account</p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Username Field */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="username">
                                Username
                            </label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                placeholder="Enter your username"
                                value={formData.username}
                                onChange={handleChange}
                                required
                                className="input"
                            />
                        </div>

                        {/* Password Field */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="password">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="input pr-12"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password */}
                        <div className="flex justify-end">
                            <Link 
                                to="/forgot-password" 
                                className="text-sm text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="loading-spinner w-4 h-4"></div>
                                    <span>Signing in...</span>
                                </div>
                            ) : (
                                'LOGIN'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-500">Or continue with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="flex justify-center space-x-4 mb-6">
                        <button className="p-3 border border-gray-300 rounded-full hover:border-blue-500 hover:bg-blue-50 transition-colors group">
                            <FaFacebookF className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                        </button>
                        <button className="p-3 border border-gray-300 rounded-full hover:border-sky-500 hover:bg-sky-50 transition-colors group">
                            <FaTwitter className="w-5 h-5 text-gray-600 group-hover:text-sky-500" />
                        </button>
                        <button className="p-3 border border-gray-300 rounded-full hover:border-red-500 hover:bg-red-50 transition-colors group">
                            <FaGoogle className="w-5 h-5 text-gray-600 group-hover:text-red-500" />
                        </button>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center">
                        <p className="text-gray-600">
                            Don't have an account?{' '}
                            <Link 
                                to="/signup" 
                                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                            >
                                Sign Up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}