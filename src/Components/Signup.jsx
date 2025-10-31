import  { useState } from "react";
import styles from "../CSS/Signup.module.css";
import { Link } from "react-router-dom";

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }
    const [error, setError] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
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
                throw new Error("Signup failed");
            }
            const data = await response.json();
            localStorage.setItem("token", data.token);
            // Redirect or update UI as needed
            window.location.href = "/";
        } catch (err) {
            setError(err.message || "Signup failed");
        }
    };
    return (
        <div className={styles.signupContainer}>
            <div className={styles.signupBox}>
                <h2 className={styles.title}>Create Account</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label>Email</label>
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className={styles.formGroup}>
                        <label>Confirm Password</label>
                        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
                    </div>
                    {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                    <button type="submit" className={styles.signupButton}>
                        Sign Up
                    </button>
                </form>
                <div className={styles.loginText}>
                    Already have an account? <Link className={styles.loginLink} to="/login">Log in</Link>
                </div>
            </div>
        </div>
    );
}