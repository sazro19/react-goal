import "./Header.css";
import darkTheme from "./assets/dark-theme.svg";
import {useContext} from "react";
import {ThemeContext} from "../theme/ThemeContext.jsx";

export default function Header() {
    return (
        <header className="header">
            <LeftSection/>
            <RightSection/>
        </header>
    );
}

function LeftSection() {
    return (
        <div className="left-section">
            <i className="fas fa-at"></i>
            <span className="name">Name Surname</span>
            <Navigation/>
        </div>
    );
}

function Navigation() {
    return (
        <nav className="nav">
            <a href="#">Blog</a>
            <a href="/login">Login</a>
        </nav>
    );
}

function RightSection() {
    const {theme, toggleTheme} = useContext(ThemeContext);

    return (
        <div className="right-section" onClick={toggleTheme} style={{cursor: "pointer"}}>
            <span>{theme === "light" ? "Light mode" : "Dark mode"}</span>
            <i className={theme === "light" ? "fas fa-sun" : "fas fa-moon"}>
                <img className="resize" src={darkTheme} alt="Toggle theme"/>
            </i>
        </div>
    );
}
