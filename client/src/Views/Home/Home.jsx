import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Card from '../../Components/Card/Card';
import Filter from '../../Components/Filter/Filter';
import "../Home/home.css";
import {
    fetchDrivers,
    setFilter,
    setPaginate
} from '../../Redux/Actions/actions';

const Home = () => {
    const [loading, setLoading] = useState(true);
    const globalStateFilter = useSelector((state) => state.filter);
    const [stateFilter, setStateFilter] = useState(globalStateFilter);
    const filteredDrivers = useSelector((state) => state.filteredDrivers);
    const currentPage = useSelector((state) => state.currentPage);
    const driversPerPage = useSelector((state) => state.driversPerPage);
    const [teams, setTeams] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetch("http://localhost:5000/teams")
        .then((response) => response.json())
        .then((data) => setTeams(data))
        .catch((error) => console.error("Hubo un error al buscar los teams:", error));
    }, []);

    useEffect(() => {
        const pageWithOutFilter = currentPage;
        dispatch(setFilter(stateFilter));
        const totalPagesWithFilter = Math.ceil(
            filteredDrivers.length / driversPerPage
        );
        if(totalPagesWithFilter === 0){
            return;
        }
        if(pageWithOutFilter > totalPagesWithFilter){
            dispatch(setPage(totalPagesWithFilter));
        }
    }, [dispatch, stateFilter, driversPerPage, filteredDrivers.length, currentPage]);

    useEffect(() => {
        dispatch(fetchDrivers())
        .then(() => setLoading(false))
        .catch((error) => console.error("Hubo un error al cargar los drivers:", error));
    }, [dispatch]);

    const handleFilter = (filterData) => {
        setStateFilter(filterData);
    };

    return(
        <main className='home'>
            <Filter teams={teams} handleFilter={handleFilter} />
            <section className='cardsHome'>
                {loading ? (
                    <img className='cargaDetail'
                    src='/assets/img.jpg'
                    alt='Cargando...'
                    />
                ) : (
                    filteredDrivers.slice((currentPage - 1) * driversPerPage,
                    currentPage * driversPerPage).map((driver) => (
                        <Card key={driver.id} id={driver.id} 
                        name={
                            driver.name
                            ? `${driver.name.forename} ${driver.name.surname}`
                            : `${driver.forename} ${driver.surname}`
                        }
                        image={driver.image.url ? driver.image.url : driver.image}
                        teams={
                            Array.isArray(driver?.Teams)
                            ? driver?.Teams.map((team) => team.name).join(", ")
                            : driver?.teams
                        }
                        />
                    ))
                )}
            </section>
            {parseInt(filteredDrivers.length) !== 0 && (
                <div className='paginationHome'>
                    <button
                        onClick={() => dispatch(setPaginate(1))}
                        disabled={currentPage === 1}
                        className='buttonPaginationHome'
                    >
                        Primero
                    </button>
                    <button
                        onClick={() => dispatch(setPaginate(currentPage - 1))}
                        disabled={currentPage === 1}
                        className='buttonPaginationHome'
                    >
                        Anterior
                    </button>
                    <span className='spanPaginationHome'>{currentPage}</span>
                    <button
                        onClick={() => dispatch(setPaginate(currentPage + 1))}
                        disabled={currentPage * driversPerPage >= filteredDrivers.length}
                        className='buttonPaginationHome'
                    >
                        Siguiente
                    </button>
                    <button
                        onClick={() =>
                            dispatch(
                                setPaginate(Math.ceil(filteredDrivers.length / driversPerPage))
                        )}
                        disabled={currentPage * driversPerPage >= filteredDrivers.length}
                        className='buttonPaginationHome'
                    >
                        Último
                    </button>
                </div>
            )}
        </main>
    );
};

export default Home;