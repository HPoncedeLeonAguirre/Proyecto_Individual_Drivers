import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setOrderByName, setOrderByDob } from '../../Redux/Actions/actions';
import './filter.css';

const Filter = ({ teams, handleFilter }) => {
    const globalStateFilter = useSelector((state) => state.filter);
    const [stateFilter, setStateFilter] = useState(globalStateFilter);
    const globalSelectedOrder = useSelector((state) => state.selectedOrder);
    const globalSelectedDirection = useSelector((state) => state.selectedDirection);
    const [selectedOrder, setSelectedOrder] = useState(globalSelectedOrder);
    const [selectedDirection, setSelectedDirection] = useState(globalSelectedDirection);

    const dispatch = useDispatch();

    const handleChange = (event) => {
        const { name, value } = event.target;
        if(name === "origin" || name === "teams"){
            setStateFilter({
                ...stateFilter,
                [name]: value
            });
        } else if(name === "order"){
            setSelectedOrder(value);
        } else if(name === "direction"){
            setSelectedDirection(value);
        }
    };

    useEffect(() => {
        handleFilter(stateFilter);
    }, [handleFilter, stateFilter, globalStateFilter]);

    useEffect(() => {
        if(selectedOrder === "name" || selectedOrder === "dob"){
            dispatch(
                selectedOrder === "name" 
                ? setOrderByName(selectedDirection)
                : setOrderByDob(selectedDirection)
            );
        }
    }, [dispatch, selectedOrder, selectedDirection]);

    return(
        <div className='orderHome'>
            <div className='selectContainerHome'>
                <select value={globalSelectedOrder} name='order' 
                onChange={handleChange} className='selectOrderHome'>
                    <option value="name">Ordenado por nombre</option>
                    <option value="dob">Ordenado por la fecha de nacimiento</option>
                </select>
                <select value={globalSelectedDirection} name='direction' 
                onChange={handleChange} className='selectOrderHome'>
                    <option value="ASC">Ascendente</option>
                    <option value="DESC">Descendente</option>
                </select>
            </div>
            <div className='selectContainerHome'>
                <label className='labelOrderHome'>Origen: </label>
                <select value={globalStateFilter.origin} name='origin' 
                onChange={handleChange} className='selectOrderHome'>
                    <option value="all">Todos los Drivers</option>
                    <option value="DB">Mis Drivers</option>
                    <option value="API">Drivers Originales</option>
                </select>
            </div>
            <div className='selectContainerHome rightBorder'>
                <label className='labelOrderHome'>Team: </label>
                <select value={globalStateFilter.teams} onChange={handleChange}
                className='selectOrderHome' name='teams'>
                    <option value="all">Todos los teams</option>
                    {teams.map((team) => (
                        <option key={team.id} value={team.id}>{team.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Filter;