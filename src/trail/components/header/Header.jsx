import "./css/Header.css";
import darkTheme from "./assets/dark-theme.svg";
import {useContext} from "react";
import {ThemeContext} from "../theme/ThemeContext.jsx";
import {AuthContext} from "../auth/js/AuthContext.js";
import {Link} from "react-router-dom";

export default function Header() {
    return (
        <header className="header">
            <LeftSection/>
            <RightSection/>
        </header>
    );
}

function LeftSection() {
    const {user} = useContext(AuthContext);

    return (
        <div className="left-section">
            <i className="fas fa-at"></i>
            <span className="name">
                {user?.email || "Guest"}
            </span>
            <Navigation/>
        </div>
    );
}

function Navigation() {
    const {user} = useContext(AuthContext);
    const favourites = <Link to="/favourites">Favourites</Link>
    const aboutMe = <Link to="/about-me">About me</Link>
    const addPost = <Link to="/addpost">Add new post</Link>
    return (
        <nav className="nav">
            <Link to="/">Blog</Link>
            {user && favourites}
            {user && aboutMe}
            {user && addPost}
        </nav>
    );
}

function RightSection() {
    const {theme, toggleTheme} = useContext(ThemeContext);
    const {user} = useContext(AuthContext);
    const logout = <Link to="/logout">Logout</Link>
    const login = <Link to="/login">Login</Link>
    const register = <Link to="/register">Register</Link>

    return (
        <div className="right-section">
            <nav className="nav">
                {user && logout}
                {!user && login}
                {!user && register}
            </nav>
            <div className="theme-section" onClick={toggleTheme}>
                <span>{theme === "light" ? "Light mode" : "Dark mode"}</span>
                <i className={theme === "light" ? "fas fa-sun" : "fas fa-moon"}>
                    <img className="resize" src={darkTheme} alt="Toggle theme"/>
                </i>
            </div>
        </div>
    );
}
