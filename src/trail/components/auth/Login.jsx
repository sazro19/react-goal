import React, {useContext, useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import "./css/Auth.css";
import {AuthContext} from "./js/AuthContext.js";
import {useRedirectIfLoggedIn} from "../../hooks/useRedirectIfLoggedIn.js";
import AuthFields from "./AuthFields.jsx";
import useLogin from "../../hooks/useLogin.js";
import useAuthValidation from "../../hooks/useAuthValidation.js";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const {setUser, user} = useContext(AuthContext);

    useRedirectIfLoggedIn(user);

    const {login, loading, error: loginError} = useLogin();
    const {errors, validateLogin} = useAuthValidation();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = validateLogin(email, password);
        if (Object.keys(newErrors).length > 0) return;

        const loggedInUser = await login(email, password);
        if (loggedInUser) {
            setUser(loggedInUser);
            navigate("/");
        }
    };

    return (
        <div className="auth-container">
            <h2>Login</h2>

            <form className="auth-form" onSubmit={handleSubmit}>
                <AuthFields
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    errors={errors}
                />

                {(errors.general || loginError) && (
                    <p className="error">{errors.general || loginError}</p>
                )}

                <div className="register-text">
                    Don't have an account? Click <Link to="/register">here</Link> to register.
                </div>

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Login"}
                </button>
            </form>
        </div>
    );
}

export default Login;
