import React, {useContext, useState} from 'react';
import {Link, useNavigate} from "react-router-dom";
import './Auth.css';
import {AuthContext} from "./AuthContext.js";
import {useRedirectIfLoggedIn} from "./hooks/useRedirectIfLoggedIn.js";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const navigate = useNavigate();
    const {setUser} = useContext(AuthContext);
    const {user} = useContext(AuthContext);
    useRedirectIfLoggedIn(user);

    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!username.trim()) {
            newErrors.username = "Username is required";
        }
        if (!password.trim()) {
            newErrors.password = "Password is required";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length > 0) {
            return;
        }

        try {
            const response = await fetch(
                `http://localhost:3000/users?username=${username}&password=${password}`
            );

            const data = await response.json();

            if (data.length === 0) {
                setErrors({general: "Invalid username or password"});
                return;
            }

            const user = data[0];
            setUser(user);

            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            setErrors({general: "Server error. Try again later."});
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>
            <form className="auth-form" onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {errors.username && <p className="error">{errors.username}</p>}

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {errors.password && <p className="error">{errors.password}</p>}
                {errors.general && <p className="error">{errors.general}</p>}

                <div className="register-text">
                    Don't have an account? Click <Link to="/register">here</Link> to register?
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Login;
