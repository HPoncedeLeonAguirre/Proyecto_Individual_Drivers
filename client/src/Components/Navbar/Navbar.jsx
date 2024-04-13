import { Link, useLocation } from "react-router-dom";
import SearchBar from "../Searchbar/Searchbar";
import './navbar.css';

const Navbar = () => {
    const { pathname } = useLocation();

    return (
    <header className="navHeader">
        <nav className="nav">
            <Link to={"/"}>
                <button className="navButton navButtonClose">Cerrar</button>
            </Link>
            <div className="navButtons">
                <Link to={"/home"}>
                    <button className="navButton">Home</button>
                </Link>
                <Link to={"/form"}>
                    <button className="navButton">Create</button>
                </Link>
                <div>
                    {pathname === "/home" && <SearchBar />}
                </div>
            </div>
            <div>
                <img src="/assets/logo-F1.png" alt="F1" className="navLogo" />
            </div>
        </nav>
    </header>
    );
};

export default Navbar;