import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchDrivers } from "../../Redux/Actions/actions";
import './searchbar.css';

const SearchBar = () => {
    const [name, setName] = useState("");
    const dispatch = useDispatch();
    const handleChange = (event) => {
        setName(event.target.value);
        console.log("Nombre ingresado:", event.target.value);
    };
    const search = () => {
        if(name.trim() !== ""){
            console.log("Nombre buscado:", name);
            dispatch(searchDrivers(name));
            setName("");
        }
    };
    return (
        <div className="searchBar">
            <input
            type="search"
            onChange={handleChange}
            onKeyPress={(e) => {
                if(e.key === 'Enter'){
                    search();
                }
            }}
            placeholder="Ingrese el nombre de un conductor"
            value={name}
            className="searchInput"
            />
            <button className="searchButton" onClick={search}>
                Buscar
            </button>
        </div>
    );
};

export default SearchBar;