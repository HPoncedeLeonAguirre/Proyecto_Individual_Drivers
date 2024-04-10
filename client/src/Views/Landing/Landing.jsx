import { Link } from 'react-router-dom';
import "../Landing/landing.css";

const Landing = () => {
    return (
    <div className='landing'>
        <div className='containerLanding'>
            <Link to="/home">
                <button className='buttonLanding'>Clickea para empezar!</button>
            </Link>
        </div>
    </div>
    );
};

export default Landing;