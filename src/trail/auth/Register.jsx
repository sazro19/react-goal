import {useContext, useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import {AuthContext} from "./AuthContext.js";
import './Auth.css';
import {useRedirectIfLoggedIn} from "./hooks/useRedirectIfLoggedIn.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [errors, setErrors] = useState({});
    const {setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const {user} = useContext(AuthContext);
    useRedirectIfLoggedIn(user);

    async function handleSubmit(e) {
        e.preventDefault();

        const newErrors = {};

        if (!email.trim()) newErrors.email = "Email is required";
        if (!email.trim()) {
            newErrors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            newErrors.email = "Invalid email format";
        }

        if (!password.trim()) newErrors.password = "Password is required";
        if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        const newUser = {
            email,
            password,
            favorites: []
        };

        try {
            const res = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(newUser)
            });

            if (!res.ok) {
                setErrors({general: "Registration failed"});
                return;
            }

            const createdUser = await res.json();
            setUser(createdUser);
            navigate("/");
        } catch (err) {
            setErrors({general: "Server error: " + err});
        }
    }

    return (
        <div className="auth-container">
            <h2>Register</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className="error">{errors.email}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}

                {errors.general && <p className="error">{errors.general}</p>}

                <div className="register-text">
                    Already have an account? Click <Link to="/login">here</Link> to login.
                </div>

                <button type="submit">Register</button>
            </form>
        </div>
    );
}

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

