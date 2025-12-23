import "./Header.css"
import darkTheme from "./assets/dark-theme.svg"

export default function Header() {
    return (
        <header className="header">
            <LeftSection/>
            <RightSection/>
        </header>
    )
}

function LeftSection() {
    return (
        <div className="left-section">
            <i className="fas fa-at"></i>
            <span className="name">Name Surname</span>
            <Navigation/>
        </div>
    )
}

function Navigation() {
    return (
        <nav className="nav">
            <a href="#">Blog</a>
            <a href="#">Login</a>
        </nav>
    )
}

function RightSection() {
    return (
        <div className="right-section">
            <span>Light mode</span>
            <i className="fas fa-sun">
                <img className="resize" src={darkTheme} alt="Dark mode" />
            </i>
        </div>
    )
}