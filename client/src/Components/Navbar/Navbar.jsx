import { Link } from "react-router-dom";
import './navbar.css';

const Navbar = () => { 
    return (
    <header className="navHeader">
        <nav className="nav">
            <Link to={"/"}>
                <button className="navButton navButtonClose">Cerrar</button>
            </Link>
            <div className="navButtons">
                <a href="/home">
                    <button className="navButton">Home</button>
                </a>
                <Link to={"/form"}>
                    <button className="navButton">Create</button>
                </Link>
            </div>
        </nav>
    </header>
    );
};

export default Navbar;