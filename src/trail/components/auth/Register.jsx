import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./css/Auth.css";
import {AuthContext} from "./js/AuthContext.js";
import {useRedirectIfLoggedIn} from "../../hooks/useRedirectIfLoggedIn.js";
import AuthFields from "./AuthFields.jsx";
import useRegister from "../../hooks/useRegister.js";
import useAuthValidation from "../../hooks/useAuthValidation.js";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();
    const {setUser, user} = useContext(AuthContext);

    useRedirectIfLoggedIn(user);

    const {register, loading, error: registerError} = useRegister();
    const {errors, validateRegister} = useAuthValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateRegister(email, password, confirmPassword);
        if (Object.keys(newErrors).length > 0) return;

        const createdUser = await register(email, password);

        if (createdUser) {
            setUser(createdUser);
            navigate("/");
        }
    };

    return (
        <div className="auth-container">
            <h2>Register</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
                <AuthFields
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                />

                <label htmlFor="confirmPassword">Confirm Password:</label>
                <input
                    type="password"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword}</p>
                )}

                {(errors.general || registerError) && (
                    <p className="error">
                        {errors.general || registerError}
                    </p>
                )}

                <div className="register-text">
                    Already have an account? Click <Link to="/login">here</Link> to login.
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Registering..." : "Register"}
                </button>
            </form>
        </div>
    );
}
