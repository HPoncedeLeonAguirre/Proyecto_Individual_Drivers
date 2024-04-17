import React from 'react';
import { Link } from 'react-router-dom';
import './card.css';

const Card = ({ image, id, name, teams }) => {
    return (
        <Link to={`/detail/${id}`}>
            <article className='card'>
                <img src={image} alt={name} className='imgCard'/>
                <h2 className='nameCard'>{name}</h2>
                <p className='teamsCard'>{teams}</p>
            </article>
        </Link>
    );
};

export default Card;