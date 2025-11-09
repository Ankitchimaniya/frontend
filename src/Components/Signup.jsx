import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaCheck, FaTimes } from 'react-icons/fa';
import useAlert from '../hooks/useAlert';
import AlertContainer from './AlertContainer';

export default function Signup() {
    const { alerts, showError, showSuccess, removeAlert } = useAlert();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Password validation helpers
    const passwordValidation = {
        length: formData.password.length >= 6,
        match: formData.password === formData.confirmPassword && formData.confirmPassword !== '',
        hasContent: formData.password !== ''
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        
        // Validate password and confirm password match
        if (formData.password !== formData.confirmPassword) {
            showError("Passwords do not match");
            setLoading(false);
            return;
        }
        
        // Password strength validation
        if (formData.password.length < 6) {
            showError("Password must be at least 6 characters long");
            setLoading(false);
            return;
        }
        
        try {
            const response = await fetch("https://localhost:7172/api/authenticate/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.email,
                    email: formData.email,
                    password: formData.password
                })
            });
            
            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Signup failed");
            }
            
            const data = await response.json();
            localStorage.setItem("token", data.token);
            localStorage.setItem("username", formData.email);
            localStorage.setItem("userId", data.userId);
            showSuccess('Account created successfully! Welcome aboard!');
            setTimeout(() => navigate('/'), 1500);
        } catch (err) {
            showError(err.message || "Signup failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 flex items-center justify-center p-4">
            {/* Alert Container */}
            <AlertContainer alerts={alerts} removeAlert={removeAlert} />
            
            <div className="w-full max-w-md">
                {/* Signup Card */}
                <div className="card p-8 shadow-hard animate-fade-in">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
                        <p className="text-gray-600">Join us and start your journey</p>
                    </div>

                    {/* Signup Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Field */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                value={formData.email}
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
                                    placeholder="Create a password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className={`input pr-12 ${passwordValidation.hasContent && passwordValidation.length ? 'input-success' : passwordValidation.hasContent && !passwordValidation.length ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            
                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-2 space-y-1">
                                    <div className={`flex items-center space-x-2 text-sm ${passwordValidation.length ? 'text-green-600' : 'text-red-600'}`}>
                                        {passwordValidation.length ? <FaCheck className="text-xs" /> : <FaTimes className="text-xs" />}
                                        <span>At least 6 characters</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Confirm Password Field */}
                        <div className="form-group">
                            <label className="form-label" htmlFor="confirmPassword">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    placeholder="Confirm your password"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className={`input pr-12 ${formData.confirmPassword && passwordValidation.match ? 'input-success' : formData.confirmPassword && !passwordValidation.match ? 'input-error' : ''}`}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            
                            {/* Password Match Indicator */}
                            {formData.confirmPassword && (
                                <div className={`flex items-center space-x-2 text-sm mt-2 ${passwordValidation.match ? 'text-green-600' : 'text-red-600'}`}>
                                    {passwordValidation.match ? <FaCheck className="text-xs" /> : <FaTimes className="text-xs" />}
                                    <span>Passwords match</span>
                                </div>
                            )}
                        </div>

                        {/* Signup Button */}
                        <button
                            type="submit"
                            disabled={loading || !passwordValidation.length || !passwordValidation.match}
                            className="btn btn-primary w-full btn-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="loading-spinner w-4 h-4"></div>
                                    <span>Creating Account...</span>
                                </div>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <div className="text-center mt-6">
                        <p className="text-gray-600">
                            Already have an account?{' '}
                            <Link 
                                to="/login" 
                                className="font-semibold text-primary-600 hover:text-primary-700 hover:underline transition-colors"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}