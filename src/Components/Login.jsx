import React, { useState } from 'react';
import styles from '../CSS/Login.module.css';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            const response = await fetch("https://localhost:7172/api/Authenticate/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    username: formData.username, // adjust if backend expects 'email' or 'username'
                    password: formData.password
                })
            });
            if (!response.ok) {
                throw new Error("Invalid credentials");
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            // store username to show in UI if needed
            localStorage.setItem("username", formData.username);
            localStorage.setItem("userId", data.userId);
            // navigate without full reload so components can react
            navigate('/');
        } catch (err) {
            setError(err.message || "Login failed");
        }
    };

    return (
        <div className={styles.loginContainer}>
            <div className={styles.loginBox}>
                <h2 className={styles.title}>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Username</label>
                        <input type="text" name="username" placeholder="Type your username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Type your password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className={styles.forgotPassword}>
                        <Link to="/forgot-password">Forgot password?</Link>
                    </div>
                    {error && <div style={{ color: 'red', marginBottom: '10px', textAlign: 'center' }}>{error}</div>}
                    <button type="submit" className={styles.loginButton}>
                        LOGIN
                    </button>
                </form>
                
                <div className={styles.divider}>Or Sign Up Using</div>
                
                <div className={styles.socialLogin}>
                    <div className={styles.socialButton}>
                        <img src="/images/facebook.png" alt="Facebook" width="45" height="45" />
                    </div>
                    <div className={styles.socialButton}>
                        <img src="/images/twitter.png" alt="Twitter" width="30" height="30" />
                    </div>
                    <div className={styles.socialButton}>
                        <img src="/images/google.png" alt="Google" width="50" height="50" />
                    </div>
                </div>
                
                <div className={styles.signupText}>
                    Or Sign Up Using
                </div>
                
                <div className={styles.signupText}>
                    <Link to="/signup" className={styles.signupLink}>SIGN UP</Link>
                </div>
            </div>
        </div>
    );
}